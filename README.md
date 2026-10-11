# Orbitra — Premium Digital Agency (React + Vite)

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Stack
React 18, Vite 5, Framer Motion (reveals, parallax, 3D tilt, text animation),
GSAP ScrollTrigger (pinned horizontal portfolio), Lenis (smooth scrolling),
Canvas 2D (3D globe — no three.js needed).

## Structure
```
src/
  main.jsx, App.jsx
  styles/global.css          tokens, buttons, glass, utilities
  utils/scrollTo.js          smooth anchor scrolling
  components/
    Navbar, Hero, Globe, Services, Multilingual, Apps, Design,
    Marketing, Portfolio, Process, About, WhyUs, Contact, Footer
    (each .jsx has its own .css)
    Reveal, SplitText, TiltCard, Magnetic, Counter, CursorGlow, Icons  (shared)
```

## Customise
- Brand name: search "Orbitra" (Navbar, Footer, About, index.html)
- Colours: `:root` in `src/styles/global.css`
- Contact form: connect your API in `Contact.jsx` → `submit()`
