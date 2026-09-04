import { useTranslations, useMessages } from 'next-intl';

export default function Highlights() {
  const t = useTranslations('highlights');
  const messages = useMessages() as any;
  const items = (messages?.highlights?.items || []) as Array<{ title: string; content: string }>;

  return (
    <section id="highlights" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('lead')}
        </p>

        <div className="space-y-6">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-xl p-6 sm:p-8"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
