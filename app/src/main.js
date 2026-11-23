import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import './style.css';
import { setupPdfMerge } from './toolknit/pdfMerge.js';

const topics = [
  {
    slug: 'documents', code: 'DOC', name: 'Document Workshop', zh: '文档与转换',
    short: '一整间可以直接使用的 PDF 工具台，文件优先留在本机。',
    intro: '把常用的 PDF 操作收进同一个工作间。合并、拆分、压缩、转换与页面编辑，都在本站完成，不再跳去第三方工具站。',
    note: '绝大多数文档处理在浏览器本地完成，不需要注册。少数复杂转换会按需加载处理引擎；首次打开时请保持网络连接。PDF 模块基于 AGPL-3.0 许可的 BentoPDF 适配，源码与许可在工具台页脚公开。',
    groups: [
      { title: '本站工具台', en: 'READY INSIDE NLQH', items: [
        { name: 'NLQH PDF', zh: '完整的浏览器 PDF 工作间', status: '现在可用', description: '合并、拆分、压缩、图片与 Office 转换、OCR、加解密、签名、表单和页面整理，统一中文目录与搜索。', links: [
          { label: '打开 PDF 工具台', url: '/pdf/', sameTab: true },
          { label: '直接合并 PDF', url: '/pdf/merge-pdf', sameTab: true }
        ] }
      ] },
      { title: '背后的开源项目', en: 'OPEN SOURCE & CREDITS', items: [
        { name: 'ToolKnit', zh: 'Zihang Dong 的开源工具箱', status: 'MIT 许可', description: '本站最早的 PDF 合并适配来自这个开源工具箱。现在已并入完整的 NLQH PDF 工作间，原项目演示与仓库继续保留。', links: [
          { label: '打开官方演示', url: 'https://toolknit.com' },
          { label: 'GitHub 源码', url: 'https://github.com/ZihangDong/toolknit-desktop' }
        ] },
        { name: 'BentoPDF', zh: 'PDF 工作间的处理引擎与功能基础', status: 'AGPL-3.0', description: '本站保留其开源许可，并公开当前修改后的 PDF 模块源码。界面、导航与主站入口按 NLQH Lab 重新设计。', links: [{ label: '查看上游项目', url: 'https://github.com/alam00000/bentopdf' }] }
      ] }
    ]
  },
  {
    slug: 'ielts', code: 'IELTS', name: 'IELTS Studio', zh: '雅思练习室',
    short: '阅读、听力、口语与写作的练习档案。',
    intro: '不把备考拆成一堆零散网页。自己的练习系统放在这里，常用的外部资源也收在同一层目录里。',
    note: 'ZYZ 的雅思含题库与第三方学习材料，按项目要求仅保留个人、本机使用，不在公开网站镜像或再分发。学习记录保存在原程序的浏览器存储中。',
    groups: [
      { title: '练习系统', en: 'PRACTICE SYSTEM', items: [
        { name: 'ZYZ 的雅思', zh: 'IELTS Atlas · 个人本机版', status: '个人使用', description: '正在本机使用的雅思 HTML 项目，包含题库浏览、阅读练习、练习记录、统计与错题分析。公开页只提供项目主页，不镜像题库。', links: [{ label: '查看 GitHub 项目', url: 'https://github.com/sallowayma-git/IELTS-practice' }] },
        { name: 'Speaking Timer', zh: '口语计时与录音', status: '待接入', description: '规划为 Part 1–3 计时、准备倒计时与练习记录的小工具。' },
        { name: 'Writing Desk', zh: '写作练习台', status: '待接入', description: '规划收纳题目、限时写作与本地草稿，先做一个没有干扰的写作界面。' }
      ] }
    ]
  },
  {
    slug: 'exam', code: 'EXAM', name: 'Exam Practice', zh: '政治刷题',
    short: '章节练习、随机抽题与错题重做。',
    intro: '一个轻量、专注的刷题角落。先让练习与错题回顾好用，再考虑更多复杂功能。',
    note: '题库内容需要确认来源与使用授权；在题目准备好之前，这里只展示真实进度，不提供空练习入口。',
    groups: [
      { title: '正在规划', en: 'IN THE NOTEBOOK', items: [
        { name: 'Politics Practice', zh: '章节刷题', status: '待接入', description: '计划支持按章节练习、随机抽题、答案解析与当次正确率。' },
        { name: 'Mistake Notebook', zh: '错题本', status: '待接入', description: '计划将错题按章节与错误次数整理，支持单独重做和导出备份。' }
      ] }
    ]
  },
  {
    slug: 'interfaces', code: 'UI', name: 'Interface Lab', zh: '界面实验台',
    short: '光、转场、控件，以及一些好玩的界面想法。',
    intro: '像 Uiverse 一样收集界面灵感，但这里更在意亲手试一试。能交互的直接玩，尚未验证的放进待审核区。',
    note: '实验可以使用项目的视觉语言重新实现；外部参考只记录来源与可借鉴点，不把别人的组件直接冒充成本站作品。',
    groups: []
  },
  {
    slug: 'games', code: 'PLAY', name: 'Mini Games', zh: '小游戏与玩具',
    short: '几分钟的快乐，以及一些互动实验。',
    intro: '不追求宏大，只收集能让人玩几分钟的小东西。游戏、互动画面和创意编程都可以住在这里。',
    note: '这个专题目前还是空货架。第一款游戏完成后，会直接在这里出现可玩的入口。',
    groups: [
      { title: '正在规划', en: 'IN THE NOTEBOOK', items: [
        { name: 'Little Arcade', zh: '小游戏合集', status: '待接入', description: '每个游戏都应有完整的开始、操作、结束与再玩一次流程，而不是只摆一张封面。' },
        { name: 'Creative Coding', zh: '互动实验', status: '待接入', description: '收纳生成图形、声音与其他不一定算游戏，但值得动手玩一玩的实验。' }
      ] }
    ]
  },
  {
    slug: 'career', code: 'WORK', name: 'Career Tools', zh: '求职工具',
    short: '职位整理、简历版本与申请进度。',
    intro: '把求职过程里重复、琐碎的部分慢慢做成工具，让精力留给真正重要的准备。',
    note: '涉及职位信息时，只接入合规、授权的数据来源；简历与申请记录等个人信息优先保存在本机。',
    groups: [
      { title: '我的工具', en: 'OWN & LOCAL', items: [
        { name: 'Job Assistant', zh: '求职助手', status: '待整理', description: '把前面做过的求职工具整理成稳定入口，再收录到这个专题中。' },
        { name: 'Application Tracker', zh: '申请进度表', status: '待接入', description: '规划记录公司、岗位、简历版本、投递时间与后续节点，支持本地备份。' }
      ] }
    ]
  },
  {
    slug: 'projects', code: 'CODE', name: 'Open Projects', zh: '作品与项目',
    short: '记录做过的项目，也记录踩过的坑。',
    intro: '这里不只是成品陈列室。每个项目都可以留下用途、实现方式、源码入口和下一步计划。',
    note: '项目档案会随实际作品增加，不用虚构的 stars、下载量或完成度来填满页面。',
    groups: [
      { title: '项目档案', en: 'PROJECT LOG', items: [
        { name: 'NLQH Lab', zh: '这个网站本身', status: '持续更新', description: '个人工具目录，也是设计、前端与内容组织的长期实验。', links: [{ label: '返回实验室首页', url: '#/', internal: true }] },
        { name: 'Project Archive', zh: '更多项目档案', status: '待整理', description: '后续按实际项目补充说明、仓库与演示地址。' }
      ] }
    ]
  }
];

const inspirations = [
  { title: '萤火局部照明', en: 'FIREFLY FIELD', category: 'light', status: '已应用', description: '呼吸光晕与暖白遮罩共同显露局部界面。', preview: 'firefly' },
  { title: '暖白晕染跳转', en: 'WARM RIPPLE', category: 'motion', status: '已应用', description: '从点击位置扩散的圆形，承接旧页与新页。', preview: 'ripple' },
  { title: '专题标题承接', en: 'SHARED TITLE', category: 'motion', status: '已应用', description: '同一个专题名跨越目录与详情，保留视觉线索。', preview: 'title' },
  { title: '昼夜开关', en: 'DAY / NIGHT', category: 'controls', status: '待审核', description: '借鉴状态形状与反馈，不直接搬用组件代码。', preview: 'switch', url: 'https://uiverse.io/ui/toggle-switches/' },
  { title: '内容骨架', en: 'CONTENT SKELETON', category: 'controls', status: '待审核', description: '未来有真实加载状态时，再按最终布局预留空间。', preview: 'skeleton', url: 'https://uiverse.io/loaders' },
  { title: '弹簧回位', en: 'SPRING RELEASE', category: 'controls', status: '待审核', description: '候选用于可中断的拖拽与回位，不在静态按钮上滥用。', preview: 'spring', url: 'https://developer.apple.com/videos/play/wwdc2023/10158/' }
];

const app = document.querySelector('#app');
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const routeArrow = '<span class="route-arrow" aria-hidden="true">→</span>';
const outline = '<svg class="rough-outline" viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true"><path d="M51 4C76 2 96 10 96 29c0 20-19 29-47 29S4 49 5 30C6 12 25 4 51 4Z" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>';
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function header() {
  return `
    <header class="site-header" id="top">
      <a class="brand" href="#/" aria-label="NLQH Lab 首页" style="view-transition-name: brand">
        <span class="brand-symbol" aria-hidden="true"><i></i><i></i></span>
        <span>NLQH <b>LAB</b></span>
      </a>
      <nav class="main-nav" aria-label="主导航">
        <a href="#/" data-section="directory">专题目录</a>
        <a href="#/interfaces">界面实验</a>
      </nav>
      <span class="edition">PERSONAL / 2026</span>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <a class="footer-brand" href="#/">NLQH Lab<span>一个持续生长的个人工具站</span></a>
      <span class="footer-note">MADE FOR CURIOSITY</span>
      <button class="back-top" type="button" data-action="top">回到顶部 <span aria-hidden="true">↑</span></button>
    </footer>`;
}

function homePage() {
  return `${header()}
    <main id="main-content">
      <section class="home-hero" aria-labelledby="home-title">
        <div class="hero-heading">
          <p class="micro">TOOLS · EXPERIMENTS · IDEAS</p>
          <h1 id="home-title">Make room<br><em>for ideas.</em></h1>
        </div>
        <div class="hero-side">
          <div class="orbit-stamp" aria-hidden="true">
            ${outline}
            <span>${String(topics.length).padStart(2, '0')}</span>
            <small>TOPICS<br>AND COUNTING</small>
          </div>
          <p class="hero-intro">一个不太安分的工具抽屉。<br>放自己的作品，也收藏别人的好工具。</p>
          <a class="primary-link" href="#/" data-section="directory">进入实验室 ${routeArrow}</a>
        </div>
        <div class="hero-bottom"><span>不是作品集，是正在发生的日常。</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section class="directory" id="directory" aria-labelledby="directory-title">
        <div class="section-heading">
          <div><p class="micro">THE LAB DIRECTORY</p><h2 id="directory-title">想做什么，<br>就往这里放。</h2></div>
          <p>每一行都是一个真正的专题页面。<br>工具、状态和收藏，都收纳在里面。</p>
        </div>
        <div class="directory-list">
          ${topics.map((topic) => `
            <a class="directory-row" href="#/${topic.slug}" aria-label="进入${topic.zh}专题">
              <span class="directory-code">${topic.code}${outline}</span>
              <span class="directory-name"><span style="view-transition-name: topic-${topic.slug}">${topic.name}</span><small>${topic.zh}</small></span>
              <span class="directory-description">${topic.short}</span>
              <span class="directory-enter">进入专题 ${routeArrow}</span>
            </a>`).join('')}
        </div>
      </section>

      <a class="lab-teaser" href="#/interfaces">
        <span class="micro">NEW / INTERFACE LAB</span>
        <strong>黑的地方，<br>也可以有温度。</strong>
        <span class="lab-teaser-link">去追一只萤火虫 ${routeArrow}</span>
      </a>
    </main>${footer()}`;
}

function toolItem(item) {
  const links = item.links?.length
    ? `<div class="tool-links">${item.links.map((link) => { const sameTab = link.internal || link.sameTab; return `<a class="tool-action" href="${link.url}" ${sameTab ? '' : 'target="_blank" rel="noopener noreferrer"'}>${link.label} ${sameTab ? routeArrow : arrow}</a>`; }).join('')}</div>`
    : '';
  return `<article class="tool-item">
    <div class="tool-title"><h3>${item.name}</h3><span>${item.zh}</span></div>
    <div class="tool-body"><p>${item.description}</p></div>
    <div class="tool-aside"><span class="tool-status">${item.status}</span>${links}</div>
  </article>`;
}

function fireflyStage() {
  return `<section class="firefly-stage" id="firefly-field" aria-labelledby="firefly-title">
    <div class="firefly-scene firefly-dark">
      <p class="micro">EXPERIMENT 001 / POINTER LIGHT</p>
      <h2 id="firefly-title">Move slowly.<br>Find the light.</h2>
      <p>移动鼠标或触摸屏幕，让附近暖起来。</p>
    </div>
    <div class="firefly-scene firefly-warm" aria-hidden="true">
      <p class="micro">EXPERIMENT 001 / POINTER LIGHT</p>
      <h2>Move slowly.<br>Find the light.</h2>
      <p>移动鼠标或触摸屏幕，让附近暖起来。</p>
    </div>
    <div class="light-position" aria-hidden="true"><span class="firefly-glow"></span></div>
    <a class="firefly-next" href="#/documents">试试晕染跳转 ${routeArrow}</a>
  </section>`;
}

function inspirationPreview(type) {
  return `<div class="idea-preview preview-${type}" aria-hidden="true"><span></span><span></span><span></span></div>`;
}

function interfacePage(topic) {
  const current = topics.indexOf(topic);
  const next = topics[(current + 1) % topics.length];
  return `${header()}
    <main id="main-content" class="topic-main interface-main">
      <section class="topic-hero interface-hero" aria-labelledby="topic-title">
        <a class="back-link" href="#/"><span aria-hidden="true">←</span> 返回目录</a>
        <div class="topic-code"><span>${topic.code}</span>${outline}</div>
        <div class="topic-heading">
          <p class="micro">NLQH LAB / ${topic.code}</p>
          <h1 id="topic-title" tabindex="-1" style="view-transition-name: topic-${topic.slug}">${topic.name}<span>${topic.zh}</span></h1>
        </div>
        <p class="topic-intro">${topic.intro}</p>
        <div class="topic-meta"><span>03 LIVE · 03 PENDING REVIEW</span><a href="#review-shelf" data-local-anchor="review-shelf">查看灵感架 ↓</a></div>
      </section>
      ${fireflyStage()}
      <section class="review-shelf" id="review-shelf" aria-labelledby="review-title">
        <div class="review-heading"><div><p class="micro">THE IDEA SHELF</p><h2 id="review-title">灵感先上架，<br>审核后再入库。</h2></div><a class="tool-action" href="https://uiverse.io/" target="_blank" rel="noopener noreferrer">参考 Uiverse ${arrow}</a></div>
        <div class="idea-filters" role="group" aria-label="按类型筛选灵感">
          <button type="button" data-filter="all" aria-pressed="true">全部${outline}</button>
          <button type="button" data-filter="light" aria-pressed="false">光与遮罩${outline}</button>
          <button type="button" data-filter="motion" aria-pressed="false">转场${outline}</button>
          <button type="button" data-filter="controls" aria-pressed="false">控件反馈${outline}</button>
        </div>
        <div class="idea-grid">
          ${inspirations.map((item) => `<article class="idea-card" data-category="${item.category}">
            ${inspirationPreview(item.preview)}
            <div class="idea-copy"><p class="micro">${item.en}</p><h3>${item.title}</h3><p>${item.description}</p><div class="idea-meta"><span>${item.status}</span>${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="查看${item.title}外部参考">来源 ${arrow}</a>` : '<span>NLQH LAB</span>'}</div></div>
          </article>`).join('')}
        </div>
      </section>
      <aside class="topic-note"><span class="micro">A NOTE BEFORE USING</span><p>${topic.note}</p></aside>
      <a class="next-topic" href="#/${next.slug}"><span><small>NEXT ROOM / ${next.code}</small><strong>${next.zh}</strong></span><span class="next-name">${next.name} ${routeArrow}</span></a>
    </main>${footer()}`;
}

function topicPage(topic) {
  const count = topic.groups.reduce((sum, group) => sum + group.items.length, 0);
  const current = topics.indexOf(topic);
  const next = topics[(current + 1) % topics.length];
  return `${header()}
    <main id="main-content" class="topic-main">
      <section class="topic-hero" aria-labelledby="topic-title">
        <a class="back-link" href="#/"><span aria-hidden="true">←</span> 返回目录</a>
        <div class="topic-code"><span>${topic.code}</span>${outline}</div>
        <div class="topic-heading">
          <p class="micro">NLQH LAB / ${topic.code}</p>
          <h1 id="topic-title" tabindex="-1" style="view-transition-name: topic-${topic.slug}">${topic.name}<span>${topic.zh}</span></h1>
        </div>
        <p class="topic-intro">${topic.intro}</p>
        <div class="topic-meta"><span>${String(count).padStart(2, '0')} ITEMS IN THIS ROOM</span><span>目录持续整理中</span></div>
      </section>
      <div class="tool-groups">
        ${topic.groups.map((group) => `
          <section class="tool-group" aria-labelledby="group-${topic.slug}-${group.en.replace(/\s/g, '-')}">
            <div class="group-heading"><p class="micro">${group.en}</p><h2 id="group-${topic.slug}-${group.en.replace(/\s/g, '-')}">${group.title}</h2></div>
            <div class="tool-list">${group.items.map(toolItem).join('')}</div>
          </section>`).join('')}
      </div>
      <aside class="topic-note"><span class="micro">A NOTE BEFORE USING</span><p>${topic.note}</p></aside>
      <a class="next-topic" href="#/${next.slug}"><span><small>NEXT ROOM / ${next.code}</small><strong>${next.zh}</strong></span><span class="next-name">${next.name} ${routeArrow}</span></a>
    </main>${footer()}`;
}

function pdfMergePage() {
  return `${header()}
    <main id="main-content" class="topic-main pdf-merge-main">
      <section class="topic-hero pdf-hero" aria-labelledby="topic-title">
        <a class="back-link" href="#/documents"><span aria-hidden="true">←</span> 返回文档与转换</a>
        <div class="topic-code"><span>PDF</span>${outline}</div>
        <div class="topic-heading">
          <p class="micro">TOOLKNIT AT NLQH / LOCAL PDF</p>
          <h1 id="topic-title" tabindex="-1">PDF Merge<span>把分散的页面，合成一个文件。</span></h1>
        </div>
        <p class="topic-intro">添加多份 PDF，按列表顺序合并并下载。所有处理都在当前浏览器中完成，不会上传到服务器。</p>
        <div class="topic-meta"><span>LOCAL ONLY · UP TO 20 FILES / 100 MB</span><a href="https://github.com/ZihangDong/toolknit-desktop" target="_blank" rel="noopener noreferrer">ToolKnit 开源项目 ${arrow}</a></div>
      </section>
      <section class="pdf-workspace" id="pdf-workspace" aria-label="PDF 合并工具">
        <div class="pdf-dropzone" id="pdf-dropzone">
          <span class="pdf-dropmark" aria-hidden="true">＋</span>
          <div><h2>把 PDF 放在这里</h2><p>拖入文件，或从设备中选择。支持一次添加多份。</p></div>
          <label class="pdf-picker" for="pdf-file-input">选择 PDF <span aria-hidden="true">↗</span></label>
          <input id="pdf-file-input" type="file" accept="application/pdf,.pdf" multiple>
        </div>
        <div class="pdf-queue-heading"><h2>合并顺序</h2><span id="pdf-summary">尚未添加文件</span></div>
        <p class="pdf-empty" id="pdf-empty">列表还是空的。第一份 PDF 会出现在这里。</p>
        <ol class="pdf-file-list" id="pdf-file-list" hidden></ol>
        <div class="pdf-actions">
          <button class="pdf-clear" type="button" data-pdf-action="clear" disabled>清空列表</button>
          <button class="pdf-merge-button" type="button" data-pdf-action="merge" disabled>合并并下载 PDF →</button>
        </div>
        <p class="pdf-status" id="pdf-status" role="status" aria-live="polite">文件仅在此标签页内处理；刷新或离开页面会清空列表。</p>
      </section>
      <aside class="topic-note"><span class="micro">A SMALL IMPLEMENTATION NOTE</span><p>网页工具使用 pdf-lib 在浏览器中合并文档，界面与交互按 NLQH Lab 重新实现。加密或损坏的 PDF 需要先修复或解除密码保护。</p></aside>
    </main>${footer()}`;
}

function notFoundPage() {
  return `${header()}<main id="main-content" class="not-found"><p class="micro">ROOM NOT FOUND</p><h1>这个房间<br>还不存在。</h1><p>也许它还在笔记本里，先回目录看看已经有什么。</p><a class="primary-link" href="#/">返回专题目录 ${routeArrow}</a></main>${footer()}`;
}

function currentPath() {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#top') return '/';
  return hash.slice(1).split('?')[0];
}

let renderedPath;
let rippleNavigating = false;

function renderRoute({ focus = false } = {}) {
  const path = currentPath();
  if (path === '/pdf-merge') {
    window.location.replace('/pdf/merge-pdf');
    return;
  }
  const topic = topics.find((item) => `/${item.slug}` === path);
  app.innerHTML = path === '/' ? homePage() : path === '/pdf-merge' ? pdfMergePage() : topic ? (topic.slug === 'interfaces' ? interfacePage(topic) : topicPage(topic)) : notFoundPage();
  document.title = path === '/pdf-merge' ? '本地 PDF 合并 — NLQH Lab' : topic ? `${topic.zh} — NLQH Lab` : path === '/' ? 'NLQH Lab — Tools, Experiments & Ideas' : '页面不存在 — NLQH Lab';
  document.body.dataset.page = path === '/' ? 'home' : 'topic';
  app.classList.remove('is-leaving');
  renderedPath = path;
  if (topic?.slug === 'interfaces') setupFirefly();
  if (path === '/pdf-merge') setupPdfMerge(document.querySelector('#pdf-workspace'));
  if (focus) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const heading = document.querySelector('#topic-title, #home-title, .not-found h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}

function transitionToRoute() {
  const path = currentPath();
  if (path === renderedPath) return;
  if (document.startViewTransition && !reduceMotion() && !rippleNavigating) {
    document.startViewTransition(() => renderRoute({ focus: true }));
  } else {
    renderRoute({ focus: true });
  }
}

function setupFirefly() {
  const stage = document.querySelector('.firefly-stage');
  if (!stage) return;
  const moveLight = (event) => {
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty('--light-x', `${event.clientX - rect.left}px`);
    stage.style.setProperty('--light-y', `${event.clientY - rect.top}px`);
    stage.classList.add('has-pointer');
  };
  stage.addEventListener('pointermove', moveLight);
  stage.addEventListener('pointerdown', moveLight);
}

function navigateWithRipple(event, link) {
  const target = link.getAttribute('href');
  if (!target || target === window.location.hash || (target === '#/' && currentPath() === '/')) {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? 'instant' : 'smooth' });
    return;
  }
  if (reduceMotion()) {
    window.location.hash = target;
    return;
  }
  const x = event.clientX || window.innerWidth / 2;
  const y = event.clientY || window.innerHeight / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const ripple = document.createElement('div');
  ripple.className = 'navigation-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.setProperty('--ripple-scale', String((radius * 2.1) / 100));
  ripple.setAttribute('aria-hidden', 'true');
  document.body.append(ripple);
  rippleNavigating = true;
  app.classList.add('is-leaving');
  requestAnimationFrame(() => ripple.classList.add('is-active'));
  window.setTimeout(() => {
    window.location.hash = target;
    window.setTimeout(() => {
      ripple.classList.add('is-fading');
      window.setTimeout(() => {
        ripple.remove();
        rippleNavigating = false;
      }, 160);
    }, 40);
  }, 250);
}

window.addEventListener('hashchange', transitionToRoute);

app.addEventListener('click', (event) => {
  const sectionLink = event.target.closest('[data-section]');
  if (sectionLink) {
    event.preventDefault();
    const section = sectionLink.dataset.section;
    if (currentPath() !== '/') {
      window.location.hash = '#/';
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth' }), 80);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth' });
    }
    return;
  }

  const localAnchor = event.target.closest('[data-local-anchor]');
  if (localAnchor) {
    event.preventDefault();
    document.getElementById(localAnchor.dataset.localAnchor)?.scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth' });
    return;
  }

  const filter = event.target.closest('[data-filter]');
  if (filter) {
    const value = filter.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button === filter)));
    document.querySelectorAll('.idea-card').forEach((card) => {
      card.hidden = value !== 'all' && card.dataset.category !== value;
    });
    return;
  }

  const topButton = event.target.closest('[data-action="top"]');
  if (topButton) {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? 'instant' : 'smooth' });
    document.querySelector('.brand')?.focus({ preventScroll: true });
    return;
  }

  const internalLink = event.target.closest('a[href^="#/"]');
  if (internalLink) {
    event.preventDefault();
    navigateWithRipple(event, internalLink);
  }
});

renderRoute();
