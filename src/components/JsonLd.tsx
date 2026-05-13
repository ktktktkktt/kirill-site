// Серверный компонент: вставляет JSON-LD блок в HTML.
// Использовать прямо в server components, без 'use client'.
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data)
  return (
    <script
      type="application/ld+json"
      // JSON безопасен внутри script, но экранируем закрывающий тег на всякий случай
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, '\\u003c') }}
    />
  )
}
