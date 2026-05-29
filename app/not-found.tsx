export default function NotFound() {
  return (
    <html>
      <head>
        <title>Redirecting… — Cuneiform Chat Docs</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var p = window.location.pathname;
  var s = window.location.search + window.location.hash;
  // Disabled locales: strip the prefix so /th/agents -> /en/agents.
  var disabled = p.match(/^\\/(th|ar)(\\/.*)?$/);
  if (disabled) {
    window.location.replace('/en' + (disabled[2] || '') + s);
    return;
  }
  // Non-locale paths: prepend /en so /agents -> /en/agents.
  if (!/^\\/(en|es|pt|fr|ru|bn|hi)(\\/|$)/.test(p)) {
    window.location.replace('/en' + p + s);
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
