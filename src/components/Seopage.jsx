import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Contact from './Contact'
import { Faq, PageHero, Steps } from './PageBlocks'
import {
  IconArrow, IconBag, IconChart, IconCheck, IconGlobe, IconLayers, IconPen, IconPhone,
  IconSearch, IconShare, IconZap,
} from './Icons'
import { useGo } from '../utils/useGo'
import './SeoPage.css'

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/* =========================================================
   Content
   ========================================================= */
const STATS = [
  { to: 214, prefix: '+', suffix: '%', label: 'average organic traffic growth' },
  { to: 340, suffix: '+', label: 'keywords on page one' },
  { to: 9, label: 'cities ranked for one clinic' },
  { to: 6, label: 'months to strong results' },
]

const HOW_GOOGLE_WORKS = [
  { icon: IconSearch, t: 'Crawl', d: 'Google’s bot (Googlebot) visits your website and follows links to discover every page, much like a visitor clicking around.', tip: 'We make sure Google can reach every important page and skips the useless ones.' },
  { icon: IconLayers, t: 'Index', d: 'Google reads each page, understands what it is about and stores it in its huge library, called the index.', tip: 'We fix errors so your pages actually get stored, with clear titles and structure.' },
  { icon: IconChart, t: 'Rank', d: 'When someone searches, Google picks the most useful, trusted and fast pages from its index and orders them.', tip: 'We improve content, speed and trust so your pages are chosen first.' },
]

const SEO_TYPES = [
  {
    k: 'technical', icon: IconLayers, t: 'Technical SEO',
    what: 'Technical SEO makes sure search engines can find, read and store your website without problems. It is the foundation; without it, the rest does not work.',
    do: ['Fix crawl errors, broken links and redirects', 'Create XML sitemap and robots.txt', 'Improve page speed and Core Web Vitals', 'Add HTTPS, canonical tags and clean URLs', 'Make the site mobile-friendly'],
    eg: 'A store had 1,200 product pages but Google indexed only 300. After fixing duplicate URLs and the sitemap, 1,150 got indexed.',
    impact: 'High',
  },
  {
    k: 'onpage', icon: IconPen, t: 'On-page SEO',
    what: 'On-page SEO improves each page so it clearly answers what people search for, using the right words in the right places.',
    do: ['Keyword research for every page', 'Write titles and meta descriptions', 'Structure headings (H1, H2, H3)', 'Image alt text and file names', 'Internal links between related pages'],
    eg: 'Changing a page title from “Services” to “AC Repair in Pune | Same-Day Visit” moved it from position 23 to 5.',
    impact: 'High',
  },
  {
    k: 'content', icon: IconPen, t: 'Content SEO',
    what: 'Content SEO means publishing helpful pages and blogs that answer your customers’ questions, so Google sees you as an expert.',
    do: ['Topic and keyword plan', 'Blogs, guides and FAQs', 'Service and city landing pages', 'Update old posts', 'Optimise for featured snippets'],
    eg: 'Twelve how-to guides for a coaching institute brought 18,000 monthly visitors and 140 admission enquiries.',
    impact: 'High',
  },
  {
    k: 'offpage', icon: IconShare, t: 'Off-page SEO & links',
    what: 'Off-page SEO builds your reputation outside your website, mainly through links from other trusted sites. Each good link is like a recommendation.',
    do: ['Guest posts on relevant sites', 'Digital PR and news mentions', 'Business directory listings', 'Fix and reclaim broken links', 'No spam or paid link farms, ever'],
    eg: 'Ten links from industry blogs lifted a SaaS homepage from page three to the top five for its main keyword.',
    impact: 'Medium-high',
  },
  {
    k: 'local', icon: IconGlobe, t: 'Local SEO',
    what: 'Local SEO helps you appear in Google Maps and “near me” searches in your city. It is the most important SEO for shops, clinics, restaurants and services.',
    do: ['Set up and optimise Google Business Profile', 'Consistent name, address and phone everywhere', 'Get and reply to reviews', 'City and area landing pages', 'Local citations and listings'],
    eg: 'A dental clinic went from no map listing to the top 3 “map pack” in four Delhi areas in 10 weeks.',
    impact: 'Very high for local businesses',
  },
  {
    k: 'ecom', icon: IconBag, t: 'E-commerce SEO',
    what: 'E-commerce SEO gets your product and category pages found by shoppers searching to buy.',
    do: ['Category and product page optimisation', 'Product schema (price, stock, reviews)', 'Fix duplicate filter pages', 'Unique product descriptions', 'Google Merchant Center feed'],
    eg: 'Product schema added star ratings and prices in search results, raising click-through rate by 31%.',
    impact: 'High',
  },
  {
    k: 'intl', icon: IconGlobe, t: 'Multilingual & international SEO',
    what: 'International SEO helps you rank in different countries and languages, each with its own keywords and search habits.',
    do: ['hreflang tags for every language', 'Separate URLs like /hi/ or /ar/', 'Keyword research in each language', 'Translated meta tags', 'Country-specific Search Console'],
    eg: 'A Hindi version of a travel site brought 3.1x more traffic from non-English searches.',
    impact: 'High for global brands',
  },
  {
    k: 'mobile', icon: IconPhone, t: 'Mobile SEO & Core Web Vitals',
    what: 'Google ranks the mobile version of your site first. Core Web Vitals measure how fast and stable your pages feel on a phone.',
    do: ['LCP: main content loads under 2.5 s', 'INP: page responds to taps quickly', 'CLS: nothing jumps while loading', 'Image compression and WebP', 'Mobile-friendly layout and tap targets'],
    eg: 'Cutting load time from 6 s to 1.4 s reduced bounce rate by 42% and lifted rankings site-wide.',
    impact: 'Medium-high',
  },
  {
    k: 'ai', icon: IconZap, t: 'AI & voice search (AEO)',
    what: 'People now ask full questions to Google’s AI answers, ChatGPT-style assistants and voice search. Answer Engine Optimisation (AEO) helps your content get quoted in those answers.',
    do: ['Clear question-and-answer content', 'FAQ and HowTo schema', 'Short, direct answers near the top', 'Strong author and brand signals', 'Conversational keywords'],
    eg: 'FAQ sections with schema got a clinic quoted in Google’s AI overview for “best time for root canal”.',
    impact: 'Growing fast',
  },
]

const FACTORS = [
  { f: 'Helpful, relevant content', v: 95 },
  { f: 'Trust and quality backlinks', v: 85 },
  { f: 'Technical health and indexing', v: 80 },
  { f: 'Page speed and mobile experience', v: 70 },
  { f: 'Title, headings and on-page signals', v: 70 },
  { f: 'Reviews and local signals', v: 60 },
  { f: 'Click-through rate from search', v: 50 },
]

// Self-check tool
const CHECKS = [
  { k: 'ssl', q: 'Does your website start with https:// (padlock)?', fix: 'Install an SSL certificate. Google marks non-HTTPS sites as “Not secure”.', w: 8 },
  { k: 'mobile', q: 'Does it look good and work well on a phone?', fix: 'Make the layout responsive. Most searches happen on mobile.', w: 10 },
  { k: 'speed', q: 'Does your homepage load in under 3 seconds?', fix: 'Compress images, use caching and a faster host.', w: 10 },
  { k: 'gbp', q: 'Do you have a Google Business Profile with your address?', fix: 'Create and verify it to appear in Google Maps.', w: 10 },
  { k: 'gsc', q: 'Is your site added to Google Search Console?', fix: 'Add it so you can see errors and what you rank for.', w: 6 },
  { k: 'titles', q: 'Does every page have a unique title with a keyword?', fix: 'Write titles like “Service in City | Brand”.', w: 10 },
  { k: 'content', q: 'Do your pages have at least 300 words of useful text?', fix: 'Thin pages rarely rank. Explain your service fully.', w: 8 },
  { k: 'blog', q: 'Have you published a blog or guide in the last 3 months?', fix: 'Fresh helpful content grows traffic month after month.', w: 7 },
  { k: 'reviews', q: 'Do you have 20+ Google reviews?', fix: 'Ask happy customers for reviews and reply to all of them.', w: 8 },
  { k: 'alt', q: 'Do your images have alt text?', fix: 'Describe images in alt text for Google Images and accessibility.', w: 5 },
  { k: 'links', q: 'Do other websites link to yours?', fix: 'Get listed in directories and earn links from industry sites.', w: 10 },
  { k: 'analytics', q: 'Do you track visitors with Google Analytics?', fix: 'Set up GA4 so you can measure what SEO brings in.', w: 8 },
]

const GLOSSARY = [
  { t: 'SEO', d: 'Search Engine Optimisation: improving your website so it appears higher in free (organic) Google results.' },
  { t: 'SERP', d: 'Search Engine Results Page: the page Google shows after you search.' },
  { t: 'Keyword', d: 'The words people type into Google, like “cake shop near me”.' },
  { t: 'Long-tail keyword', d: 'A longer, specific search like “eggless birthday cake in Noida”. Less competition, more ready-to-buy visitors.' },
  { t: 'Organic traffic', d: 'Visitors who come from free search results, not paid ads.' },
  { t: 'Meta title', d: 'The blue clickable headline of your page in Google results.' },
  { t: 'Meta description', d: 'The short grey text under the title in search results. It does not affect ranking directly but drives clicks.' },
  { t: 'Backlink', d: 'A link from another website to yours. Quality backlinks act like votes of trust.' },
  { t: 'Anchor text', d: 'The clickable words of a link. It tells Google what the linked page is about.' },
  { t: 'Domain Authority', d: 'A score (from tools like Moz or Ahrefs) estimating how strong a website is. Not used by Google itself, but a useful guide.' },
  { t: 'Index', d: 'Google’s database of pages. If a page is not indexed, it cannot appear in results.' },
  { t: 'Crawl', d: 'When Googlebot visits and reads your pages.' },
  { t: 'Sitemap', d: 'A file listing all your important pages so Google can find them quickly.' },
  { t: 'robots.txt', d: 'A file telling search engines which parts of your site not to crawl.' },
  { t: 'Canonical tag', d: 'Tells Google which version of a duplicate page is the main one.' },
  { t: 'hreflang', d: 'A tag telling Google which language and country each page version is for.' },
  { t: 'Schema markup', d: 'Hidden code that describes your content (product, review, FAQ) so Google can show rich results like stars and prices.' },
  { t: 'Core Web Vitals', d: 'Google’s speed and stability scores: LCP (loading), INP (responsiveness) and CLS (layout shifts).' },
  { t: 'CTR', d: 'Click-through rate: the percentage of people who see your result and click it.' },
  { t: 'Bounce rate', d: 'The share of visitors who leave after seeing only one page.' },
  { t: 'Alt text', d: 'A short description of an image, read by Google and screen readers.' },
  { t: '301 redirect', d: 'A permanent redirect that sends visitors and ranking power from an old URL to a new one.' },
  { t: 'Google Business Profile', d: 'Your free business listing on Google Maps and local search.' },
  { t: 'Featured snippet', d: 'The answer box shown at the top of some Google results, also called position zero.' },
]

const MYTHS = [
  { m: 'SEO is a one-time job.', f: 'Google updates constantly and competitors keep improving. SEO works best as steady monthly work.' },
  { m: 'More keywords on a page means higher ranking.', f: 'Stuffing keywords hurts. Write naturally for people; use the main keyword in key places only.' },
  { m: 'Buying 1,000 backlinks will push me to #1.', f: 'Cheap spam links can get you penalised. A few links from real, relevant sites are worth far more.' },
  { m: 'Paid Google Ads improve my free rankings.', f: 'Ads and organic results are separate. Ads give instant traffic; SEO builds free traffic over time.' },
  { m: 'Anyone can guarantee the #1 position.', f: 'Nobody controls Google. Honest agencies promise a process and report real progress, not guaranteed spots.' },
]

const RESULTS = [
  { n: 'Medline Clinics', type: 'Local SEO · Healthcare', before: 'No map listing', after: 'Top 3 in 9 cities', m: '+380% appointment calls' },
  { n: 'Nomad Threads', type: 'E-commerce SEO · Fashion', before: '2,100 visits/month', after: '9,800 visits/month', m: '+4.6x organic revenue' },
  { n: 'Saffron Stays', type: 'Multilingual SEO · Travel', before: 'English only', after: '6 languages ranking', m: '+180% direct bookings' },
]

const STEPS = [
  { t: 'Audit', w: 'Month 1', d: 'Full technical audit, competitor study and keyword research. You get a clear action plan.' },
  { t: 'Fix foundations', w: 'Month 1-2', d: 'Speed, errors, indexing, titles, schema and Google Business Profile fixed.' },
  { t: 'Content', w: 'Month 2 onwards', d: 'New service pages, city pages and blogs targeting buying keywords.' },
  { t: 'Authority', w: 'Month 3 onwards', d: 'Quality links, listings, PR and reviews to build trust.' },
  { t: 'Track', w: 'Every month', d: 'Ranking, traffic and lead report in plain words, with next month’s plan.' },
  { t: 'Grow', w: 'Month 6+', d: 'Scale what works: more keywords, more cities, more languages.' },
]

const PLANS = [
  { name: 'Local SEO', price: 14999, note: 'per month', for: 'Shops, clinics, restaurants and local services.', feats: ['Google Business Profile management', '10 target keywords', '1 city', 'On-page and technical fixes', '2 blogs per month', 'Review strategy', 'Monthly report'] },
  { name: 'Growth SEO', price: 29999, note: 'per month', popular: true, for: 'Businesses that want steady leads from Google.', feats: ['30 target keywords', 'Up to 5 cities', 'Full technical SEO', '4 blogs or landing pages per month', 'Quality link building', 'Core Web Vitals optimisation', 'Monthly call and report'] },
  { name: 'Enterprise / e-commerce', price: 59999, note: 'per month', for: 'Large sites, online stores and multilingual SEO.', feats: ['100+ target keywords', 'Unlimited cities or countries', 'E-commerce and schema SEO', '8+ content pieces per month', 'Digital PR', 'Multilingual SEO', 'Dedicated SEO manager'] },
]
const EXTRAS = [
  ['One-time SEO audit (detailed report)', 9999],
  ['Google Business Profile setup', 4999],
  ['Website speed optimisation', 14999],
  ['SEO blog (1,000 words)', 2499],
  ['Schema markup setup', 7999],
  ['Website migration without losing rankings', 19999],
]

const FAQ = [
  { q: 'How long does SEO take to show results?', a: 'Quick technical fixes can show changes in 4 to 8 weeks. Strong, steady growth usually takes 3 to 6 months, depending on your competition and how old your website is.' },
  { q: 'Can you guarantee the #1 position on Google?', a: 'No honest agency can, because nobody controls Google. We guarantee the work, full transparency and monthly reports showing real progress in rankings, traffic and leads.' },
  { q: 'What is the difference between SEO and Google Ads?', a: 'Ads give instant traffic but stop the moment you stop paying. SEO takes longer but brings free traffic that keeps growing. Most businesses do best with both.' },
  { q: 'Do I need to sign a long contract?', a: 'No. Our plans are month to month with 30 days notice. We do recommend at least 6 months to see the full benefit.' },
  { q: 'Will you need access to my website?', a: 'Yes, admin access to your website, Google Search Console and Analytics. We never change design or content without telling you first.' },
  { q: 'Do you do SEO for Hindi and other languages?', a: 'Yes. We do keyword research and content in Hindi, regional Indian languages and 40+ international languages.' },
]

/* =========================================================
   Hero visual: a search where your site climbs to #1
   ========================================================= */
const QUERIES = ['best dentist near me', 'ac repair in pune', 'buy running shoes online', 'cafe in connaught place']
const RIVALS = ['citylistings.in', 'bigdirectory.com', 'reviewhub.in', 'localpages.co', 'servicefinder.in']

function SearchVisual() {
  const [q, setQ] = useState(0)
  const [typed, setTyped] = useState('')
  const [pos, setPos] = useState(5)

  // Type the query, then climb the ranking, then move to the next query
  useEffect(() => {
    const text = QUERIES[q]
    let i = 0
    setTyped('')
    setPos(5)
    const typer = setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(typer)
    }, 60)
    const climb = [setTimeout(() => setPos(3), 1900), setTimeout(() => setPos(1), 2800), setTimeout(() => setPos(0), 3600)]
    const next = setTimeout(() => setQ((x) => (x + 1) % QUERIES.length), 6200)
    return () => { clearInterval(typer); climb.forEach(clearTimeout); clearTimeout(next) }
  }, [q])

  const order = [...RIVALS]
  order.splice(pos, 0, 'YOU')

  return (
    <div className="wp-visual seo-visual" aria-hidden="true">
      <div className="seo-glow" />
      <div className="seo-serp glass gloss">
        <div className="seo-bar">
          <IconSearch />
          <span>{typed}<i className="seo-caret" /></span>
        </div>
        <ol className="seo-results">
          {order.slice(0, 6).map((r, i) => (
            <motion.li key={r} layout transition={{ type: 'spring', stiffness: 200, damping: 24 }} className={r === 'YOU' ? 'you' : ''}>
              <span className="seo-pos">{i + 1}</span>
              <div>
                <small>{r === 'YOU' ? 'yourbrand.in' : r}</small>
                <b>{r === 'YOU' ? 'Your Business: Trusted, Fast, Near You' : 'Listing of top providers in your area'}</b>
                <i />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
      <motion.div className="seo-badge glass" key={pos === 0 ? 'top' : 'climb'} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
        <small>Your position</small>
        <strong>#{pos + 1}</strong>
      </motion.div>
    </div>
  )
}

/* =========================================================
   Sections
   ========================================================= */
function WhatIsSeo() {
  return (
    <section className="section" id="what-is-seo">
      <div className="container">
        <div className="seo-intro">
          <div>
            <Reveal><span className="kicker">SEO explained</span></Reveal>
            <SplitText as="h2" className="h2" text="What is SEO, in plain words?" inView />
          </div>
          <Reveal delay={0.1} className="seo-intro-text">
            <p className="lead">SEO (Search Engine Optimisation) is the work of making your website show up higher in Google’s free results when people search for what you sell.</p>
            <p className="seo-p">Around 9 out of 10 people never go past the first page of Google, and the top three results get most of the clicks. If customers search “your service + your city” and find a competitor first, that is a customer lost every day. SEO fixes that, and unlike ads, the traffic keeps coming without paying for every click.</p>
          </Reveal>
        </div>

        <h3 className="seo-sub">How Google decides who ranks: 3 steps</h3>
        <div className="seo-flow">
          {HOW_GOOGLE_WORKS.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.t} delay={i * 0.12} className="seo-flow-card glass gloss">
                <div className="seo-flow-top"><span className="seo-ic"><Icon /></span><span className="seo-step">Step {i + 1}</span></div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
                <small><IconCheck />{s.tip}</small>
                {i < HOW_GOOGLE_WORKS.length - 1 && <span className="seo-flow-arrow" aria-hidden="true"><IconArrow /></span>}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SeoTypes() {
  const [k, setK] = useState(SEO_TYPES[0].k)
  const t = SEO_TYPES.find((x) => x.k === k)
  const i = SEO_TYPES.indexOf(t)
  const Icon = t.icon
  return (
    <section className="section" id="types">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Types of SEO</span></Reveal>
          <SplitText as="h2" className="h2" text="Nine kinds of SEO, and what we do in each." inView />
          <Reveal delay={0.1}><p className="lead">Pick a type to see what it means, the exact work we do and a real example of the result.</p></Reveal>
        </div>

        <div className="seo-types">
          <Reveal className="seo-type-list" role="tablist" aria-label="Types of SEO">
            {SEO_TYPES.map((x) => {
              const I = x.icon
              return (
                <button key={x.k} role="tab" aria-selected={k === x.k} className={k === x.k ? 'on' : ''} onClick={() => setK(x.k)}>
                  {k === x.k && <motion.span layoutId="seo-type-pill" className="seo-type-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="seo-ic sm"><I /></span>
                  <b>{x.t}</b>
                </button>
              )
            })}
          </Reveal>

          <Reveal className="seo-type-detail glass gloss" delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div key={t.k} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <div className="seo-type-head">
                  <span className="seo-ic big"><Icon /></span>
                  <div>
                    <small>{i + 1} of {SEO_TYPES.length} · Impact: {t.impact}</small>
                    <h3>{t.t}</h3>
                  </div>
                </div>
                <h4>What it is</h4>
                <p>{t.what}</p>
                <h4>What we do</h4>
                <ul>{t.do.map((d) => <li key={d}><IconCheck />{d}</li>)}</ul>
                <div className="seo-example">
                  <small>Real example</small>
                  <p>{t.eg}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Factors() {
  return (
    <section className="section" id="factors">
      <div className="container seo-factors-grid">
        <div>
          <Reveal><span className="kicker">What moves rankings</span></Reveal>
          <SplitText as="h2" className="h2" text="Where we spend effort, and why." inView />
          <Reveal delay={0.1}>
            <p className="lead">Google uses hundreds of signals and never publishes exact weights. This is how we prioritise work on a typical project, based on what has moved rankings most for our clients.</p>
          </Reveal>
        </div>
        <Reveal className="seo-factors glass gloss" delay={0.1}>
          {FACTORS.map((f, i) => (
            <div key={f.f} className="seo-factor">
              <div className="seo-factor-top"><span>{f.f}</span><b>{f.v >= 80 ? 'Very high' : f.v >= 65 ? 'High' : 'Medium'}</b></div>
              <div className="seo-factor-bar">
                <motion.i initial={{ width: 0 }} whileInView={{ width: `${f.v}%` }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </div>
          ))}
          <p className="seo-factors-note">Relative priority, not official Google data.</p>
        </Reveal>
      </div>
    </section>
  )
}

function SelfCheck() {
  const go = useGo()
  const [ans, setAns] = useState({})
  const total = CHECKS.reduce((s, c) => s + c.w, 0)
  const score = Math.round((CHECKS.reduce((s, c) => s + (ans[c.k] === 'yes' ? c.w : 0), 0) / total) * 100)
  const answered = Object.keys(ans).length
  const todo = CHECKS.filter((c) => ans[c.k] === 'no')
  const label = score >= 80 ? 'Great shape' : score >= 55 ? 'Good start, room to grow' : 'Needs attention'
  const C = 2 * Math.PI * 52

  return (
    <section className="section" id="check">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Free self-check</span></Reveal>
          <SplitText as="h2" className="h2" text="Check your website’s SEO in one minute." inView />
          <Reveal delay={0.1}><p className="lead">Answer 12 quick questions. You get a score and a list of what to fix first. Nothing is sent anywhere.</p></Reveal>
        </div>

        <div className="seo-check">
          <Reveal className="seo-check-list glass gloss">
            {CHECKS.map((c, i) => (
              <div key={c.k} className={`seo-q ${ans[c.k] || ''}`}>
                <span className="seo-q-n">{i + 1}</span>
                <p>{c.q}</p>
                <div className="seo-q-btns" role="group" aria-label={c.q}>
                  <button className={ans[c.k] === 'yes' ? 'on yes' : ''} aria-pressed={ans[c.k] === 'yes'} onClick={() => setAns({ ...ans, [c.k]: 'yes' })}>Yes</button>
                  <button className={ans[c.k] === 'no' ? 'on no' : ''} aria-pressed={ans[c.k] === 'no'} onClick={() => setAns({ ...ans, [c.k]: 'no' })}>No</button>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="seo-check-result glass gloss" delay={0.1}>
            <div className="seo-gauge">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" className="g-bg" />
                <motion.circle cx="60" cy="60" r="52" className="g-fg" strokeDasharray={C} animate={{ strokeDashoffset: C * (1 - score / 100) }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
              </svg>
              <div><strong>{score}</strong><small>/ 100</small></div>
            </div>
            <p className="seo-score-label">{answered === 0 ? 'Answer the questions to see your score' : label}</p>
            <small className="seo-answered">{answered} of {CHECKS.length} answered</small>

            {todo.length > 0 && (
              <div className="seo-todo">
                <h4>Fix these first</h4>
                <ul>
                  {todo.sort((a, b) => b.w - a.w).map((c) => <li key={c.k}><span>!</span>{c.fix}</li>)}
                </ul>
              </div>
            )}
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); go('contact') }}>Get a free detailed audit <IconArrow /></a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section className="section" id="results">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="kicker">Results</span></Reveal>
          <SplitText as="h2" className="h2" text="Before and after our SEO." inView />
        </div>
        <div className="seo-results-grid">
          {RESULTS.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.1} className="seo-result glass gloss">
              <small>{r.type}</small>
              <h3>{r.n}</h3>
              <div className="seo-ba">
                <div><span>Before</span><b>{r.before}</b></div>
                <IconArrow />
                <div><span>After</span><b className="lime">{r.after}</b></div>
              </div>
              <p className="seo-result-m">{r.m}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Glossary() {
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    return GLOSSARY.filter((g) => !t || g.t.toLowerCase().includes(t) || g.d.toLowerCase().includes(t))
  }, [q])
  return (
    <section className="section" id="glossary">
      <div className="container">
        <div className="section-head seo-gl-head">
          <div>
            <Reveal><span className="kicker">SEO glossary</span></Reveal>
            <SplitText as="h2" className="h2" text="Every SEO word, explained simply." inView />
          </div>
          <Reveal delay={0.1} className="seo-gl-search">
            <IconSearch />
            <label className="sr-only" htmlFor="gl-search">Search SEO terms</label>
            <input id="gl-search" type="search" placeholder="Search a term, e.g. backlink" value={q} onChange={(e) => setQ(e.target.value)} />
          </Reveal>
        </div>
        <motion.div layout className="seo-gl">
          <AnimatePresence mode="popLayout">
            {list.map((g) => (
              <motion.div layout key={g.t} className="seo-term glass" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }}>
                <b>{g.t}</b>
                <p>{g.d}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="seo-empty">No term found. Ask us in the form below.</p>}

        <div className="seo-myths">
          <Reveal><h3 className="seo-sub">5 SEO myths, busted</h3></Reveal>
          <div className="seo-myth-grid">
            {MYTHS.map((m, i) => (
              <Reveal key={m.m} delay={i * 0.06} className="seo-myth glass gloss">
                <span className="seo-myth-tag">Myth</span>
                <p className="seo-myth-m">{m.m}</p>
                <span className="seo-myth-tag fact">Fact</span>
                <p>{m.f}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const go = useGo()
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">SEO pricing</span></Reveal>
          <SplitText as="h2" className="h2" text="Monthly plans, no long contracts." inView />
          <Reveal delay={0.1}><p className="lead">Prices in Indian rupees, exclusive of 18% GST. Month to month with 30 days notice. We recommend at least 6 months for strong results.</p></Reveal>
        </div>
        <div className="seo-plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className={`wp-plan glass gloss ${p.popular ? 'is-popular' : ''}`}>
              {p.popular && <span className="plan-badge">Most popular</span>}
              <h3>{p.name}</h3>
              <p className="plan-for">{p.for}</p>
              <div className="plan-price"><strong>{inr(p.price)}</strong><span>{p.note} + GST</span></div>
              <ul>{p.feats.map((f) => <li key={f}><IconCheck />{f}</li>)}</ul>
              <a href="#contact" className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'}`} onClick={(e) => { e.preventDefault(); go('contact') }}>Start with {p.name} <IconArrow /></a>
            </Reveal>
          ))}
        </div>
        <Reveal className="seo-extras glass gloss">
          <h3>One-time SEO services</h3>
          <ul>{EXTRAS.map(([n, p]) => <li key={n}><span>{n}</span><i /><b>{inr(p)}</b></li>)}</ul>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   Page
   ========================================================= */
export default function SeoPage() {
  useEffect(() => { document.title = 'SEO services explained — Orbitra' }, [])

  return (
    <div className="service-page">
      <PageHero
        crumb="SEO"
        lines={['Get found on Google', 'by customers', 'ready to buy.']}
        lead="Technical, on-page, content, local, e-commerce and multilingual SEO, explained in plain words. See exactly what we do, check your own site for free, and pick a monthly plan."
        visual={<SearchVisual />}
        stats={STATS}
        primary="Get a free SEO audit"
      />
      <WhatIsSeo />
      <SeoTypes />
      <Factors />
      <SelfCheck />
      <Steps kicker="Our SEO process" title="What happens month by month." steps={STEPS} />
      <Results />
      <Glossary />
      <Pricing />
      <Faq title="Questions about SEO." items={FAQ} />
      <Contact defaultService="SEO" />
    </div>
  )
}