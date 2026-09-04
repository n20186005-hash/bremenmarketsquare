import { getTranslations, getMessages } from 'next-intl/server';

const LATITUDE = 53.0757432;
const LONGITUDE = 8.8071942;
const TIMEZONE = 'Europe/Berlin';
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=${TIMEZONE}&forecast_days=7`;

type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
};

async function fetchWeather(): Promise<WeatherData | null> {
  try {
    const res = await fetch(API_URL, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const json = (await res.json()) as WeatherData;
    if (!json?.current || !json?.daily) return null;
    return json;
  } catch {
    return null;
  }
}

function iconForCode(code: number): string {
  if (code === 0 || code === 1) return 'sun';
  if (code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code >= 45 && code <= 48) return 'fog';
  if ((code >= 51 && code <= 57) || code === 66 || code === 67) return 'drizzle';
  if (code === 61 || code === 63 || code === 65) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code === 80 || code === 81 || code === 82) return 'rain';
  if (code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloud';
}

function WeatherGlyph({ kind, size = 22 }: { kind: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (kind) {
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          <path d="M17.5 19a4.5 4.5 0 1 0-.71-8.95A6 6 0 1 0 5.5 14" />
          <path d="M17.5 19H9a4 4 0 1 1 .5-7.97A4.5 4.5 0 0 1 17.5 19z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...common}>
          <path d="M17.5 19H6a3.5 3.5 0 0 1-.34-6.98 5 5 0 0 1 9.77-1.44A4.5 4.5 0 0 1 17.5 19z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...common}>
          <path d="M6 17h12M6 13h12M17.5 9.5A4 4 0 1 0 6.1 8.6A3 3 0 0 0 6 14" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...common}>
          <path d="M17.5 12.5H6.5a3.5 3.5 0 0 1-.3-7 5 5 0 0 1 9.8-1A4.3 4.3 0 0 1 17.5 12.5z" />
          <path d="M8.5 16.5v2M12 15.5v2.5M15.5 16.5v2" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...common}>
          <path d="M17.5 12.5H6.5a3.5 3.5 0 0 1-.3-7 5 5 0 0 1 9.8-1A4.3 4.3 0 0 1 17.5 12.5z" />
          <path d="M7.5 17v2.5M12 15.5v3M16.5 17v2" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path d="M17.5 12.5H6.5a3.5 3.5 0 0 1-.3-7 5 5 0 0 1 9.8-1A4.3 4.3 0 0 1 17.5 12.5z" />
          <path d="M12 16v2M8.5 17.5l1.5 1M15.5 17.5L14 18.5M9 19.5l.5-2M15 19.5l-.5-2" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...common}>
          <path d="M17.5 12.5H6.5a3.5 3.5 0 0 1-.3-7 5 5 0 0 1 9.8-1A4.3 4.3 0 0 1 17.5 12.5z" />
          <path d="M12.5 14L9.5 18.5h3l-1.5 3.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M17.5 19H6a3.5 3.5 0 0 1-.34-6.98 5 5 0 0 1 9.77-1.44A4.5 4.5 0 0 1 17.5 19z" />
        </svg>
      );
  }
}

function formatDayLabel(locale: string, iso: string, index: number, today: string, tomorrow: string) {
  if (index === 0) return today;
  if (index === 1) return tomorrow;
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
}

// current.time is already returned in the Europe/Berlin timezone, so we only
// reformat it for display and never re-interpret it as UTC.
function formatUpdatedAt(locale: string, isoTime: string) {
  const [datePart, timePart] = isoTime.split('T');
  const date = new Date(`${datePart}T00:00:00Z`);
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
  return `${formattedDate}, ${timePart.slice(0, 5)}`;
}

export default async function WeatherPanel({ locale }: { locale: 'zh' | 'en' | 'de' }) {
  const t = await getTranslations({ locale, namespace: 'weather' });
  const messages = (await getMessages({ locale })) as any;
  const codes = (messages?.weather?.codes || {}) as Record<string, string>;
  const data = await fetchWeather();

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

        {!data ? (
          <div
            className="rounded-xl p-6"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>{t('unavailable')}</p>
          </div>
        ) : (
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            {/* Current conditions */}
            <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
              <div className="flex items-start gap-4">
                <span style={{ color: 'var(--accent)' }}>
                  <WeatherGlyph kind={iconForCode(data.current.weather_code)} size={58} />
                </span>
                <div>
                  <p className="text-5xl font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(data.current.temperature_2m)}°C
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                    {codes[String(data.current.weather_code)] || ''}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4">
                <Stat label={t('feelsLike')} value={`${Math.round(data.current.apparent_temperature)}°C`} />
                <Stat label={t('wind')} value={`${Math.round(data.current.wind_speed_10m)} km/h`} />
                <Stat label={t('humidity')} value={`${Math.round(data.current.relative_humidity_2m)}%`} />
                <Stat label={t('precipitation')} value={`${data.current.precipitation.toFixed(1)} mm`} />
              </div>
            </div>

            {/* 7-day outlook */}
            <div
              className="mt-8 pt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3"
              style={{ borderTop: '1px solid var(--border-color)' }}
            >
              {data.daily.time.map((day, i) => {
                const code = data.daily.weather_code[i];
                const max = data.daily.temperature_2m_max[i];
                const min = data.daily.temperature_2m_min[i];
                const prob = data.daily.precipitation_probability_max[i];
                return (
                  <div
                    key={day}
                    title={day}
                    className="rounded-xl px-2 py-3 text-center"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <p className="text-xs font-medium mb-2 truncate" style={{ color: 'var(--text-secondary)' }}>
                      {formatDayLabel(locale, day, i, t('today'), t('tomorrow'))}
                    </p>
                    <div className="flex justify-center mb-2" style={{ color: 'var(--accent)' }}>
                      <WeatherGlyph kind={iconForCode(code)} />
                    </div>
                    <p className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(max)}° / {Math.round(min)}°
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {t('precipChance')} {typeof prob === 'number' ? `${Math.round(prob)}%` : '–'}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              {t('updated')} {formatUpdatedAt(locale, data.current.time)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="font-medium whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>{value}</p>
    </div>
  );
}
