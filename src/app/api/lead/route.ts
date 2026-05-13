import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface LeadPayload {
  name?: string
  contact?: string
  message?: string
  source?: string
}

function sanitize(s: unknown, max = 500): string {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max)
}

async function forwardToTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return false

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    )
    return res.ok
  } catch (e) {
    console.error('[lead] telegram error:', e)
    return false
  }
}

export async function POST(req: Request) {
  let payload: LeadPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }

  const name = sanitize(payload.name, 100)
  const contact = sanitize(payload.contact, 200)
  const message = sanitize(payload.message, 1000)
  const source = sanitize(payload.source, 100) || 'site'

  if (!contact) {
    return NextResponse.json(
      { ok: false, error: 'contact_required' },
      { status: 400 },
    )
  }

  const at = new Date().toISOString()
  const text =
    `<b>🟢 Новая заявка с сайта</b>\n` +
    `<b>Имя:</b> ${name || '—'}\n` +
    `<b>Контакт:</b> ${contact}\n` +
    `<b>Задача:</b> ${message || '—'}\n` +
    `<b>Источник:</b> ${source}\n` +
    `<b>Время:</b> ${at}`

  // Always log so user sees заявка в pm2 logs даже без Telegram-бота
  console.log('[lead]', JSON.stringify({ name, contact, message, source, at }))

  await forwardToTelegram(text)

  return NextResponse.json({ ok: true })
}
