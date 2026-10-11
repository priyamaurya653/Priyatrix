import { motion } from 'framer-motion'

// Scroll-reveal wrapper used across sections
export default function Reveal({ children, delay = 0, y = 48, className = '', as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </M>
  )
}
