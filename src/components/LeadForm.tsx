'use client'

import { useState, FormEvent } from 'react'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface Props {
  source?: string
  onSuccess?: () => void
  compact?: boolean
}

export function LeadForm({ source = 'site', onSuccess, compact }: Props) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!contact.trim()) {
      setError('Укажи телеграм, телефон или почту — куда тебе ответить')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message, source }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'failed')

      // Yandex.Metrika goal
      if (typeof window !== 'undefined' && 'ym' in window) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(window as any).ym(109188401, 'reachGoal', 'lead_submit', { source })
        } catch {}
      }

      setStatus('success')
      onSuccess?.()
    } catch (err) {
      console.error('[LeadForm]', err)
      setStatus('error')
      setError('Не удалось отправить. Напиши в Telegram — отвечу там.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <Check size={18} className="text-bg" strokeWidth={3} />
          </div>
          <span className="font-display text-xl text-light uppercase">
            Заявка принята
          </span>
        </div>
        <p className="font-body text-light/60 leading-relaxed">
          Свяжусь с тобой в течение часа в рабочее время.
          Если срочно — напиши прямо в Telegram.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-light/40 uppercase tracking-widest">
          Как обращаться
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
          autoComplete="name"
          maxLength={100}
          className="bg-bg border border-border text-light font-body px-4 py-3 focus:outline-none focus:border-accent transition-colors"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] text-light/40 uppercase tracking-widest">
          Контакт * — telegram, телефон или почта
        </span>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="@username, +7…, mail@…"
          required
          autoComplete="off"
          maxLength={200}
          className="bg-bg border border-border text-light font-body px-4 py-3 focus:outline-none focus:border-accent transition-colors"
        />
      </label>

      {!compact && (
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-light/40 uppercase tracking-widest">
            Задача — пара слов
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Сайт строительной компании, e-commerce, редизайн…"
            rows={3}
            maxLength={1000}
            className="bg-bg border border-border text-light font-body px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </label>
      )}

      {error && (
        <div className="flex items-start gap-2 font-mono text-xs text-accent">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-accent text-bg font-mono text-xs uppercase tracking-widest py-4 px-6 flex items-center justify-center gap-3 hover:bg-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait mt-2"
      >
        {status === 'submitting' ? 'Отправляю…' : 'Отправить заявку'}
        {status !== 'submitting' && <ArrowRight size={16} />}
      </button>

      <p className="font-mono text-[10px] text-light/30 leading-relaxed uppercase tracking-wider">
        Отвечу в течение часа в рабочее время. Никакого спама.
      </p>
    </form>
  )
}
