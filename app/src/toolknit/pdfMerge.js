import { PDFDocument } from 'pdf-lib';

const MAX_FILES = 20;
const MAX_TOTAL_BYTES = 100 * 1024 * 1024;
const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
})[character]);
const formatSize = (bytes) => bytes < 1024 * 1024
  ? `${Math.max(1, Math.round(bytes / 1024))} KB`
  : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export async function mergePdfFiles(files) {
  if (!files.length) throw new Error('请先添加 PDF 文件。');
  const output = await PDFDocument.create();

  for (const item of files) {
    const source = await PDFDocument.load(item.bytes);
    const pages = await output.copyPages(source, source.getPageIndices());
    pages.forEach((page) => output.addPage(page));
  }

  const bytes = await output.save({ useObjectStreams: true });
  return new Blob([bytes], { type: 'application/pdf' });
}

export function setupPdfMerge(root) {
  const input = root.querySelector('#pdf-file-input');
  const list = root.querySelector('#pdf-file-list');
  const empty = root.querySelector('#pdf-empty');
  const mergeButton = root.querySelector('[data-pdf-action="merge"]');
  const clearButton = root.querySelector('[data-pdf-action="clear"]');
  const summary = root.querySelector('#pdf-summary');
  const status = root.querySelector('#pdf-status');
  const dropzone = root.querySelector('#pdf-dropzone');
  const files = [];
  let nextId = 1;
  let busy = false;

  const announce = (message, error = false) => {
    status.textContent = message;
    status.classList.toggle('is-error', error);
  };

  const render = () => {
    list.innerHTML = files.map((item, index) => `<li class="pdf-file" data-pdf-id="${item.id}">
      <span class="pdf-file-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="pdf-file-name"><strong>${escapeHTML(item.file.name)}</strong><small>${item.pageCount} 页 · ${formatSize(item.file.size)}</small></span>
      <span class="pdf-file-controls">
        <button type="button" data-pdf-action="up" aria-label="上移 ${escapeHTML(item.file.name)}" ${index === 0 || busy ? 'disabled' : ''}>↑</button>
        <button type="button" data-pdf-action="down" aria-label="下移 ${escapeHTML(item.file.name)}" ${index === files.length - 1 || busy ? 'disabled' : ''}>↓</button>
        <button type="button" data-pdf-action="remove" aria-label="移除 ${escapeHTML(item.file.name)}" ${busy ? 'disabled' : ''}>×</button>
      </span>
    </li>`).join('');
    empty.hidden = files.length > 0;
    list.hidden = files.length === 0;
    const totalPages = files.reduce((sum, item) => sum + item.pageCount, 0);
    const totalBytes = files.reduce((sum, item) => sum + item.file.size, 0);
    summary.textContent = files.length ? `${files.length} 份文件 · ${totalPages} 页 · ${formatSize(totalBytes)}` : '尚未添加文件';
    mergeButton.disabled = busy || files.length === 0;
    clearButton.disabled = busy || files.length === 0;
    mergeButton.textContent = busy ? '正在本地合并…' : '合并并下载 PDF →';
  };

  const addFiles = async (candidates) => {
    if (busy) return;
    const incoming = Array.from(candidates);
    if (!incoming.length) return;
    busy = true;
    render();
    announce('正在读取文件，页面数量会显示在列表中。');
    const rejected = [];
    let totalBytes = files.reduce((sum, item) => sum + item.file.size, 0);

    for (const file of incoming) {
      if (files.length >= MAX_FILES) {
        rejected.push(`${file.name}：最多添加 ${MAX_FILES} 份文件`);
        continue;
      }
      if (totalBytes + file.size > MAX_TOTAL_BYTES) {
        rejected.push(`${file.name}：总大小不能超过 100 MB`);
        continue;
      }
      if (!file.size || (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf')) {
        rejected.push(`${file.name}：不是有效的 PDF 文件`);
        continue;
      }
      if (files.some((item) => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified)) {
        rejected.push(`${file.name}：文件已在列表中`);
        continue;
      }
      try {
        const bytes = await file.arrayBuffer();
        const document = await PDFDocument.load(bytes);
        const pageCount = document.getPageCount();
        if (!pageCount) throw new Error('empty');
        files.push({ id: nextId++, file, bytes, pageCount });
        totalBytes += file.size;
      } catch {
        rejected.push(`${file.name}：无法读取，文件可能损坏或已加密`);
      }
    }

    busy = false;
    if (root.isConnected) {
      render();
      if (rejected.length) announce(rejected.join('；'), true);
      else announce(files.length ? '文件已就绪。调整顺序后即可合并。' : '请添加 PDF 文件。');
    }
    input.value = '';
  };

  input.addEventListener('change', () => addFiles(input.files));
  root.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-pdf-action]');
    if (!button || busy) return;
    const action = button.dataset.pdfAction;
    const row = button.closest('[data-pdf-id]');
    const index = row ? files.findIndex((item) => item.id === Number(row.dataset.pdfId)) : -1;

    if (action === 'up' && index > 0) [files[index - 1], files[index]] = [files[index], files[index - 1]];
    if (action === 'down' && index >= 0 && index < files.length - 1) [files[index + 1], files[index]] = [files[index], files[index + 1]];
    if (action === 'remove' && index >= 0) files.splice(index, 1);
    if (action === 'clear') files.splice(0, files.length);
    if (['up', 'down', 'remove', 'clear'].includes(action)) {
      render();
      announce(files.length ? '顺序已更新，合并会按照列表从上到下进行。' : '列表已清空，可以重新添加 PDF。');
      return;
    }
    if (action !== 'merge' || !files.length) return;

    busy = true;
    render();
    announce('正在合并，文件不会离开你的浏览器。');
    try {
      const blob = await mergePdfFiles(files);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `NLQH-merged-${stamp}.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      announce(`合并完成，已生成 ${files.reduce((sum, item) => sum + item.pageCount, 0)} 页 PDF。`);
    } catch {
      announce('合并失败。请检查文件是否加密或损坏，然后重试。', true);
    } finally {
      busy = false;
      if (root.isConnected) render();
    }
  });

  ['dragenter', 'dragover'].forEach((type) => dropzone.addEventListener(type, (event) => {
    event.preventDefault();
    if (!busy) dropzone.classList.add('is-dragging');
  }));
  ['dragleave', 'drop'].forEach((type) => dropzone.addEventListener(type, (event) => {
    event.preventDefault();
    dropzone.classList.remove('is-dragging');
  }));
  dropzone.addEventListener('drop', (event) => addFiles(event.dataTransfer.files));
  render();
}
