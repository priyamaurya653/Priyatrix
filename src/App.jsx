import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, MotionConfig, useScroll, useSpring } from 'framer-motion'

import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Multilingual from './components/Multilingual'
import Apps from './components/Apps'
import Design from './components/Design'
import Marketing from './components/Marketing'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import About from './components/About'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'

// Pages (names match your components folder)
import WebsitePage from './components/WebsitePage'
import AppsPage from './components/Appspages'
import GraphicsPage from './components/Graphicspage'
import MultilingualPage from './components/MultilingualPage'
import ServicesPage from './components/ServicesPage'
import SeoPage from './components/SeoPage'
import AboutPage from './components/Aboutpage'
import { scrollToId } from './utils/scrollTo'

gsap.registerPlugin(ScrollTrigger)

// Home page
function HomePage() {
  useEffect(() => { document.title = 'Orbitra — Digital studio for brands going global' }, [])
  return (
    <>
      <Hero />
      <Services />
      <Multilingual />
      <Apps />
      <Design />
      <Marketing />
      <Portfolio />
      <Process />
      <About />
      <WhyUs />
      <Contact />
    </>
  )
}

// On every page change: go to the top, or to the section that was asked for
function ScrollManager() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    const target = state?.scrollTo
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300)
    const jump = target ? setTimeout(() => scrollToId(target), 450) : null
    return () => { clearTimeout(refresh); if (jump) clearTimeout(jump) }
  }, [pathname, state])

  return null
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    if (reduce) return

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ScrollManager />
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <div className="bg-orbs" aria-hidden="true"><span /><span /><span /></div>
        <div className="noise" aria-hidden="true" />
        <CursorGlow />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/website" element={<WebsitePage />} />
            <Route path="/app" element={<AppsPage />} />
            <Route path="/apps" element={<Navigate to="/app" replace />} />
            <Route path="/graphics" element={<GraphicsPage />} />
            <Route path="/multilingual" element={<MultilingualPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/seo" element={<SeoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </MotionConfig>
    </BrowserRouter>
  )
}