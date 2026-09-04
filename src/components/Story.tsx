import { useTranslations, useMessages } from 'next-intl';

export default function Story() {
  const t = useTranslations('story');
  const messages = useMessages() as any;
  const items = (messages?.story?.items || []) as Array<{ title: string; content: string }>;

  return (
    <section id="story" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('lead')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-xl p-6 sm:p-8"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderLeft: '3px solid var(--accent)',
              }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-sm font-display font-semibold flex-shrink-0"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--accent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="font-display text-xl font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p
          className="mt-8 flex items-start gap-2 text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
              <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
            </svg>
          </span>
          <span>{t('verify')}</span>
        </p>
      </div>
    </section>
  );
}
