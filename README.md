# Kirill Site — Next.js

Портфолио + лендинг веб‑разработчика на Next.js 15 + Tailwind + GSAP.
**SEO‑матрица:** 1 главная + 10 нишевых + 200 ниша × город = 211 SEO‑страниц.

## Стек
- **Next.js 15** App Router + SSG
- **TypeScript** (strict)
- **Tailwind CSS v3** с кастомными токенами
- **GSAP 3** (динамический импорт, только на клиенте)
- **Lucide React** для иконок

## Быстрый старт

```bash
npm install
npm run dev
# → http://localhost:3000
```

Production-сборка:
```bash
npm run build      # Сгенерирует все 216 HTML-страниц
npm run start      # Запустит production-сервер
```

## Структура страниц

```
/                          — Главная
/niche/[slug]              — 10 нишевых страниц (SSG)
/niche/[slug]/[city]       — 200 страниц ниша × город (SSG)
/sitemap.xml               — Автогенерация
/robots.txt                — Автогенерация
```

## Что было исправлено в этой версии

Если апгрейдитесь со старой версии — вот изменения:

1. **Удалён мусор** — пустая директория `{src/app,src/components,...}`,
   возникшая из-за неудачного brace-expansion при упаковке.
2. **Next.js 15 async params** — в `app/niche/[slug]/page.tsx` и
   `app/niche/[slug]/[city]/page.tsx` параметры теперь корректно
   `await params`, как требует Next 15. Без этого фикса проект не собирался.
3. **FooterCTA.tsx** — переменная `interval` вынесена во внешний scope
   useEffect; добавлен флаг `cancelled` для защиты от race condition при
   быстром размонтировании компонента во время async-импорта GSAP.
4. **.eslintrc.json** — добавлен явный конфиг с `next/core-web-vitals`.
5. **.gitignore** — добавлен (его не было в исходной версии).

## Что нужно заменить (TODO)

Поиск по `TODO:` найдёт все места:

| Файл | Что менять |
|------|-----------|
| `Hero.tsx` | Скриншоты проектов, имя, дата доступности |
| `Cases.tsx` | Реальные кейсы и скриншоты |
| `AITemplates.tsx` | Скриншоты ИИ-шаблонов под ниши |
| `FooterCTA.tsx` | Telegram, WhatsApp, email |
| `sitemap.ts` | Свой домен |
| `robots.ts` | Свой домен |
| `Nav.tsx` | Якоря в шапке: на нишевых страницах ведут в никуда — нужно либо переделать на `/#услуги`, либо убрать «Обо мне» (этого блока нет) |

## Акцентный цвет

Везде используется `text-accent`, `bg-accent`, `border-accent`.
Цвет задан в `tailwind.config.js`:
```js
accent: '#C8F135'
```
Меняешь только здесь — везде на сайте подхватится.

## Деплой на Vercel

```bash
git init && git add . && git commit -m "init"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Затем: vercel.com → New Project → Import из GitHub
# Framework: Next.js (автоопределится) → Deploy
```

## Расширение под услуги

Планируется добавить матрицу услуга × ниша (× город). Структура:

```
src/
├── app/
│   └── services/
│       ├── page.tsx                              ← список услуг
│       └── [service]/
│           ├── page.tsx                          ← общая страница услуги
│           └── [niche]/
│               ├── page.tsx                      ← услуга × ниша
│               └── [city]/page.tsx               ← услуга × ниша × город
└── lib/
    ├── niches.ts                                 ← есть
    └── services.ts                               ← новый: 6 услуг из Services.tsx
```

При 6 услугах × 10 ниш × 20 городов это даёт ещё ~1266 SEO-страниц.
**Важно:** для каждой комбинации нужен уникальный текст (pain, кейсы, FAQ),
иначе Яндекс пометит как «доры» и пессимизирует.

## SEO

При `npm run build` генерируется:
- 1 главная страница
- 10 нишевых страниц
- 200 страниц ниша × город
- sitemap.xml со всеми URL

**Итого: 211 статических HTML-страниц** — Яндекс индексирует как обычный сайт.
