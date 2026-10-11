import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CursorGlow.css'

// Mouse-follow glow + cursor dot (desktop / fine pointers only)
export default function CursorGlow() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const glowX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 })
  const dotX = useSpring(x, { stiffness: 700, damping: 40 })
  const dotY = useSpring(y, { stiffness: 700, damping: 40 })
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHover(!!e.target.closest?.('a, button, input, textarea, [data-cursor]'))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />
      <motion.div className={`cursor-dot ${hover ? 'is-hover' : ''}`} style={{ x: dotX, y: dotY }} aria-hidden="true" />
    </>
  )
}
