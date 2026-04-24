# SiteScope — AI Site Audit Engine

AI-powered website assessment tool built with React + Vite + Groq API.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Groq API key
.env
# Edit .env and paste your key from console.groq.com

# 3. Start dev server
npm run dev
```

Open http://localhost:3000

## How it works

- Enter any website URL
- The Vite dev server proxies requests to Groq's API (keeps your key server-side)
- The model analyzes the domain and returns a structured JSON audit
- Results rendered across 5 categories: SEO, Performance, UX, Conversion, Mobile

## Screenshots

### Dark mode
![SiteScope - Dark mode](./screenshots/ss2.png)

### Light mode
![SiteScope - Light mode](./screenshots/ss1.png)

### Example report
![SiteScope - Report](./screenshots/ss3.png)