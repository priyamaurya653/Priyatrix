import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Apps from './Apps'
import Contact from './Contact'
import { Faq, PageHero, Steps } from './PageBlocks'
import {
  IconArrow, IconBag, IconChart, IconCheck, IconClock, IconGlobe, IconImage, IconLayers,
  IconPen, IconPhone, IconSearch, IconShare, IconShield, IconTag, IconUsers, IconZap,
} from './Icons'
import { useGo } from '../utils/useGo'
import './AppsPage.css'

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/* =========================================================
   1. Stats
   ========================================================= */
const STATS = [
  { to: 120, suffix: '+', label: 'apps launched' },
  { to: 4.8, decimals: 1, label: 'average store rating' },
  { to: 16, label: 'types of apps we build' },
  { to: 99.9, decimals: 1, suffix: '%', label: 'crash-free sessions' },
]

/* =========================================================
   2. Every type of app we build
   ========================================================= */
const CATEGORIES = ['All', 'Commerce', 'On-demand', 'Business', 'Finance', 'Health', 'Education', 'Social & media']

const APP_TYPES = [
  { c: 'Commerce', icon: IconBag, t: 'E-commerce store', d: 'Product catalogue, cart, offers, wishlist and fast checkout, synced with your website.', f: ['UPI & cards', 'Wishlist', 'Order tracking', 'Coupons'], from: 150000, w: '8-10' },
  { c: 'Commerce', icon: IconTag, t: 'Multi-vendor marketplace', d: 'Separate apps or panels for buyers, sellers and admin, with commissions and payouts.', f: ['Seller panel', 'Commission', 'Payouts', 'Reviews'], from: 350000, w: '14-18' },
  { c: 'On-demand', icon: IconClock, t: 'Food delivery', d: 'Customer app, restaurant dashboard and delivery partner app with live map tracking.', f: ['Live tracking', '3 apps', 'Menus', 'Ratings'], from: 300000, w: '12-16' },
  { c: 'On-demand', icon: IconGlobe, t: 'Taxi & ride booking', d: 'Ride booking, fare estimate, driver matching, live route and in-app payments.', f: ['Driver app', 'Fare engine', 'SOS', 'Wallet'], from: 400000, w: '14-18' },
  { c: 'On-demand', icon: IconUsers, t: 'Home services & booking', d: 'Book salons, plumbers, tutors or doctors with slots, reminders and payments.', f: ['Slots', 'Reminders', 'Provider app', 'Reviews'], from: 220000, w: '10-12' },
  { c: 'Business', icon: IconLayers, t: 'Business & ERP apps', d: 'Inventory, billing, attendance and field-staff apps for your team, with offline mode.', f: ['Offline sync', 'Roles', 'Reports', 'GPS check-in'], from: 180000, w: '8-12' },
  { c: 'Business', icon: IconChart, t: 'CRM & sales apps', d: 'Leads, follow-ups, call logs and pipeline for your sales team on the go.', f: ['Lead pipeline', 'Call logs', 'Reminders', 'Dashboards'], from: 160000, w: '8-10' },
  { c: 'Business', icon: IconPhone, t: 'Restaurant POS & billing', d: 'Table orders, KOT printing, billing and daily reports on a tablet or phone.', f: ['KOT print', 'Bluetooth printer', 'GST bills', 'Offline'], from: 140000, w: '6-8' },
  { c: 'Finance', icon: IconShield, t: 'Fintech & wallet', d: 'Wallets, loans, investments and payments with KYC and bank-grade security.', f: ['KYC', 'Encryption', 'UPI', '2FA'], from: 450000, w: '16-20' },
  { c: 'Finance', icon: IconTag, t: 'Loan & EMI apps', d: 'Loan applications, document upload, EMI calculator and repayment tracking.', f: ['e-KYC', 'Doc upload', 'EMI calc', 'Credit score'], from: 280000, w: '12-14' },
  { c: 'Health', icon: IconZap, t: 'Fitness & wellness', d: 'Workout plans, step tracking, diet logs and coach chat with streaks and rewards.', f: ['Health data', 'Streaks', 'Plans', 'Coach chat'], from: 200000, w: '10-12' },
  { c: 'Health', icon: IconUsers, t: 'Telemedicine & clinic', d: 'Doctor booking, video consults, prescriptions and medical records.', f: ['Video call', 'e-Prescription', 'Records', 'Payments'], from: 350000, w: '14-16' },
  { c: 'Education', icon: IconPen, t: 'E-learning & courses', d: 'Video lessons, notes, quizzes, live classes and paid subscriptions.', f: ['Video', 'Quizzes', 'PDF notes', 'Subscriptions'], from: 180000, w: '8-12' },
  { c: 'Education', icon: IconSearch, t: 'School & coaching ERP', d: 'Attendance, fees, homework, results and parent notifications in one app.', f: ['Attendance', 'Fees', 'Results', 'Parent app'], from: 220000, w: '10-12' },
  { c: 'Social & media', icon: IconShare, t: 'Social & community', d: 'Profiles, feeds, likes, comments, chat and groups for your community.', f: ['Feed', 'Chat', 'Groups', 'Moderation'], from: 300000, w: '12-16' },
  { c: 'Social & media', icon: IconImage, t: 'Streaming & events', d: 'Video or audio streaming, ticket booking and QR entry scanning for events.', f: ['Streaming', 'Tickets', 'QR scan', 'Live'], from: 320000, w: '12-16' },
]

/* =========================================================
   3. Languages & technologies, defined and explained
   ========================================================= */
const TECH = [
  {
    k: 'flutter', name: 'Flutter', lang: 'Dart', tag: 'Cross-platform', color: '#4fd1ff',
    def: 'Flutter is Google’s toolkit for building Android and iOS apps from one codebase. Apps are written in the Dart language and Flutter draws every pixel itself, so the app looks the same on every phone.',
    use: 'Most startup and business apps, MVPs, e-commerce, booking and education apps.',
    pros: ['One codebase for Android and iOS', 'Smooth 60 fps animations', 'Lower cost and faster launch'],
    cons: ['Slightly larger app size', 'Some rare device features need native code'],
    code: `class Hello extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text('Hello');
  }
}`,
  },
  {
    k: 'rn', name: 'React Native', lang: 'JavaScript / TypeScript', tag: 'Cross-platform', color: '#6fb3ff',
    def: 'React Native is Meta’s framework for building mobile apps with JavaScript or TypeScript using React. It uses real native UI components underneath, so the app feels native on each platform.',
    use: 'Teams that already have a React website, content apps, social and marketplace apps.',
    pros: ['Shares code and skills with React websites', 'Huge library ecosystem', 'Over-the-air updates without store review'],
    cons: ['Heavy animations need extra care', 'Upgrades between versions take effort'],
    code: `import { Text } from 'react-native'

export default function Hello() {
  return <Text>Hello</Text>
}`,
  },
  {
    k: 'kotlin', name: 'Kotlin', lang: 'Kotlin', tag: 'Native Android', color: '#A795FF',
    def: 'Kotlin is Google’s official language for Android apps. A native Kotlin app is built only for Android and gets full, direct access to every phone feature, with the best speed and battery life.',
    use: 'Android-only apps, POS and printer apps, apps using Bluetooth, NFC, camera or background services.',
    pros: ['Best Android performance', 'Full access to hardware and sensors', 'Latest Android features on day one'],
    cons: ['Android only (iOS needs a separate app)', 'Higher cost if you need both platforms'],
    code: `@Composable
fun Hello(name: String) {
    Text(text = "Hello, $name")
}`,
  },
  {
    k: 'swift', name: 'Swift', lang: 'Swift', tag: 'Native iOS', color: '#ff8f6b',
    def: 'Swift is Apple’s language for iPhone and iPad apps. With SwiftUI, a native Swift app follows Apple’s design exactly and runs as fast as possible on Apple devices.',
    use: 'Premium iOS apps, apps using Apple Pay, HealthKit, widgets or Apple Watch.',
    pros: ['Best iPhone performance and feel', 'Full Apple feature access', 'Strong security'],
    cons: ['iOS only (Android needs a separate app)', 'Needs a Mac and Apple developer account'],
    code: `struct Hello: View {
    var body: some View {
        Text("Hello")
    }
}`,
  },
  {
    k: 'java', name: 'Java', lang: 'Java', tag: 'Native Android', color: '#ffb84d',
    def: 'Java was the original language for Android apps and still powers millions of them. We use it mainly to maintain, fix and upgrade existing Android apps that were built in Java.',
    use: 'Maintaining or extending older Android apps, enterprise apps with Java backends.',
    pros: ['Very stable and well known', 'Works with all Android libraries', 'Easy to move to Kotlin step by step'],
    cons: ['More code than Kotlin for the same feature', 'New Android features arrive in Kotlin first'],
    code: `public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        setContentView(R.layout.main);
    }
}`,
  },
  {
    k: 'laravel', name: 'Laravel', lang: 'PHP', tag: 'Backend & API', color: '#ff5a5a',
    def: 'Laravel is a PHP framework we use to build the backend: the server, database and admin panel your app talks to. It gives your app secure login, APIs, payments and reports.',
    use: 'Admin panels, REST APIs, e-commerce, booking, loan and ERP backends.',
    pros: ['Fast to build secure APIs', 'Ready admin panels and reports', 'Cheap, easy hosting'],
    cons: ['Real-time chat needs an extra service', 'Very high traffic needs tuning'],
    code: `Route::get('/api/orders', function () {
    return Order::latest()->paginate(20);
});`,
  },
  {
    k: 'node', name: 'Node.js', lang: 'JavaScript', tag: 'Backend & API', color: '#9ef0c0',
    def: 'Node.js runs JavaScript on the server. It is great for real-time features like chat, live tracking and notifications, where many users are connected at the same time.',
    use: 'Chat apps, live tracking, delivery and ride apps, real-time dashboards.',
    pros: ['Excellent for real-time features', 'Same language as React Native', 'Handles many connections'],
    cons: ['Needs careful structure on big projects', 'Heavy calculations are slower'],
    code: `app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().limit(20)
  res.json(orders)
})`,
  },
  {
    k: 'firebase', name: 'Firebase', lang: 'Google Cloud', tag: 'Cloud services', color: '#C8F542',
    def: 'Firebase is Google’s ready-made cloud for apps. It gives push notifications, login, a real-time database, file storage and crash reports without building a server from scratch.',
    use: 'Push notifications in every app, MVPs, chat, OTP login and crash monitoring.',
    pros: ['Push notifications and OTP login built in', 'Real-time data sync', 'Pay as you grow'],
    cons: ['Costs rise with heavy usage', 'Complex reports are harder than in SQL'],
    code: `await addDoc(collection(db, 'orders'), {
  item: 'Coffee',
  qty: 2,
})`,
  },
]

/* =========================================================
   4. Platform comparison table
   ========================================================= */
const COMPARE_COLS = ['Flutter', 'React Native', 'Native (Kotlin + Swift)']
const COMPARE_ROWS = [
  { r: 'Codebases', v: ['1 for both', '1 for both', '2 separate'] },
  { r: 'Cost (both platforms)', v: ['Low', 'Low', 'High (~1.8x)'] },
  { r: 'Time to launch', v: ['Fast', 'Fast', 'Slower'] },
  { r: 'Performance', v: ['Very good', 'Good', 'Best'] },
  { r: 'Animations', v: ['Excellent', 'Good', 'Excellent'] },
  { r: 'Device features', v: ['Most', 'Most', 'All'] },
  { r: 'Best for', v: ['Startups, business apps', 'Teams using React', 'Heavy hardware, top performance'] },
]

/* =========================================================
   5. Pricing
   ========================================================= */
const PRICE_GROUPS = [
  {
    k: 'business', label: 'Business & utility',
    note: 'CRM, ERP, POS, attendance, internal team apps',
    tiers: [
      { name: 'Starter', price: 120000, w: '6-8 weeks', feats: ['Android or iOS (Flutter)', 'Up to 10 screens', 'Login and push notifications', 'Basic admin panel', 'Play Store publishing'] },
      { name: 'Growth', price: 220000, w: '8-10 weeks', popular: true, feats: ['Android + iOS', 'Up to 25 screens', 'Roles and permissions', 'Offline mode and sync', 'Reports and exports', 'Both store publishing'] },
      { name: 'Pro', price: 380000, w: '12-14 weeks', feats: ['Up to 50 screens', 'ERP / Tally / API integrations', 'Advanced reports and dashboards', 'Bluetooth printer, GPS, scanner', 'Priority support'] },
    ],
  },
  {
    k: 'commerce', label: 'E-commerce & marketplace',
    note: 'Online stores, grocery, fashion, multi-vendor',
    tiers: [
      { name: 'Starter', price: 150000, w: '8 weeks', feats: ['Android + iOS (Flutter)', 'Catalogue, cart, checkout', 'UPI, cards and COD', 'Order tracking', 'Admin panel'] },
      { name: 'Growth', price: 280000, w: '10-12 weeks', popular: true, feats: ['Everything in Starter', 'Coupons, wallet and rewards', 'Reviews and wishlist', 'Delivery slots', 'Analytics dashboard', 'Website sync'] },
      { name: 'Marketplace', price: 450000, w: '14-18 weeks', feats: ['Buyer, seller and admin apps', 'Commissions and payouts', 'Seller KYC', 'Multi-warehouse', 'Multi-language'] },
    ],
  },
  {
    k: 'ondemand', label: 'On-demand & delivery',
    note: 'Food, grocery, taxi, home services, logistics',
    tiers: [
      { name: 'Starter', price: 250000, w: '10-12 weeks', feats: ['Customer app + admin panel', 'Booking or ordering', 'Payments', 'Push notifications', 'Ratings'] },
      { name: 'Growth', price: 420000, w: '14-16 weeks', popular: true, feats: ['Customer, partner and admin apps', 'Live map tracking', 'Auto-assign orders', 'In-app chat', 'Wallet and payouts', 'Surge and zone pricing'] },
      { name: 'Pro', price: 650000, w: '18-22 weeks', feats: ['Everything in Growth', 'Multi-city and franchise', 'Route optimisation', 'Subscriptions', 'Dedicated team'] },
    ],
  },
  {
    k: 'advanced', label: 'Fintech, health & social',
    note: 'Wallets, loans, telemedicine, social, streaming',
    tiers: [
      { name: 'MVP', price: 300000, w: '10-12 weeks', feats: ['Core feature set', 'Secure login and 2FA', 'Basic KYC or profiles', 'Admin panel', 'Analytics'] },
      { name: 'Growth', price: 550000, w: '14-18 weeks', popular: true, feats: ['Full feature set', 'e-KYC / video consult / chat', 'Payments and subscriptions', 'Encryption and audit logs', 'Security testing'] },
      { name: 'Enterprise', price: 900000, w: '20+ weeks', feats: ['Native Kotlin + Swift', 'Bank / lab / partner integrations', 'Compliance support', 'Load and penetration testing', 'Support SLA'] },
    ],
  },
]

const ADDONS = [
  { k: 'admin', t: 'Advanced admin panel', p: 40000, w: 2 },
  { k: 'pay', t: 'Payment gateway (Razorpay, Stripe, UPI)', p: 15000, w: 1 },
  { k: 'chat', t: 'In-app chat', p: 35000, w: 2 },
  { k: 'video', t: 'Video calling', p: 60000, w: 3 },
  { k: 'map', t: 'Live map tracking', p: 45000, w: 2 },
  { k: 'lang', t: 'Multi-language (per language)', p: 12000, w: 1 },
  { k: 'ai', t: 'AI chatbot / smart search', p: 70000, w: 3 },
  { k: 'social', t: 'Google / Apple / Facebook login', p: 10000, w: 0.5 },
  { k: 'web', t: 'Matching website or web app', p: 60000, w: 3 },
  { k: 'printer', t: 'Bluetooth printer / barcode scanner', p: 25000, w: 1 },
]

const CARE = [
  { name: 'Basic care', price: 8000, feats: ['Bug fixes', 'OS update checks', 'Monthly backup', '48h response'] },
  { name: 'Standard care', price: 18000, popular: true, feats: ['Everything in Basic', 'Server monitoring', '10 hours of changes', 'Store compliance', '24h response'] },
  { name: 'Growth care', price: 40000, feats: ['Everything in Standard', '30 hours of new features', 'Monthly analytics report', 'Priority support', 'Same-day response'] },
]

/* Estimator settings */
const EST_TYPES = APP_TYPES.map((a) => ({ k: a.t, base: a.from, w: parseInt(a.w, 10) }))
const EST_PLATFORMS = [
  { k: 'android', t: 'Android only', m: 0.8 },
  { k: 'ios', t: 'iOS only', m: 0.85 },
  { k: 'both', t: 'Android + iOS (Flutter)', m: 1 },
  { k: 'native', t: 'Android + iOS (native)', m: 1.8 },
]
const EST_LEVELS = [
  { k: 'simple', t: 'Simple', m: 0.8, d: 'Few screens, standard features' },
  { k: 'medium', t: 'Medium', m: 1, d: 'Typical app for this type' },
  { k: 'complex', t: 'Complex', m: 1.5, d: 'Many roles, integrations, custom logic' },
]

/* =========================================================
   6. Steps & FAQ
   ========================================================= */
const STEPS = [
  { t: 'Discovery', w: 'Week 1', d: 'Goals, users and features agreed. You get a fixed quote and a feature list.' },
  { t: 'UX flows', w: 'Week 2', d: 'Every screen and tap mapped out before any design work.' },
  { t: 'UI design', w: 'Weeks 3 to 4', d: 'Clickable prototype you can try on your own phone.' },
  { t: 'Development', w: 'Weeks 5 to 10', d: 'Two-week sprints with a test build on your phone after each one.' },
  { t: 'Testing and beta', w: 'Week 11', d: 'Real devices, slow networks and a closed beta with your users.' },
  { t: 'Store launch', w: 'Week 12', d: 'App Store and Play Store listing, screenshots and approval handled.' },
]

const FAQ = [
  { q: 'How much does an app cost?', a: 'A simple business app starts around ₹1.2 lakh. E-commerce apps start around ₹1.5 lakh, delivery and taxi apps around ₹2.5 lakh, and fintech or telemedicine apps around ₹3 lakh. Use the estimator above for your case; the final quote is fixed after a short call.' },
  { q: 'What is included in the price?', a: 'Design, development, testing, an admin panel, store publishing and 60 days of free fixes. Server hosting, store developer accounts (Google ₹2,000 one time, Apple about ₹8,000 a year) and paid third-party services like SMS or maps are billed at actual cost.' },
  { q: 'How do I pay?', a: 'In 4 parts: 25% at kick-off, 25% after design, 30% after the beta build and 20% at launch. Prices are exclusive of 18% GST.' },
  { q: 'Which language should my app use?', a: 'For most businesses we recommend Flutter, because one codebase runs on Android and iOS at a lower cost. We suggest native Kotlin or Swift only when the app needs heavy hardware use or top performance.' },
  { q: 'Who owns the app and source code?', a: 'You do. After the final payment you get the full source code, design files and every account login.' },
  { q: 'What happens after launch?', a: 'You get 60 days of free fixes. After that you can pick a monthly care plan for updates, monitoring, new features and store compliance.' },
]

/* =========================================================
   Hero visual: interactive phone
   ========================================================= */
const TOASTS = [
  { t: 'Order #2481 delivered', s: 'Rate your delivery' },
  { t: 'Payment received', s: '₹1,299 via UPI' },
  { t: 'You earned 50 points', s: 'Use them on your next order' },
]
const ORBIT = ['Flutter', 'Kotlin', 'Swift', 'React Native', 'Laravel', 'Firebase']

function HomeScreen() {
  return (
    <div className="ap-scr">
      <div className="ap-hello"><small>Hi Aisha</small><b>What are you craving?</b></div>
      <div className="ap-banner"><b>Flat 40% off</b><span>On your first order</span></div>
      <div className="ap-cats">{['#C8F542', '#A795FF', '#ff8fc4', '#6fb3ff'].map((c) => <i key={c} style={{ background: c }} />)}</div>
      <div className="ap-list"><i /><i /></div>
    </div>
  )
}
function OrdersScreen() {
  return (
    <div className="ap-scr">
      <div className="ap-hello"><small>Order #2481</small><b>On the way</b></div>
      <div className="ap-map"><span className="ap-route" /><span className="ap-pin" /></div>
      <ol className="ap-track">
        {['Confirmed', 'Packed', 'Out for delivery', 'Delivered'].map((s, i) => <li key={s} className={i < 3 ? 'done' : ''}><i />{s}</li>)}
      </ol>
    </div>
  )
}
function ProfileScreen() {
  return (
    <div className="ap-scr">
      <div className="ap-profile"><span className="ap-avatar" /><b>Aisha Khan</b><small>Gold member</small></div>
      <div className="ap-points"><small>Reward points</small><b>2,450</b></div>
      <div className="ap-list"><i /><i /><i /></div>
    </div>
  )
}
const SCREENS = [
  { k: 'home', label: 'Home', C: HomeScreen },
  { k: 'orders', label: 'Orders', C: OrdersScreen },
  { k: 'profile', label: 'Profile', C: ProfileScreen },
]

function PhoneVisual() {
  const ref = useRef(null)
  const [screen, setScreen] = useState(0)
  const [auto, setAuto] = useState(true)
  const [toast, setToast] = useState(0)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 80, damping: 16 })
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 16 })

  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => setScreen((s) => (s + 1) % SCREENS.length), 2800)
    return () => clearInterval(id)
  }, [auto])
  useEffect(() => {
    const id = setInterval(() => setToast((t) => (t + 1) % TOASTS.length), 3400)
    return () => clearInterval(id)
  }, [])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const Screen = SCREENS[screen].C

  return (
    <div className="wp-visual ap-visual" ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0) }}>
      <div className="ap-glow" aria-hidden="true" />
      <div className="ap-orbit" aria-hidden="true">
        {ORBIT.map((o, i) => (
          <span key={o} style={{ '--a': `${(360 / ORBIT.length) * i}deg` }}><em>{o}</em></span>
        ))}
      </div>

      <motion.div
        className="ap-phone gloss"
        style={{ rotateY: rotY, rotateX: rotX, transformPerspective: 1200 }}
        initial={{ opacity: 0, y: 80, rotateZ: -8 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
        transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="ap-notch" />
        <div className="ap-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={SCREENS[screen].k}
              className="ap-screen-inner"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Screen />
            </motion.div>
          </AnimatePresence>
          <div className="ap-tabs">
            {SCREENS.map((s, i) => (
              <button key={s.k} className={i === screen ? 'on' : ''} onClick={() => { setAuto(false); setScreen(i) }} aria-label={`Show ${s.label} screen`}>
                <i />{s.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="ap-toast-wrap" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={toast}
            className="ap-toast glass"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <span className="ap-toast-icon" aria-hidden="true" />
            <div><strong>{TOASTS[toast].t}</strong><small>{TOASTS[toast].s}</small></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* =========================================================
   Section: app types with category filter
   ========================================================= */
function AppTypes() {
  const [cat, setCat] = useState('All')
  const list = APP_TYPES.filter((a) => cat === 'All' || a.c === cat)

  return (
    <section className="section" id="types">
      <div className="container">
        <div className="section-head ap-head">
          <div>
            <Reveal><span className="kicker">Every type of app</span></Reveal>
            <SplitText as="h2" className="h2" text="16 kinds of apps, one experienced team." inView />
          </div>
          <Reveal delay={0.1}>
            <p className="lead">From a simple business app to a full delivery platform. Filter by category to see what each app includes, how long it takes and where the price starts.</p>
          </Reveal>
        </div>

        <Reveal className="ap-cat-bar" role="tablist" aria-label="App categories">
          {CATEGORIES.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
              {cat === c && <motion.span layoutId="ap-cat-pill" className="ap-cat-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{c}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="ap-types">
          <AnimatePresence mode="popLayout">
            {list.map((a) => {
              const Icon = a.icon
              return (
                <motion.article
                  layout
                  key={a.t}
                  className="ap-type glass gloss"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="ap-type-top">
                    <span className="ap-type-ic"><Icon /></span>
                    <span className="ap-type-cat">{a.c}</span>
                  </div>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                  <div className="ap-type-f">{a.f.map((f) => <span key={f}>{f}</span>)}</div>
                  <div className="ap-type-foot">
                    <div><small>Starts at</small><strong>{inr(a.from)}</strong></div>
                    <div><small>Timeline</small><strong>{a.w} weeks</strong></div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* =========================================================
   Section: languages & technologies explained
   ========================================================= */
function TechExplainer() {
  const [i, setI] = useState(0)
  const t = TECH[i]
  return (
    <section className="section" id="languages">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Languages and technologies</span></Reveal>
          <SplitText as="h2" className="h2" text="What we build with, in plain words." inView />
          <Reveal delay={0.1}><p className="lead">Pick a language or tool to see what it is, when we use it, its strengths and limits, and a small code sample.</p></Reveal>
        </div>

        <div className="ap-tech">
          <Reveal className="ap-tech-list" role="tablist" aria-label="Technologies">
            {TECH.map((x, k) => (
              <button key={x.k} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)} style={{ '--tc': x.color }}>
                {k === i && <motion.span layoutId="ap-tech-pill" className="ap-tech-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="ap-tech-dot" />
                <span className="ap-tech-txt"><b>{x.name}</b><small>{x.lang} · {x.tag}</small></span>
              </button>
            ))}
          </Reveal>

          <Reveal className="ap-tech-detail glass gloss" delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={t.k}
                style={{ '--tc': t.color }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="ap-tech-head">
                  <span className="ap-tech-badge">{t.tag}</span>
                  <h3>{t.name}</h3>
                  <small>Language: {t.lang}</small>
                </div>

                <div className="ap-tech-block">
                  <h4>What is it?</h4>
                  <p>{t.def}</p>
                </div>
                <div className="ap-tech-block">
                  <h4>When we use it</h4>
                  <p>{t.use}</p>
                </div>

                <div className="ap-tech-pc">
                  <div>
                    <h4>Strengths</h4>
                    <ul className="pros">{t.pros.map((p) => <li key={p}><IconCheck />{p}</li>)}</ul>
                  </div>
                  <div>
                    <h4>Limits</h4>
                    <ul className="cons">{t.cons.map((p) => <li key={p}><span>–</span>{p}</li>)}</ul>
                  </div>
                </div>

                <div className="ap-code">
                  <div className="ap-code-bar"><span className="dots" aria-hidden="true"><i /><i /><i /></span><small>{t.lang} sample</small></div>
                  <pre><code>{t.code}</code></pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        <Reveal className="ap-compare-wrap glass" delay={0.1}>
          <h3 className="ap-compare-title">Flutter vs React Native vs Native</h3>
          <div className="ap-table-scroll">
            <table className="ap-table">
              <thead>
                <tr><th scope="col">Compare</th>{COMPARE_COLS.map((c) => <th scope="col" key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.r}>
                    <th scope="row">{row.r}</th>
                    {row.v.map((v, j) => <td key={j} className={j === 0 ? 'hl' : ''}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="ap-compare-note">Our default recommendation is Flutter. We suggest native only when your app truly needs it.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   Section: full pricing
   ========================================================= */
function FullPricing() {
  const go = useGo()
  const [g, setG] = useState(PRICE_GROUPS[0].k)
  const group = PRICE_GROUPS.find((x) => x.k === g)
  const toContact = (e) => { e.preventDefault(); go('contact') }

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Full pricing</span></Reveal>
          <SplitText as="h2" className="h2" text="Clear app prices, before we write a line of code." inView />
          <Reveal delay={0.1}><p className="lead">Pick your type of app to see its packages. All prices are one-time, in Indian rupees and exclusive of 18% GST. Final quote is fixed after a short call.</p></Reveal>
        </div>

        <Reveal className="ap-price-tabs" role="tablist" aria-label="App pricing groups">
          {PRICE_GROUPS.map((x) => (
            <button key={x.k} role="tab" aria-selected={g === x.k} className={g === x.k ? 'on' : ''} onClick={() => setG(x.k)}>
              {g === x.k && <motion.span layoutId="ap-price-pill" className="ap-cat-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{x.label}</span>
            </button>
          ))}
        </Reveal>
        <p className="ap-price-note">{group.note}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={g}
            className="ap-plans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {group.tiers.map((p) => (
              <div key={p.name} className={`wp-plan glass gloss ${p.popular ? 'is-popular' : ''}`}>
                {p.popular && <span className="plan-badge">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="plan-price"><strong>{inr(p.price)}</strong><span>+ GST</span></div>
                <p className="ap-plan-time"><IconClock />{p.w}</p>
                <ul>{p.feats.map((f) => <li key={f}><IconCheck />{f}</li>)}</ul>
                <a href="#contact" className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'}`} onClick={toContact}>
                  Get this quote <IconArrow />
                </a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="ap-price-extra">
          <Reveal className="ap-addons glass gloss">
            <h3>Add-ons</h3>
            <p>Add any feature to any package.</p>
            <ul>
              {ADDONS.map((a) => (
                <li key={a.k}><span>{a.t}</span><strong>+{inr(a.p)}</strong></li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="ap-care" delay={0.1}>
            <h3>After launch: monthly care plans</h3>
            <div className="ap-care-grid">
              {CARE.map((c) => (
                <div key={c.name} className={`ap-care-card glass gloss ${c.popular ? 'is-popular' : ''}`}>
                  <b>{c.name}</b>
                  <strong>{inr(c.price)}<small>/month</small></strong>
                  <ul>{c.feats.map((f) => <li key={f}><IconCheck />{f}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="ap-costs glass">
              <h4>Paid separately, at actual cost</h4>
              <ul>
                <li><span>Google Play developer account</span><strong>~₹2,100 one time</strong></li>
                <li><span>Apple developer account</span><strong>~₹8,300 / year</strong></li>
                <li><span>Server hosting</span><strong>from ₹1,500 / month</strong></li>
                <li><span>SMS, maps, video APIs</span><strong>as per usage</strong></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Section: cost estimator
   ========================================================= */
function Estimator() {
  const go = useGo()
  const [type, setType] = useState(EST_TYPES[0].k)
  const [plat, setPlat] = useState('both')
  const [level, setLevel] = useState('medium')
  const [addons, setAddons] = useState([])

  const toggle = (k) => setAddons((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))

  const est = useMemo(() => {
    const t = EST_TYPES.find((x) => x.k === type)
    const p = EST_PLATFORMS.find((x) => x.k === plat)
    const l = EST_LEVELS.find((x) => x.k === level)
    const chosen = ADDONS.filter((a) => addons.includes(a.k))
    const total = t.base * p.m * l.m + chosen.reduce((s, a) => s + a.p, 0)
    const weeks = Math.round(t.w * l.m * (plat === 'native' ? 1.3 : 1) + chosen.reduce((s, a) => s + a.w, 0))
    return { low: total * 0.9, high: total * 1.15, weeks, gst: total * 0.18 }
  }, [type, plat, level, addons])

  return (
    <section className="section" id="estimate">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Cost estimator</span></Reveal>
          <SplitText as="h2" className="h2" text="Estimate your app cost in 30 seconds." inView />
          <Reveal delay={0.1}><p className="lead">Choose your app, platform, complexity and extras. You get an instant price range and timeline.</p></Reveal>
        </div>

        <div className="ap-est">
          <Reveal className="ap-est-form glass gloss">
            <label className="ap-est-label" htmlFor="est-type">1. Type of app</label>
            <select id="est-type" className="ap-est-select" value={type} onChange={(e) => setType(e.target.value)}>
              {EST_TYPES.map((t) => <option key={t.k} value={t.k}>{t.k}</option>)}
            </select>

            <span className="ap-est-label">2. Platform</span>
            <div className="chips">
              {EST_PLATFORMS.map((p) => (
                <button type="button" key={p.k} className={`pick ${plat === p.k ? 'on' : ''}`} aria-pressed={plat === p.k} onClick={() => setPlat(p.k)}>{p.t}</button>
              ))}
            </div>

            <span className="ap-est-label">3. Complexity</span>
            <div className="ap-levels">
              {EST_LEVELS.map((l) => (
                <button type="button" key={l.k} className={`ap-level ${level === l.k ? 'on' : ''}`} aria-pressed={level === l.k} onClick={() => setLevel(l.k)}>
                  <b>{l.t}</b><small>{l.d}</small>
                </button>
              ))}
            </div>

            <span className="ap-est-label">4. Extra features</span>
            <div className="chips">
              {ADDONS.map((a) => (
                <button type="button" key={a.k} className={`pick ${addons.includes(a.k) ? 'on' : ''}`} aria-pressed={addons.includes(a.k)} onClick={() => toggle(a.k)}>
                  {addons.includes(a.k) && <IconCheck />}{a.t}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="ap-est-result glass gloss" delay={0.1}>
            <small>Estimated cost</small>
            <AnimatePresence mode="wait">
              <motion.strong key={`${Math.round(est.low)}-${Math.round(est.high)}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                {inr(est.low)} – {inr(est.high)}
              </motion.strong>
            </AnimatePresence>
            <span className="ap-est-gst">+ about {inr(est.gst)} GST</span>
            <div className="ap-est-row"><IconClock /><span>About <b>{est.weeks} weeks</b> to launch</span></div>
            <div className="ap-est-row"><IconPhone /><span>{EST_PLATFORMS.find((p) => p.k === plat).t}</span></div>
            <div className="ap-est-row"><IconLayers /><span>{addons.length} extra {addons.length === 1 ? 'feature' : 'features'}</span></div>
            <p className="ap-est-note">This is an estimate for planning. Your final quote is fixed after a 20-minute call.</p>
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); go('contact') }}>Get an exact quote <IconArrow /></a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Page
   ========================================================= */
export default function AppsPage() {
  useEffect(() => { document.title = 'Mobile app development and pricing — Orbitra' }, [])

  return (
    <div className="service-page">
      <PageHero
        crumb="Mobile apps"
        lines={['Every kind of app,', 'built right and', 'priced clearly.']}
        lead="Android and iOS apps for commerce, delivery, business, finance, health, education and social. Built in Flutter, Kotlin, Swift or React Native, with full pricing on this page."
        visual={<PhoneVisual />}
        stats={STATS}
      />
      <AppTypes />
      <TechExplainer />
      <Apps showPageLink={false} />
      <FullPricing />
      <Estimator />
      <Steps title="From idea to the App Store in about twelve weeks." steps={STEPS} />
      <Faq title="Questions about apps and pricing." items={FAQ} />
      <Contact defaultService="Mobile app" />
    </div>
  )
}