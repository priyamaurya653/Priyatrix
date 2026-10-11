import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SplitText from './SplitText'
import Graphics from './Graphics'
import Contact from './Contact'
import { Faq, PageHero, Steps } from './PageBlocks'
import {
  IconArrow, IconBag, IconChart, IconCheck, IconClock, IconDiamond, IconGlobe, IconImage,
  IconLayers, IconPen, IconPhone, IconSearch, IconShare, IconTag, IconUsers, IconZap,
} from './Icons'
import { useGo } from '../utils/useGo'
import './GraphicsPage.css'

const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/* =========================================================
   1. Stats
   ========================================================= */
const STATS = [
  { to: 2400, suffix: '+', label: 'creatives delivered' },
  { to: 180, suffix: '+', label: 'brands designed' },
  { to: 25, label: 'design services' },
  { to: 48, suffix: 'h', label: 'turnaround on social posts' },
]

/* =========================================================
   2. Every design service, fully explained
   ========================================================= */
const CATS = ['All', 'Branding', 'Social media', 'Marketing & ads', 'Print', 'Packaging', 'Digital & UI', 'Motion & video', 'Illustration & 3D']

const SERVICES = [
  // Branding
  { c: 'Branding', icon: IconDiamond, t: 'Logo design', s: 'The mark people remember you by.',
    what: 'A logo is the visual signature of your business. We design a mark that is simple, works in one colour, stays clear at 16 pixels and on a 10-foot banner, and reflects what your business stands for.',
    why: 'Your logo appears on every bill, post, sign and app icon. A clear, original logo builds trust and makes you instantly recognisable.',
    get: ['3 logo concepts', '3 rounds of revisions', 'Colour, black and white versions', 'Horizontal and stacked layouts', 'Favicon and app icon'],
    fmt: ['AI', 'SVG', 'PNG', 'PDF'], days: '5-7', from: 9999 },
  { c: 'Branding', icon: IconLayers, t: 'Brand identity', s: 'A complete look for your business.',
    what: 'Brand identity is the full visual system around your logo: colours, fonts, patterns, icons, photo style and tone of voice, so everything you make looks like it came from the same company.',
    why: 'Consistent branding can make a small business look established and lets your team create on-brand work without a designer every time.',
    get: ['Logo and variations', 'Colour palette with codes', 'Font pairing', 'Patterns and icon style', 'Visiting card and letterhead', 'Brand guidelines PDF'],
    fmt: ['AI', 'PDF', 'Figma'], days: '14-21', from: 39999 },
  { c: 'Branding', icon: IconPen, t: 'Brand guidelines', s: 'The rulebook for using your brand.',
    what: 'A brand guidelines book explains how to use your logo, colours and fonts correctly, with do’s and don’ts, spacing rules and examples.',
    why: 'When printers, agencies or new staff work on your brand, the guide keeps everything consistent.',
    get: ['20-40 page PDF', 'Logo usage and clear space', 'Colour codes (HEX, RGB, CMYK, Pantone)', 'Typography rules', 'Do’s and don’ts'],
    fmt: ['PDF'], days: '5-7', from: 14999 },
  { c: 'Branding', icon: IconTag, t: 'Stationery design', s: 'Visiting cards, letterheads and more.',
    what: 'Business stationery includes visiting cards, letterheads, envelopes, invoices, ID cards and email signatures designed in your brand style.',
    why: 'These are often the first physical thing a client holds from you. Good stationery makes a strong first impression.',
    get: ['Visiting card (front and back)', 'Letterhead and envelope', 'Invoice template', 'Email signature', 'Print-ready files'],
    fmt: ['PDF', 'AI', 'DOCX'], days: '3-5', from: 4999 },

  // Social media
  { c: 'Social media', icon: IconShare, t: 'Social media posts', s: 'Posts that stop the scroll.',
    what: 'Single image posts and carousels for Instagram, Facebook and LinkedIn, designed around your offers, products, tips and festivals.',
    why: 'Consistent, good-looking posts build trust and engagement, and make your page look active and professional.',
    get: ['Square and portrait sizes', 'Captions on request', 'Festival and offer posts', 'Editable templates'],
    fmt: ['PNG', 'JPG', 'PSD'], days: '1-2', from: 499 },
  { c: 'Social media', icon: IconImage, t: 'Carousels & infographics', s: 'Swipeable posts that explain.',
    what: 'Multi-slide carousel posts and infographics that turn information, data or steps into easy-to-read visuals.',
    why: 'Carousels get more saves and shares than single posts, and infographics make complex ideas simple.',
    get: ['Up to 10 slides', 'Icons and charts', 'Cover slide designed to grab attention'],
    fmt: ['PNG', 'PDF'], days: '2-3', from: 1999 },
  { c: 'Social media', icon: IconPhone, t: 'Stories & reel covers', s: 'Vertical designs for 9:16.',
    what: 'Instagram and Facebook stories, highlight covers and reel cover thumbnails in vertical 1080 x 1920 size.',
    why: 'Stories and reels are where most people watch content now. Matching covers make your profile grid look clean.',
    get: ['Story templates', 'Highlight icons', 'Reel cover thumbnails'],
    fmt: ['PNG', 'MP4'], days: '1-2', from: 399 },
  { c: 'Social media', icon: IconUsers, t: 'Profile & cover kit', s: 'Profiles that look complete.',
    what: 'Profile pictures, cover banners and highlight icons for Instagram, Facebook, LinkedIn, YouTube and WhatsApp Business.',
    why: 'Your profile is your shopfront on social media. A matching kit looks professional on every platform.',
    get: ['Profile image', 'Cover banners for 5 platforms', 'Highlight covers', 'YouTube thumbnail template'],
    fmt: ['PNG', 'JPG'], days: '2-3', from: 2999 },

  // Marketing & ads
  { c: 'Marketing & ads', icon: IconZap, t: 'Ad creatives', s: 'Google and Meta ads that convert.',
    what: 'Image and carousel ads designed for Meta (Facebook, Instagram) and Google Display, in all required sizes, with clear offers and call-to-action buttons.',
    why: 'Good creative is the biggest factor in ad cost. A strong design lowers your cost per click and lead.',
    get: ['All required ad sizes', '2-3 variations for A/B testing', 'Text within ad rules'],
    fmt: ['PNG', 'JPG', 'MP4'], days: '2-3', from: 2499 },
  { c: 'Marketing & ads', icon: IconGlobe, t: 'Website banners', s: 'Hero banners and sliders.',
    what: 'Homepage hero banners, sliders, offer strips and pop-ups designed for desktop and mobile screens.',
    why: 'The first banner on your website decides whether visitors stay. It needs to look sharp on every screen.',
    get: ['Desktop and mobile sizes', 'Web-optimised files', 'Editable source'],
    fmt: ['WebP', 'PNG', 'SVG'], days: '1-2', from: 1499 },
  { c: 'Marketing & ads', icon: IconChart, t: 'Presentations & pitch decks', s: 'Slides that win meetings.',
    what: 'Company profiles, sales decks and investor pitch decks designed in PowerPoint, Google Slides or Keynote.',
    why: 'A clear, good-looking deck makes your business look serious and helps your message land.',
    get: ['Up to 15 slides', 'Charts and icons', 'Editable master template'],
    fmt: ['PPTX', 'PDF', 'Google Slides'], days: '4-6', from: 7999 },
  { c: 'Marketing & ads', icon: IconSearch, t: 'Email & newsletter design', s: 'Emails people open and read.',
    what: 'Branded email templates for newsletters, offers and welcome emails that look right on phones and in Gmail and Outlook.',
    why: 'Well-designed emails get more clicks and look more trustworthy.',
    get: ['Responsive email template', 'Header and footer', 'Mailchimp or HTML ready'],
    fmt: ['HTML', 'PNG'], days: '2-3', from: 3999 },

  // Print
  { c: 'Print', icon: IconLayers, t: 'Brochures & catalogues', s: 'Print-ready, multi-page design.',
    what: 'Bi-fold, tri-fold brochures and product catalogues laid out with your photos, prices and text, ready to send to the printer.',
    why: 'A good brochure explains your business when you are not in the room, at events, shops and meetings.',
    get: ['Layout and typesetting', 'CMYK print-ready PDF with bleed', 'Digital PDF for WhatsApp'],
    fmt: ['PDF', 'INDD', 'AI'], days: '4-7', from: 5999 },
  { c: 'Print', icon: IconImage, t: 'Flyers & posters', s: 'One page, one message.',
    what: 'A4, A5 flyers, pamphlets and posters for offers, events, openings and admissions.',
    why: 'Still one of the cheapest ways to reach local customers.',
    get: ['Single or double side', 'Print-ready file', 'Social media version'],
    fmt: ['PDF', 'PNG'], days: '1-3', from: 1499 },
  { c: 'Print', icon: IconGlobe, t: 'Hoardings & standees', s: 'Big designs for big spaces.',
    what: 'Outdoor hoardings, flex banners, roll-up standees and shop signboards designed at full print size.',
    why: 'Large formats are seen from a distance in seconds, so the design must be bold and very simple.',
    get: ['Exact print size', 'High-resolution files', 'Fabrication-ready guide'],
    fmt: ['PDF', 'TIFF', 'CDR'], days: '2-3', from: 2999 },
  { c: 'Print', icon: IconPen, t: 'Menu cards', s: 'Menus that sell more dishes.',
    what: 'Restaurant and café menus for print, table tents and QR digital menus.',
    why: 'A clear menu layout guides customers to your best-selling and highest-margin dishes.',
    get: ['Print menu', 'Table tent', 'QR / digital menu version'],
    fmt: ['PDF', 'PNG'], days: '3-5', from: 3999 },

  // Packaging
  { c: 'Packaging', icon: IconBag, t: 'Product packaging', s: 'Boxes that sell on the shelf.',
    what: 'Box, pouch, bottle and jar packaging designed on the printer’s dieline, with all legal text, barcodes and nutrition panels.',
    why: 'Packaging is often what makes someone pick your product over the one next to it.',
    get: ['Design on dieline', '3D mockups', 'Print-ready files', 'Barcode and legal text placement'],
    fmt: ['AI', 'PDF'], days: '7-10', from: 14999 },
  { c: 'Packaging', icon: IconTag, t: 'Labels & stickers', s: 'Small space, big impact.',
    what: 'Product labels, bottle labels, stickers and hang tags sized exactly for your products.',
    why: 'A good label tells the customer what it is, why it is good and who made it, in a second.',
    get: ['Exact size design', 'Variants for flavours or sizes', 'Print-ready files'],
    fmt: ['AI', 'PDF'], days: '3-5', from: 2999 },

  // Digital & UI
  { c: 'Digital & UI', icon: IconPhone, t: 'Website & app UI design', s: 'Screens that are easy to use.',
    what: 'User interface design for websites and mobile apps in Figma, with clickable prototypes and a design system.',
    why: 'Good UI makes your product easy to use, which means more sign-ups, orders and happy users.',
    get: ['Wireframes', 'High-fidelity screens', 'Clickable prototype', 'Design system'],
    fmt: ['Figma', 'PDF'], days: '10-20', from: 19999 },
  { c: 'Digital & UI', icon: IconZap, t: 'Icon sets', s: 'Custom icons in your style.',
    what: 'A set of custom icons drawn on one grid and stroke style, for your website, app or signage.',
    why: 'Custom icons make your product feel unique instead of using the same free icons as everyone else.',
    get: ['Set of 20 icons', 'Line and filled versions', 'SVG and icon font'],
    fmt: ['SVG', 'PNG', 'Figma'], days: '4-6', from: 7999 },

  // Motion & video
  { c: 'Motion & video', icon: IconClock, t: 'Logo animation', s: 'Your logo, brought to life.',
    what: 'A short 3-5 second animation of your logo for video intros, reels, presentations and your website.',
    why: 'Motion makes your brand feel modern and memorable at the start of every video.',
    get: ['3-5 second animation', 'With and without sound', 'Transparent version'],
    fmt: ['MP4', 'MOV', 'Lottie', 'GIF'], days: '3-5', from: 4999 },
  { c: 'Motion & video', icon: IconZap, t: 'Reels & motion posts', s: 'Short animated content.',
    what: 'Animated posts, reels with text and motion graphics, and product showcase videos for social media.',
    why: 'Video and motion get far more reach than still images on Instagram and YouTube.',
    get: ['15-30 second reels', 'Captions and music', 'Vertical and square sizes'],
    fmt: ['MP4'], days: '2-4', from: 2499 },
  { c: 'Motion & video', icon: IconChart, t: 'Explainer videos', s: 'Explain your product in 60 seconds.',
    what: 'Animated 2D explainer videos with script, voice-over, illustration and animation.',
    why: 'An explainer video helps people understand your product fast, which raises conversions on landing pages.',
    get: ['Script', 'Storyboard', 'Voice-over (Hindi or English)', '60-90 second video'],
    fmt: ['MP4'], days: '10-15', from: 24999 },

  // Illustration & 3D
  { c: 'Illustration & 3D', icon: IconPen, t: 'Illustrations & mascots', s: 'Custom art and characters.',
    what: 'Hand-drawn digital illustrations, brand mascots and characters for websites, packaging and social media.',
    why: 'A mascot or illustration style gives your brand a personality no stock photo can.',
    get: ['Character in 3-5 poses', 'Colour and line versions', 'Source files'],
    fmt: ['AI', 'PSD', 'PNG'], days: '5-10', from: 7999 },
  { c: 'Illustration & 3D', icon: IconLayers, t: '3D mockups & renders', s: 'Products that look real before they exist.',
    what: '3D renders of products, packaging and spaces, plus realistic mockups of your designs on boxes, phones and billboards.',
    why: 'Great for e-commerce listings, investor decks and approving packaging before printing.',
    get: ['3-5 render angles', 'Transparent backgrounds', 'High resolution'],
    fmt: ['PNG', 'JPG', 'Blender'], days: '4-8', from: 5999 },
]

/* =========================================================
   3. Logo types explained
   ========================================================= */
const LOGO_TYPES = [
  { k: 'word', t: 'Wordmark', d: 'The full business name in a special font. Best when your name is short and distinctive.', eg: 'Like Google or Coca-Cola' },
  { k: 'letter', t: 'Lettermark', d: 'Initials only. Best for long names that are hard to fit or remember.', eg: 'Like HP or IBM' },
  { k: 'icon', t: 'Icon / symbol', d: 'A picture with no text. Best for well-known brands or as an app icon.', eg: 'Like Apple or Twitter’s bird' },
  { k: 'combo', t: 'Combination mark', d: 'Icon and name together. The most flexible and the best choice for most new businesses.', eg: 'Like Burger King or Lacoste' },
  { k: 'emblem', t: 'Emblem', d: 'Text inside a badge or shape. Feels classic and trustworthy; great for schools, cafés and clubs.', eg: 'Like Starbucks or Harley-Davidson' },
]

/* =========================================================
   4. Colour and type basics
   ========================================================= */
const COLOURS = [
  { c: '#E53935', n: 'Red', m: 'Energy, urgency, appetite', u: 'Food, sales, sports' },
  { c: '#FB8C00', n: 'Orange', m: 'Friendly, fun, affordable', u: 'Kids, e-commerce, offers' },
  { c: '#FDD835', n: 'Yellow', m: 'Happy, bright, attention', u: 'Retail, travel, signage' },
  { c: '#43A047', n: 'Green', m: 'Growth, health, nature', u: 'Organic, finance, health' },
  { c: '#1E88E5', n: 'Blue', m: 'Trust, calm, professional', u: 'Banks, tech, healthcare' },
  { c: '#7B5CFF', n: 'Purple', m: 'Premium, creative, wise', u: 'Beauty, luxury, education' },
  { c: '#ff4fa0', n: 'Pink', m: 'Playful, caring, youthful', u: 'Fashion, beauty, gifts' },
  { c: '#111111', n: 'Black', m: 'Luxury, power, elegance', u: 'Fashion, premium, tech' },
]
const FONTS = [
  { k: 'serif', t: 'Serif', s: 'Georgia, "Times New Roman", serif', m: 'Traditional, trusted, editorial. Law firms, newspapers, jewellery.' },
  { k: 'sans', t: 'Sans-serif', s: 'var(--font-body)', m: 'Modern, clean, easy on screens. Tech, apps, startups.' },
  { k: 'display', t: 'Display', s: 'var(--font-display)', m: 'Bold and expressive. Headlines, posters and logos only.' },
  { k: 'script', t: 'Script', s: '"Brush Script MT", "Segoe Script", cursive', m: 'Elegant, personal, handmade. Bakeries, weddings, beauty.' },
]

/* =========================================================
   5. File formats explained
   ========================================================= */
const FORMATS = [
  { f: 'AI', n: 'Adobe Illustrator', d: 'The editable master file for logos and vector artwork. Keep it safe.', use: ['Edit', 'Print'] },
  { f: 'PSD', n: 'Photoshop', d: 'Editable layered file for photos, social posts and banners.', use: ['Edit'] },
  { f: 'Figma', n: 'Figma file', d: 'Online editable design for websites, apps and social templates.', use: ['Edit', 'Web'] },
  { f: 'SVG', n: 'Scalable vector', d: 'Logo and icons for websites. Stays sharp at any size and is tiny in file size.', use: ['Web'] },
  { f: 'PNG', n: 'Image with transparency', d: 'Logo on a transparent background, social posts and screenshots.', use: ['Web', 'Social'] },
  { f: 'JPG', n: 'Compressed photo', d: 'Photos and social posts where a small file size matters. No transparency.', use: ['Web', 'Social'] },
  { f: 'WebP', n: 'Modern web image', d: 'Smaller and faster than JPG and PNG. Best for website images and banners.', use: ['Web'] },
  { f: 'PDF', n: 'Print / share document', d: 'Print-ready files for the printer and documents to share on WhatsApp or email.', use: ['Print', 'Share'] },
  { f: 'MP4', n: 'Video', d: 'Reels, animations and explainer videos for every platform.', use: ['Social', 'Web'] },
  { f: 'Lottie', n: 'Web animation', d: 'Lightweight animation file for websites and apps. Plays smoothly with tiny size.', use: ['Web', 'App'] },
]

const PRINT_VS_DIGITAL = [
  { t: 'CMYK vs RGB', d: 'Printers mix Cyan, Magenta, Yellow and Black ink (CMYK). Screens use Red, Green and Blue light (RGB). We prepare print files in CMYK so colours do not come out dull.' },
  { t: '300 DPI resolution', d: 'Print needs 300 dots per inch to look sharp. A 72 DPI web image looks blurry when printed, so we design print files at full resolution.' },
  { t: 'Bleed and safe area', d: 'Printers cut paper with a small margin of error. We add 3 mm “bleed” outside the edge and keep text inside a safe area so nothing gets cut off.' },
  { t: 'Vector vs raster', d: 'Vector art (AI, SVG) is made of shapes and scales to any size. Raster images (PNG, JPG) are made of pixels and blur when enlarged. Logos are always made in vector.' },
]

/* =========================================================
   6. Pricing
   ========================================================= */
const PRICING = [
  {
    k: 'brand', label: 'Branding packages',
    plans: [
      { name: 'Logo', price: 9999, note: 'one-time', feats: ['3 logo concepts', '3 revisions', 'All logo versions', 'All file formats', 'Ready in 7 days'] },
      { name: 'Brand identity', price: 39999, note: 'one-time', popular: true, feats: ['Logo and variations', 'Colours and fonts', 'Visiting card and letterhead', '10 social templates', 'Brand guidelines PDF', 'Ready in 2-3 weeks'] },
      { name: 'Complete brand', price: 89999, note: 'one-time', feats: ['Everything in Brand identity', 'Packaging or menu design', 'Website UI home page', 'Logo animation', '20 social templates', 'Brand launch kit'] },
    ],
  },
  {
    k: 'social', label: 'Social media (monthly)',
    plans: [
      { name: 'Starter', price: 7999, note: 'per month', feats: ['12 posts', '4 stories', 'Festival posts included', '1 platform sizes'] },
      { name: 'Growth', price: 17999, note: 'per month', popular: true, feats: ['20 posts or carousels', '10 stories', '4 reel covers', '4 ad creatives', 'All platform sizes', '48h turnaround'] },
      { name: 'Pro', price: 34999, note: 'per month', feats: ['30 posts or carousels', '8 animated reels', '8 ad creatives', 'Monthly content plan', 'Dedicated designer'] },
    ],
  },
  {
    k: 'print', label: 'Print & packaging',
    plans: [
      { name: 'Print starter', price: 6999, note: 'one-time', feats: ['Visiting card', 'Letterhead', 'A4 flyer', 'Print-ready PDFs'] },
      { name: 'Marketing print', price: 14999, note: 'one-time', popular: true, feats: ['Tri-fold brochure', 'Flyer and poster', 'Roll-up standee', 'Digital PDF versions', 'Printer coordination'] },
      { name: 'Packaging', price: 24999, note: 'per product line', feats: ['Box or pouch on dieline', 'Labels for 3 variants', '3D mockups', 'Print-ready files'] },
    ],
  },
]

const PRICE_LIST = [
  ['Logo design', 9999], ['Social media post', 499], ['Carousel (up to 10 slides)', 1999], ['Story / reel cover', 399],
  ['Ad creative set', 2499], ['Website banner', 1499], ['Flyer / poster', 1499], ['Brochure (tri-fold)', 5999],
  ['Visiting card', 1499], ['Hoarding / standee', 2999], ['Menu card', 3999], ['Product label', 2999],
  ['Packaging box', 14999], ['Pitch deck (15 slides)', 7999], ['Icon set (20)', 7999], ['Logo animation', 4999],
  ['Animated reel', 2499], ['Explainer video (60s)', 24999], ['Illustration / mascot', 7999], ['3D mockup set', 5999],
]

/* =========================================================
   7. Steps & FAQ
   ========================================================= */
const STEPS = [
  { t: 'Brief', w: 'Day 1', d: 'A short call or form about your business, audience, likes and dislikes.' },
  { t: 'Research & moodboard', w: 'Day 2-3', d: 'Competitors and references collected so we agree on direction early.' },
  { t: 'Concepts', w: 'Day 4-6', d: 'Two or three different design routes to choose from.' },
  { t: 'Revisions', w: 'Day 7-9', d: 'Up to three rounds of changes on the route you pick.' },
  { t: 'Final files', w: 'Day 10', d: 'Every format and size you need, for print, web and social.' },
  { t: 'Handover', w: 'Day 10', d: 'Organised folders, a simple guide and full commercial rights.' },
]

const FAQ = [
  { q: 'How many revisions do I get?', a: 'Most services include 3 rounds of revisions. Small items like single posts include 2. Extra rounds are ₹500 to ₹2,000 depending on the design.' },
  { q: 'Will I get the source files?', a: 'Yes. You get editable source files (AI, PSD or Figma) plus ready-to-use PNG, SVG, JPG, PDF and print files at no extra cost.' },
  { q: 'Do I own the copyright?', a: 'Yes. After the final payment, full commercial rights to the final designs belong to you. We only show the work in our portfolio if you allow it.' },
  { q: 'Can you design in Hindi and regional languages?', a: 'Yes. We design in Hindi, Marathi, Tamil, Bengali, Urdu, Arabic and more, using fonts that read well in each script.' },
  { q: 'How do I pay?', a: 'One-time projects: 50% to start and 50% before final files. Monthly plans are paid at the start of each month. Prices are exclusive of 18% GST.' },
  { q: 'Do you also print?', a: 'We prepare print-ready files and can coordinate printing with our partners at their actual rates, or send the files straight to your printer.' },
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


/* =========================================================
   Section: services catalogue + detail modal
   ========================================================= */
function ServiceModal({ s, onClose }) {
  const go = useGo()
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [onClose])
  const Icon = s.icon
  return (
    <motion.div className="gp-modal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="gp-modal glass"
        role="dialog" aria-modal="true" aria-label={s.t}
        data-lenis-prevent
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="gp-modal-close" onClick={onClose} aria-label="Close"><span /><span /></button>
        <div className="gp-modal-head">
          <span className="gp-svc-ic big"><Icon /></span>
          <div><small>{s.c}</small><h3>{s.t}</h3><p>{s.s}</p></div>
        </div>
        <div className="gp-modal-block"><h4>What is it?</h4><p>{s.what}</p></div>
        <div className="gp-modal-block"><h4>Why you need it</h4><p>{s.why}</p></div>
        <div className="gp-modal-block">
          <h4>What you get</h4>
          <ul>{s.get.map((g) => <li key={g}><IconCheck />{g}</li>)}</ul>
        </div>
        <div className="gp-modal-facts">
          <div><small>File formats</small><div className="gp-fmts">{s.fmt.map((f) => <span key={f}>{f}</span>)}</div></div>
          <div><small>Delivery</small><strong>{s.days} days</strong></div>
          <div><small>Starts at</small><strong className="lime">{inr(s.from)}</strong></div>
        </div>
        <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => go('contact'), 300) }}>
          Order {s.t.toLowerCase()} <IconArrow />
        </a>
      </motion.div>
    </motion.div>
  )
}

function ServicesCatalogue() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const list = SERVICES.filter((s) => cat === 'All' || s.c === cat)

  return (
    <section className="section" id="services-list">
      <div className="container">
        <div className="section-head gp-head">
          <div>
            <Reveal><span className="kicker">Everything we design</span></Reveal>
            <SplitText as="h2" className="h2" text="25 design services, each explained." inView />
          </div>
          <Reveal delay={0.1}>
            <p className="lead">Pick a category, then tap any service to see what it is, why you need it, what you get, the file formats, delivery time and starting price.</p>
          </Reveal>
        </div>

        <Reveal className="gp-cat-bar" role="tablist" aria-label="Design categories">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
              {cat === c && <motion.span layoutId="gp-cat-pill" className="gp-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{c}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="gp-svcs">
          <AnimatePresence mode="popLayout">
            {list.map((s) => {
              const Icon = s.icon
              return (
                <motion.button
                  layout
                  key={s.t}
                  className="gp-svc glass gloss"
                  onClick={() => setOpen(s)}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  data-cursor
                >
                  <div className="gp-svc-top">
                    <span className="gp-svc-ic"><Icon /></span>
                    <span className="gp-svc-cat">{s.c}</span>
                  </div>
                  <h3>{s.t}</h3>
                  <p>{s.s}</p>
                  <div className="gp-svc-foot">
                    <span><small>From</small><b>{inr(s.from)}</b></span>
                    <span><small>Delivery</small><b>{s.days} days</b></span>
                    <span className="gp-svc-more">Details <IconArrow /></span>
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open && <ServiceModal key="modal" s={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

/* =========================================================
   Section: design basics (logo types, colour, typography)
   ========================================================= */
function LogoPreview({ k }) {
  return (
    <div className={`lg-prev lg-${k}`} aria-hidden="true">
      {k === 'word' && <b>bloom</b>}
      {k === 'letter' && <b>BS</b>}
      {k === 'icon' && <i />}
      {k === 'combo' && (<><i /><b>bloom</b></>)}
      {k === 'emblem' && (<span><b>BLOOM</b><small>EST. 2026</small></span>)}
    </div>
  )
}

function DesignBasics() {
  const [logo, setLogo] = useState(LOGO_TYPES[3].k)
  const [colour, setColour] = useState(COLOURS[4])
  const [sample, setSample] = useState('Bloom Studio')
  const L = LOGO_TYPES.find((x) => x.k === logo)

  return (
    <section className="section" id="basics">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Design explained</span></Reveal>
          <SplitText as="h2" className="h2" text="The basics behind every good design." inView />
          <Reveal delay={0.1}><p className="lead">The same ideas we use on your project, explained simply: which logo type fits you, what colours say and how fonts change the feeling.</p></Reveal>
        </div>

        {/* Logo types */}
        <Reveal className="gp-basic glass">
          <div className="gp-basic-copy">
            <span className="gp-basic-n">01</span>
            <h3>The 5 types of logo</h3>
            <div className="gp-logo-tabs" role="tablist" aria-label="Logo types">
              {LOGO_TYPES.map((x) => (
                <button key={x.k} role="tab" aria-selected={logo === x.k} className={logo === x.k ? 'on' : ''} onClick={() => setLogo(x.k)}>{x.t}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={L.k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <p className="gp-basic-d">{L.d}</p>
                <small className="gp-basic-eg">{L.eg}</small>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="gp-basic-visual">
            <AnimatePresence mode="wait">
              <motion.div key={L.k} initial={{ opacity: 0, scale: 0.85, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
                <LogoPreview k={L.k} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Colour meaning */}
        <Reveal className="gp-basic glass" delay={0.05}>
          <div className="gp-basic-copy">
            <span className="gp-basic-n">02</span>
            <h3>What colours say</h3>
            <p className="gp-basic-d">Colour is the first thing people notice. Pick a colour to see the feeling it gives and the businesses that use it well.</p>
            <div className="gp-swatches">
              {COLOURS.map((c) => (
                <button key={c.n} className={colour.n === c.n ? 'on' : ''} style={{ background: c.c }} onClick={() => setColour(c)} aria-label={c.n} aria-pressed={colour.n === c.n} />
              ))}
            </div>
          </div>
          <div className="gp-basic-visual">
            <motion.div className="gp-colour-card" animate={{ background: colour.c }} transition={{ duration: 0.5 }}>
              <b style={{ color: colour.n === 'Yellow' ? '#000' : '#fff' }}>{colour.n}</b>
            </motion.div>
            <div className="gp-colour-info">
              <p><small>Feeling</small>{colour.m}</p>
              <p><small>Good for</small>{colour.u}</p>
            </div>
          </div>
        </Reveal>

        {/* Typography */}
        <Reveal className="gp-basic glass" delay={0.05}>
          <div className="gp-basic-copy">
            <span className="gp-basic-n">03</span>
            <h3>How fonts change the feeling</h3>
            <p className="gp-basic-d">The same name feels completely different in each font family. Type your business name to try it.</p>
            <label className="gp-type-input">
              <span className="sr-only">Your business name</span>
              <input value={sample} maxLength={24} onChange={(e) => setSample(e.target.value)} placeholder="Your business name" />
            </label>
          </div>
          <div className="gp-fonts">
            {FONTS.map((f) => (
              <div key={f.k} className="gp-font">
                <span style={{ fontFamily: f.s }}>{sample || 'Bloom Studio'}</span>
                <small><b>{f.t}</b> · {f.m}</small>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   Section: file formats + print vs digital
   ========================================================= */
function FilesExplained() {
  const [filter, setFilter] = useState('All')
  const uses = ['All', 'Edit', 'Web', 'Social', 'Print']
  const list = FORMATS.filter((f) => filter === 'All' || f.use.includes(filter))
  return (
    <section className="section" id="formats">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="kicker">Files you receive</span></Reveal>
          <SplitText as="h2" className="h2" text="Every file format, and when to use it." inView />
        </div>

        <Reveal className="gp-cat-bar small" role="tablist" aria-label="Filter formats">
          {uses.map((u) => (
            <button key={u} role="tab" aria-selected={filter === u} className={filter === u ? 'on' : ''} onClick={() => setFilter(u)}>
              {filter === u && <motion.span layoutId="gp-fmt-pill" className="gp-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{u === 'All' ? 'All formats' : `For ${u.toLowerCase()}`}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="gp-formats">
          <AnimatePresence mode="popLayout">
            {list.map((f) => (
              <motion.div layout key={f.f} className="gp-format glass" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                <span className="gp-file"><b>{f.f}</b></span>
                <div>
                  <h3>{f.n}</h3>
                  <p>{f.d}</p>
                  <div className="gp-uses">{f.use.map((u) => <span key={u}>{u}</span>)}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="gp-pvd">
          <Reveal className="gp-pvd-head">
            <h3>Print vs digital, explained</h3>
            <p>Four things that decide whether your design looks perfect or blurry and cut off.</p>
          </Reveal>
          <div className="gp-pvd-grid">
            {PRINT_VS_DIGITAL.map((x, i) => (
              <Reveal key={x.t} delay={i * 0.06} className="gp-pvd-card glass gloss">
                <span className="gp-pvd-n">{i + 1}</span>
                <h4>{x.t}</h4>
                <p>{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   Section: full pricing
   ========================================================= */
function GraphicsPricing() {
  const go = useGo()
  const [tab, setTab] = useState(PRICING[0].k)
  const group = PRICING.find((p) => p.k === tab)
  const toContact = (e) => { e.preventDefault(); go('contact') }

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head center">
          <Reveal><span className="kicker">Pricing</span></Reveal>
          <SplitText as="h2" className="h2" text="Simple packages, or pay per design." inView />
          <Reveal delay={0.1}><p className="lead">All prices in Indian rupees, exclusive of 18% GST. Source files and commercial rights are always included.</p></Reveal>
        </div>

        <Reveal className="gp-cat-bar center" role="tablist" aria-label="Pricing groups">
          {PRICING.map((p) => (
            <button key={p.k} role="tab" aria-selected={tab === p.k} className={tab === p.k ? 'on' : ''} onClick={() => setTab(p.k)}>
              {tab === p.k && <motion.span layoutId="gp-price-pill" className="gp-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{p.label}</span>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={tab} className="gp-plans" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            {group.plans.map((p) => (
              <div key={p.name} className={`wp-plan glass gloss ${p.popular ? 'is-popular' : ''}`}>
                {p.popular && <span className="plan-badge">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="plan-price"><strong>{inr(p.price)}</strong><span>{p.note} + GST</span></div>
                <ul>{p.feats.map((f) => <li key={f}><IconCheck />{f}</li>)}</ul>
                <a href="#contact" className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'}`} onClick={toContact}>Choose {p.name} <IconArrow /></a>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal className="gp-pricelist glass gloss">
          <div className="gp-pricelist-head">
            <h3>Single design price list</h3>
            <p>Need just one thing? Order any design on its own.</p>
          </div>
          <ul>
            {PRICE_LIST.map(([n, p]) => (
              <li key={n}><span>{n}</span><i /><b>{inr(p)}</b></li>
            ))}
          </ul>
          <p className="gp-pricelist-note">Extra revision round: ₹500 to ₹2,000. Rush delivery in 24 hours: +50%. Regional language version: +30%.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================
   Page
   ========================================================= */
export default function GraphicsPage() {
  useEffect(() => { document.title = 'Graphic design services and pricing — Orbitra' }, [])

  return (
    <div className="service-page">
      <PageHero
        crumb="Graphic design"
        lines={['Every design', 'your brand needs,', 'explained.']}
        lead="Logos, branding, social media, ads, print, packaging, UI, motion and 3D. Twenty-five design services, each explained in plain words, with clear prices."
        visual={<BrandKit />}
        stats={STATS}
      />
      <ServicesCatalogue />
      <DesignBasics />
      <BeforeAfter />
      <FilesExplained />
      <Graphics showPageLink={false} />
      <Steps title="From brief to final files in about ten days." steps={STEPS} />
      <GraphicsPricing />
      <Faq title="Questions about design and pricing." items={FAQ} />
      <Contact defaultService="Graphic design" />
    </div>
  )
}