// 根级 404（静态导出会生成 404.html）
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: '#faf8f4',
            color: '#1c1917',
          }}
        >
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <p style={{ fontSize: 56, fontWeight: 700, margin: 0, color: '#3a7a8d' }}>404</p>
            <h1 style={{ fontSize: 22, margin: '8px 0 4px' }}>Page not found</h1>
            <p style={{ margin: '0 0 24px', color: '#78716c', fontSize: 15 }}>
              页面未找到 · Seite nicht gefunden
            </p>
            <a
              href="/zh"
              style={{
                display: 'inline-block',
                padding: '10px 22px',
                borderRadius: 8,
                background: '#3a7a8d',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              Bremen Market Square – Home
            </a>
            <p style={{ margin: '18px 0 0', fontSize: 13, color: '#a8a29e' }}>
              <a style={{ color: '#3a7a8d' }} href="/zh">中文</a>
              {' · '}
              <a style={{ color: '#3a7a8d' }} href="/en">English</a>
              {' · '}
              <a style={{ color: '#3a7a8d' }} href="/de">Deutsch</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
