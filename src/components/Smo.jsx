import Reveal from './Reveal'
import SplitText from './SplitText'
import Counter from './Counter'
import { motion } from 'framer-motion'
import { IconCheck } from './Icons'
import './SMO.css'

const PLATFORMS = [
  { n: 'Instagram', m: '+48k followers in 12 months', c: '#ff4fa0', bars: [30, 42, 38, 55, 64, 78, 92] },
  { n: 'LinkedIn', m: '3.2x engagement rate', c: '#3D7BFF', bars: [20, 28, 35, 33, 50, 62, 70] },
  { n: 'YouTube', m: '1.1M views on Shorts', c: '#ff5a5a', bars: [15, 22, 40, 48, 52, 75, 88] },
  { n: 'Facebook', m: '22% cheaper reach', c: '#7B5CFF', bars: [40, 38, 46, 52, 58, 60, 72] },
]
const SERVICES = [
  'Profile and bio optimisation',
  'Monthly content calendar',
  'Reels and short video editing',
  'Community and comment management',
  'Influencer collaborations',
  'Paid boosts and retargeting',
]
const DAYS = [
  { d: 'Mon', p: ['Reel'] }, { d: 'Tue', p: ['Carousel', 'Story'] }, { d: 'Wed', p: ['Story'] },
  { d: 'Thu', p: ['Reel', 'Poll'] }, { d: 'Fri', p: ['Carousel'] }, { d: 'Sat', p: ['Live'] }, { d: 'Sun', p: ['Story'] },
]
const HEARTS = [
  { l: '12%', d: 0, s: 1 }, { l: '30%', d: 1.2, s: 0.8 }, { l: '52%', d: 0.5, s: 1.2 }, { l: '70%', d: 2, s: 0.9 },
  { l: '84%', d: 1.6, s: 1.1 }, { l: '40%', d: 2.6, s: 0.7 }, { l: '62%', d: 3.2, s: 1 }, { l: '20%', d: 3.6, s: 0.9 },
]

export default function SMO() {
  return (
    <section className="section smo" id="smo">
      <div className="container">
        <div className="section-head smo-head">
          <div>
            <Reveal><span className="kicker">Social media optimisation</span></Reveal>
            <SplitText as="h2" className="h2" text="Feeds people stop scrolling for." inView />
          </div>
          <Reveal delay={0.1}>
            <p className="lead">Strategy, content and community for Instagram, LinkedIn, YouTube and Facebook. We post, reply and report, so your brand grows while you run the business.</p>
          </Reveal>
        </div>

        <div className="smo-grid">
          <Reveal className="smo-stage" y={60}>
            <div className="smo-halo" aria-hidden="true" />
            <div className="hearts" aria-hidden="true">
              {HEARTS.map((h, i) => (
                <span key={i} style={{ left: h.l, animationDelay: `${h.d}s`, '--s': h.s }}>{i % 3 === 2 ? '+1' : '♥'}</span>
              ))}
            </div>

            <div className="sm-phone gloss">
              <div className="sm-top"><span className="sm-avatar" /><b>brewhaus</b><em>Follow</em></div>
              <div className="sm-media"><i /><i /><b>New roast drops Friday</b></div>
              <div className="sm-actions"><span>♥</span><span>💬</span><span>↗</span></div>
              <p className="sm-likes"><strong><Counter to={12.4} decimals={1} suffix="k" /></strong> likes</p>
              <p className="sm-cap"><b>brewhaus</b> Three new single-origins this week. Which one are you trying first?</p>
            </div>

            <motion.div className="sm-float glass f1" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <strong><Counter to={48} suffix="k" /></strong><span>new followers</span>
            </motion.div>
            <motion.div className="sm-float glass f2" animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <strong><Counter to={8.7} decimals={1} suffix="%" /></strong><span>engagement rate</span>
            </motion.div>
          </Reveal>

          <div className="smo-side">
            <div className="platforms">
              {PLATFORMS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.08} className="platform glass gloss">
                  <div className="pf-top"><span className="pf-dot" style={{ background: p.c, boxShadow: `0 0 12px ${p.c}` }} /><strong>{p.n}</strong></div>
                  <p>{p.m}</p>
                  <div className="pf-bars" aria-hidden="true">
                    {p.bars.map((b, j) => (
                      <motion.i
                        key={j} style={{ background: p.c }}
                        initial={{ height: 0 }} whileInView={{ height: `${b}%` }} viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <ul className="smo-services">
              {SERVICES.map((s, i) => (
                <Reveal as="li" key={s} delay={0.1 + i * 0.05}><IconCheck />{s}</Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="calendar glass gloss" delay={0.1}>
          <div className="cal-head">
            <strong>A typical week of posts</strong>
            <span>Planned a month ahead, approved by you</span>
          </div>
          <div className="cal-days">
            {DAYS.map((day, i) => (
              <motion.div
                key={day.d} className="cal-day"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <span>{day.d}</span>
                {day.p.map((p) => <em key={p} className={`cp cp-${p.toLowerCase()}`}>{p}</em>)}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}