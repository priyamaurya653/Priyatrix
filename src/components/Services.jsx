import Reveal from './Reveal'
import SplitText from './SplitText'
import TiltCard from './TiltCard'
import { IconArrow, IconBag, IconChart, IconDiamond, IconGlobe, IconPen, IconPhone, IconSearch, IconShare } from './Icons'
import './Services.css'

const services = [
  { icon: IconGlobe, title: 'Multilingual website development', desc: 'Fast, SEO-ready websites in every language your market needs, with right-to-left layouts, local currencies and copy written by native speakers.', tags: ['React / Next.js', 'Laravel', 'WordPress', 'hreflang'], wide: true, feature: true },
  { icon: IconPhone, title: 'Mobile apps', desc: 'iOS and Android apps with offline sync, payments and push notifications.', tags: ['Flutter', 'React Native', 'Kotlin'] },
  { icon: IconPen, title: 'UI/UX design', desc: 'Research, flows and design systems your developers can actually ship.', tags: ['Figma', 'Prototypes'] },
  { icon: IconSearch, title: 'SEO', desc: 'Technical audits, content and links that lift you in local search results.', tags: ['Audits', 'Local SEO'] },
  { icon: IconShare, title: 'Social media marketing', desc: 'Content calendars, reels and community care that grow real followers.', tags: ['Instagram', 'LinkedIn'] },
  { icon: IconBag, title: 'E-commerce', desc: 'Stores that load fast and convert, from product page to checkout, in every currency you sell in.', tags: ['Shopify', 'WooCommerce', 'Custom builds'], wide: true },
  { icon: IconChart, title: 'Digital marketing', desc: 'Google and Meta ads, email automation and one dashboard that shows what every campaign returns.', tags: ['Performance ads', 'Email', 'Analytics'], wide: true },
  { icon: IconDiamond, title: 'Branding', desc: 'Name, logo, colour and voice. A brand that holds up on a billboard and on a 40px app icon.', tags: ['Identity', 'Guidelines', 'Packaging'], wide: true },
]

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head svc-head">
          <div>
            <Reveal><span className="kicker">What we do</span></Reveal>
            <SplitText as="h2" className="h2" text="Eight disciplines, one team that ships." inView />
          </div>
          <Reveal delay={0.15}>
            <p className="lead">
              Pick one service or hand us the whole launch. Designers, engineers and marketers sit on the
              same project, so nothing gets lost between agencies.
            </p>
          </Reveal>
        </div>

        <div className="svc-grid">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={(i % 4) * 0.08} className={`svc-cell ${s.wide ? 'wide' : ''}`}>
                <TiltCard className={`svc-card glass ${s.feature ? 'is-feature' : ''}`} intensity={7} data-cursor>
                  <div className="svc-top">
                    <span className="svc-icon"><Icon /></span>
                    <span className="svc-arrow"><IconArrow /></span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="svc-tags">
                    {s.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                  </div>
                  {s.feature && (
                    <div className="svc-langs" aria-hidden="true">
                      {['EN', 'हिं', 'ES', 'عربي', '日本語', 'FR', 'DE', '中文'].map((l) => <span key={l}>{l}</span>)}
                    </div>
                  )}
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
