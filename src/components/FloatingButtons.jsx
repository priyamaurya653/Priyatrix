import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { scrollToId } from '../utils/scrollTo'

/* =========================================================
   Floating WhatsApp + Call + Back-to-top buttons
   Works on desktop, tablet and mobile.
   All styles are inside this file, no CSS file needed.
   ========================================================= */

/* Change these to your real numbers */
const WHATSAPP = '919305218839' // country code + number, no + or spaces
const PHONE = '+919305218839'
const WA_TEXT = 'Hi, I would like to know more about your services.'

const CSS = `
.qc-stack {
  position: fixed !important; z-index: 105;
  right: 18px; bottom: 18px;
  right: calc(18px + env(safe-area-inset-right, 0px));
  bottom: calc(18px + env(safe-area-inset-bottom, 0px));
  display: flex !important; flex-direction: column-reverse; align-items: center; gap: 14px;
  pointer-events: none;
}
.qc-btn {
  pointer-events: auto;
  position: relative; width: 58px; height: 58px; border-radius: 50%;
  display: grid !important; place-items: center; cursor: pointer;
  border: 0; padding: 0; text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.qc-btn > svg.qc-ic { width: 28px; height: 28px; }
.qc-wa {
  color: #fff; background: radial-gradient(circle at 35% 30%, #5ff08f, #25d366 55%, #128c4a);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 10px 30px -8px rgba(37,211,102,.8);
}
.qc-wa::before {
  content: ''; position: absolute; inset: 0; border-radius: 50%;
  border: 2px solid #25d366; animation: qcPulse 2.2s ease-out infinite;
}
.qc-call {
  color: #000; background: linear-gradient(180deg, #e2ff85, #C8F542 50%, #a6d127);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 10px 30px -8px rgba(200,245,66,.8);
}
.qc-call > svg.qc-ic { width: 24px; height: 24px; animation: qcRing 3s ease-in-out infinite; }
.qc-top {
  color: #C8F542; background: rgba(10,10,16,.88);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,.9);
}
.qc-top > svg.qc-ic { width: 22px; height: 22px; }
.qc-ring { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
.qc-ring-bg { fill: none; stroke: rgba(255,255,255,.12); stroke-width: 3; }
.qc-ring-fg { fill: none; stroke: #C8F542; stroke-width: 3; stroke-linecap: round; }
.qc-tip {
  position: absolute; right: calc(100% + 12px); top: 50%; transform: translate(8px, -50%);
  white-space: nowrap; font-size: 13px; font-weight: 600; color: #F3F5EF;
  padding: 7px 12px; border-radius: 10px;
  background: rgba(10,10,16,.92); border: 1px solid rgba(255,255,255,.16);
  opacity: 0; pointer-events: none; transition: opacity .25s, transform .3s;
}
@media (hover: hover) { .qc-btn:hover .qc-tip { opacity: 1; transform: translate(0, -50%); } }
@keyframes qcPulse { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.6); opacity: 0; } }
@keyframes qcRing { 0%,80%,100% { transform: rotate(0); } 84% { transform: rotate(-14deg); } 88% { transform: rotate(14deg); } 92% { transform: rotate(-10deg); } 96% { transform: rotate(8deg); } }
@media (max-width: 600px) {
  .qc-stack { right: 14px; bottom: 14px; gap: 12px; }
  .qc-btn { width: 52px; height: 52px; }
  .qc-btn > svg.qc-ic { width: 25px; height: 25px; }
  .qc-tip { display: none; }
}
@media (prefers-reduced-motion: reduce) { .qc-wa::before, .qc-call > svg.qc-ic { animation: none; } }
`

const R = 22

export default function FloatingButtons() {
  const [mounted, setMounted] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => setMounted(true), [])
  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 400))

  if (!mounted) return null

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_TEXT)}`

  // Rendered straight into <body> so no parent element can hide or move it
  return createPortal(
    <>
      <style>{CSS}</style>
      <div className="qc-stack">
        <motion.a
          className="qc-btn qc-wa"
          href={waHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="qc-tip">Chat on WhatsApp</span>
          <svg className="qc-ic" viewBox="0 0 32 32" aria-hidden="true">
            <path fill="currentColor" d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.3c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.6C5.1 10 10 5.3 16 5.3S26.9 10 26.9 15.8 22 26.3 16 26.3zm6-7.8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
          </svg>
        </motion.a>

        <motion.a
          className="qc-btn qc-call"
          href={`tel:${PHONE}`}
          aria-label="Call us"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.95, type: 'spring', stiffness: 260, damping: 18 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="qc-tip">Call us</span>
          <svg className="qc-ic" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
          </svg>
        </motion.a>

        <AnimatePresence>
          {showTop && (
            <motion.button
              className="qc-btn qc-top"
              onClick={() => scrollToId('top')}
              aria-label="Back to top"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="qc-ring" viewBox="0 0 50 50" aria-hidden="true">
                <circle cx="25" cy="25" r={R} className="qc-ring-bg" />
                <motion.circle cx="25" cy="25" r={R} className="qc-ring-fg" style={{ pathLength: progress }} />
              </svg>
              <svg className="qc-ic" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>,
    document.body
  )
}