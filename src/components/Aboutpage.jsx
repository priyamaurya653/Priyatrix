import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Counter from './Counter'
import Magnetic from './Magnetic'
import { IconArrow, IconCall, IconClock, IconMail } from './Icons'
import { useGo } from '../utils/useGo'
import './AboutPage.css'

/* =========================================================
   Company info (change these to your real details)
   ========================================================= */
const COMPANY = {
  name: 'Orbitra',
  since: 2017,
  city: 'New Delhi, India',
  email: 'hello@orbitra.studio',
  phone: '+91 00000 00000',
  hours: 'Mon to Sat · 10 am to 7 pm',
}

const INTRO = 'We are a digital studio that designs, builds and grows websites, apps and brands for businesses that want to look world-class online.'

const STORY = 'It started with three people and one goal: give every business the same quality of work big brands get. Nine years later we are forty people, but every client still gets one small senior team from day one to launch.'

const NUMBERS = [
  { to: 350, s: '+', l: 'Projects' },
  { to: 40, s: '', l: 'People' },
  { to: 28, s: '', l: 'Countries' },
]

const DO = ['Websites', 'Mobile apps', 'Branding', 'UI/UX', 'SEO', 'Social media', 'Ads', 'Multilingual']

const BELIEFS = ['Honest prices', 'Senior people only', 'On-time delivery', 'You own everything']

/* =========================================================
   Page
   ========================================================= */
export default function AboutPage() {
  const go = useGo()
  useEffect(() => { document.title = `About us — ${COMPANY.name}` }, [])
  const years = new Date().getFullYear() - COMPANY.since

  return (
    <div className="ab2">
      {/* ---------- Hero ---------- */}
      <section className="ab2-hero container">
        <motion.span className="ab2-pill" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <i /> About {COMPANY.name}
        </motion.span>

        <h1 className="ab2-title" aria-label="About us">
          {['About', 'us'].map((w, i) => (
            <motion.span
              key={w}
              className={i ? 'solid' : 'outline'}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p className="ab2-intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9 }}>
          {INTRO}
        </motion.p>

        <div className="ab2-strip" aria-hidden="true">
          <div className="ab2-strip-track">
            {[0, 1].map((k) => (
              <div key={k} className="ab2-strip-group">
                {DO.map((d) => <span key={d}>{d}<b>✦</b></span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Bento ---------- */}
      <section className="ab2-bento container">
        <Reveal className="ab2-tile t-story glass gloss">
          <small>Our story</small>
          <p>{STORY}</p>
        </Reveal>

        <Reveal className="ab2-tile t-year" delay={0.05}>
          <small>Since</small>
          <strong><Counter to={COMPANY.since} duration={1.8} /></strong>
          <span>{years} years and counting</span>
        </Reveal>

        <Reveal className="ab2-tile t-nums glass gloss" delay={0.1}>
          {NUMBERS.map((n) => (
            <div key={n.l}>
              <strong><Counter to={n.to} suffix={n.s} /></strong>
              <small>{n.l}</small>
            </div>
          ))}
        </Reveal>

        <Reveal className="ab2-tile t-mission glass gloss" delay={0.05}>
          <small>Mission</small>
          <p>Help every business look world-class online, in every language its customers speak.</p>
        </Reveal>

        <Reveal className="ab2-tile t-believe glass gloss" delay={0.1}>
          <small>We believe in</small>
          <ul>{BELIEFS.map((b) => <li key={b}>{b}</li>)}</ul>
        </Reveal>

        <Reveal className="ab2-tile t-contact glass gloss" delay={0.15}>
          <small>Find us</small>
          <b>{COMPANY.city}</b>
          <a href={`mailto:${COMPANY.email}`}><IconMail />{COMPANY.email}</a>
          <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}><IconCall />{COMPANY.phone}</a>
          <span><IconClock />{COMPANY.hours}</span>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="ab2-cta container">
        <Reveal className="ab2-cta-box">
          <h2>Have a project in mind?</h2>
          <Magnetic>
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); go('contact') }}>
              Let’s talk <IconArrow />
            </a>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  )
}