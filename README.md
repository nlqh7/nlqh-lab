# NLQH Lab

[![CI](https://github.com/nlqh7/nlqh-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/nlqh7/nlqh-lab/actions/workflows/ci.yml)

Personal tools, experiments, and ideas at [nlqh.online](https://nlqh.online).

## Projects in this repository

- `app/`: the NLQH Lab main site, built with Vite.
- `references/bentopdf-main/`: the NLQH-adapted BentoPDF source, including its AGPL-3.0 license and modification notes.
- `assemble_pdf.py`: assembles the PDF module into the main site and splits large engine assets to comply with Cloudflare Pages limits.
- `.github/workflows/ci.yml`: installs locked dependencies and verifies a complete production build on every push and pull request.

## Local development

Requirements: Node.js 22.12 or newer, Python 3.12 or newer, and npm.

```bash
npm run ci:install
npm run build
```

For the main-site development server:

```bash
npm --prefix app run dev
```

## Deployment

Cloudflare Pages runs `npm run build:cloudflare` and publishes `app/dist`. The `main` branch deploys to production; other branches and pull requests can use preview deployments. All repository paths are watched so source and workflow changes trigger a deployment. Deployment status is visible in Cloudflare Pages and GitHub commit checks. GitHub Actions performs CI build validation independently and does not create a competing deployment.

## Licensing and credits

The integrated PDF workshop is adapted from [BentoPDF](https://github.com/alam00000/bentopdf) under AGPL-3.0. Upstream license, third-party notices, and NLQH modification records are retained in the repository and the published source offer. Other third-party credits are listed in `app/THIRD_PARTY_NOTICES.md`.
