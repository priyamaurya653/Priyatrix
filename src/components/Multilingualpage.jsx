import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Globe from './Globe'
import Multilingual from './Multilingual'
import Magnetic from './Magnetic'
import { Faq, PageHero, Pricing, Steps } from './PageBlocks'
import { IconArrow, IconCheck, IconChart, IconGlobe, IconLayers, IconPen, IconSearch, IconShield, IconTag, IconUsers, IconZap } from './Icons'
import './Contact.css'
import './MultilingualPage.css'

/* =========================================================
   Content
   ========================================================= */
const STATS = [
  { to: 45, suffix: '+', label: 'languages supported' },
  { to: 28, label: 'countries served' },
  { to: 3.1, decimals: 1, suffix: 'x', label: 'average lift in non-English traffic' },
  { to: 100, suffix: '%', label: 'human-reviewed translations' },
]

// Every language we build websites in. rtl = right-to-left layout
const LANGUAGES = [
  // India
  { n: 'Hindi', nat: 'हिन्दी', r: 'India', hi: 'नमस्ते' },
  { n: 'Bengali', nat: 'বাংলা', r: 'India', hi: 'নমস্কার' },
  { n: 'Marathi', nat: 'मराठी', r: 'India', hi: 'नमस्कार' },
  { n: 'Tamil', nat: 'தமிழ்', r: 'India', hi: 'வணக்கம்' },
  { n: 'Telugu', nat: 'తెలుగు', r: 'India', hi: 'నమస్కారం' },
  { n: 'Gujarati', nat: 'ગુજરાતી', r: 'India', hi: 'નમસ્તે' },
  { n: 'Kannada', nat: 'ಕನ್ನಡ', r: 'India', hi: 'ನಮಸ್ಕಾರ' },
  { n: 'Malayalam', nat: 'മലയാളം', r: 'India', hi: 'നമസ്കാരം' },
  { n: 'Punjabi', nat: 'ਪੰਜਾਬੀ', r: 'India', hi: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' },
  { n: 'Odia', nat: 'ଓଡ଼ିଆ', r: 'India', hi: 'ନମସ୍କାର' },
  { n: 'Urdu', nat: 'اردو', r: 'India', hi: 'آداب', rtl: true },
  // Europe
  { n: 'English', nat: 'English', r: 'Europe', hi: 'Hello' },
  { n: 'French', nat: 'Français', r: 'Europe', hi: 'Bonjour' },
  { n: 'German', nat: 'Deutsch', r: 'Europe', hi: 'Hallo' },
  { n: 'Spanish', nat: 'Español', r: 'Europe', hi: 'Hola' },
  { n: 'Italian', nat: 'Italiano', r: 'Europe', hi: 'Ciao' },
  { n: 'Portuguese', nat: 'Português', r: 'Europe', hi: 'Olá' },
  { n: 'Dutch', nat: 'Nederlands', r: 'Europe', hi: 'Hallo' },
  { n: 'Polish', nat: 'Polski', r: 'Europe', hi: 'Cześć' },
  { n: 'Russian', nat: 'Русский', r: 'Europe', hi: 'Привет' },
  { n: 'Ukrainian', nat: 'Українська', r: 'Europe', hi: 'Привіт' },
  { n: 'Greek', nat: 'Ελληνικά', r: 'Europe', hi: 'Γειά σου' },
  { n: 'Swedish', nat: 'Svenska', r: 'Europe', hi: 'Hej' },
  { n: 'Turkish', nat: 'Türkçe', r: 'Europe', hi: 'Merhaba' },
  // Middle East & Africa
  { n: 'Arabic', nat: 'العربية', r: 'Middle East & Africa', hi: 'مرحبا', rtl: true },
  { n: 'Persian', nat: 'فارسی', r: 'Middle East & Africa', hi: 'سلام', rtl: true },
  { n: 'Hebrew', nat: 'עברית', r: 'Middle East & Africa', hi: 'שלום', rtl: true },
  { n: 'Swahili', nat: 'Kiswahili', r: 'Middle East & Africa', hi: 'Jambo' },
  { n: 'Amharic', nat: 'አማርኛ', r: 'Middle East & Africa', hi: 'ሰላም' },
  { n: 'Afrikaans', nat: 'Afrikaans', r: 'Middle East & Africa', hi: 'Hallo' },
  // Asia Pacific
  { n: 'Chinese (Simplified)', nat: '简体中文', r: 'Asia Pacific', hi: '你好' },
  { n: 'Chinese (Traditional)', nat: '繁體中文', r: 'Asia Pacific', hi: '你好' },
  { n: 'Japanese', nat: '日本語', r: 'Asia Pacific', hi: 'こんにちは' },
  { n: 'Korean', nat: '한국어', r: 'Asia Pacific', hi: '안녕하세요' },
  { n: 'Thai', nat: 'ไทย', r: 'Asia Pacific', hi: 'สวัสดี' },
  { n: 'Vietnamese', nat: 'Tiếng Việt', r: 'Asia Pacific', hi: 'Xin chào' },
  { n: 'Indonesian', nat: 'Bahasa Indonesia', r: 'Asia Pacific', hi: 'Halo' },
  { n: 'Malay', nat: 'Bahasa Melayu', r: 'Asia Pacific', hi: 'Helo' },
  { n: 'Filipino', nat: 'Filipino', r: 'Asia Pacific', hi: 'Kumusta' },
  { n: 'Nepali', nat: 'नेपाली', r: 'Asia Pacific', hi: 'नमस्ते' },
  { n: 'Sinhala', nat: 'සිංහල', r: 'Asia Pacific', hi: 'ආයුබෝවන්' },
  // Americas
  { n: 'Spanish (Latin America)', nat: 'Español (LatAm)', r: 'Americas', hi: '¡Hola!' },
  { n: 'Portuguese (Brazil)', nat: 'Português (BR)', r: 'Americas', hi: 'Oi' },
  { n: 'French (Canada)', nat: 'Français (CA)', r: 'Americas', hi: 'Bonjour' },
  { n: 'English (US)', nat: 'English (US)', r: 'Americas', hi: 'Hi' },
]
const REGIONS = ['All', 'India', 'Europe', 'Middle East & Africa', 'Asia Pacific', 'Americas']

// Every feature, with a short line and a longer explanation
const FEATURES = [
  {
    icon: IconUsers, t: 'Native-speaker translation',
    s: 'Real people, not machine output.',
    d: 'Every page is translated by a professional who speaks the language natively, then checked by a second reviewer. Product names, slogans and legal text are adapted for the local market instead of translated word for word, so the site reads as if it was written there.',
    pts: ['Translator + reviewer for each language', 'Glossary of your brand terms', 'Tone matched to the local audience'],
  },
  {
    icon: IconLayers, t: 'Right-to-left (RTL) layouts',
    s: 'Arabic, Urdu, Persian and Hebrew done properly.',
    d: 'For right-to-left languages the whole layout flips: menus, icons, sliders, forms and arrows all mirror correctly. We load fonts made for each script so the text is sharp and easy to read, not a fallback system font.',
    pts: ['Mirrored layout and icons', 'Script-specific web fonts', 'Mixed LTR/RTL text handled'],
  },
  {
    icon: IconGlobe, t: 'Language switcher',
    s: 'One click to change language, anywhere.',
    d: 'A clear switcher in the header shows each language in its own script (हिन्दी, العربية, 日本語). When a visitor switches, they stay on the same page in the new language instead of being sent back to the homepage.',
    pts: ['Stays on the same page', 'Languages shown in native script', 'Works on desktop and mobile'],
  },
  {
    icon: IconZap, t: 'Auto language detection',
    s: 'Visitors see their language first.',
    d: 'The site reads the visitor’s browser language and location and suggests the right version on the first visit. Their choice is remembered, and we never force a redirect, so search engines can still crawl every version.',
    pts: ['Browser and location based', 'Choice remembered', 'No forced redirects'],
  },
  {
    icon: IconSearch, t: 'Multilingual SEO',
    s: 'Rank on Google in every market.',
    d: 'Each language gets its own URL (like /hi/ or /ar/), hreflang tags, translated titles and meta descriptions, and keyword research done in that language. People search differently in every country, so we target the words they actually type.',
    pts: ['hreflang and separate URLs', 'Local keyword research', 'Translated meta tags and sitemap'],
  },
  {
    icon: IconTag, t: 'Local currency and pricing',
    s: '₹, $, €, ﷼ and more.',
    d: 'Prices show in the visitor’s currency with the correct symbol and format (₹1,299 or 12,99 €). You can set different prices per country, and taxes like GST or VAT are calculated for each region.',
    pts: ['Auto currency by country', 'Per-country prices', 'GST / VAT support'],
  },
  {
    icon: IconChart, t: 'Dates, numbers and addresses',
    s: 'Formats people recognise.',
    d: 'Dates, times, phone numbers, units and address forms follow each country’s format. An Indian visitor sees 06/10/2026 and a +91 phone field; an American sees 10/06/2026 and a ZIP code field.',
    pts: ['Local date and time formats', 'Phone and address fields per country', 'Metric or imperial units'],
  },
  {
    icon: IconPen, t: 'Easy multilingual CMS',
    s: 'Edit every language yourself.',
    d: 'Your admin panel shows all languages side by side. Add a new page once and fill in each translation, and the panel flags any page that is missing a language so nothing goes live half-translated.',
    pts: ['Side-by-side editing', 'Missing-translation alerts', 'Add new languages any time'],
  },
  {
    icon: IconShield, t: 'Local payments and compliance',
    s: 'Checkout that works in every country.',
    d: 'We connect the payment methods people use locally, such as UPI in India, iDEAL in the Netherlands or Mada in Saudi Arabia, and add cookie banners and privacy pages that meet local rules like GDPR.',
    pts: ['UPI, cards, wallets, local methods', 'GDPR cookie consent', 'Translated legal pages'],
  },
]

const STEPS = [
  { t: 'Market research', w: 'Week 1', d: 'Which countries, which languages and what people search for in each.' },
  { t: 'Structure and URLs', w: 'Week 1', d: 'Language URLs, switcher and SEO plan agreed before design.' },
  { t: 'Design for every script', w: 'Week 2', d: 'Layouts checked in LTR and RTL, with the right fonts for each script.' },
  { t: 'Build and translate', w: 'Weeks 3 to 5', d: 'Development and translation run side by side, page by page.' },
  { t: 'Native review', w: 'Week 6', d: 'A native speaker checks every page live on the site, not in a spreadsheet.' },
  { t: 'Launch and index', w: 'Week 6', d: 'Go live and submit every language version to Google.' },
]

const PLANS = [
  { name: 'Add languages', price: '₹9,999', note: 'per language', for: 'You already have a website and want more languages.', feats: ['Up to 10 pages per language', 'Native translation and review', 'Language switcher', 'hreflang SEO setup', 'Ready in 1 to 2 weeks'] },
  { name: 'Multilingual website', price: '₹79,999', note: 'includes 3 languages', popular: true, for: 'A new website built for several markets from day one.', feats: ['Up to 15 pages', '3 languages included', 'RTL support if needed', 'Local currency and formats', 'Multilingual CMS', 'Live in 5 to 6 weeks'] },
  { name: 'Global store', price: 'From ₹1.8L', note: 'quoted per project', for: 'Online stores selling in many countries.', feats: ['Unlimited products', '5+ languages', 'Per-country prices and taxes', 'Local payment methods', 'Ongoing translation support'] },
]

const FAQ = [
  { q: 'How many languages can my website have?', a: 'As many as you need. Most clients start with 2 to 5 languages and add more later. Adding a language does not require rebuilding the site.' },
  { q: 'Do you use Google Translate?', a: 'No. Every page is translated by a native-speaking professional and checked by a reviewer. Machine translation is only used, if you ask, for large product catalogues, and even then a person reviews it.' },
  { q: 'Can you add languages to my existing website?', a: 'Yes. We can add languages to WordPress, Shopify, Laravel, React and most custom sites. We review your site first and give you a fixed quote per language.' },
  { q: 'Will each language show up on Google?', a: 'Yes. Each language gets its own URL, hreflang tags and translated meta data, and we submit them to Google Search Console so every version can rank in its own country.' },
  { q: 'How do Arabic and Urdu pages work?', a: 'Those pages switch to a right-to-left layout automatically. Menus, icons and forms mirror, and we use fonts designed for the script so it looks native.' },
  { q: 'Who updates the translations later?', a: 'You can edit them yourself in the admin panel, or pick our monthly plan where we translate new pages and blog posts for you.' },
]

/* =========================================================
   Hero visual: globe + greeting ticker
   ========================================================= */
const GREETINGS = ['Hello', 'नमस्ते', 'مرحبا', 'Bonjour', 'こんにちは', 'Hola', 'வணக்கம்', '你好', 'Olá', '안녕하세요']

function HeroVisual() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % GREETINGS.length), 1800)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="wp-visual ml-visual">
      <Globe />
      <div className="ml-greet glass" aria-live="polite">
        <span>Your visitors see</span>
        <AnimatePresence mode="wait">
          <motion.strong
            key={i}
            initial={{ y: 18, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -18, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.4 }}
          >
            {GREETINGS[i]}
          </motion.strong>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* =========================================================
   All languages: search + region filter
   ========================================================= */
function LanguageGrid() {
  const [region, setRegion] = useState('All')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return LANGUAGES.filter((l) =>
      (region === 'All' || l.r === region) &&
      (!term || l.n.toLowerCase().includes(term) || l.nat.toLowerCase().includes(term))
    )
  }, [region, q])

  return (
    <section className="section" id="languages">
      <div className="container">
        <div className="section-head ml-lang-head">
          <div>
            <Reveal><span className="kicker">Every language</span></Reveal>
            <SplitText as="h2" className="h2" text="45+ languages, one website." inView />
          </div>
          <Reveal delay={0.1}>
            <p className="lead">Indian languages, European, Asian, Middle Eastern and African. Search or filter by region. Languages marked RTL get a right-to-left layout.</p>
          </Reveal>
        </div>

        <Reveal className="ml-filter glass">
          <label className="ml-search">
            <IconSearch />
            <span className="sr-only">Search languages</span>
            <input type="search" placeholder="Search a language, e.g. Tamil or العربية" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="ml-regions" role="tablist" aria-label="Regions">
            {REGIONS.map((r) => (
              <button key={r} role="tab" aria-selected={region === r} className={region === r ? 'on' : ''} onClick={() => setRegion(r)}>
                {region === r && <motion.span layoutId="ml-region-pill" className="ml-region-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span>{r}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="ml-langs">
          <AnimatePresence mode="popLayout">
            {list.map((l) => (
              <motion.div
                layout
                key={l.n}
                className="ml-lang gloss"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <span className="ml-native" dir={l.rtl ? 'rtl' : 'ltr'}>{l.nat}</span>
                <span className="ml-name">{l.n}</span>
                <span className="ml-hi" dir={l.rtl ? 'rtl' : 'ltr'}>{l.hi}</span>
                {l.rtl && <em className="ml-rtl">RTL</em>}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <p className="ml-empty">We did not find that one, but we probably still support it. Ask us in the form below.</p>
        )}
      </div>
    </section>
  )
}

/* =========================================================
   Features explained: list on the left, details on the right
   ========================================================= */
function FeatureExplainer() {
  const [i, setI] = useState(0)
  const f = FEATURES[i]
  const Icon = f.icon
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Features explained</span></Reveal>
          <SplitText as="h2" className="h2" text="Everything a multilingual website needs." inView />
          <Reveal delay={0.1}><p className="lead">Pick a feature to see what it does and why it matters for your visitors.</p></Reveal>
        </div>

        <div className="ml-explain">
          <Reveal className="ml-feat-list" role="tablist" aria-label="Features">
            {FEATURES.map((x, k) => {
              const I = x.icon
              return (
                <button key={x.t} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
                  {k === i && <motion.span layoutId="ml-feat-pill" className="ml-feat-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="ml-feat-ic"><I /></span>
                  <span className="ml-feat-txt"><b>{x.t}</b><small>{x.s}</small></span>
                </button>
              )
            })}
          </Reveal>

          <Reveal className="ml-feat-detail glass gloss" delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="ml-detail-ic"><Icon /></span>
                <small className="ml-detail-n">Feature {i + 1} of {FEATURES.length}</small>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
                <ul>{f.pts.map((p) => <li key={p}><IconCheck />{p}</li>)}</ul>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* Same features as cards, for quick scanning */}
        <div className="ml-feat-cards">
          {FEATURES.map((x, k) => {
            const I = x.icon
            return (
              <Reveal key={x.t} delay={(k % 3) * 0.06} className="ml-feat-card glass gloss">
                <span className="ml-feat-ic"><I /></span>
                <h3>{x.t}</h3>
                <p>{x.s}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Enquiry form
   ========================================================= */
const POPULAR = ['Hindi', 'English', 'Arabic', 'Spanish', 'French', 'German', 'Tamil', 'Bengali', 'Marathi', 'Urdu', 'Chinese (Simplified)', 'Japanese']
const PROJECT_TYPES = ['New multilingual website', 'Add languages to my website', 'Multilingual online store', 'Not sure yet']
const PAGES = ['1 to 5', '6 to 15', '16 to 40', '40+']
const empty = { name: '', email: '', phone: '', company: '', site: '', message: '' }

function EnquiryForm() {
  const [form, setForm] = useState(empty)
  const [type, setType] = useState(PROJECT_TYPES[0])
  const [langs, setLangs] = useState(['Hindi', 'English'])
  const [pages, setPages] = useState('')
  const [rtl, setRtl] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggle = (l) => setLangs((list) => (list.includes(l) ? list.filter((x) => x !== l) : [...list, l]))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter an email like name@company.com'
    if (form.phone && !/^[+\d\s-]{7,16}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (langs.length === 0) e.langs = 'Pick at least one language'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    const payload = { ...form, projectType: type, languages: langs, pages, rtl }
    // TODO: send to your backend, e.g.
    // await fetch('/api/multilingual-enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    console.log('Multilingual enquiry', payload)
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('sent')
  }

  const reset = () => { setForm(empty); setLangs(['Hindi', 'English']); setPages(''); setRtl(false); setType(PROJECT_TYPES[0]); setStatus('idle') }

  return (
    <section className="section contact" id="contact">
      <div className="container ml-form-grid">
        <div>
          <Reveal><span className="kicker">Get a quote</span></Reveal>
          <SplitText as="h2" className="h2" text="Tell us where you want to sell." inView />
          <Reveal delay={0.1}>
            <p className="lead">Pick your languages and we send a fixed quote, a timeline and a free check of your current site within one working day.</p>
          </Reveal>
          <Reveal delay={0.2} className="ml-form-perks">
            {['Free multilingual SEO check', 'Fixed price per language', 'Reply within 24 hours'].map((p) => (
              <span key={p}><IconCheck />{p}</span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="contact-card glass">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="done" className="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <motion.span className="sent-icon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
                  <IconCheck />
                </motion.span>
                <h3>Request received</h3>
                <p>Thanks, {form.name.split(' ')[0]}. We will send a quote for {langs.length} {langs.length === 1 ? 'language' : 'languages'} to {form.email} within one working day.</p>
                <button className="btn btn-ghost" onClick={reset}>Send another request</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                <fieldset className="field-group">
                  <legend>What do you need?</legend>
                  <div className="chips">
                    {PROJECT_TYPES.map((t) => (
                      <button type="button" key={t} className={`pick ${type === t ? 'on' : ''}`} aria-pressed={type === t} onClick={() => setType(t)}>{t}</button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field-group">
                  <legend>Which languages? <span className="ml-count">{langs.length} selected</span></legend>
                  <div className="chips">
                    {POPULAR.map((l) => (
                      <button type="button" key={l} className={`pick ${langs.includes(l) ? 'on' : ''}`} aria-pressed={langs.includes(l)} onClick={() => toggle(l)}>
                        {langs.includes(l) && <IconCheck />}{l}
                      </button>
                    ))}
                  </div>
                  <select
                    className="ml-select"
                    value=""
                    onChange={(e) => { if (e.target.value && !langs.includes(e.target.value)) setLangs([...langs, e.target.value]) }}
                    aria-label="Add another language"
                  >
                    <option value="">+ Add another language</option>
                    {LANGUAGES.filter((l) => !POPULAR.includes(l.n) && !langs.includes(l.n)).map((l) => (
                      <option key={l.n} value={l.n}>{l.n} ({l.nat})</option>
                    ))}
                  </select>
                  {langs.filter((l) => !POPULAR.includes(l)).length > 0 && (
                    <div className="chips ml-extra">
                      {langs.filter((l) => !POPULAR.includes(l)).map((l) => (
                        <button type="button" key={l} className="pick on" onClick={() => toggle(l)} aria-label={`Remove ${l}`}>{l} ×</button>
                      ))}
                    </div>
                  )}
                  {errors.langs && <span className="field-err">{errors.langs}</span>}
                </fieldset>

                <div className="field-row">
                  <Field id="ml-name" label="Your name" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                  <Field id="ml-email" label="Work email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                </div>
                <div className="field-row">
                  <Field id="ml-phone" label="Phone / WhatsApp (optional)" type="tel" value={form.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
                  <Field id="ml-company" label="Company (optional)" value={form.company} onChange={set('company')} autoComplete="organization" />
                </div>
                <Field id="ml-site" label="Current website URL (optional)" type="url" value={form.site} onChange={set('site')} autoComplete="url" />

                <fieldset className="field-group">
                  <legend>How many pages?</legend>
                  <div className="chips">
                    {PAGES.map((p) => (
                      <button type="button" key={p} className={`pick ${pages === p ? 'on' : ''}`} aria-pressed={pages === p} onClick={() => setPages(p)}>{p}</button>
                    ))}
                  </div>
                </fieldset>

                <label className="ml-toggle">
                  <input type="checkbox" checked={rtl} onChange={(e) => setRtl(e.target.checked)} />
                  <span className="ml-switch" aria-hidden="true"><i /></span>
                  I need a right-to-left language (Arabic, Urdu, Persian or Hebrew)
                </label>

                <Field id="ml-message" label="Anything else we should know?" textarea value={form.message} onChange={set('message')} />

                <Magnetic strength={0.15}>
                  <button type="submit" className="btn btn-primary submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (<><span className="spinner" aria-hidden="true" />Sending</>) : (<>Get my quote <IconArrow /></>)}
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, textarea, error, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <Tag id={id} name={id} placeholder=" " rows={textarea ? 4 : undefined} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      <label htmlFor={id}>{label}</label>
      {error && <span className="field-err" id={`${id}-err`}>{error}</span>}
    </div>
  )
}

/* =========================================================
   Page
   ========================================================= */
export default function MultilingualPage() {
  useEffect(() => { document.title = 'Multilingual website development — Orbitra' }, [])

  return (
    <div className="service-page">
      <PageHero
        crumb="Multilingual websites"
        lines={['One website.', 'Every language', 'your customers speak.']}
        lead="Websites in Hindi, English, Arabic and 45+ other languages, translated by native speakers, with right-to-left layouts, local currencies and SEO for every market."
        visual={<HeroVisual />}
        stats={STATS}
      />
      <LanguageGrid />
      <FeatureExplainer />
      <Multilingual />
      <Steps title="From one language to many in about six weeks." steps={STEPS} />
      <Pricing title="Pay per language, or for the whole site." lead="Fixed prices agreed before we start. Example prices, final quote depends on pages and languages." plans={PLANS} />
      <Faq items={FAQ} />
      <EnquiryForm />
    </div>
  )
}