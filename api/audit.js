export const config = {
  runtime: 'nodejs18.x',
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string' && req.body.length) {
    try { return JSON.parse(req.body) } catch { return null }
  }

  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GROQ_API_KEY on server' })
  }

  try {
    const body = await readJsonBody(req)
    if (!body) {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      let payload = { error: text || `Upstream error (HTTP ${response.status})` }
      try {
        payload = text ? JSON.parse(text) : payload
      } catch {
        // leave payload as-is
      }

      return res.status(response.status).json(payload)
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error?.message || String(error),
    })
  }
}
