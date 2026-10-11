import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { IconCheck, IconStar } from './Icons'
import './Apps.css'

const platforms = ['iOS', 'Android', 'Flutter', 'React Native', 'Kotlin', 'Swift']
const points = [
  'Offline-first data that syncs when the signal comes back',
  'UPI, Stripe, Razorpay and in-app purchase flows',
  'Push notifications, deep links and analytics from day one',
  'App Store and Play Store submission handled for you',
]

function WalletScreen() {
  return (
    <div className="scr scr-wallet">
      <div className="scr-head"><span>Good morning</span><b>Aisha</b></div>
      <div className="bal-card"><small>Balance</small><strong>₹48,250</strong><div className="bal-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>
      {['Groceries', 'Metro card', 'Salary'].map((r, i) => (
        <div className="row" key={r}><span className={`dot d${i}`} />{r}<em>{i === 2 ? '+₹62k' : '−₹840'}</em></div>
      ))}
    </div>
  )
}
function ShopScreen() {
  return (
    <div className="scr scr-shop">
      <div className="scr-head"><span>New in</span><b>Sneakers</b></div>
      <div className="shop-grid">{[0, 1, 2, 3].map((i) => <div key={i} className={`tile t${i}`}><i /></div>)}</div>
      <div className="shop-cta">Add to bag</div>
    </div>
  )
}
function FitScreen() {
  return (
    <div className="scr scr-fit">
      <div className="scr-head"><span>Today</span><b>8,420 steps</b></div>
      <div className="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="40" className="ring-fill" /></svg><strong>76%</strong></div>
      <div className="fit-bars">{[40, 70, 55, 90, 65, 80, 50].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
    </div>
  )
}

export default function Apps() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [140, -140])
  const y2 = useTransform(scrollYProgress, [0, 1], [260, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const r1 = useTransform(scrollYProgress, [0, 1], [-14, -4])
  const r3 = useTransform(scrollYProgress, [0, 1], [14, 4])

  return (
    <section className="section apps" id="apps" ref={ref}>
      <div className="container apps-grid">
        <div className="apps-copy">
          <Reveal><span className="kicker">Mobile apps</span></Reveal>
          <SplitText as="h2" className="h2" text="Apps people keep on their home screen." inView />
          <Reveal delay={0.1}>
            <p className="lead">
              We design and build iOS and Android apps that open fast, work offline and feel native in every
              language, then keep improving them after launch.
            </p>
          </Reveal>
          <ul className="apps-points">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={0.15 + i * 0.07}><IconCheck />{p}</Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="apps-platforms">
            {platforms.map((p) => <span className="chip" key={p}>{p}</span>)}
          </Reveal>
          <Reveal delay={0.35} className="apps-rating">
            <span className="stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <IconStar key={i} />)}</span>
            <p><strong>4.8 average</strong> store rating across 40+ apps</p>
          </Reveal>
        </div>

        <div className="apps-stage" aria-hidden="true">
          <div className="apps-halo" />
          <motion.div className="phone p-left" style={{ y: y1, rotate: r1 }}><div className="notch" /><ShopScreen /></motion.div>
          <motion.div className="phone p-center" style={{ y: y3 }}><div className="notch" /><WalletScreen /></motion.div>
          <motion.div className="phone p-right" style={{ y: y2, rotate: r3 }}><div className="notch" /><FitScreen /></motion.div>
        </div>
      </div>
    </section>
  )
}