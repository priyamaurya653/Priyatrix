import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import TiltCard from './TiltCard'
import Counter from './Counter'
import Magnetic from './Magnetic'
import { IconArrow, IconCheck } from './Icons'
import { useGo } from '../utils/useGo'
import '../styles/service-page.css'

/* Shared building blocks for the service pages (Website, Apps, Graphics) */

export function PageHero({ crumb, lines, lead, visual, stats, primary = 'Get a free quote', secondary = 'See pricing', secondaryTarget = 'pricing' }) {
  const go = useGo()
  return (
    <section className="wp-hero" id="top">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container wp-hero-grid">
        <div className="wp-hero-copy">
          <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <a href="/" onClick={(e) => { e.preventDefault(); go('/') }}>Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{crumb}</span>
          </motion.nav>

          <h1 className="wp-title">
            {lines.map((line, i) => (
              <SplitText key={line} className={`line ${i === lines.length - 1 ? 'grad-line' : ''}`} text={line} delay={0.15 + i * 0.15} />
            ))}
          </h1>

          <motion.p className="wp-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}>
            {lead}
          </motion.p>

          <motion.div className="wp-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 1 }}>
            <Magnetic>
              <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); go('contact') }}>{primary} <IconArrow /></a>
            </Magnetic>
            <Magnetic>
              <a href={`#${secondaryTarget}`} className="btn btn-ghost" onClick={(e) => { e.preventDefault(); go(secondaryTarget) }}>{secondary}</a>
            </Magnetic>
          </motion.div>
        </div>

        {visual}
      </div>

      {stats && (
        <div className="container">
          <div className="wp-stats glass gloss">
            {stats.map((s) => (
              <div key={s.label}>
                <strong><Counter to={s.to} decimals={s.decimals || 0} prefix={s.prefix || ''} suffix={s.suffix || ''} /></strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export function TypeGrid({ kicker, title, items }) {
  return (
    <section className="section" id="types">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="kicker">{kicker}</span></Reveal>
          <SplitText as="h2" className="h2" text={title} inView />
        </div>
        <div className="wp-types">
          {items.map((t, i) => {
            const Icon = t.icon
            return (
              <Reveal key={t.t} delay={(i % 3) * 0.08}>
                <TiltCard className="wp-type glass" intensity={7} data-cursor>
                  <span className="wp-type-icon"><Icon /></span>
                  <h3>{t.t}</h3>
                  <p>{t.d}</p>
                  <div className="wp-type-tags">{t.tags.map((g) => <span className="chip" key={g}>{g}</span>)}</div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Included({ kicker = 'Included as standard', title, lead, items }) {
  return (
    <section className="section" id="included">
      <div className="container wp-included">
        <div>
          <Reveal><span className="kicker">{kicker}</span></Reveal>
          <SplitText as="h2" className="h2" text={title} inView />
          {lead && <Reveal delay={0.1}><p className="lead">{lead}</p></Reveal>}
        </div>
        <ul className="wp-feats">
          {items.map((f, i) => (
            <Reveal as="li" key={f} delay={(i % 4) * 0.05} className="glass gloss">
              <span><IconCheck /></span>{f}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function StackGrid({ kicker = 'Technology', title, groups }) {
  return (
    <section className="section" id="stack">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">{kicker}</span></Reveal>
          <SplitText as="h2" className="h2" text={title} inView />
        </div>
        <div className="wp-stack">
          {groups.map((g, i) => (
            <Reveal key={g.g} delay={i * 0.08} className="wp-stack-col glass gloss">
              <h3>{g.g}</h3>
              <div>{g.items.map((it) => <span key={it}>{it}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Steps({ kicker = 'How it works', title, steps }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scale = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })
  return (
    <section className="section" id="page-process">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="kicker">{kicker}</span></Reveal>
          <SplitText as="h2" className="h2" text={title} inView />
        </div>
        <div className="wp-steps" ref={ref}>
          <div className="wp-steps-line" aria-hidden="true"><motion.span style={{ scaleX: scale }} /></div>
          <ol>
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.07}>
                <span className="wp-step-n">{i + 1}</span>
                <small>{s.w}</small>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Pricing({ kicker = 'Pricing', title, lead, plans }) {
  const go = useGo()
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">{kicker}</span></Reveal>
          <SplitText as="h2" className="h2" text={title} inView />
          {lead && <Reveal delay={0.1}><p className="lead">{lead}</p></Reveal>}
        </div>
        <div className="wp-plans">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className={`wp-plan glass gloss ${p.popular ? 'is-popular' : ''}`}>
              {p.popular && <span className="plan-badge">Most popular</span>}
              <h3>{p.name}</h3>
              <p className="plan-for">{p.for}</p>
              <div className="plan-price"><strong>{p.price}</strong><span>{p.note}</span></div>
              <ul>{p.feats.map((f) => <li key={f}><IconCheck />{f}</li>)}</ul>
              <a href="#contact" className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'}`} onClick={(e) => { e.preventDefault(); go('contact') }}>
                Get a quote <IconArrow />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ item, open, onToggle, id }) {
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`}>
      <button className="faq-q" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span>{item.q}</span>
        <i className="faq-icon" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id} className="faq-a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq({ kicker = 'Questions', title = 'Answers before you ask.', lead, items }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="container wp-faq">
        <div>
          <Reveal><span className="kicker">{kicker}</span></Reveal>
          <SplitText as="h2" className="h2" text={title} inView />
          <Reveal delay={0.1}>
            <p className="lead">{lead || 'Still unsure? Send us your question in the form below and we reply within one working day.'}</p>
          </Reveal>
        </div>
        <Reveal className="faq-list glass" delay={0.1}>
          {items.map((item, i) => (
            <FaqItem key={item.q} id={`faq-${i}`} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}