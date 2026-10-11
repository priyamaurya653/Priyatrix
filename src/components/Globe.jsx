import { useEffect, useRef } from 'react'
import './Globe.css'

// Greetings pinned to real-ish coordinates
const LANGS = [
  { t: 'Hello', lat: 40, lon: -74 },
  { t: 'Hola', lat: 40, lon: -4 },
  { t: 'Bonjour', lat: 48, lon: 2 },
  { t: 'नमस्ते', lat: 26, lon: 76 },
  { t: 'こんにちは', lat: 35, lon: 139 },
  { t: 'مرحبا', lat: 24, lon: 46 },
  { t: 'Olá', lat: -15, lon: -47 },
  { t: '你好', lat: 39, lon: 116 },
  { t: 'Hallo', lat: 52, lon: 13 },
  { t: 'Привет', lat: 55, lon: 37 },
  { t: '안녕하세요', lat: 37, lon: 127 },
  { t: 'Jambo', lat: -1, lon: 37 },
  { t: 'G’day', lat: -33, lon: 151 },
]
const ARCS = [[0, 2], [2, 3], [3, 4], [1, 6], [5, 3], [7, 10], [8, 9], [0, 6], [11, 5], [4, 12]]

const toVec = (lat, lon) => {
  const p = (lat * Math.PI) / 180
  const l = (lon * Math.PI) / 180
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)]
}
// rotate around Y (spin) then X (tilt)
const rot = ([x, y, z], a, t) => {
  const ca = Math.cos(a), sa = Math.sin(a)
  const x1 = x * ca + z * sa
  const z1 = -x * sa + z * ca
  const ct = Math.cos(t), st = Math.sin(t)
  return [x1, y * ct - z1 * st, y * st + z1 * ct]
}

export default function Globe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const N = window.innerWidth < 700 ? 750 : 1400
    const baseSpeed = reduce ? 0 : 0.0024

    // Fibonacci sphere points, with a cheap noise mask to fake continents
    const golden = Math.PI * (3 - Math.sqrt(5))
    const pts = []
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i
      const v = [Math.cos(th) * r, y, Math.sin(th) * r]
      const lat = Math.asin(y)
      const lon = Math.atan2(v[0], v[2])
      const n = Math.sin(lat * 2.6 + 1.3) * Math.cos(lon * 1.7) + 0.55 * Math.sin(lon * 3.1 + lat * 1.9) + 0.35 * Math.cos(lat * 5.3 - lon * 2.2)
      pts.push({ v, land: n > 0.32 })
    }

    const langs = LANGS.map((l) => ({ ...l, v: toVec(l.lat, l.lon) }))
    const arcs = ARCS.map(([a, b], i) => {
      const A = langs[a].v, B = langs[b].v
      const w = Math.acos(Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]))
      const samples = []
      for (let s = 0; s <= 50; s++) {
        const t = s / 50
        const k1 = Math.sin((1 - t) * w) / Math.sin(w)
        const k2 = Math.sin(t * w) / Math.sin(w)
        const h = 1 + Math.sin(Math.PI * t) * (0.12 + w * 0.12)
        samples.push([(A[0] * k1 + B[0] * k2) * h, (A[1] * k1 + B[1] * k2) * h, (A[2] * k1 + B[2] * k2) * h])
      }
      return { samples, offset: i * 0.37 }
    })

    let W = 0, H = 0, R = 0
    let angle = 0.9, tilt = -0.35, targetTilt = -0.35, vel = baseSpeed
    let dragging = false, lastX = 0, visible = true, raf = 0
    const t0 = performance.now()

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect()
      W = r.width; H = r.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.min(W, H) * 0.36
    }

    const pill = (x, y, w, h, r) => {
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r)
      else ctx.rect(x, y, w, h)
    }

    const draw = (now) => {
      const time = (now - t0) / 1000
      if (!dragging) { angle += vel; vel += (baseSpeed - vel) * 0.02 }
      tilt += (targetTilt - tilt) * 0.05

      ctx.clearRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2
      const ringRot = -0.38, rx = R * 1.5, ry = R * 0.36

      // atmosphere glow
      let g = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.6)
      g.addColorStop(0, 'rgba(200,245,66,0.13)')
      g.addColorStop(0.4, 'rgba(123,92,255,0.12)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2); ctx.fill()

      // back half of the orbit ring
      ctx.save()
      ctx.setLineDash([2, 7]); ctx.lineDashOffset = -time * 18
      ctx.strokeStyle = 'rgba(167,149,255,0.35)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, ringRot, Math.PI, Math.PI * 2); ctx.stroke()
      ctx.restore()

      // glassy sphere body
      g = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.05, cx, cy, R)
      g.addColorStop(0, 'rgba(58,66,40,0.95)')
      g.addColorStop(0.55, 'rgba(12,12,22,0.96)')
      g.addColorStop(0.92, 'rgba(20,24,60,0.95)')
      g.addColorStop(1, 'rgba(61,123,255,0.55)')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill()

      // dots
      for (const p of pts) {
        const [x, y, z] = rot(p.v, angle, tilt)
        const sx = cx + x * R, sy = cy - y * R
        if (z >= 0) {
          if (p.land) {
            ctx.fillStyle = `rgba(200,245,66,${0.25 + 0.75 * z})`
            ctx.beginPath(); ctx.arc(sx, sy, 0.7 + z * 1.05, 0, 6.283); ctx.fill()
          } else {
            ctx.fillStyle = `rgba(170,180,255,${0.06 + 0.18 * z})`
            ctx.fillRect(sx - 0.5, sy - 0.5, 1, 1)
          }
        } else if (p.land) {
          ctx.fillStyle = `rgba(123,92,255,${0.14 * (1 + z)})`
          ctx.fillRect(sx - 0.5, sy - 0.5, 1, 1)
        }
      }

      // rim light
      ctx.strokeStyle = 'rgba(200,245,66,0.25)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke()

      // arcs + travelling pulses
      const hiddenPt = ([x, y, z]) => z < 0 && x * x + y * y < 1
      for (const a of arcs) {
        const P = a.samples.map((s) => rot(s, angle, tilt))
        ctx.beginPath()
        let started = false
        for (const pt of P) {
          if (hiddenPt(pt)) { started = false; continue }
          const sx = cx + pt[0] * R, sy = cy - pt[1] * R
          if (!started) { ctx.moveTo(sx, sy); started = true } else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = 'rgba(200,245,66,0.32)'; ctx.lineWidth = 1.1; ctx.stroke()

        const k = (time * 0.32 + a.offset) % 1
        const pt = P[Math.floor(k * (P.length - 1))]
        if (!hiddenPt(pt)) {
          ctx.save()
          ctx.shadowColor = '#C8F542'; ctx.shadowBlur = 14; ctx.fillStyle = '#E8FF9A'
          ctx.beginPath(); ctx.arc(cx + pt[0] * R, cy - pt[1] * R, 2.3, 0, 6.283); ctx.fill()
          ctx.restore()
        }
      }

      // language labels on the visible side
      const fs = Math.max(11, Math.round(R * 0.06))
      ctx.font = `600 ${fs}px "Instrument Sans", system-ui, sans-serif`
      ctx.textBaseline = 'middle'
      for (const l of langs) {
        const [x, y, z] = rot(l.v, angle, tilt)
        if (z < 0.12) continue
        const alpha = Math.min(1, (z - 0.12) * 3)
        const sx = cx + x * R, sy = cy - y * R
        const pulse = 3 + ((time * 1.4 + l.lat) % 1) * 9
        ctx.strokeStyle = `rgba(200,245,66,${alpha * (1 - (pulse - 3) / 9) * 0.8})`
        ctx.beginPath(); ctx.arc(sx, sy, pulse, 0, 6.283); ctx.stroke()
        ctx.fillStyle = `rgba(200,245,66,${alpha})`
        ctx.beginPath(); ctx.arc(sx, sy, 2.8, 0, 6.283); ctx.fill()

        const tw = ctx.measureText(l.t).width
        const bx = sx + 10, by = sy - fs * 1.9, bw = tw + 20, bh = fs * 1.9
        ctx.fillStyle = `rgba(10,10,14,${0.72 * alpha})`
        pill(bx, by, bw, bh, bh / 2); ctx.fill()
        ctx.strokeStyle = `rgba(200,245,66,${0.45 * alpha})`; ctx.stroke()
        ctx.fillStyle = `rgba(243,245,239,${alpha})`
        ctx.fillText(l.t, bx + 10, by + bh / 2 + 1)
      }

      // front half of the orbit ring + satellite
      ctx.save()
      ctx.setLineDash([2, 7]); ctx.lineDashOffset = -time * 18
      ctx.strokeStyle = 'rgba(200,245,66,0.55)'; ctx.lineWidth = 1.2
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, ringRot, 0, Math.PI); ctx.stroke()
      ctx.restore()
      const phi = time * 0.55
      if (Math.sin(phi) > 0) {
        const ex = rx * Math.cos(phi), ey = ry * Math.sin(phi)
        const sx = cx + ex * Math.cos(ringRot) - ey * Math.sin(ringRot)
        const sy = cy + ex * Math.sin(ringRot) + ey * Math.cos(ringRot)
        ctx.save()
        ctx.shadowColor = '#C8F542'; ctx.shadowBlur = 20; ctx.fillStyle = '#C8F542'
        ctx.beginPath(); ctx.arc(sx, sy, 4.5, 0, 6.283); ctx.fill()
        ctx.restore()
      }
    }

    const loop = (now) => {
      if (visible) draw(now)
      raf = requestAnimationFrame(loop)
    }

    // drag to spin, pointer height tilts the globe
    const down = (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture?.(e.pointerId) }
    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      targetTilt = -0.35 + ((e.clientY - r.top) / r.height - 0.5) * 0.5
      if (!dragging) return
      const dx = e.clientX - lastX
      lastX = e.clientX
      angle += dx * 0.006
      vel = dx * 0.006
    }
    const up = () => { dragging = false }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    resize()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div className="globe-wrap">
      <canvas ref={canvasRef} className="globe-canvas" aria-label="Rotating globe showing greetings in many languages" role="img" />
    </div>
  )
}
