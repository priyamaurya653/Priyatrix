import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Counter from './Counter'
import { IconChart, IconMail, IconSearch, IconShare } from './Icons'
import './Marketing.css'

const channels = [
  { icon: IconSearch, t: 'SEO', d: 'Technical fixes, local pages and content that answers what people actually search.', m: 'Page-one rankings for 340 keywords' },
  { icon: IconShare, t: 'Social media', d: 'Reels, carousels and community replies, planned a month ahead.', m: '1.2M monthly reach for one D2C brand' },
  { icon: IconChart, t: 'Performance ads', d: 'Google, Meta and LinkedIn campaigns tuned weekly against real revenue.', m: '3.8x average return on ad spend' },
  { icon: IconMail, t: 'Email and automation', d: 'Welcome, abandoned-cart and win-back flows that run while you sleep.', m: '22% of store revenue from email' },
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
const line = 'M0 250 C60 245 90 230 120 225 S200 215 240 190 S320 170 360 140 S440 110 480 80 S560 40 600 20'
const area = `${line} L600 300 L0 300 Z`

export default function Marketing() {
  return (
    <section className="section marketing" id="marketing">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">SEO and marketing</span></Reveal>
          <SplitText as="h2" className="h2" text="Traffic is nice. Revenue is the point." inView />
          <Reveal delay={0.1}>
            <p className="lead">Search, social and paid work from one plan, measured against sales instead of likes.</p>
          </Reveal>
        </div>

        <div className="mk-grid">
          <Reveal className="mk-chart glass">
            <div className="mk-chart-head">
              <div>
                <span className="mk-label">Organic sessions, client average</span>
                <strong className="mk-big"><Counter to={214} prefix="+" suffix="%" /></strong>
              </div>
              <span className="mk-live"><i />Live tracking</span>
            </div>

            <svg className="mk-svg" viewBox="0 0 600 300" preserveAspectRatio="none" aria-label="Line chart: organic traffic rising steadily over seven months" role="img">
              <defs>
                <linearGradient id="mkArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8F542" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#C8F542" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="mkLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7B5CFF" />
                  <stop offset="100%" stopColor="#C8F542" />
                </linearGradient>
              </defs>
              {[60, 120, 180, 240].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} className="mk-gridline" />)}
              <motion.path d={area} fill="url(#mkArea)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1.2 }} />
              <motion.path
                d={line} fill="none" stroke="url(#mkLine)" strokeWidth="3" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.circle cx="600" cy="20" r="7" fill="#C8F542" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.1, type: 'spring' }} />
            </svg>
            <div className="mk-months">{months.map((m) => <span key={m}>{m}</span>)}</div>

            <div className="mk-mini">
              <div><strong><Counter to={3.8} decimals={1} suffix="x" /></strong><span>return on ad spend</span></div>
              <div><strong><Counter to={1.2} decimals={1} suffix="M" /></strong><span>monthly social reach</span></div>
              <div><strong><Counter to={42} suffix="%" /></strong><span>lower cost per lead</span></div>
            </div>
          </Reveal>

          <div className="mk-channels">
            {channels.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.t} delay={i * 0.08}>
                  <motion.div className="mk-ch glass" whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <span className="mk-ch-icon"><Icon /></span>
                    <div>
                      <h3>{c.t}</h3>
                      <p>{c.d}</p>
                      <em>{c.m}</em>
                    </div>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
