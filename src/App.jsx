import { useState, useRef, useEffect } from 'react'

// ─── Styles (CSS-in-JS object map) ───────────────────────────────────────────
const S = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    borderBottom: '1px solid var(--border)',
    padding: '0 2rem',
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    background: 'var(--nav-bg)',
    backdropFilter: 'blur(12px)',
    zIndex: 50,
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    width: 30,
    height: 30,
    background: 'var(--text-primary)',
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
  },
  badge: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    padding: '2px 8px',
    letterSpacing: '0.05em',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  themeBtn: {
    height: 30,
    padding: '0 10px',
    borderRadius: 999,
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    maxWidth: 860,
    margin: '0 auto',
    width: '100%',
    padding: '3rem 2rem 5rem',
  },
  hero: {
    marginBottom: '3rem',
  },
  heroEyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-muted)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: 'clamp(32px, 4.6vw, 50px)',
    fontWeight: 600,
    lineHeight: 1.08,
    letterSpacing: '-0.02em',
    color: 'var(--text-primary)',
    marginBottom: 14,
  },
  heroSub: {
    fontSize: 16,
    color: 'var(--text-secondary)',
    maxWidth: 480,
    lineHeight: 1.75,
  },
  inputCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.25rem 1.5rem',
    marginBottom: '1.5rem',
  },
  inputLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 10,
    display: 'block',
  },
  inputRow: {
    display: 'flex',
    gap: 10,
  },
  urlInput: {
    flex: 1,
    height: 46,
    padding: '0 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  runBtn: {
    height: 46,
    padding: '0 22px',
    fontFamily: 'var(--font-display)',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.04em',
    background: 'var(--text-primary)',
    color: 'var(--bg)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
    whiteSpace: 'nowrap',
  },
  loadingSection: {
    marginTop: 14,
  },
  loadingLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-secondary)',
    marginBottom: 8,
    letterSpacing: '0.03em',
  },
  barTrack: {
    height: 2,
    background: 'var(--border)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: 'var(--text-primary)',
    borderRadius: 2,
    transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
  },
  errorBox: {
    background: 'var(--red-dim)',
    border: '1px solid rgba(245,101,101,0.2)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.75rem 1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: 'var(--red)',
    marginBottom: '1.5rem',
  },
  reportHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.75rem',
    flexWrap: 'wrap',
  },
  reportDomain: {
    fontFamily: 'var(--font-display)',
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    color: 'var(--text-primary)',
    marginBottom: 4,
    wordBreak: 'break-all',
  },
  reportTimestamp: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text-muted)',
    letterSpacing: '0.04em',
  },
  overallScoreCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1rem 1.5rem',
    textAlign: 'center',
    minWidth: 120,
  },
  scoreNumber: {
    fontFamily: 'var(--font-display)',
    fontSize: 34,
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 4,
  },
  scoreCardLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.09em',
    color: 'var(--text-muted)',
  },
  summaryCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1rem 1.25rem',
    marginBottom: '1.5rem',
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.75,
    borderLeft: '3px solid var(--border-strong)',
  },
  catGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 14,
    marginBottom: '1.5rem',
  },
  catCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1rem 1.25rem',
    transition: 'border-color 0.15s',
  },
  catHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  catName: {
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
  },
  catScore: {
    fontFamily: 'var(--font-mono)',
    fontSize: 20,
    fontWeight: 500,
  },
  catBarTrack: {
    height: 2,
    background: 'var(--border)',
    borderRadius: 2,
    marginBottom: 14,
    overflow: 'hidden',
  },
  findings: {
    listStyle: 'none',
  },
  findingItem: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    padding: '6px 0',
    borderTop: '1px solid var(--border)',
    fontSize: 12.5,
    color: 'var(--text-secondary)',
    lineHeight: 1.55,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    marginTop: 5,
    flexShrink: 0,
  },
  winsCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.25rem 1.5rem',
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
    marginBottom: 14,
  },
  winItem: {
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
    padding: '10px 0',
    borderTop: '1px solid var(--border)',
  },
  winNum: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--text-muted)',
    paddingTop: 3,
    flexShrink: 0,
    minWidth: 20,
  },
  winText: {
    fontSize: 13,
    color: 'var(--text-primary)',
    lineHeight: 1.65,
  },
  poweredNote: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: 'var(--text-muted)',
    textAlign: 'center',
    letterSpacing: '0.06em',
    paddingBottom: '1rem',
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STAGES = [
  'Crawling site structure…',
  'Analyzing SEO signals…',
  'Evaluating performance indicators…',
  'Reviewing UX & conversion flow…',
  'Synthesizing recommendations…',
]

function scoreColor(n) {
  if (n >= 75) return 'var(--green)'
  if (n >= 48) return 'var(--amber)'
  return 'var(--red)'
}

function barColor(n) {
  if (n >= 75) return 'var(--green)'
  if (n >= 48) return 'var(--amber)'
  return 'var(--red)'
}

function dotColor(type) {
  if (type === 'issue') return 'var(--red)'
  if (type === 'warn') return 'var(--amber)'
  return 'var(--green)'
}

const AUDIT_PROMPT = (url) => `You are a senior web consultant doing a professional site assessment for: ${url}

Return ONLY a valid JSON object (no markdown, no backticks, no preamble) with this exact schema:
{
  "overall_score": <integer 0-100>,
  "summary": "<2-3 sentence executive summary of strengths and key issues>",
  "categories": [
    {
      "name": "<category>",
      "score": <integer 0-100>,
      "findings": [
        {"type": "<issue|warn|ok>", "text": "<specific, actionable finding in 1 sentence>"},
        {"type": "<issue|warn|ok>", "text": "<finding>"},
        {"type": "<issue|warn|ok>", "text": "<finding>"}
      ]
    }
  ],
  "quick_wins": [
    "<high-impact, low-effort action item>",
    "<action item>",
    "<action item>",
    "<action item>",
    "<action item>"
  ]
}

Use exactly these 5 category names in this order:
"SEO & Discoverability", "Page Speed & Performance", "UX & Design Quality", "Conversion Optimization", "Mobile Experience"

Guidelines:
- Scores must be realistic and differentiated (not all 70s)
- issue = broken/missing/harmful, warn = suboptimal/improvable, ok = working well
- Quick wins ordered by impact/effort ratio (best first)
- Base analysis on your knowledge of this domain and general web best practices`

// ─── Sub-components ───────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div style={S.logoMark}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="var(--bg)"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="var(--bg)" opacity="0.45"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="var(--bg)" opacity="0.45"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="var(--bg)"/>
      </svg>
    </div>
  )
}

function CategoryCard({ cat, visible }) {
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setBarWidth(cat.score), 120)
      return () => clearTimeout(t)
    }
  }, [visible, cat.score])

  return (
    <div style={S.catCard}>
      <div style={S.catHeader}>
        <span style={S.catName}>{cat.name}</span>
        <span style={{ ...S.catScore, color: scoreColor(cat.score) }}>{cat.score}</span>
      </div>
      <div style={S.catBarTrack}>
        <div style={{
          height: '100%',
          width: barWidth + '%',
          background: barColor(cat.score),
          borderRadius: 2,
          transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <ul style={S.findings}>
        {cat.findings.map((f, i) => (
          <li key={i} style={S.findingItem}>
            <span style={{ ...S.dot, background: dotColor(f.type) }} />
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [report, setReport] = useState(null)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState('dark')
  const stageTimerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved)
        return
      }

      const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches
      setTheme(prefersLight ? 'light' : 'dark')
    } catch {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }

  function startStages() {
    let idx = 0
    setStage(0)
    setProgress(5)
    stageTimerRef.current = setInterval(() => {
      idx = Math.min(idx + 1, STAGES.length - 1)
      setStage(idx)
      setProgress(10 + (idx / (STAGES.length - 1)) * 78)
    }, 2400)
  }

  function stopStages() {
    clearInterval(stageTimerRef.current)
    setProgress(100)
  }

  async function runAudit() {
    if (!url.trim()) { inputRef.current?.focus(); return }

    setError(null)
    setReport(null)
    setLoading(true)
    startStages()

    try {
      const res = await fetch('/api/groq/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.2,
          max_tokens: 1200,
          messages: [{ role: 'user', content: AUDIT_PROMPT(url.trim()) }],
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error?.message || `HTTP ${res.status}`)
      }

      const data = await res.json()
      const raw = data?.choices?.[0]?.message?.content || ''
      const clean = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)

      stopStages()
      setTimeout(() => {
        setLoading(false)
        setReport({ ...parsed, url: url.trim(), timestamp: new Date() })
      }, 350)

    } catch (e) {
      stopStages()
      setLoading(false)
      setError(e.message || 'Unexpected error. Check your API key and try again.')
    }
  }

  const domain = report?.url
    ? report.url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]
    : ''

  const ts = report?.timestamp
    ? report.timestamp.toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : ''

  return (
    <div style={S.page}>
      {/* Nav */}
      <nav style={S.nav}>
        <div style={S.navBrand}>
          <LogoMark />
          <span style={S.brandText}>SiteScope</span>
        </div>
        <div style={S.navRight}>
          <button
            type="button"
            onClick={toggleTheme}
            style={S.themeBtn}
            aria-label="Toggle light/dark theme"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <span style={S.badge}>AI AUDIT v0.1</span>
        </div>
      </nav>

      <main style={S.main}>
        {/* Hero */}
        <div style={S.hero}>
          <p style={S.heroEyebrow}>Levvate · Free Site Assessment Engine</p>
          <h1 style={S.heroTitle}>
            AI-powered<br />website audits.
          </h1>
          <p style={S.heroSub}>
            Enter any URL to generate a structured assessment across SEO,
            performance, UX, conversion, and mobile — instantly.
          </p>
        </div>

        {/* Input card */}
        <div style={S.inputCard}>
          <label style={S.inputLabel} htmlFor="urlInput">Target Website URL</label>
          <div style={S.inputRow}>
            <input
              id="urlInput"
              ref={inputRef}
              style={{
                ...S.urlInput,
                borderColor: url ? 'var(--border-md)' : 'var(--border)',
              }}
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !loading && runAudit()}
              onFocus={e => { e.target.style.borderColor = 'var(--border-strong)' }}
              onBlur={e => { e.target.style.borderColor = url ? 'var(--border-md)' : 'var(--border)' }}
              disabled={loading}
            />
            <button
              style={{
                ...S.runBtn,
                opacity: loading ? 0.45 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onClick={runAudit}
              disabled={loading}
            >
              {loading ? 'Analyzing…' : 'Run Audit →'}
            </button>
          </div>

          {loading && (
            <div style={S.loadingSection}>
              <div style={S.loadingLabel}>{STAGES[stage]}</div>
              <div style={S.barTrack}>
                <div style={{ ...S.barFill, width: progress + '%' }} />
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={S.errorBox}>
            Error: {error}
          </div>
        )}

        {/* Report */}
        {report && (
          <>
            {/* Report header */}
            <div style={S.reportHeader}>
              <div>
                <div style={S.reportDomain}>{domain}</div>
                <div style={S.reportTimestamp}>Assessed {ts}</div>
              </div>
              <div style={S.overallScoreCard}>
                <div style={{ ...S.scoreNumber, color: scoreColor(report.overall_score) }}>
                  {report.overall_score}
                  <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 400 }}>/100</span>
                </div>
                <div style={S.scoreCardLabel}>Overall Score</div>
              </div>
            </div>

            {/* Summary */}
            <div style={S.summaryCard}>{report.summary}</div>

            {/* Category grid */}
            <div style={S.catGrid}>
              {(report.categories || []).map((cat, i) => (
                <CategoryCard key={i} cat={cat} visible={true} />
              ))}
            </div>

            {/* Quick wins */}
            <div style={S.winsCard}>
              <div style={S.sectionTitle}>Priority Recommendations</div>
              {(report.quick_wins || []).map((w, i) => (
                <div key={i} style={S.winItem}>
                  <span style={S.winNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={S.winText}>{w}</span>
                </div>
              ))}
            </div>

            <div style={S.poweredNote}>
              Powered by Levvate · AI Website Audit Engine · {ts}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
