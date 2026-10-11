import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Magnetic from './Magnetic'
import { IconArrow, IconCall, IconCheck, IconMail } from './Icons'
import './Contact.css'

/* =========================================================
   Settings: change these to your real details
   ========================================================= */
const CONTACT = {
  email: 'hello@orbitra.studio',
  phone: '+91 00000 00000',
  whatsapp: '910000000000', // country code + number, no + or spaces
}

/* =========================================================
   One form for every service.
   Each service has its own extra questions, shown only when
   that service is selected. Add or edit services here.
   type: 'one'  = pick one chip
         'many' = pick many chips
         'text' = text box
   ========================================================= */
const SERVICES = [
  {
    k: 'Website',
    q: [
      { id: 'webType', label: 'Type of website', type: 'text', placeholder: 'e.g. business website, online store, school portal' },
      { id: 'webPages', label: 'Number of pages', type: 'one', options: ['1-5', '6-15', '16-40', '40+'] },
    ],
  },
  {
    k: 'Mobile app',
    q: [
      { id: 'appPlatform', label: 'Platform', type: 'one', options: ['Android', 'iOS', 'Both'] },
      { id: 'appType', label: 'What kind of app?', type: 'text', placeholder: 'e.g. food delivery, booking, e-commerce' },
    ],
  },
  {
    k: 'E-commerce',
    q: [
      { id: 'shopPlatform', label: 'Platform', type: 'one', options: ['Shopify', 'WooCommerce', 'Custom', 'Not sure'] },
      { id: 'shopProducts', label: 'Number of products', type: 'one', options: ['Under 50', '50-500', '500+'] },
    ],
  },
  {
    k: 'UI/UX design',
    q: [
      { id: 'uxFor', label: 'Design for', type: 'many', options: ['Website', 'Mobile app', 'Dashboard'] },
    ],
  },
  {
    k: 'Graphic design',
    q: [
      { id: 'gdItems', label: 'What do you need?', type: 'many', options: ['Logo', 'Social posts', 'Brochure / flyer', 'Packaging', 'Ads / banners', 'Video / motion'] },
    ],
  },
  {
    k: 'Branding',
    q: [
      { id: 'brandStage', label: 'Your stage', type: 'one', options: ['New brand', 'Rebrand', 'Brand guidelines only'] },
    ],
  },
  {
    k: 'SEO',
    q: [
      { id: 'seoSite', label: 'Your website URL', type: 'text', placeholder: 'https://' },
      { id: 'seoArea', label: 'Target area', type: 'one', options: ['My city', 'All India', 'International'] },
    ],
  },
  {
    k: 'Social media',
    q: [
      { id: 'smPlatforms', label: 'Platforms', type: 'many', options: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'X'] },
    ],
  },
  {
    k: 'Digital marketing',
    q: [
      { id: 'adsOn', label: 'Ads on', type: 'many', options: ['Google', 'Meta (FB + Insta)', 'LinkedIn'] },
      { id: 'adBudget', label: 'Monthly ad spend', type: 'one', options: ['Under ₹25k', '₹25k-1L', '₹1L+'] },
    ],
  },
  {
    k: 'Hosting & support',
    q: [
      { id: 'supSite', label: 'Current website or app link', type: 'text', placeholder: 'https://' },
    ],
  },
  { k: 'Something else', q: [] },
]

const REPLY_BY = ['Email', 'Call', 'WhatsApp']
const empty = { name: '', email: '', phone: '', company: '', budget: '', timeline: '', message: '' }

// Map old names from other pages to the new list
const ALIAS = { 'Mobile apps': 'Mobile app', 'UI/UX': 'UI/UX design', Ads: 'Digital marketing', Graphics: 'Graphic design', 'Multilingual website': 'Website' }

export default function Contact({ defaultService = 'Website', title = 'Let’s build what’s next.', compact = false }) {
  const start = [].concat(defaultService).map((s) => ALIAS[s] || s).filter((s) => SERVICES.some((x) => x.k === s))

  const [form, setForm] = useState(empty)
  const [services, setServices] = useState(start)
  const [answers, setAnswers] = useState({})
  const [replyBy, setReplyBy] = useState('Email')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggleService = (s) => setServices((list) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s]))
  const setAnswer = (id, v) => setAnswers((a) => ({ ...a, [id]: v }))
  const toggleAnswer = (id, v) => setAnswers((a) => {
    const cur = a[id] || []
    return { ...a, [id]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] }
  })

  const chosen = SERVICES.filter((s) => services.includes(s.k))

  // Everything in one clean object, ready to send to your backend
  const payload = useMemo(() => ({
    ...form,
    services,
    details: Object.fromEntries(
      chosen.flatMap((s) => s.q.map((q) => [`${s.k} – ${q.label}`, answers[q.id]]).filter(([, v]) => v && v.length))
    ),
    replyBy,
  }), [form, services, answers, replyBy, chosen])

  const validate = () => {
    const e = {}
    if (services.length === 0) e.services = 'Pick at least one service'
    if (!form.name.trim()) e.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter an email like name@company.com'
    if ((replyBy !== 'Email' || form.phone) && !/^[+\d\s-]{8,16}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (form.message.trim().length < 10) e.message = 'Tell us a little about the project (10+ characters)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    // TODO: connect your backend here, e.g.
    // await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    console.log('Enquiry', payload)
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
  }

  // Same enquiry as a WhatsApp message
  const whatsappLink = () => {
    const lines = [
      `Hi, I am ${form.name || '...'}${form.company ? ` from ${form.company}` : ''}.`,
      `Services: ${services.join(', ') || '-'}`,
      ...Object.entries(payload.details).map(([k, v]) => `${k}: ${[].concat(v).join(', ')}`),
      form.budget && `Budget: ${form.budget}`,
      form.timeline && `Timeline: ${form.timeline}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean)
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  const reset = () => {
    setForm(empty); setServices(start); setAnswers({}); setReplyBy('Email'); setErrors({}); setStatus('idle')
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className={`container contact-grid ${compact ? 'is-compact' : ''}`}>
        {!compact && (
        <div className="contact-copy">
          <Reveal><span className="kicker">Contact</span></Reveal>
          <SplitText as="h2" className="h2 contact-title" text={title} inView />
          <Reveal delay={0.1}>
            <p className="lead">One form for everything: website, app, design, SEO or marketing. Pick what you need, answer a few quick questions and we reply within one working day.</p>
          </Reveal>
          <Reveal delay={0.2} className="contact-links">
            <a href={`mailto:${CONTACT.email}`}><span><IconMail /></span>{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}><span><IconCall /></span>{CONTACT.phone}</a>
          </Reveal>
          <Reveal delay={0.25} className="ct-steps">
            {['Pick your services', 'Answer 2-3 quick questions', 'Get a quote in 24 hours'].map((s, i) => (
              <div key={s}><b>{i + 1}</b>{s}</div>
            ))}
          </Reveal>
          <Reveal delay={0.3} className="contact-avail">
            <i /> Taking on new projects this month
          </Reveal>
        </div>
        )}

        {compact && (
          <div className="section-head center ct-compact-head">
            <Reveal><span className="kicker">Project form</span></Reveal>
            <SplitText as="h2" className="h2" text={title} inView />
          </div>
        )}

        <Reveal delay={0.1} className="contact-card glass">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="done" className="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <motion.span className="sent-icon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}>
                  <IconCheck />
                </motion.span>
                <h3>Request received</h3>
                <p>Thanks, {form.name.split(' ')[0]}. We will {replyBy === 'Email' ? `email you at ${form.email}` : replyBy === 'Call' ? `call you on ${form.phone}` : `WhatsApp you on ${form.phone}`} within one working day.</p>
                <div className="ct-summary">
                  {services.map((s) => <span key={s}>{s}</span>)}
                  {form.budget && <span>{form.budget}</span>}
                  {form.timeline && <span>{form.timeline}</span>}
                </div>
                <button className="btn btn-ghost" onClick={reset}>Send another request</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                {/* 1. Services */}
                <fieldset className="field-group">
                  <legend><b className="ct-n">1</b> What do you need? <span className="ct-hint">Pick one or more</span></legend>
                  <div className="chips">
                    {SERVICES.map((s) => (
                      <button type="button" key={s.k} className={`pick ${services.includes(s.k) ? 'on' : ''}`} aria-pressed={services.includes(s.k)} onClick={() => toggleService(s.k)}>
                        {services.includes(s.k) && <IconCheck />}{s.k}
                      </button>
                    ))}
                  </div>
                  {errors.services && <span className="field-err">{errors.services}</span>}
                </fieldset>

                {/* 2. Questions for each selected service */}
                <AnimatePresence initial={false}>
                  {chosen.filter((s) => s.q.length).map((s) => (
                    <motion.div
                      key={s.k}
                      className="ct-block"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="ct-block-in">
                        <span className="ct-block-tag">{s.k}</span>
                        {s.q.map((q) => (
                          <div key={q.id} className="ct-q">
                            <label htmlFor={q.type === 'text' ? q.id : undefined}>{q.label}</label>
                            {q.type === 'text' ? (
                              <input id={q.id} className="ct-input" placeholder={q.placeholder} value={answers[q.id] || ''} onChange={(e) => setAnswer(q.id, e.target.value)} />
                            ) : (
                              <div className="chips">
                                {q.options.map((o) => {
                                  const on = q.type === 'many' ? (answers[q.id] || []).includes(o) : answers[q.id] === o
                                  return (
                                    <button type="button" key={o} className={`pick sm ${on ? 'on' : ''}`} aria-pressed={on}
                                      onClick={() => (q.type === 'many' ? toggleAnswer(q.id, o) : setAnswer(q.id, on ? '' : o))}>
                                      {o}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* 3. About you */}
                <fieldset className="field-group">
                  <legend><b className="ct-n">2</b> About you</legend>
                  <div className="ct-fields">
                    <div className="field-row">
                      <Field id="name" label="Your name" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                      <Field id="email" label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                    </div>
                    <div className="field-row">
                      <Field id="phone" label={replyBy === 'Email' ? 'Phone / WhatsApp (optional)' : 'Phone / WhatsApp'} type="tel" value={form.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
                      <Field id="company" label="Company (optional)" value={form.company} onChange={set('company')} autoComplete="organization" />
                    </div>
                  </div>
                </fieldset>

                {/* 4. Budget, timeline, reply */}
                <fieldset className="field-group">
                  <legend><b className="ct-n">3</b> Budget and timing</legend>
                  <div className="field-row">
                    <Field id="budget" label="Your budget (e.g. ₹50,000)" value={form.budget} onChange={set('budget')} />
                    <Field id="timeline" label="When to start / deadline" value={form.timeline} onChange={set('timeline')} />
                  </div>
                  <div className="ct-row">
                    <span>Reply by</span>
                    <div className="chips">
                      {REPLY_BY.map((r) => <button type="button" key={r} className={`pick sm ${replyBy === r ? 'on' : ''}`} aria-pressed={replyBy === r} onClick={() => setReplyBy(r)}>{r}</button>)}
                    </div>
                  </div>
                </fieldset>

                <Field id="message" label="Tell us about your project" textarea value={form.message} onChange={set('message')} error={errors.message} />

                <Magnetic strength={0.15}>
                  <button type="submit" className="btn btn-primary submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (<><span className="spinner" aria-hidden="true" />Sending</>) : (<>Send request <IconArrow /></>)}
                  </button>
                </Magnetic>
                <a className="ct-wa" href={whatsappLink()} target="_blank" rel="noreferrer">or send this on WhatsApp</a>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, textarea, error, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <Tag id={id} name={id} placeholder=" " rows={textarea ? 4 : undefined} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      <label htmlFor={id}>{label}</label>
      {error && <span className="field-err" id={`${id}-err`}>{error}</span>}
    </div>
  )
}