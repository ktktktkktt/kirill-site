import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности и обработки персональных данных сайта кт-дизайн.рф',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  const siteUrl = SITE_URL
  const date = '13 мая 2026 г.'

  return (
    <main className="bg-bg text-light min-h-screen overflow-x-hidden">
      <Nav />

      <article className="max-w-3xl mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ Правовые документы ]
        </div>
        <h1 className="font-display text-4xl lg:text-5xl text-light uppercase leading-tight mb-12">
          Политика конфиденциальности
        </h1>

        <div className="font-body text-light/70 leading-relaxed space-y-8">
          <p className="text-sm text-light/40 font-mono">Дата публикации: {date}</p>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок
              обработки и защиты персональных данных пользователей сайта{' '}
              <a href={siteUrl} className="text-accent hover:underline">{siteUrl}</a>{' '}
              (далее — «Сайт»).
            </p>
            <p className="mt-4">
              Оператором персональных данных является Ткаченко Кирилл Александрович
              (самозанятый, далее — «Оператор»). Обработка персональных данных
              осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
              «О персональных данных».
            </p>
            <p className="mt-4">
              Используя Сайт и отправляя любую форму обратной связи, вы подтверждаете,
              что ознакомились с настоящей Политикой и даёте согласие на обработку
              ваших персональных данных на изложенных условиях.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">2. Какие данные собираются</h2>
            <p>Оператор собирает следующие персональные данные, которые пользователь
              предоставляет самостоятельно через формы Сайта:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-light/60">
              <li>Имя (если указано)</li>
              <li>Контактные данные: номер телефона, адрес электронной почты, Telegram-username</li>
              <li>Описание задачи или проекта (если указано)</li>
            </ul>
            <p className="mt-4">
              Также Сайт может автоматически собирать технические данные: IP-адрес,
              тип браузера и устройства, страницы посещений, время визита — в рамках
              работы сервиса Яндекс.Метрика (оператор: ООО «Яндекс», Россия).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">3. Цели обработки данных</h2>
            <p>Персональные данные обрабатываются исключительно в следующих целях:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-light/60">
              <li>Связь с пользователем для ответа на оставленную заявку</li>
              <li>Расчёт стоимости и сроков по запрошенным услугам</li>
              <li>Заключение и исполнение договора на оказание услуг</li>
              <li>Анализ посещаемости и улучшение работы Сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">4. Правовые основания обработки</h2>
            <p>Обработка персональных данных осуществляется на основании:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-light/60">
              <li>Согласия субъекта персональных данных (ст. 9 152-ФЗ) — при заполнении форм Сайта</li>
              <li>Исполнения договора, стороной которого является субъект данных (п. 5 ч. 1 ст. 6 152-ФЗ)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">5. Хранение и защита данных</h2>
            <p>
              Оператор принимает организационные и технические меры для защиты персональных
              данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
            <p className="mt-4">
              Персональные данные хранятся не дольше, чем этого требуют цели их обработки.
              Данные, полученные через формы Сайта, хранятся в защищённых системах
              переписки (Telegram) и удаляются по завершении взаимодействия с пользователем,
              если иное не предусмотрено законодательством или договором.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">6. Передача данных третьим лицам</h2>
            <p>
              Оператор не продаёт и не передаёт персональные данные пользователей третьим
              лицам, за исключением:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-light/60">
              <li>
                Яндекс.Метрика — для аналитики посещаемости (данные обрабатываются
                ООО «Яндекс» согласно их политике конфиденциальности)
              </li>
              <li>Случаев, предусмотренных действующим законодательством РФ</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">7. Права субъекта данных</h2>
            <p>В соответствии с 152-ФЗ вы вправе:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-light/60">
              <li>Получить информацию об обрабатываемых персональных данных</li>
              <li>Требовать уточнения, блокировки или уничтожения неверных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия Оператора в Роскомнадзоре</li>
            </ul>
            <p className="mt-4">
              Для реализации своих прав обратитесь к Оператору: Telegram{' '}
              <a href="https://t.me/design_kto" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">@design_kto</a>{' '}
              или по телефону <a href="tel:+79860010665" className="text-accent hover:underline">+7 986 001 06 65</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">8. Файлы cookie</h2>
            <p>
              Сайт использует cookies — небольшие файлы, сохраняемые браузером. Cookies
              применяются для обеспечения работы Яндекс.Метрики и улучшения пользовательского
              опыта. Вы можете отключить cookies в настройках браузера, однако это может
              повлиять на работу некоторых функций Сайта.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">9. Изменения политики</h2>
            <p>
              Оператор вправе вносить изменения в настоящую Политику. Актуальная версия
              всегда доступна на этой странице. Продолжение использования Сайта после
              публикации изменений означает согласие с обновлённой Политикой.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-light uppercase mb-4">10. Контакты оператора</h2>
            <div className="space-y-2 text-light/60">
              <p>Ткаченко Кирилл Александрович</p>
              <p>Самозанятый (НПД)</p>
              <p>
                Telegram:{' '}
                <a href="https://t.me/design_kto" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">@design_kto</a>
              </p>
              <p>
                Телефон:{' '}
                <a href="tel:+79860010665" className="text-accent hover:underline">+7 986 001 06 65</a>
              </p>
            </div>
          </section>
        </div>
      </article>

      <footer className="border-t border-border px-6 lg:px-12 py-8">
        <div className="font-mono text-xs text-light/30 text-center">
          <a href="/" className="hover:text-accent transition-colors">← На главную</a>
        </div>
      </footer>
    </main>
  )
}
