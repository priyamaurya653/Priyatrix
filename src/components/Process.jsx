import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import './Process.css'

const steps = [
  { t: 'Discover', when: 'Week 1', d: 'Workshops with your team, market and competitor research, and a clear scope with a fixed price.', out: ['Scope document', 'Sitemap', 'Market list'] },
  { t: 'Design', when: 'Weeks 2 to 4', d: 'Wireframes, then full UI in your brand. You review clickable prototypes, not static PDFs.', out: ['Prototype', 'Design system'] },
  { t: 'Build', when: 'Weeks 4 to 10', d: 'Two-week sprints with a staging link you can open any time. Translations land as each page is ready.', out: ['Staging site', 'Weekly demos'] },
  { t: 'Launch', when: 'Week 10 to 11', d: 'Speed, accessibility and SEO checks in every language, then a monitored go-live.', out: ['Launch checklist', 'Analytics'] },
  { t: 'Grow', when: 'Ongoing', d: 'Monthly SEO, campaigns and product updates, reported against the goals we set in week one.', out: ['Monthly report', 'Growth roadmap'] },
]

export default function Process() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })

  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">How we work</span></Reveal>
          <SplitText as="h2" className="h2" text="From first call to launch in about eleven weeks." inView />
        </div>

        <div className="timeline" ref={listRef}>
          <div className="tl-line" aria-hidden="true"><motion.span style={{ scaleY }} /></div>
          <ol>
            {steps.map((s, i) => (
              <li key={s.t} className={i % 2 ? 'right' : 'left'}>
                <motion.span
                  className="tl-dot"
                  initial={{ scale: 0.5, backgroundColor: '#111111', color: '#F3F5EF' }}
                  whileInView={{ scale: 1, backgroundColor: '#C8F542', color: '#000000' }}
                  viewport={{ margin: '-45% 0px -45% 0px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {i + 1}
                </motion.span>
                <Reveal className="tl-card glass" y={60}>
                  <div className="tl-top"><h3>{s.t}</h3><span>{s.when}</span></div>
                  <p>{s.d}</p>
                  <div className="tl-out">{s.out.map((o) => <span className="chip" key={o}>{o}</span>)}</div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
