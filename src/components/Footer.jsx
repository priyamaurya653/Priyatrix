import { useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToId } from '../utils/scrollTo'
import { useGo } from '../utils/useGo'
import { IconArrow, IconArrowUp } from './Icons'
import './Footer.css'

const cols = [
  { h: 'Services', links: [['Website development', '/website'], ['Multilingual websites', 'global'], ['Mobile apps', '/app'], ['Graphic design', '/graphics'], ['SEO', 'seo'], ['SMO', 'smo']] },
  { h: 'Studio', links: [['Work', 'work'], ['Process', 'process'], ['About us', '/about'], ['Why us', 'why'], ['Contact', '/contact']] },
]
const socials = ['Instagram', 'LinkedIn', 'Behance', 'Dribbble', 'X']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const goTo = useGo()
  const go = (target) => (e) => { e.preventDefault(); goTo(target) }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-news">
            <h3>Monthly notes on going global</h3>
            <p>One email a month with what we learned launching in new markets. No spam.</p>
            {done ? (
              <p className="news-done">You are subscribed. First issue lands next month.</p>
            ) : (
              <form className="news-form" onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setDone(true) }}>
                <label htmlFor="news-email" className="sr-only">Email address</label>
                <input id="news-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" aria-label="Subscribe"><IconArrow /></button>
              </form>
            )}
          </div>

          {cols.map((c) => (
            <nav className="footer-col" key={c.h} aria-label={c.h}>
              <h4>{c.h}</h4>
              {c.links.map(([label, target]) => <a key={label} href={target.startsWith('/') ? target : `/#${target}`} onClick={go(target)}>{label}</a>)}
            </nav>
          ))}

          <div className="footer-col">
            <h4>Follow</h4>
            {socials.map((s) => <a key={s} href="#" onClick={(e) => e.preventDefault()}>{s}</a>)}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Orbitra Digital Studio</span>
          <span className="fb-links"><a href="#">Privacy</a><a href="#">Terms</a></span>
          <button className="to-top" onClick={() => scrollToId('top')}>Back to top <IconArrowUp /></button>
        </div>
      </div>
    </footer>
  )
}