'use client'

import { useEffect, useState, useCallback } from 'react'
import { X } from 'lucide-react'
import { LeadForm } from './LeadForm'

// Глобальный триггер: любой клик по a[href="#contact"] или [data-lead-open]
// открывает модалку. Если в data-lead-source задано значение — оно идёт в API.
export function ContactModal() {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('site')

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const trigger = target.closest<HTMLElement>(
        'a[href="#contact"], [data-lead-open]',
      )
      if (!trigger) return
      e.preventDefault()
      setSource(trigger.dataset.leadSource || 'site')
      setOpen(true)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Форма заявки"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Закрыть"
        onClick={close}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-bg border border-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-6 pt-6 pb-2 border-b border-border">
          <div>
            <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2">
              [ Заявка ]
            </div>
            <h2 className="font-display text-2xl text-light uppercase leading-tight mb-4">
              Обсудим
              <br />
              проект
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            className="w-10 h-10 flex items-center justify-center text-light/60 hover:text-accent transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <LeadForm source={source} />
        </div>
      </div>
    </div>
  )
}
