import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Counter from './Counter'
import { IconChart, IconGlobe, IconLayers, IconPen, IconSearch, IconShare } from './Icons'
import './SEO.css'

const RESULTS = {
  you: { site: 'brewhaus.co', title: 'Brewhaus: Fresh Coffee Delivered Daily | Order Online', d: 'Single-origin beans roasted this week, delivered by 8 am. Free delivery on your first order.' },
  a: { site: 'beanbox.in', title: 'Coffee Subscription Plans | BeanBox', d: 'Monthly coffee boxes from Indian estates, shipped to your door.' },
  b: { site: 'reviewhub.com', title: '10 Best Coffee Delivery Services in 2026', d: 'We tested the top coffee delivery apps so you do not have to.' },
  c: { site: 'martmart.in', title: 'Buy Coffee Online at Best Prices', d: 'Shop instant and filter coffee from top brands.' },
  d: { site: 'roastery.co', title: 'Wholesale Coffee Beans | Roastery Co', d: 'Bulk beans for cafés and offices.' },
}
const BEFORE = ['a', 'b', 'c', 'you', 'd']
const AFTER = ['you', 'a', 'b', 'c', 'd']

const KEYWORDS = [
  { k: 'coffee delivery', from: 18, to: 1 },
  { k: 'fresh coffee beans online', from: 34, to: 3 },
  { k: 'कॉफ़ी डिलीवरी', from: '–', to: 2 },
  { k: 'café a domicilio', from: '–', to: 4 },
]

const SERVICES = [
  { icon: IconLayers, t: 'Technical SEO', d: 'Site speed, Core Web Vitals, crawl errors, schema and sitemaps fixed.' },
  { icon: IconSearch, t: 'On-page SEO', d: 'Titles, headings and content matched to what people actually search.' },
  { icon: IconChart, t: 'Local SEO', d: 'Google Business Profile, reviews and city pages that win map results.' },
  { icon: IconPen, t: 'Content strategy', d: 'Blogs and guides planned around keywords with real buying intent.' },
  { icon: IconShare, t: 'Link building', d: 'Links from real, relevant sites. No spam networks, ever.' },
  { icon: IconGlobe, t: 'Multilingual SEO', d: 'hreflang, local keywords and translated metadata for every market.' },
]

export default function SEO() {
  const serpRef = useRef(null)
  const inView = useInView(serpRef, { once: true, margin: '-150px' })
  const [order, setOrder] = useState(BEFORE)

  // Our result climbs to #1 shortly after the SERP scrolls into view
  useEffect(() => {
    if (!inView) return
    const id = setTimeout(() => setOrder(AFTER), 1300)
    return () => clearTimeout(id)
  }, [inView])

  const climbed = order === AFTER
  const G = 157 // half-circle length for r=50

  return (
    <section className="section seo" id="seo">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Search engine optimisation</span></Reveal>
          <SplitText as="h2" className="h2" text="Be the first result your customer clicks." inView />
          <Reveal delay={0.1}>
            <p className="lead">Technical fixes, content and local SEO that move you up Google in every language you sell in, reported every month in plain words.</p>
          </Reveal>
        </div>

        <div className="seo-grid">
          <Reveal className="serp glass gloss" y={60}>
            <div className="serp-search" ref={serpRef}>
              <IconSearch />
              <span>coffee delivery near me</span>
              <em className={climbed ? 'up' : ''}>{climbed ? 'Position 1' : 'Position 4'}</em>
            </div>
            <ol className="serp-list">
              {order.map((k, i) => {
                const r = RESULTS[k]
                return (
                  <motion.li key={k} layout transition={{ type: 'spring', stiffness: 160, damping: 22 }} className={k === 'you' ? 'is-you' : ''}>
                    <span className="serp-pos">{i + 1}</span>
                    <div>
                      <small>{r.site}</small>
                      <strong>{r.title}</strong>
                      <p>{r.d}</p>
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </Reveal>

          <div className="seo-side">
            <Reveal className="gauge glass gloss" delay={0.1}>
              <svg viewBox="0 0 120 70" aria-hidden="true">
                <defs>
                  <linearGradient id="gaugeGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#7B5CFF" />
                    <stop offset="100%" stopColor="#C8F542" />
                  </linearGradient>
                </defs>
                <path d="M10 62 A50 50 0 0 1 110 62" className="g-bg" />
                <motion.path
                  d="M10 62 A50 50 0 0 1 110 62" className="g-fg"
                  strokeDasharray={G}
                  initial={{ strokeDashoffset: G }}
                  whileInView={{ strokeDashoffset: G * (1 - 0.96) }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <strong><Counter to={96} /></strong>
              <span>Site health score after our audit, up from 42</span>
            </Reveal>

            <Reveal className="kw glass gloss" delay={0.2}>
              <div className="kw-head"><span>Keyword</span><span>Before</span><span>After</span></div>
              {KEYWORDS.map((row, i) => (
                <motion.div
                  className="kw-row" key={row.k}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span>{row.k}</span>
                  <span className="kw-from">{row.from === '–' ? '–' : `#${row.from}`}</span>
                  <span className="kw-to">#{row.to}</span>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="seo-services">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.t} delay={(i % 3) * 0.08} className="seo-card glass gloss">
                <span className="seo-icon"><Icon /></span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}