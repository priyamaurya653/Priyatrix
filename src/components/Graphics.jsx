import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Counter from './Counter'
import './Graphics.css'

const COLS = [
  [{ k: 'logo', t: 'Logo design' }, { k: 'post', t: 'Social post', txt: 'Summer drop' }, { k: 'pack', t: 'Packaging' }],
  [{ k: 'banner', t: 'Web banner', txt: 'Launch week' }, { k: 'motion', t: 'Motion graphics' }, { k: 'card', t: 'Business cards' }, { k: 'brochure', t: 'Brochure' }],
  [{ k: 'poster', t: 'Event poster', txt: 'Live 08.11' }, { k: 'icon', t: 'Icon set' }, { k: 'story', t: 'Story ad', txt: '40% off' }],
]
const DELIVERABLES = [
  { t: 'Logos and identity', d: 'Logo, colours, type and a guide to use them.' },
  { t: 'Social media creatives', d: 'Posts, stories and reel covers in your brand style.' },
  { t: 'Ads and web banners', d: 'Every size Google and Meta ask for, in one batch.' },
  { t: 'Brochures and print', d: 'Print-ready files for brochures, flyers and standees.' },
  { t: 'Packaging and labels', d: 'Boxes, labels and pouches that stand out on a shelf.' },
  { t: 'Motion graphics', d: 'Animated logos, explainers and reel intros.' },
]
const TOOLS = ['Illustrator', 'Photoshop', 'Figma', 'After Effects', 'InDesign', 'Blender']

function Tile({ k, t, txt }) {
  return (
    <div className={`gx gx-${k} gloss`} data-cursor>
      <div className="gx-art" aria-hidden="true">
        <i /><i /><i />
        {txt && <b>{txt}</b>}
      </div>
      <span className="gx-label">{t}</span>
    </div>
  )
}

export default function Graphics() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], [60, -160])
  const yB = useTransform(scrollYProgress, [0, 1], [-140, 120])
  const yC = useTransform(scrollYProgress, [0, 1], [120, -220])
  const ys = [yA, yB, yC]

  return (
    <section className="section graphics" id="graphics" ref={ref}>
      <div className="container gx-grid">
        <div className="gx-copy">
          <Reveal><span className="kicker">Graphic design</span></Reveal>
          <SplitText as="h2" className="h2" text="Graphics for every screen and every shelf." inView />
          <Reveal delay={0.1}>
            <p className="lead">From a logo to a full month of social posts, our designers keep every piece on brand and deliver files ready to print, post or publish.</p>
          </Reveal>

          <div className="gx-list">
            {DELIVERABLES.map((d, i) => (
              <Reveal key={d.t} delay={0.1 + i * 0.06} className="gx-item">
                <strong>{d.t}</strong>
                <span>{d.d}</span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="gx-stats">
            <div><strong><Counter to={2400} suffix="+" /></strong><span>creatives delivered</span></div>
            <div><strong><Counter to={48} suffix="h" /></strong><span>turnaround on social posts</span></div>
          </Reveal>

          <Reveal delay={0.35} className="gx-tools">
            {TOOLS.map((t) => <span className="chip" key={t}>{t}</span>)}
          </Reveal>
        </div>

        <div className="gx-wall">
          {COLS.map((col, ci) => (
            <motion.div className={`gx-col gx-col-${ci}`} style={{ y: ys[ci] }} key={ci}>
              {col.map((tile) => <Tile key={tile.k} {...tile} />)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}