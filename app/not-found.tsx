export default function NotFound() {
  return (
    <html>
      <head>
        <title>Redirecting… — Cuneiform Chat Docs</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var p = window.location.pathname;
  if (!/^\\/(en|bn|es|hi|pt|th)(\\/|$)/.test(p)) {
    window.location.replace('/en' + p + window.location.search + window.location.hash);
  }
})();`,
          }}
        />
      </head>
      <body>
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            padding: '100px 20px',
          }}
        >
          <h1 style={{ fontSize: '48px', fontWeight: 700, margin: 0 }}>404</h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '12px' }}>
            This page could not be found.
          </p>
          <a
            href="/en"
            style={{
              display: 'inline-block',
              marginTop: '24px',
              padding: '10px 24px',
              background: '#10b981',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Go to Documentation
          </a>
        </div>
      </body>
    </html>
  )
}
