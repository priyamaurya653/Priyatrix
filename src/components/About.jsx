import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import Counter from './Counter'
import './About.css'

const story = 'Orbitra started in 2017 as three people building websites for exporters who needed to sell abroad. Today we are forty designers, engineers, writers and marketers, and we still work the same way: one small senior team per client, from the first sketch to the campaign after launch.'

const stats = [
  { to: 9, suffix: '', label: 'years in business' },
  { to: 120, suffix: '+', label: 'products launched' },
  { to: 28, suffix: '', label: 'countries served' },
  { to: 40, suffix: '', label: 'people in the studio' },
]

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span className="aw" style={{ opacity }}>{children} </motion.span>
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 45%'] })
  const words = story.split(' ')

  return (
    <section className="section about" id="about">
      <div className="container">
        <Reveal><span className="kicker">About the studio</span></Reveal>
        <p className="about-story" ref={ref}>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
          ))}
        </p>

        <div className="about-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="about-stat glass">
              <strong><Counter to={s.to} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
