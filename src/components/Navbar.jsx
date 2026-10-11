import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useGo } from '../utils/useGo'
import { IconArrow } from './Icons'
import './Navbar.css'
import logo from "./images/logo.png";

const links = [
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'website', label: 'Website', to: '/website' },
  { id: 'apps', label: 'Apps', to: '/app' },
  { id: 'graphics', label: 'Graphics', to: '/graphics' },
  { id: 'global', label: 'Multilingual', to: '/multilingual' },
  { id: 'seo', label: 'SEO', to: '/seo' },
  { id: 'work', label: 'Work' },
]
// Extra links shown only in the mobile menu
const moreLinks = [
  { id: 'about', label: 'About', to: '/about' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollY } = useScroll()
  const { pathname } = useLocation()
  const goTo = useGo()

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 240)
    setScrolled(v > 30)
  })

  // Highlight the current page, or the section on screen on the home page
  useEffect(() => {
    const pageLinks = { '/website': 'website', '/app': 'apps', '/graphics': 'graphics', '/multilingual': 'global', '/services': 'services', '/seo': 'seo', '/about': 'about', '/contact': 'contact' }
    if (pageLinks[pathname]) { setActive(pageLinks[pathname]); return }
    setActive('')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [pathname])

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // target: a page path ('/website') or a section id ('contact')
  const go = (target) => (e) => {
    e.preventDefault()
    const wasOpen = open
    setOpen(false)
    setTimeout(() => goTo(target), wasOpen ? 450 : 0)
  }

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner glass">
    <a href="/" className="logo" onClick={go('top')} aria-label="Orbitra home">
  <img src={logo} alt="Orbitra" className="logo-image" />
</a>
          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.id} href={l.to || `/#${l.id}`} onClick={go(l.to || l.id)} className={active === l.id ? 'is-active' : ''}>
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                <span className="nav-label">{l.label}</span>
              </a>
            ))}
          </nav>

          <a href="/contact" className="btn btn-primary nav-cta" onClick={go('/contact')}>
            Start a project <IconArrow />
          </a>

          <button
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="drawer-backdrop"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
        {open && (
          <motion.aside
            key="drawer"
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="drawer-top">
              <a href="/" className="logo" onClick={go('top')}>
                <span className="logo-mark" aria-hidden="true"><i /></span>
                Orbitra
              </a>
              <button className="drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>
                <span /><span />
              </button>
            </div>

            <nav className="drawer-nav" aria-label="Mobile">
              {[...links, ...moreLinks].map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.to || `/#${l.id}`}
                  onClick={go(l.to || l.id)}
                  className={active === l.id ? 'is-active' : ''}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="drawer-foot">
              <a href="/contact" className="btn btn-primary" onClick={go('/contact')}>
                Start a project <IconArrow />
              </a>
              <p>hello@orbitra.studio</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}