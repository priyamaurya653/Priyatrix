import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { IconArrow } from './Icons'
import { useGo } from '../utils/useGo'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'Saffron Stays', type: 'Multilingual booking site', tags: ['6 languages', 'Web'], result: '+180% direct bookings', art: 'a1' },
  { name: 'Kora Pay', type: 'Fintech mobile app', tags: ['iOS', 'Android'], result: '4.9 store rating', art: 'a2' },
  { name: 'Nomad Threads', type: 'E-commerce and branding', tags: ['Shopify', 'Brand'], result: '2.6x conversion rate', art: 'a3' },
  { name: 'Medline Clinics', type: 'SEO and UI/UX', tags: ['SEO', 'Design'], result: 'Page one in 9 cities', art: 'a4' },
  { name: 'Arcade Coffee', type: 'Brand and social', tags: ['Branding', 'Social'], result: '48k followers in a year', art: 'a5' },
]

function Art({ kind }) {
  return (
    <div className={`proj-art ${kind}`} aria-hidden="true">
      <span className="pa-s1" /><span className="pa-s2" /><span className="pa-s3" />
      <div className="pa-ui"><i /><i /><i /></div>
    </div>
  )
}

export default function Portfolio() {
  const goTo = useGo()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  // Pinned horizontal scroll on desktop, native swipe on smaller screens
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const distance = () => track.scrollWidth - window.innerWidth + 40
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.utils.toArray('.proj-art', track).forEach((art) => {
        gsap.fromTo(art, { backgroundPosition: '0% 50%' }, {
          backgroundPosition: '100% 50%', ease: 'none',
          scrollTrigger: { trigger: art, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="container work-head">
        <div>
          <Reveal><span className="kicker">Selected work</span></Reveal>
          <SplitText as="h2" className="h2" text="Launched, measured, still growing." inView />
        </div>
        <Reveal delay={0.1}><p className="lead">A few of the 120+ products we have shipped. Scroll sideways through the work.</p></Reveal>
      </div>

      <div className="work-track" ref={trackRef}>
        {projects.map((p) => (
          <article className="proj" key={p.name} data-cursor>
            <Art kind={p.art} />
            <div className="proj-info">
              <div>
                <h3>{p.name}</h3>
                <p>{p.type}</p>
              </div>
              <span className="proj-go" aria-hidden="true"><IconArrow /></span>
            </div>
            <div className="proj-meta">
              {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
              <span className="proj-result">{p.result}</span>
            </div>
          </article>
        ))}
        <a href="/contact" className="proj proj-cta" onClick={(e) => { e.preventDefault(); goTo('/contact') }}>
          <span>Your project could be next</span>
          <strong>Start a project</strong>
          <span className="proj-go"><IconArrow /></span>
        </a>
      </div>
    </section>
  )
}