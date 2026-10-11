import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Graphics from '../components/Graphics'
import Contact from '../components/Contact'
import { Faq, Included, PageHero, Pricing, StackGrid, Steps, TypeGrid } from '../components/PageBlocks'
import { IconBag, IconDiamond, IconImage, IconLayers, IconShare, IconZap } from '../components/Icons'
import './GraphicsPage.css'

/* ---------------- Content ---------------- */
const STATS = [
  { to: 2400, suffix: '+', label: 'creatives delivered' },
  { to: 180, suffix: '+', label: 'brands designed' },
  { to: 48, suffix: 'h', label: 'turnaround on social posts' },
  { to: 3, label: 'rounds of revisions included' },
]

const TYPES = [
  { icon: IconDiamond, t: 'Logo and brand identity', d: 'Logo, colours, fonts and a brand guide so everything you make looks like you.', tags: ['Logo', 'Brand guide'] },
  { icon: IconShare, t: 'Social media creatives', d: 'Posts, carousels, stories and reel covers designed for your feed, every month.', tags: ['Instagram', 'LinkedIn'] },
  { icon: IconImage, t: 'Ads and web banners', d: 'Every size Google, Meta and websites ask for, delivered as one tidy batch.', tags: ['Google Ads', 'Meta Ads'] },
  { icon: IconLayers, t: 'Brochures and print', d: 'Brochures, flyers, standees and visiting cards, sent as print-ready files.', tags: ['CMYK', 'Print-ready'] },
  { icon: IconBag, t: 'Packaging and labels', d: 'Boxes, labels and pouches that stand out on a shelf and in an unboxing video.', tags: ['Dielines', 'Mockups'] },
  { icon: IconZap, t: 'Motion graphics', d: 'Animated logos, reel intros and short explainer videos that stop the scroll.', tags: ['After Effects', 'Lottie'] },
]

const INCLUDED = [
  'Editable source files (AI, PSD, Figma)', 'Print-ready PDFs', 'Every social media size', 'Colour and font guide',
  'Full commercial rights', '3 rounds of revisions', 'Realistic mockups', 'Web-optimised PNG, SVG and WebP',
]

const STACK = [
  { g: 'Design', items: ['Illustrator', 'Photoshop', 'Figma', 'InDesign'] },
  { g: 'Motion and 3D', items: ['After Effects', 'Premiere Pro', 'Lottie', 'Blender'] },
  { g: 'Print', items: ['CMYK proofs', 'Pantone', 'Dielines', 'PDF/X'] },
  { g: 'Digital exports', items: ['SVG', 'PNG and WebP', 'MP4 and GIF', 'Brand kit'] },
]

const STEPS = [
  { t: 'Brief', w: 'Day 1', d: 'A short call about your business, audience and what you like and dislike.' },
  { t: 'Moodboard', w: 'Day 2 to 3', d: 'Colours, type and references so we agree on direction early.' },
  { t: 'Concepts', w: 'Day 4 to 6', d: 'Two or three different design routes to choose from.' },
  { t: 'Refine', w: 'Day 7 to 9', d: 'Up to three rounds of changes on the route you pick.' },
  { t: 'Final files', w: 'Day 10', d: 'Every format and size, for print, web and social.' },
  { t: 'Brand guide', w: 'Day 10', d: 'A simple guide so your team uses the design the right way.' },
]

const PLANS = [
  { name: 'Logo design', price: '₹14,999', note: 'one-time', for: 'For new businesses that need a strong first mark.', feats: ['3 logo concepts', '3 rounds of revisions', 'Colour and mono versions', 'All file formats', 'Ready in 7 days'] },
  { name: 'Brand identity', price: '₹39,999', note: 'one-time', popular: true, for: 'A complete look for your business, ready to use everywhere.', feats: ['Logo and brand mark', 'Colours and fonts', 'Visiting card and letterhead', '10 social media templates', 'Brand guide PDF', 'Ready in 2 to 3 weeks'] },
  { name: 'Monthly creatives', price: '₹24,999', note: 'per month', for: 'For brands that post and advertise every week.', feats: ['20 social posts or stories', '4 ad banner sets', '2 reel covers or motion posts', '48-hour turnaround', 'Dedicated designer'] },
]

const FAQ = [
  { q: 'How many logo options will I get?', a: 'You get two or three different logo concepts. You pick one, and we refine it with up to three rounds of changes.' },
  { q: 'Will I get the source files?', a: 'Yes. You get editable source files (AI, PSD or Figma) plus ready-to-use PNG, SVG, PDF and print files.' },
  { q: 'Do I own the copyright of the designs?', a: 'Yes. After the final payment, full commercial rights to the final designs belong to you.' },
  { q: 'Can you design in Hindi and other languages?', a: 'Yes. We design with Hindi, Arabic, Japanese and many other scripts, using fonts that read well in each language.' },
  { q: 'How fast can you deliver social media posts?', a: 'On a monthly plan, single posts are delivered within 48 hours. Larger batches are planned a month ahead.' },
  { q: 'Do you also print the designs?', a: 'We prepare print-ready files and can coordinate with our printing partners, or send the files straight to your printer.' },
]

/* ---------------- Hero visual: live brand kit with colour switcher ---------------- */
const PALETTES = [
  { name: 'Lime', a: '#C8F542', b: '#7B5CFF' },
  { name: 'Coral', a: '#ff7a59', b: '#2b1055' },
  { name: 'Ocean', a: '#4fd1ff', b: '#0a1f6b' },
  { name: 'Rose', a: '#ff4fa0', b: '#1f0f45' },
]

function BrandKit() {
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const p = PALETTES[idx]

  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setIdx((i) => (i + 1) % PALETTES.length), 2600)
    return () => clearInterval(id)
  }, [auto])

  return (
    <div className="wp-visual gp-visual" style={{ '--a': p.a, '--b': p.b }}>
      <div className="gp-glow" aria-hidden="true" />

      <div className="gp-board" aria-hidden="true">
        <motion.div className="gp-poster gloss" initial={{ opacity: 0, y: 60, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: -4 }} transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <span className="gp-mark" />
          <b>Bloom<br />Studio</b>
          <small>Spring collection</small>
        </motion.div>

        <motion.div className="gp-card gloss" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0, rotate: 6 }} transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <span className="gp-mark sm" />
          <div><b>Riya Mehta</b><small>Creative director</small></div>
        </motion.div>

        <motion.div className="gp-post gloss" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0, rotate: 3 }} transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <i /><b>New drop Friday</b>
        </motion.div>

        <svg className="gp-pen" viewBox="0 0 200 120">
          <motion.path
            d="M10 100 C 50 10, 120 10, 190 70"
            className="gp-pen-path" fill="none" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1] }}
            transition={{ duration: 3.2, times: [0, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
          <rect x="5" y="95" width="10" height="10" className="gp-anchor" />
          <rect x="185" y="65" width="10" height="10" className="gp-anchor" />
          <line x1="10" y1="100" x2="50" y2="10" className="gp-handle" />
          <circle cx="50" cy="10" r="4" className="gp-anchor" />
        </svg>
      </div>

      <div className="gp-palette">
        <span>Try a palette</span>
        <div>
          {PALETTES.map((pal, i) => (
            <button
              key={pal.name}
              className={i === idx ? 'on' : ''}
              style={{ '--sw-a': pal.a, '--sw-b': pal.b }}
              onClick={() => { setAuto(false); setIdx(i) }}
              aria-label={`${pal.name} palette`}
              aria-pressed={i === idx}
            />
          ))}
        </div>
        <code>{p.a}</code>
      </div>
    </div>
  )
}

/* ---------------- Before / after slider ---------------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50)
  return (
    <section className="section" id="before-after">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Before and after</span></Reveal>
          <SplitText as="h2" className="h2" text="Same business. A brand people remember." inView />
          <Reveal delay={0.1}><p className="lead">Drag the handle to compare a local sweet shop’s old sign with the identity we designed for them.</p></Reveal>
        </div>

        <Reveal className="ba glass" y={60}>
          <div className="ba-stage" style={{ '--pos': `${pos}%` }}>
            <div className="ba-side ba-before" aria-hidden="true">
              <div className="old-logo"><span className="old-circle">K</span><b>KESAR SWEETS</b><small>Pure Ghee Mithai &amp; Namkeen</small></div>
            </div>
            <div className="ba-side ba-after" aria-hidden="true">
              <div className="new-logo">
                <span className="new-mark"><i /></span>
                <b>Kesar &amp; Co.</b>
                <small>Mithai, made fresh daily</small>
              </div>
              <div className="new-swatches"><i /><i /><i /></div>
            </div>
            <span className="ba-tag l">Before</span>
            <span className="ba-tag r">After</span>
            <div className="ba-handle" aria-hidden="true"><span /></div>
            <input
              type="range" min="0" max="100" value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compare before and after"
              className="ba-range"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Page ---------------- */
export default function GraphicsPage() {
  useEffect(() => { document.title = 'Graphic design — Orbitra' }, [])

  return (
    <div className="service-page">
      <PageHero
        crumb="Graphic design"
        lines={['Design that', 'makes people', 'look twice.']}
        lead="Logos, brand identities, social media creatives, ads, print and packaging. Every piece on brand and delivered ready to post, print or publish."
        visual={<BrandKit />}
        stats={STATS}
      />
      <TypeGrid kicker="What we design" title="Everything your brand needs to look the part." items={TYPES} />
      <BeforeAfter />
      <Graphics showPageLink={false} />
      <Included title="Every project comes with these." lead="No extra charge for source files or formats. You own everything we make for you." items={INCLUDED} />
      <StackGrid kicker="Tools and formats" title="Made in pro tools, delivered in every format." groups={STACK} />
      <Steps title="From brief to final files in about ten days." steps={STEPS} />
      <Pricing title="Simple packages, or a monthly designer." lead="Fixed prices for one-off projects, or a monthly plan for brands that post every week." plans={PLANS} />
      <Faq items={FAQ} />
      <Contact defaultService="Graphic design" />
    </div>
  )
}