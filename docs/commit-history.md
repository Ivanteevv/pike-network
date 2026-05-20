# Commit History

Этот файл дублирует важные изменения в удобном для чтения виде.
Основной источник истины по-прежнему `git log`, а здесь хранится короткое человеческое описание:

- что было сделано
- зачем это было сделано
- какие ключевые файлы затронуты

Техническое правило:
запись о крупном рабочем коммите может появляться следующим небольшим коммитом с обновлением журнала, потому что коммит не может надежно содержать собственный финальный hash без переписывания истории.

## Формат записи

### `<hash>` - `<title>`
- Date: `YYYY-MM-DD`
- Branch: `<branch>`
- Summary: кратко, что вошло в коммит
- Files: список ключевых файлов или зон проекта

## Entries

### `12ae97f` - `Add menu PDF lightbox viewer`
- Date: `2026-05-21`
- Branch: `feature/menu-pdf-viewer`
- Summary: added image-based PDF menu viewing for bar pages, connected mock menu PDF files and preview images, and introduced shared scroll locking for dialogs and mobile overlays.
- Why:
  - keep PDF files available for opening/download while showing clean image previews in the page UI
  - avoid iframe-based PDF controls inside the lightbox
  - make the menu viewer work differently on desktop and mobile: animated desktop lightbox, classic fullscreen mobile viewer
  - prevent page width jumps when scroll locking hides and restores the browser scrollbar
- Decisions:
  - menu data now supports `fileType` and `previewImages` in the frontend content contract
  - temporary menu media lives in `public/mock/menus`
  - `MenuPdfViewer` owns the menu preview UI, while routes only pass normalized `bar.menuLinks`
  - shared scroll locking lives in `src/lib/client-scroll-lock.js` and is reused by age gate, gallery preview, mobile nav, and menu viewer
  - reference PDFs in `public/Refference/` were not merged because runtime only uses `public/mock/menus`
- Verification:
  - `npm run lint` passed
  - `npm run build` passed
  - production scroll-link QA passed on iPhone-sized `393x852` and desktop `1280x720` viewports
- Files:
  - `docs/content-contracts.md`
  - `public/mock/menus/*`
  - `src/app/bars/[slug]/page.js`
  - `src/app/bars/[slug]/page.module.css`
  - `src/components/menu-pdf-viewer.js`
  - `src/components/menu-pdf-viewer.module.css`
  - `src/lib/client-scroll-lock.js`
  - `src/lib/content/mock-site-data.js`
  - `src/components/age-gate.js`
  - `src/components/bar-gallery.js`
  - `src/components/bar-hero-nav.js`

### `8519e2d` - `Initial commit from Create Next App`
- Date: `2026-03-15`
- Branch: `main`
- Summary: стартовый шаблон Next.js-приложения.
- Files: базовая структура приложения.

### `f475418` - `Build multi-bar frontend foundation`
- Date: `2026-03-15`
- Branch: `main`
- Summary: базовая frontend-структура для мульти-бар проекта, страницы и контентный каркас.
- Files: `src/app`, `src/components`, контентные мок-данные и проектная документация.

### `a0d51e8` - `Add age gate and refine mobile glass UI`
- Date: `2026-03-22`
- Branch: `main`
- Summary: добавлены age gate, scroll-to-top, theme tokens, mobile-first доработка интерфейса и glass-стилизация ключевых экранов.
- Files:
  - `src/app/layout.js`
  - `src/app/globals.css`
  - `src/app/theme.css`
  - `src/app/page.module.css`
  - `src/app/bars/[slug]/page.module.css`
  - `src/components/age-gate.js`
  - `src/components/age-gate.module.css`
  - `src/components/scroll-to-top.js`
  - `src/components/scroll-to-top.module.css`
  - `src/components/bar-hero-nav.module.css`
  - `src/components/hero-media.js`
  - `src/components/hero-media.module.css`
  - `src/components/site-footer.module.css`
  - `src/lib/age-gate.js`
  - `package-lock.json`
