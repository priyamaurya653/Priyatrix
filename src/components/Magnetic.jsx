import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

// Pulls its child toward the cursor (micro-interaction for buttons)
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} className="magnetic" style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  )
}
