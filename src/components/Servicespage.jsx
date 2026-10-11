import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import TiltCard from './TiltCard'
import Contact from './Contact'
import { Faq, PageHero, Steps } from './PageBlocks'
import {
  IconArrow, IconBag, IconChart, IconCheck, IconClock, IconDiamond, IconGlobe, IconImage, IconLayers,
  IconMail, IconPen, IconPhone, IconSearch, IconShare, IconShield, IconTag, IconUsers, IconZap,
} from './Icons'
import { useGo } from '../utils/useGo'
import { scrollToId } from '../utils/scrollTo'
import './ServicesPage.css'

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/* =========================================================
   Content
   ========================================================= */
const STATS = [
  { to: 12, label: 'services under one roof' },
  { to: 350, suffix: '+', label: 'projects delivered' },
  { to: 28, label: 'countries served' },
  { to: 9, label: 'years in business' },
]

// Every service, with how we actually do the work
const SERVICES = [
  {
    id: 'svc-website', icon: IconLayers, t: 'Website development', page: '/website',
    s: 'Fast business websites, web apps and portals.',
    what: 'We design and code websites that load in under a second, look right on every phone and come with an admin panel so you can edit content yourself.',
    how: ['Plan pages and goals in a sitemap', 'Design desktop and mobile screens', 'Code on a staging link you can check any time', 'Test speed, SEO and forms, then go live'],
    get: ['Responsive website', 'Admin panel / CMS', 'SSL, speed and SEO setup', 'Analytics and Search Console', '30 days free support'],
    tools: ['React', 'Next.js', 'Laravel', 'WordPress'], time: '3-5 weeks', from: 24999, metric: ['98', 'average speed score'],
  },
  {
    id: 'svc-multilingual', icon: IconGlobe, t: 'Multilingual websites', page: '/multilingual',
    s: 'One website in every language you sell in.',
    what: 'We build or convert websites into Hindi, Arabic, Spanish and 45+ other languages with native-speaker translation, right-to-left layouts and local SEO.',
    how: ['Pick markets and languages', 'Set up language URLs and switcher', 'Translate with native speakers and review', 'Submit every language to Google'],
    get: ['Language switcher', 'RTL support', 'hreflang SEO', 'Local currency and formats', 'Multilingual admin panel'],
    tools: ['i18n', 'WPML', 'Next.js i18n', 'DeepL + human review'], time: '2-6 weeks', from: 9999, metric: ['45+', 'languages supported'],
  },
  {
    id: 'svc-apps', icon: IconPhone, t: 'Mobile app development', page: '/app',
    s: 'Android and iOS apps people keep using.',
    what: 'We design, build and publish mobile apps for shopping, delivery, booking, fintech, education and business teams, with an admin panel and backend.',
    how: ['Agree features and a fixed quote', 'Map flows and design screens', 'Build in 2-week sprints with test builds', 'Beta test and publish to both stores'],
    get: ['Android and iOS app', 'Admin panel and API', 'Push notifications', 'Store publishing', '60 days free support'],
    tools: ['Flutter', 'Kotlin', 'Swift', 'React Native', 'Firebase'], time: '8-16 weeks', from: 120000, metric: ['4.8', 'average store rating'],
  },
  {
    id: 'svc-ecommerce', icon: IconBag, t: 'E-commerce stores', page: '/website',
    s: 'Online stores that sell, from product page to checkout.',
    what: 'We build online stores on Shopify, WooCommerce or custom code, with payments, shipping, coupons and an order dashboard.',
    how: ['Plan catalogue, payments and shipping', 'Design product and checkout pages', 'Add products, payments and courier links', 'Test orders end to end and launch'],
    get: ['Product catalogue', 'UPI, cards, COD', 'Shipping integration', 'Coupons and reviews', 'Order dashboard'],
    tools: ['Shopify', 'WooCommerce', 'Razorpay', 'Shiprocket'], time: '4-8 weeks', from: 49999, metric: ['2.6x', 'average conversion lift'],
  },
  {
    id: 'svc-uiux', icon: IconPen, t: 'UI/UX design', page: null,
    s: 'Screens that are simple to use.',
    what: 'We research your users, map every flow and design clean interfaces for websites, apps and dashboards, with a clickable prototype and a design system.',
    how: ['User and competitor research', 'User flows and wireframes', 'High-fidelity UI design', 'Prototype, test and hand over to developers'],
    get: ['User flows', 'Wireframes', 'UI screens', 'Clickable prototype', 'Design system'],
    tools: ['Figma', 'FigJam', 'Maze', 'Lottie'], time: '2-6 weeks', from: 19999, metric: ['+38%', 'average task success'],
  },
  {
    id: 'svc-graphics', icon: IconImage, t: 'Graphic design', page: '/graphics',
    s: 'Logos, social posts, print and packaging.',
    what: 'From a logo to a full month of social posts, brochures and packaging, our designers keep every piece on brand and ready to print or post.',
    how: ['Brief and moodboard', 'Two or three concepts', 'Up to three rounds of changes', 'Final files in every format'],
    get: ['Editable source files', 'Print-ready PDFs', 'Social media sizes', 'Full commercial rights'],
    tools: ['Illustrator', 'Photoshop', 'Figma', 'After Effects'], time: '1-14 days', from: 499, metric: ['2,400+', 'creatives delivered'],
  },
  {
    id: 'svc-branding', icon: IconDiamond, t: 'Branding', page: '/graphics',
    s: 'A name, look and voice people remember.',
    what: 'We create your full brand: name ideas, logo, colours, fonts, tone of voice and brand guidelines, so everything you make looks like one company.',
    how: ['Brand workshop about values and audience', 'Name and positioning ideas', 'Logo and visual identity', 'Brand guidelines and launch kit'],
    get: ['Logo system', 'Colour and font palette', 'Brand guidelines', 'Stationery', 'Social templates'],
    tools: ['Illustrator', 'Figma', 'InDesign'], time: '2-4 weeks', from: 39999, metric: ['180+', 'brands designed'],
  },
  {
    id: 'svc-seo', icon: IconSearch, t: 'SEO', page: '/seo',
    s: 'Be the first result your customer clicks.',
    what: 'We fix technical problems, improve your pages, write content people search for and build quality links, so you rank higher on Google in every city and language you target.',
    how: ['Full site audit and keyword research', 'Fix speed, errors and on-page SEO', 'Publish content and local pages monthly', 'Build links and report rankings monthly'],
    get: ['SEO audit', 'Keyword plan', 'On-page fixes', 'Google Business Profile', 'Monthly ranking report'],
    tools: ['Search Console', 'Ahrefs', 'Semrush', 'Screaming Frog'], time: 'Monthly, results in 3-6 months', from: 14999, metric: ['+214%', 'average organic traffic'],
  },
  {
    id: 'svc-smo', icon: IconShare, t: 'Social media (SMO)', page: null,
    s: 'Feeds people stop scrolling for.',
    what: 'We plan, design and post your content on Instagram, Facebook, LinkedIn and YouTube, reply to comments and grow real followers.',
    how: ['Audit profiles and competitors', 'Monthly content calendar for approval', 'Design posts, reels and stories', 'Post, engage and report every month'],
    get: ['Content calendar', 'Posts, reels and stories', 'Profile optimisation', 'Community replies', 'Monthly report'],
    tools: ['Meta Business Suite', 'Canva', 'CapCut', 'Buffer'], time: 'Monthly', from: 12999, metric: ['1.2M', 'monthly reach for one client'],
  },
  {
    id: 'svc-ads', icon: IconChart, t: 'Digital marketing & ads', page: null,
    s: 'Google and Meta ads that bring leads and sales.',
    what: 'We run Google Search, Meta and LinkedIn ad campaigns, write the ads, design creatives, track every lead and tune campaigns weekly against real revenue.',
    how: ['Set goals, audience and budget', 'Set up tracking, pixels and landing page', 'Launch ads with A/B creatives', 'Optimise weekly and report on cost per lead'],
    get: ['Campaign setup', 'Ad copy and creatives', 'Conversion tracking', 'Weekly optimisation', 'Lead and ROI report'],
    tools: ['Google Ads', 'Meta Ads', 'GA4', 'Tag Manager'], time: 'Monthly', from: 14999, metric: ['3.8x', 'average return on ad spend'],
  },
  {
    id: 'svc-content', icon: IconMail, t: 'Content & email marketing', page: null,
    s: 'Words that sell, and emails people open.',
    what: 'We write website copy, blogs, product descriptions and set up automated email flows like welcome, abandoned cart and win-back emails.',
    how: ['Understand your audience and voice', 'Plan topics and email flows', 'Write, design and schedule', 'Measure opens, clicks and sales'],
    get: ['Website copy', 'SEO blogs', 'Email templates', 'Automated flows', 'Monthly report'],
    tools: ['Mailchimp', 'Klaviyo', 'Grammarly', 'Notion'], time: 'Per project or monthly', from: 7999, metric: ['22%', 'of store revenue from email'],
  },
  {
    id: 'svc-care', icon: IconShield, t: 'Hosting, maintenance & support', page: null,
    s: 'We keep your site and app fast, safe and updated.',
    what: 'After launch we handle hosting, backups, security, updates, small changes and uptime monitoring, so you never worry about your website or app going down.',
    how: ['Move to fast, secure hosting', 'Daily backups and security scans', 'Monthly updates and small changes', 'Uptime monitoring with alerts'],
    get: ['Managed hosting', 'Daily backups', 'Security and SSL', 'Monthly updates', 'Priority support'],
    tools: ['AWS', 'DigitalOcean', 'Cloudflare', 'UptimeRobot'], time: 'Monthly', from: 2999, metric: ['99.9%', 'uptime'],
  },
]

const MODELS = [
  { icon: IconTag, t: 'Fixed-price project', d: 'Scope and price agreed before we start. Best for websites, apps and design projects with a clear goal.', p: 'Pay in 2-4 milestones' },
  { icon: IconClock, t: 'Monthly retainer', d: 'A set amount of work every month, like SEO, social media, ads or maintenance.', p: 'Pay monthly, cancel with 30 days notice' },
  { icon: IconUsers, t: 'Dedicated team', d: 'Your own designers and developers working full time on your product, managed by us.', p: 'Monthly per team member' },
  { icon: IconZap, t: 'Hourly / on-demand', d: 'For small changes and quick fixes. Buy a block of hours and use them when needed.', p: 'From ₹1,200 per hour' },
]

const INDUSTRIES = [
  { t: 'Restaurants & cafés', d: 'Ordering apps, POS, menus, Zomato-style websites' },
  { t: 'Retail & D2C brands', d: 'Online stores, packaging, social media, ads' },
  { t: 'Healthcare & clinics', d: 'Appointment apps, telemedicine, local SEO' },
  { t: 'Education & coaching', d: 'E-learning apps, school ERP, admissions ads' },
  { t: 'Real estate', d: 'Property listing sites, lead ads, brochures' },
  { t: 'Finance & loans', d: 'Loan apps, KYC portals, calculators' },
  { t: 'Travel & tourism', d: 'Tour booking sites, multilingual pages, packages' },
  { t: 'Logistics & delivery', d: 'Tracking apps, driver apps, dashboards' },
  { t: 'Manufacturing & B2B', d: 'Catalogue sites, export websites, CRM apps' },
  { t: 'Beauty & salons', d: 'Booking apps, Instagram growth, branding' },
  { t: 'Events & entertainment', d: 'Ticketing, QR entry apps, promo videos' },
  { t: 'NGOs & communities', d: 'Donation sites, member apps, campaigns' },
]

const BUNDLES = [
  { name: 'Startup launch kit', price: 59999, for: 'Everything a new business needs to go live.', feats: ['Logo and brand identity', '5-page business website', 'Google Business Profile', 'Social media profile kit', '10 launch posts'] },
  { name: 'Growth bundle', price: 49999, note: 'per month', popular: true, for: 'Steady leads and sales every month.', feats: ['SEO (20 keywords)', 'Social media: 20 posts + 4 reels', 'Google and Meta ads management', 'Landing page updates', 'Monthly growth report'] },
  { name: 'Go-global bundle', price: 189999, for: 'Sell in new countries and languages.', feats: ['Multilingual website (3 languages)', 'Android + iOS app (Flutter)', 'Multilingual SEO setup', 'Local payments', '3 months of care included'] },
]

const STEPS = [
  { t: 'Free consultation', w: 'Day 1', d: 'A 20-minute call to understand your business, goals and budget.' },
  { t: 'Proposal & quote', w: 'Day 2-3', d: 'A written plan with scope, timeline and a fixed price.' },
  { t: 'Kick-off', w: 'Week 1', d: 'One project manager, a shared chat group and a weekly update call.' },
  { t: 'Design & build', w: 'Weeks 1-8', d: 'You see progress on staging links and approve each stage.' },
  { t: 'Launch', w: 'Go-live day', d: 'Final checks, go live, and full handover of files and logins.' },
  { t: 'Grow & support', w: 'Ongoing', d: 'Free support period, then monthly care, SEO or marketing if you want.' },
]

const FAQ = [
  { q: 'Can I take just one service?', a: 'Yes. You can hire us for a single service, like a logo or SEO, or combine several. Bundles simply save you money when you need more than one.' },
  { q: 'Will one person manage my project?', a: 'Yes. Every client gets one project manager who coordinates designers, developers and marketers, so you only talk to one person.' },
  { q: 'How do you keep me updated?', a: 'A shared WhatsApp or Slack group, a weekly update call, and staging links where you can see the work at any time.' },
  { q: 'Do you work with clients outside India?', a: 'Yes. We work with clients in 28 countries. We bill in INR, USD, EUR or AED and schedule calls in your time zone.' },
  { q: 'What if I am not happy with the work?', a: 'Every design stage includes revision rounds, and you approve each stage before we move on, so there are no surprises at the end.' },
  { q: 'Are prices including GST?', a: 'All prices shown are starting prices in Indian rupees, exclusive of 18% GST. Your final quote is fixed after the consultation.' },
]

/* =========================================================
   Hero visual: service constellation
   ========================================================= */
const ORBIT_A = SERVICES.slice(0, 6)
const ORBIT_B = SERVICES.slice(6)

function Constellation() {
  return (
    <div className="wp-visual sv-visual" aria-hidden="true">
      <div className="sv-glow" />
      <div className="sv-core">
        <span>One team</span>
        <b>12 services</b>
      </div>
      {[ORBIT_A, ORBIT_B].map((ring, r) => (
        <div key={r} className={`sv-ring sv-ring-${r}`}>
          {ring.map((s, i) => {
            const Icon = s.icon
            return (
              <span key={s.id} style={{ '--a': `${(360 / ring.length) * i}deg` }}>
                <em><Icon /><i>{s.t.split(' ')[0]}</i></em>
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* =========================================================
   Sticky service index
   ========================================================= */
function ServiceIndex() {
  const [active, setActive] = useState(SERVICES[0].id)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SERVICES.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="sv-index-wrap">
      <nav className="sv-index glass" aria-label="Services on this page">
        {SERVICES.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''} onClick={(e) => { e.preventDefault(); scrollToId(s.id) }}>
            {active === s.id && <motion.span layoutId="sv-index-pill" className="sv-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span>{String(i + 1).padStart(2, '0')} {s.t}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

/* =========================================================
   One service, fully explained
   ========================================================= */
function ServiceBlock({ s, i }) {
  const go = useGo()
  const Icon = s.icon
  return (
    <section className={`sv-block ${i % 2 ? 'flip' : ''}`} id={s.id}>
      <div className="container sv-block-grid">
        <div className="sv-copy">
          <Reveal className="sv-num"><span>{String(i + 1).padStart(2, '0')}</span><i /></Reveal>
          <SplitText as="h2" className="h2 sv-title" text={s.t} inView />
          <Reveal delay={0.05}><p className="sv-sub">{s.s}</p></Reveal>
          <Reveal delay={0.1}><p className="lead sv-what">{s.what}</p></Reveal>

          <Reveal delay={0.15} className="sv-how">
            <h3>How we do it</h3>
            <ol>
              {s.how.map((h, k) => (
                <li key={h}><span>{k + 1}</span>{h}</li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.2} className="sv-ctas">
            {s.page ? (
              <a href={s.page} className="btn btn-primary" onClick={(e) => { e.preventDefault(); go(s.page) }}>Full details and pricing <IconArrow /></a>
            ) : (
              <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); go('contact') }}>Get a quote <IconArrow /></a>
            )}
          </Reveal>
        </div>

        <Reveal className="sv-side" delay={0.1} y={60}>
          <TiltCard className="sv-card glass" intensity={6}>
            <div className="sv-card-top">
              <span className="sv-card-ic"><Icon /></span>
              <div className="sv-metric"><strong>{s.metric[0]}</strong><small>{s.metric[1]}</small></div>
            </div>

            <h4>What you get</h4>
            <ul className="sv-get">{s.get.map((g) => <li key={g}><IconCheck />{g}</li>)}</ul>

            <h4>Tools we use</h4>
            <div className="sv-tools">{s.tools.map((t) => <span key={t}>{t}</span>)}</div>

            <div className="sv-facts">
              <div><small>Timeline</small><b>{s.time}</b></div>
              <div><small>Starts at</small><b className="lime">{inr(s.from)}{['svc-seo', 'svc-smo', 'svc-ads', 'svc-care'].includes(s.id) ? '/mo' : ''}</b></div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   Sections: engagement models, industries, bundles
   ========================================================= */
function Models() {
  return (
    <section className="section" id="models">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Ways to work with us</span></Reveal>
          <SplitText as="h2" className="h2" text="Pick the way that suits your budget." inView />
        </div>
        <div className="sv-models">
          {MODELS.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal key={m.t} delay={i * 0.07} className="sv-model glass gloss">
                <span className="sv-card-ic"><Icon /></span>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
                <small>{m.p}</small>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Industries() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="industries">
      <div className="container sv-ind-grid">
        <div>
          <Reveal><span className="kicker">Industries</span></Reveal>
          <SplitText as="h2" className="h2" text="We know your business, not just code." inView />
          <Reveal delay={0.1}><p className="lead">Tap an industry to see what we usually build for it.</p></Reveal>
          <AnimatePresence mode="wait">
            <motion.div key={open} className="sv-ind-detail glass gloss" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <small>What we build for</small>
              <strong>{INDUSTRIES[open].t}</strong>
              <p>{INDUSTRIES[open].d}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <Reveal className="sv-inds" delay={0.1}>
          {INDUSTRIES.map((x, i) => (
            <button key={x.t} className={open === i ? 'on' : ''} onClick={() => setOpen(i)} onMouseEnter={() => setOpen(i)}>{x.t}</button>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Bundles() {
  const go = useGo()
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Bundles</span></Reveal>
          <SplitText as="h2" className="h2" text="Need more than one service? Save with a bundle." inView />
          <Reveal delay={0.1}><p className="lead">Example bundles. Prices in Indian rupees, exclusive of 18% GST. We can also build a custom bundle for you.</p></Reveal>
        </div>
        <div className="sv-bundles">
          {BUNDLES.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1} className={`wp-plan glass gloss ${b.popular ? 'is-popular' : ''}`}>
              {b.popular && <span className="plan-badge">Most popular</span>}
              <h3>{b.name}</h3>
              <p className="plan-for">{b.for}</p>
              <div className="plan-price"><strong>{inr(b.price)}</strong><span>{b.note || 'one-time'} + GST</span></div>
              <ul>{b.feats.map((f) => <li key={f}><IconCheck />{f}</li>)}</ul>
              <a href="#contact" className={`btn ${b.popular ? 'btn-primary' : 'btn-ghost'}`} onClick={(e) => { e.preventDefault(); go('contact') }}>
                Get this bundle <IconArrow />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Page
   ========================================================= */
export default function ServicesPage() {
  useEffect(() => { document.title = 'Our services — Orbitra' }, [])

  return (
    <div className="service-page services-page">
      <PageHero
        crumb="Services"
        lines={['Everything your', 'business needs', 'to grow online.']}
        lead="Websites, apps, design, branding, SEO, social media, ads, content and support. Twelve services, one team, and every one explained below: what it is, how we do it and what it costs."
        visual={<Constellation />}
        stats={STATS}
        primary="Get a free consultation"
        secondary="See bundles"
      />
      <ServiceIndex />
      {SERVICES.map((s, i) => <ServiceBlock key={s.id} s={s} i={i} />)}
      <Models />
      <Industries />
      <Steps kicker="How a project runs" title="From first call to growth, step by step." steps={STEPS} />
      <Bundles />
      <Faq title="Questions about our services." items={FAQ} />
      <Contact defaultService="Website" />
    </div>
  )
}