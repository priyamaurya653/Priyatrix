import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

// Number that counts up once it scrolls into view
export default function Counter({ to, decimals = 0, prefix = '', suffix = '', duration = 2.2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setVal })
    return () => controls.stop()
  }, [inView, to, duration])

  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}
