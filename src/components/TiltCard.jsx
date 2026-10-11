import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// 3D hover card with a glare that follows the pointer
export default function TiltCard({ children, className = '', intensity = 10, ...rest }) {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), { stiffness: 180, damping: 18 })
  const gx = useTransform(x, (v) => `${v * 100}%`)
  const gy = useTransform(y, (v) => `${v * 100}%`)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { x.set(0.5); y.set(0.5) }

  return (
    <motion.div
      className={`tilt ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, '--gx': gx, '--gy': gy }}
      {...rest}
    >
      <div className="tilt-glare" />
      {children}
    </motion.div>
  )
}
