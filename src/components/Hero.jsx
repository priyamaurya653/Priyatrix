import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Globe from './Globe'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import { IconArrow, IconChart, IconGlobe, IconPen, IconPhone } from './Icons'
import { scrollToId } from '../utils/scrollTo'
import { useGo } from '../utils/useGo'
import './Hero.css'

const cards = [
  { cls: 'fc-1', icon: IconGlobe, title: 'Multilingual web', sub: '32 languages live', depth: 40, float: 6 },
  { cls: 'fc-2', icon: IconPhone, title: 'iOS + Android', sub: 'One codebase, native feel', depth: -30, float: 7.5 },
  { cls: 'fc-3', icon: IconPen, title: 'UI/UX systems', sub: 'Figma to production', depth: 26, float: 8.2 },
  { cls: 'fc-4', icon: IconChart, title: 'Organic traffic', sub: '+214% in 6 months', depth: -46, float: 6.8, spark: true },
]

const marqueeWords = ['Website development', 'Multilingual websites', 'Mobile apps', 'Graphic design', 'UI/UX design', 'SEO', 'SMO', 'E-commerce']

function FloatCard({ c, mx, my, i }) {
  const x = useTransform(mx, (v) => v * c.depth)
  const y = useTransform(my, (v) => v * c.depth)
  const Icon = c.icon
  return (
    <motion.div
      className={`float-card ${c.cls}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="float-inner glass"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: c.float, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="fc-icon"><Icon /></span>
        <div className="fc-text">
          <strong>{c.title}</strong>
          <small>{c.sub}</small>
        </div>
        {c.spark && (
          <svg className="fc-spark" viewBox="0 0 120 30" aria-hidden="true">
            <motion.path
              d="M2 26 L18 22 L32 24 L50 15 L66 17 L84 9 L100 10 L118 3"
              fill="none" stroke="#C8F542" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 2, duration: 1.8, ease: 'easeInOut' }}
            />
          </svg>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const mx = useSpring(0, { stiffness: 50, damping: 18 })
  const my = useSpring(0, { stiffness: 50, damping: 18 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const goTo = useGo()
  const go = (id) => (e) => { e.preventDefault(); scrollToId(id) }

  return (
    <section className="hero" id="top" ref={ref} onMouseMove={onMove}>
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="container hero-inner">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
          <motion.span
            className="kicker"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Digital studio for brands going global
          </motion.span>

          <h1 className="hero-title">
            <SplitText className="line" text="We build brands" delay={0.2} />
            <SplitText className="line" text="that speak" delay={0.38} />
            <SplitText className="line grad-line" text="every language." delay={0.52} />
          </h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Multilingual websites, mobile apps, design and growth marketing. One studio takes you from
            first sketch to launch in every market you sell to.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <a href="/contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); goTo('/contact') }}>Start a project <IconArrow /></a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="btn btn-ghost" onClick={go('work')}>See our work</a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-proof"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <div className="avatars" aria-hidden="true">
              {['AK', 'RM', 'SL', 'JD'].map((a, i) => <span key={a} style={{ '--i': i }}>{a}</span>)}
            </div>
            <p><strong>120+ launches</strong> for teams in 28 countries</p>
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: visualY, scale: visualScale }}>
          <motion.div
            className="globe-stage"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <Globe />
          </motion.div>
          {cards.map((c, i) => <FloatCard key={c.cls} c={c} mx={mx} my={my} i={i} />)}
          <motion.span className="globe-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
            Drag to spin the globe
          </motion.span>
        </motion.div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div className="marquee-group" key={k}>
              {marqueeWords.map((w) => <span key={w}>{w}<i /></span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}