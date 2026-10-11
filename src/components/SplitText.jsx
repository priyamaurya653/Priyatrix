import { Fragment } from 'react'
import { motion } from 'framer-motion'

// Word-by-word masked text reveal
export default function SplitText({ text, as = 'span', className = '', delay = 0, stagger = 0.07, inView = false }) {
  const Tag = motion[as]
  const words = text.split(' ')
  const container = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
  const child = {
    hidden: { y: '115%', rotate: 7 },
    show: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
  }
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { animate: 'show' }

  return (
    <Tag className={className} variants={container} initial="hidden" {...trigger}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="split-word">
              <motion.span className="split-inner" variants={child}>{w}</motion.span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
