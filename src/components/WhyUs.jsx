import { useRef } from 'react'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { IconClock, IconGlobe, IconLayers, IconShield, IconTag, IconUsers, IconZap } from './Icons'
import './WhyUs.css'

const reasons = [
  { icon: IconLayers, t: 'One team, end to end', d: 'Design, code and marketing in one studio. No hand-offs between three agencies.' },
  { icon: IconGlobe, t: 'Native-language content', d: 'Every language is written or reviewed by a native speaker before it goes live.' },
  { icon: IconZap, t: 'Fast by default', d: 'We aim for 90+ Lighthouse scores on every page, in every language.' },
  { icon: IconTag, t: 'Fixed-price sprints', d: 'You approve the scope and the price before work starts. No surprise invoices.' },
  { icon: IconUsers, t: 'Senior people on your project', d: 'The people in the pitch are the people who do the work.' },
  { icon: IconShield, t: 'Support after launch', d: 'Ninety days of fixes included, then monthly care plans if you want them.' },
]

export default function WhyUs() {
  const gridRef = useRef(null)

  // Spotlight border that follows the pointer across all cards
  const onMove = (e) => {
    gridRef.current.querySelectorAll('.why-card').forEach((card) => {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    })
  }

  return (
    <section className="section why" id="why">
      <div className="container">
        <div className="section-head why-head">
          <div>
            <Reveal><span className="kicker">Why choose us</span></Reveal>
            <SplitText as="h2" className="h2" text="What you get that templates can’t give you." inView />
          </div>
          <Reveal delay={0.1} className="why-badge glass">
            <IconClock />
            <p><strong>Reply within 24 hours</strong><span>Every enquiry, every time zone</span></p>
          </Reveal>
        </div>

        <div className="why-grid" ref={gridRef} onMouseMove={onMove}>
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <Reveal key={r.t} delay={(i % 3) * 0.08} className="why-card">
                <span className="why-icon"><Icon /></span>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
