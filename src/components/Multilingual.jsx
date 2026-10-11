import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Counter from './Counter'
import { IconCheck } from './Icons'
import './Multilingual.css'

const LANGS = {
  en: { tab: 'EN', name: 'English', h: 'Fresh coffee, delivered every morning', p: 'Single-origin beans roasted this week.', b: 'Order now', price: '$12.00', dir: 'ltr' },
  hi: { tab: 'हिं', name: 'Hindi', h: 'ताज़ी कॉफ़ी, हर सुबह आपके दरवाज़े पर', p: 'इसी हफ़्ते भूनी गई सिंगल-ओरिजिन बीन्स।', b: 'अभी ऑर्डर करें', price: '₹999', dir: 'ltr' },
  es: { tab: 'ES', name: 'Spanish', h: 'Café recién tostado, cada mañana en tu puerta', p: 'Granos de origen único tostados esta semana.', b: 'Pedir ahora', price: '12,00 €', dir: 'ltr' },
  ar: { tab: 'عربي', name: 'Arabic', h: 'قهوة طازجة تصلك كل صباح', p: 'حبوب أحادية المصدر محمصة هذا الأسبوع.', b: 'اطلب الآن', price: '٤٥ ر.س', dir: 'rtl' },
  ja: { tab: '日本語', name: 'Japanese', h: '挽きたてのコーヒーを、毎朝お届け', p: '今週焙煎したシングルオリジン豆。', b: '今すぐ注文', price: '¥1,800', dir: 'ltr' },
  fr: { tab: 'FR', name: 'French', h: 'Du café frais, livré chaque matin', p: 'Des grains d’origine unique torréfiés cette semaine.', b: 'Commander', price: '12,00 €', dir: 'ltr' },
}
const KEYS = Object.keys(LANGS)

const features = [
  'Copy translated and reviewed by native speakers, not machine output',
  'Right-to-left layouts for Arabic, Urdu and Hebrew',
  'hreflang tags and keyword research for each market',
  'Local currency, date, phone and address formats',
]

export default function Multilingual() {
  const [lang, setLang] = useState('en')
  const [auto, setAuto] = useState(true)
  const d = LANGS[lang]

  // Cycle through languages until the visitor picks one
  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setLang((l) => KEYS[(KEYS.indexOf(l) + 1) % KEYS.length]), 3200)
    return () => clearInterval(id)
  }, [auto])

  const pick = (k) => { setAuto(false); setLang(k) }

  return (
    <section className="section multi" id="global">
      <div className="multi-glow" aria-hidden="true" />
      <div className="container multi-grid">
        <div className="multi-copy">
          <Reveal><span className="kicker">Global and multilingual</span></Reveal>
          <SplitText as="h2" className="h2" text="One website. Every market you sell to." inView />
          <Reveal delay={0.1}>
            <p className="lead">
              Translation is the easy part. We localise layouts, prices, search terms and checkout so a
              customer in Riyadh, Osaka or Pune feels the site was built for them.
            </p>
          </Reveal>

          <ul className="multi-list">
            {features.map((f, i) => (
              <Reveal as="li" key={f} delay={0.15 + i * 0.07}>
                <span className="ml-check"><IconCheck /></span>{f}
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="multi-stats">
            <div><strong><Counter to={32} suffix="+" /></strong><span>languages shipped</span></div>
            <div><strong><Counter to={28} /></strong><span>countries served</span></div>
            <div><strong><Counter to={3.1} decimals={1} suffix="x" /></strong><span>average lift in non-English traffic</span></div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="multi-demo-wrap">
          <div className="browser glass">
            <div className="browser-bar">
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
              <div className="url">
                <span className="lock" aria-hidden="true" />
                brewhaus.co/
                <AnimatePresence mode="wait">
                  <motion.span key={lang} className="url-lang" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.25 }}>
                    {lang}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="lang-tabs" role="tablist" aria-label="Preview language">
              {KEYS.map((k) => (
                <button key={k} role="tab" aria-selected={lang === k} className={lang === k ? 'is-active' : ''} onClick={() => pick(k)} title={LANGS[k].name}>
                  {lang === k && <motion.span layoutId="lang-pill" className="lang-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span>{LANGS[k].tab}</span>
                </button>
              ))}
            </div>

            <div className="browser-body" dir={d.dir}>
              <div className="product-art" aria-hidden="true">
                <span className="cup" /><span className="steam s1" /><span className="steam s2" /><span className="steam s3" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  className="product-copy"
                  initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  lang={lang}
                >
                  <h3>{d.h}</h3>
                  <p>{d.p}</p>
                  <div className="product-buy">
                    <span className="price">{d.price}</span>
                    <span className="fake-btn">{d.b}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="browser-foot">
              <span>{d.name}</span>
              <span>{d.dir === 'rtl' ? 'Right-to-left layout' : 'Left-to-right layout'}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
