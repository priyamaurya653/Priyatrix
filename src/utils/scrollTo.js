// Smooth scroll to a section id. Uses Lenis when it is running, native scroll otherwise.
export function scrollToId(id) {
  const el = id === 'top' ? document.body : document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(id === 'top' ? 0 : el, { offset: id === 'top' ? 0 : -70, duration: 1.4 })
  } else if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}