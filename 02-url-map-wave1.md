# URL-карта и первая волна запуска

## 1) Каноническая структура URL
- Главная: `/`
- Услуга: `/service/{serviceSlug}`
- Услуга + ниша: `/service/{serviceSlug}/{nicheSlug}`
- Услуга + ниша + город: `/service/{serviceSlug}/{nicheSlug}/{citySlug}`

## 2) Служебные URL
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## 3) Первая волна (обязательный запуск)
- Услуги: `odnostranichnyj-sajt`, `mnogostranichnyj-sajt`, `internet-magazin`
- Ниши: `stroitelstvo-domov`, `remont-kvartir-domov`, `psikhologi`
- Города: `moskva`, `spb`, `ekaterinburg`, `kazan`, `krasnodar`

## 4) Набор страниц волны 1
- Главная: `1` страница
- Страницы услуг: `3` страницы
- Услуга + ниша: `9` страниц
- Услуга + ниша + город: `45` страниц
- Итого целевых посадочных: `58` страниц

## 5) Примеры целевых URL
- `/service/odnostranichnyj-sajt`
- `/service/internet-magazin/stroitelstvo-domov`
- `/service/mnogostranichnyj-sajt/psikhologi/moskva`
- `/service/internet-magazin/remont-kvartir-domov/spb`

## 6) Правила внутренней перелинковки
- Главная ссылается на все страницы услуг (сквозные блоки).
- Страница услуги ссылается на все свои ниши.
- Страница услуга + ниша ссылается на города этой связки.
- Страница услуга + ниша + город ссылается:
  - на страницу услуги,
  - на страницу услуга + ниша,
  - на 3-5 соседних городов,
  - на 2-3 смежные услуги в той же нише.
