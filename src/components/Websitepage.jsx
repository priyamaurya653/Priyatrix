import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import WebDev from '../components/WebDev'
import Contact from '../components/Contact'
import { Faq, Included, PageHero, Pricing, StackGrid, Steps, TypeGrid } from '../components/PageBlocks'
import { IconBag, IconGlobe, IconLayers, IconPen, IconUsers, IconZap } from '../components/Icons'
import './WebsitePage.css'

/* ---------------- Content ---------------- */
const STATS = [
  { to: 350, suffix: '+', label: 'websites launched' },
  { to: 0.9, decimals: 1, suffix: 's', label: 'average load time' },
  { to: 98, label: 'average speed score' },
  { to: 30, label: 'days of free support' },
]

const TYPES = [
  { icon: IconUsers, t: 'Business websites', d: 'Company sites that explain what you do in five seconds and bring in enquiries every week.', tags: ['5 to 20 pages', 'Lead forms'] },
  { icon: IconBag, t: 'E-commerce stores', d: 'Product pages, cart and checkout built to sell, with UPI, cards and cash on delivery.', tags: ['Shopify', 'WooCommerce', 'Custom'] },
  { icon: IconZap, t: 'Landing pages', d: 'One page, one campaign, one goal. Built in a week and tuned until it converts.', tags: ['Ads ready', 'A/B tests'] },
  { icon: IconLayers, t: 'Web apps and portals', d: 'Booking systems, dashboards and customer portals with logins and an admin panel.', tags: ['React', 'Laravel', 'APIs'] },
  { icon: IconGlobe, t: 'Multilingual websites', d: 'The same site in every language you sell in, with right-to-left layouts and local SEO.', tags: ['32+ languages', 'hreflang'] },
  { icon: IconPen, t: 'WordPress and CMS sites', d: 'Edit text, images and blog posts yourself, without calling a developer.', tags: ['WordPress', 'Headless CMS'] },
]

const INCLUDED = [
  'Mobile-first, responsive design', 'Speed score above 90', 'SSL certificate and security headers', 'Technical SEO setup',
  'Admin panel to edit content', 'Google Analytics and Search Console', 'WhatsApp and call buttons', 'Contact and enquiry forms',
  'Daily backups', 'Accessibility checks', 'Cookie and privacy pages', '30 days of free support',
]

const STACK = [
  { g: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Tailwind CSS'] },
  { g: 'Backend', items: ['Laravel', 'Node.js', 'PHP', 'MySQL'] },
  { g: 'CMS and stores', items: ['WordPress', 'Shopify', 'WooCommerce', 'Strapi'] },
  { g: 'Hosting', items: ['AWS', 'Vercel', 'DigitalOcean', 'cPanel'] },
]

const STEPS = [
  { t: 'Brief', w: 'Day 1 to 3', d: 'A call about your goals, audience and competitors. You get a fixed quote.' },
  { t: 'Sitemap and wireframes', w: 'Week 1', d: 'Every page planned on paper before anything is designed.' },
  { t: 'Design', w: 'Week 2', d: 'Full designs for desktop and mobile. Two rounds of changes included.' },
  { t: 'Development', w: 'Weeks 3 to 4', d: 'We build on a staging link you can open and check at any time.' },
  { t: 'Testing', w: 'Week 5', d: 'Speed, SEO, forms and every browser and phone size checked.' },
  { t: 'Launch', w: 'Week 5', d: 'Go live, connect analytics and hand over logins and a short training.' },
]

const PLANS = [
  { name: 'Starter', price: '₹24,999', note: 'one-time', for: 'For a new business that needs a clean, fast presence.', feats: ['Up to 5 pages', 'Mobile-first design', 'Contact form and WhatsApp button', 'Basic SEO setup', 'Live in 2 to 3 weeks'] },
  { name: 'Business', price: '₹59,999', note: 'one-time', popular: true, for: 'For growing companies that want leads every week.', feats: ['Up to 15 pages', 'Admin panel and blog', 'Full technical SEO', 'Analytics and conversion tracking', 'Speed score above 90', 'Live in 4 to 5 weeks'] },
  { name: 'Store or custom', price: 'From ₹1.2L', note: 'quoted per project', for: 'For online stores, web apps and multilingual sites.', feats: ['Unlimited products or pages', 'Payments and shipping', 'Custom features and APIs', 'Multilingual setup', 'Priority support'] },
]

const FAQ = [
  { q: 'How long does a website take?', a: 'Most business websites go live in 3 to 5 weeks. Online stores and web apps usually take 6 to 10 weeks, depending on features. You get a dated plan with your quote.' },
  { q: 'Will I be able to edit the website myself?', a: 'Yes. Every site comes with an admin panel where you can change text, images, blog posts and products. We also give you a short video guide.' },
  { q: 'Do I own the website and the code?', a: 'Yes. After the final payment, the design, code, domain and hosting accounts are all in your name.' },
  { q: 'Do you provide domain and hosting?', a: 'We can buy and set them up for you, or launch on the hosting you already have. Either way, the accounts stay in your name.' },
  { q: 'Is SEO included?', a: 'Every website ships with technical SEO: fast loading, clean URLs, meta tags, sitemap, schema and Search Console. Ongoing SEO for rankings is a separate monthly service.' },
  { q: 'What happens after launch?', a: 'You get 30 days of free fixes. After that you can pick a monthly care plan for updates, backups, security and small changes.' },
]

/* ---------------- Hero visual: responsive devices ---------------- */
function MiniSite({ compact = false }) {
  return (
    <div className={`mini ${compact ? 'is-compact' : ''}`}>
      <div className="mini-nav"><i /><span /><span /><span /></div>
      <div className="mini-hero"><b /><b /><em /></div>
      <div className="mini-cards"><i /><i /><i /></div>
    </div>
  )
}

function Devices() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 18 })
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <div className="wp-visual wp-devices" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} aria-hidden="true">
      <div className="dv-glow" />
      <motion.div className="dv-stage" style={{ rotateY: rotY, rotateX: rotX }}>
        <motion.div className="dv-desktop gloss" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <div className="dv-screen"><MiniSite /></div>
          <div className="dv-stand" />
        </motion.div>
        <motion.div className="dv-tablet gloss" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <MiniSite compact />
        </motion.div>
        <motion.div className="dv-phone gloss" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
          <MiniSite compact />
        </motion.div>
      </motion.div>

      <motion.div className="dv-badge b1 glass" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }} transition={{ opacity: { delay: 1.3 }, scale: { delay: 1.3 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}>
        <strong>0.9s</strong><span>page load</span>
      </motion.div>
      <motion.div className="dv-badge b2 glass" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }} transition={{ opacity: { delay: 1.5 }, scale: { delay: 1.5 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}>
        <strong>98</strong><span>speed score</span>
      </motion.div>
    </div>
  )
}

/* ---------------- Page ---------------- */
export default function WebsitePage() {
  useEffect(() => { document.title = 'Website development — Orbitra' }, [])

  return (
    <div className="service-page">
      <PageHero
        crumb="Website development"
        lines={['Websites that turn', 'visitors into', 'customers.']}
        lead="Fast, mobile-first websites, online stores and web apps, designed and coded by one team. Fixed price, clear timeline, and a site you can edit yourself."
        visual={<Devices />}
        stats={STATS}
      />
      <TypeGrid kicker="What we build" title="The right kind of website for your goal." items={TYPES} />
      <WebDev showPageLink={false} />
      <Included title="Every website ships with these." lead="No hidden extras. These come with every plan, from a five-page site to a full store." items={INCLUDED} />
      <StackGrid title="Built on tools that last." groups={STACK} />
      <Steps title="From brief to launch in about five weeks." steps={STEPS} />
      <Pricing title="Clear prices, agreed before we start." lead="Fixed quotes with no hourly billing. Pay in three parts: at kick-off, after design and at launch." plans={PLANS} />
      <Faq items={FAQ} />
      <Contact defaultService="Website" />
    </div>
  )
}