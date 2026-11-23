import { defineConfig } from 'vite';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const isolationHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

function pdfRoutes() {
  const rewrite = (req, _res, next) => {
    if (!req.url) return next();
    const [pathname, query = ''] = req.url.split('?');
    if (/^\/pdf\/(?:[a-z]{2}(?:-[a-z]{2})?\/?)?$/i.test(pathname)) {
      const directory = pathname.replace(/\/$/, '');
      req.url = `${directory}/index.html${query ? `?${query}` : ''}`;
    } else if (/^\/pdf\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?[a-z0-9-]+\/?$/i.test(pathname)) {
      const page = pathname.replace(/^\/pdf\//, '').replace(/\/$/, '');
      if (existsSync(resolve(__dirname, 'public', 'pdf', `${page}.html`))) {
        req.url = `/pdf/${page}.html${query ? `?${query}` : ''}`;
      }
    }
    next();
  };
  return {
    name: 'nlqh-pdf-routes',
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [pdfRoutes()],
  server: { headers: isolationHeaders },
  preview: { headers: isolationHeaders },
});
