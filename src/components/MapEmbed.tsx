import { useTranslations } from 'next-intl';
import type { CSSProperties, ReactNode } from 'react';

const GMAPS_LINK = 'https://maps.app.goo.gl/MNMKZRjaTAC3cVVp9';
const TEL_LINK = 'tel:+49421321676';
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.2711187718587!2d8.807194200000001!3d53.0757432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b12810a1af1175%3A0x4843d63c54b934e0!2sBremen%20Market%20Square!5e1!3m2!1sen!2s!4v1788533932867!5m2!1sen!2s';

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const tBI = useTranslations('basicInfo');

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* NAP: contact & location info */}
        <h3
          className="font-display text-xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('visitTitle')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <NapCard
            label={tBI('address')}
            value={tBI('addressValue')}
            href={GMAPS_LINK}
            external
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />
          <NapCard
            label={tBI('plusCode')}
            value={tBI('plusCodeValue')}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
            }
          />
          <NapCard
            label={tBI('phone')}
            value={tBI('phoneValue')}
            href={TEL_LINK}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
          />
        </div>

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          <iframe
            src={MAP_EMBED_SRC}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps - Bremen Market Square (Bremer Marktplatz)"
          />
        </div>

        {/* Open in Google Maps */}
        <div className="mt-6 flex justify-center">
          <a
            href={GMAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function NapCard({
  label,
  value,
  href,
  external = false,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: ReactNode;
}) {
  const className =
    'rounded-xl p-5 flex items-start gap-4 transition-colors hover:border-[var(--accent)]';
  const style: CSSProperties = {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
  };
  const iconWrapStyle: CSSProperties = { color: 'var(--accent)' };

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={className}
        style={style}
      >
        <span className="flex-shrink-0 mt-0.5" style={iconWrapStyle}>{icon}</span>
        <span>
          <span className="block text-sm mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</span>
          <span className="block text-sm font-semibold" style={{ color: 'var(--accent)' }}>{value}</span>
        </span>
      </a>
    );
  }

  return (
    <div className={className} style={style}>
      <span className="flex-shrink-0 mt-0.5" style={iconWrapStyle}>{icon}</span>
      <span>
        <span className="block text-sm mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</span>
      </span>
    </div>
  );
}
