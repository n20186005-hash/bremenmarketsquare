import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

const ICONS: Record<string, ReactNode> = {
  toilets: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M7 11h10M8.5 11l-.6 9h2.1l.4-6h3.2l.4 6h2.1l-.6-9" />
    </>
  ),
  parking: (
    <>
      <circle cx="5.5" cy="17.5" r="1.5" />
      <circle cx="18.5" cy="17.5" r="1.5" />
      <path d="M3 17H2v-3l2-5h7v5h4M14 9h-1a2 2 0 0 0-2 2v2" />
    </>
  ),
  dining: (
    <>
      <path d="M5 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
      <path d="M7 3v18M14 3c-1.5 1-2 3-2 5s.7 4 2 4v9" />
    </>
  ),
  accommodation: (
    <>
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18h18M6 14h.01M9 14h.01M12 14h.01M15 14h.01M18 14h.01" />
      <path d="M21 21H3M12 10V8" />
    </>
  ),
  shopping: (
    <>
      <path d="M6 7h12l1 13H5L6 7z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </>
  ),
  fuel: (
    <>
      <path d="M4 21V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15" />
      <path d="M4 21h11M2 21h15" />
      <path d="M15 12h2a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 0 3 0v-6l-2-3" />
      <path d="M7 6h5" />
    </>
  ),
};

export default function Facilities() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    id: string;
    title: string;
    content: string;
  }>;

  return (
    <section id="facilities" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('lead')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <article
              key={item.id}
              className="rounded-xl p-6 flex flex-col"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ background: 'var(--bg-secondary)', color: 'var(--accent)' }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[item.id] || ICONS.shopping}
                </svg>
              </div>
              <h3
                className="font-display text-lg font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {item.content}
              </p>
            </article>
          ))}
        </div>

        <div
          className="mt-8 flex items-start gap-3 rounded-xl p-5 text-sm leading-relaxed"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px dashed var(--border-color)',
            color: 'var(--text-secondary)',
          }}
        >
          <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8h.01M12 11v5" />
            </svg>
          </span>
          <span>{t('note')}</span>
        </div>
      </div>
    </section>
  );
}
