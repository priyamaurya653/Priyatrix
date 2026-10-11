import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Counter from './Counter'
import { IconCheck } from './Icons'
import './WebDev.css'

const TYPES = [
  { k: 'business', label: 'Business websites', d: 'Company sites that explain what you do in five seconds and turn visitors into enquiries.', inc: ['Pages you can edit yourself', 'Lead forms to email, CRM or WhatsApp', 'Blog and case studies', 'Analytics and conversion tracking'] },
  { k: 'ecom', label: 'E-commerce stores', d: 'Fast stores with clean product pages, a smooth checkout and payments in every currency you sell in.', inc: ['Product filters and search', 'UPI, cards and cash on delivery', 'Order and inventory dashboard', 'Abandoned-cart emails'] },
  { k: 'landing', label: 'Landing pages', d: 'Single pages built for one campaign, then tested and tuned until they convert.', inc: ['Live in 5 to 7 days', 'Ready for A/B testing', 'Ad pixels and event tracking', 'Loads in under one second'] },
  { k: 'webapp', label: 'Web apps and portals', d: 'Dashboards, booking systems and customer portals with secure logins and admin panels.', inc: ['Role-based logins', 'Admin panel and reports', 'APIs for your mobile app', 'Managed hosting and backups'] },
]

// Each line is a list of [tokenType, text]
const CODE = [
  [['kw', 'export default function '], ['fn', 'Home'], ['p', '() {']],
  [['p', '  '], ['kw', 'return'], ['p', ' (']],
  [['p', '    <'], ['tag', 'Hero'], ['at', ' title'], ['p', '='], ['str', '"Grow everywhere"'], ['p', ' />']],
  [['p', '    <'], ['tag', 'Products'], ['at', ' lang'], ['p', '={'], ['fn', 'locale'], ['p', '} />']],
  [['p', '    <'], ['tag', 'Checkout'], ['at', ' currency'], ['p', '='], ['str', '"INR"'], ['p', ' />']],
  [['p', '  )']],
  [['p', '}']],
]
const SCORES = [
  { l: 'Performance', v: 98 },
  { l: 'Accessibility', v: 96 },
  { l: 'Best practices', v: 100 },
  { l: 'SEO', v: 100 },
]
const STACK = ['React', 'Next.js', 'Laravel', 'WordPress', 'Shopify', 'Node.js', 'Tailwind']

function Ring({ label, value, delay }) {
  const C = 2 * Math.PI * 26
  return (
    <div className="ring-score">
      <div className="rs-dial">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="26" className="rs-bg" />
          <motion.circle
            cx="32" cy="32" r="26" className="rs-fg"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C * (1 - value / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <strong><Counter to={value} /></strong>
      </div>
      <span>{label}</span>
    </div>
  )
}

export default function WebDev() {
  const [tab, setTab] = useState(TYPES[0].k)
  const active = TYPES.find((t) => t.k === tab)

  // Code "types itself" once the editor scrolls into view
  const editorRef = useRef(null)
  const inView = useInView(editorRef, { once: true, margin: '-120px' })
  const [lines, setLines] = useState(0)
  useEffect(() => {
    if (!inView) return
    let n = 0
    const id = setInterval(() => {
      n += 1
      setLines(n)
      if (n >= CODE.length) clearInterval(id)
    }, 380)
    return () => clearInterval(id)
  }, [inView])

  return (
    <section className="section webdev" id="website">
      <div className="container web-grid">
        <div className="web-copy">
          <Reveal><span className="kicker">Website development</span></Reveal>
          <SplitText as="h2" className="h2" text="Websites that load fast and sell harder." inView />
          <Reveal delay={0.1}>
            <p className="lead">Hand-coded, mobile-first websites with clean code, top speed scores and an admin panel your team can actually use.</p>
          </Reveal>

          <Reveal delay={0.15} className="web-tabs" role="tablist" aria-label="Website types">
            {TYPES.map((t) => (
              <button key={t.k} role="tab" aria-selected={tab === t.k} className={tab === t.k ? 'is-active' : ''} onClick={() => setTab(t.k)}>
                {tab === t.k && <motion.span layoutId="web-pill" className="web-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span>{t.label}</span>
              </button>
            ))}
          </Reveal>

          <div className="web-panel glass gloss">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>{active.d}</p>
                <ul>
                  {active.inc.map((i) => <li key={i}><IconCheck />{i}</li>)}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal delay={0.2} className="web-stack">
            {STACK.map((s) => <span className="chip" key={s}>{s}</span>)}
          </Reveal>
        </div>

        <div className="web-visual">
          <Reveal className="editor glass" y={60}>
            <div className="editor-bar">
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="editor-file">Home.jsx</span>
              <span className="editor-live"><i />Live preview</span>
            </div>
            <div className="editor-body" ref={editorRef}>
              <pre className="code" aria-label="Example React code">
                {CODE.map((line, i) => (
                  <motion.div key={i} className="code-line" initial={{ opacity: 0, x: -8 }} animate={i < lines ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3 }}>
                    <span className="ln">{i + 1}</span>
                    {line.map(([type, text], j) => <span key={j} className={`t-${type}`}>{text}</span>)}
                    {i === lines - 1 && lines < CODE.length && <span className="caret" />}
                  </motion.div>
                ))}
              </pre>
              <div className="preview" aria-hidden="true">
                <motion.div className="pv-hero" initial={{ opacity: 0, scale: 0.9 }} animate={lines >= 3 ? { opacity: 1, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
                  <b /><b /><span />
                </motion.div>
                <motion.div className="pv-products" initial={{ opacity: 0, y: 14 }} animate={lines >= 4 ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
                  <i /><i /><i />
                </motion.div>
                <motion.div className="pv-checkout" initial={{ opacity: 0, y: 14 }} animate={lines >= 5 ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
                  <span>₹1,299</span><em>Pay now</em>
                </motion.div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="scores glass gloss">
            {SCORES.map((s, i) => <Ring key={s.l} label={s.l} value={s.v} delay={0.2 + i * 0.12} />)}
          </Reveal>
        </div>
      </div>
    </section>
  )
}