import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import './Design.css'

const steps = [
  { t: 'Research', d: 'Interviews, analytics and competitor teardown before a single pixel.' },
  { t: 'Flows and wireframes', d: 'The shortest path from landing to the thing your customer came for.' },
  { t: 'Design system', d: 'Tokens, components and states, documented for your developers.' },
  { t: 'Prototype and test', d: 'Clickable prototypes tested with real users in their own language.' },
]
const swatches = [
  { c: '#C8F542', n: 'Lime' }, { c: '#7B5CFF', n: 'Violet' }, { c: '#3D7BFF', n: 'Signal' }, { c: '#F3F5EF', n: 'Paper' },
]

function Layer({ i, gap, children, label }) {
  const z = useTransform(gap, (g) => g * i)
  return (
    <motion.div className={`layer layer-${i}`} style={{ z }}>
      <span className="layer-label">{label}</span>
      {children}
    </motion.div>
  )
}

export default function Design() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0.15, 0.5], [0, 80])
  const gap = useSpring(raw, { stiffness: 80, damping: 20 })
  const rotZ = useTransform(scrollYProgress, [0, 1], [-30, -44])

  return (
    <section className="section design" id="design" ref={ref}>
      <div className="container design-grid">
        <div className="design-stage" aria-hidden="true">
          <motion.div className="stack" style={{ rotateX: 56, rotateZ: rotZ }}>
            <Layer i={0} gap={gap} label="Wireframe">
              <div className="wf"><i /><i /><i /><i /><i /></div>
            </Layer>
            <Layer i={1} gap={gap} label="Type and colour">
              <div className="tc"><b>Aa</b><div>{swatches.map((s) => <i key={s.c} style={{ background: s.c }} />)}</div></div>
            </Layer>
            <Layer i={2} gap={gap} label="Components">
              <div className="cmp"><span className="c-btn" /><span className="c-input" /><span className="c-toggle"><i /></span><span className="c-card" /></div>
            </Layer>
            <Layer i={3} gap={gap} label="Final screen">
              <div className="fin">
                <div className="fin-hero"><b /><b /><span /></div>
                <div className="fin-row"><i /><i /><i /></div>
              </div>
            </Layer>
          </motion.div>
        </div>

        <div className="design-copy">
          <Reveal><span className="kicker">UI/UX and branding</span></Reveal>
          <SplitText as="h2" className="h2" text="Design that makes the next step obvious." inView />
          <Reveal delay={0.1}>
            <p className="lead">Every screen is built in layers, from rough structure to finished brand. Scroll and watch them separate.</p>
          </Reveal>
          <ol className="design-steps">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={0.12 + i * 0.07}>
                <span className="ds-n">{i + 1}</span>
                <div><strong>{s.t}</strong><p>{s.d}</p></div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.4} className="brand-row">
            {swatches.map((s) => (
              <div className="swatch" key={s.c}><i style={{ background: s.c }} /><span>{s.n}</span><code>{s.c}</code></div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
