import type { FAQ } from '@/lib/content/faqs'

interface FAQProps {
  items: FAQ[]
  title?: string
}

export function FAQ({ items, title = 'Частые вопросы' }: FAQProps) {
  return (
    <section className="py-24 px-6 lg:px-12 border-t border-border">
      <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
        [ FAQ ]
      </div>
      <h2 className="font-display text-3xl text-light uppercase mb-12">{title}</h2>
      <div className="flex flex-col border-t border-border">
        {items.map((item, i) => (
          <details
            key={i}
            className="group py-8 border-b border-border cursor-pointer"
          >
            <summary className="flex items-start justify-between gap-6 list-none">
              <h3 className="font-display text-xl text-light uppercase group-open:text-accent transition-colors duration-300">
                {item.question}
              </h3>
              <span className="font-mono text-accent shrink-0 mt-1 transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="font-body text-light/50 max-w-3xl leading-relaxed mt-6">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
