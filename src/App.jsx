import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import * as P from './pages.jsx'

const nav = [['/identity', 'The Journey'], ['/about', 'About'], ['/books', 'Books'], ['/speaking', 'Speaking'], ['/the-forge', 'Community']]

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])
  const journey = ['/identity', '/ethical-leadership', '/wealth', '/impact']
  return (
    <header className="hd"><div className="wrap">
      <Link to="/" aria-label="Bisola Loto home"><img src="/images/logo-header.png" alt="Bisola Loto" width="152" height="36" /></Link>
      <button className="mb" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="nav" className={open ? 'open' : ''} aria-label="Main">
        {nav.map(([to, t]) => <NavLink key={to} to={to} className={({ isActive }) => (isActive || (to === '/identity' && journey.includes(pathname)) ? 'on' : '')}>{t}</NavLink>)}
        <Link className="btn" to="/assay">Take the Assay Assessment</Link>
      </nav>
    </div></header>
  )
}

function Footer() {
  return (
    <footer className="ft">
      <img src="/images/logo-footer.png" alt="Bisola Loto" width="152" height="36" />
      <div className="tag">Refining leaders who carry greatness</div><hr />
      <nav aria-label="Footer" style={{ display: 'block' }}>
        <Link to="/about">About</Link>·<Link to="/books">Books</Link>·<Link to="/speaking">Speaking</Link>·<Link to="/manifesto">Manifesto</Link>·<Link to="/contact">Contact</Link>
      </nav>
      <div className="s"><a href="mailto:hello@bisolaloto.com">hello@bisolaloto.com</a> · <a href="https://www.linkedin.com/" rel="noopener">LinkedIn</a> · <a href="https://www.instagram.com/" rel="noopener">Instagram</a> · <a href="https://www.youtube.com/" rel="noopener">YouTube</a></div>
    </footer>
  )
}

function Popup() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('assay-pop') } catch {}
    if (seen || pathname === '/assay') return
    const t = setTimeout(() => setShow(true), 9000)
    return () => clearTimeout(t)
  }, [pathname])
  const close = () => { setShow(false); try { sessionStorage.setItem('assay-pop', '1') } catch {} }
  useEffect(() => { const f = e => e.key === 'Escape' && close(); addEventListener('keydown', f); return () => removeEventListener('keydown', f) }, [])
  if (!show) return null
  return (
    <div className="ov" onClick={e => e.target === e.currentTarget && close()}>
      <form className="pop" role="dialog" aria-modal="true" aria-label="The Assay Assessment" onSubmit={e => { e.preventDefault(); close(); nav('/assay') }}>
        <button type="button" className="x" aria-label="Close" onClick={close}>×</button>
        <img src="/images/social-profile.png" alt="" style={{ width: 44, borderRadius: '50%' }} />
        <span className="lbl" style={{ margin: 0, color: 'var(--ch)' }}>The Assay Assessment · Free</span>
        <h2>Find out what's gold.</h2>
        <p style={{ margin: '0 auto', fontSize: 14 }}>A free refining assessment for leaders. About 10 minutes.</p>
        <div className="pf g3" style={{ gridTemplateColumns: '1fr' }}>
          <input aria-label="First name" placeholder="First name" /><input aria-label="Email address" type="email" placeholder="Email address" />
        </div>
        <button className="btn c" style={{ width: '100%' }}>Start the assessment</button>
        <button type="button" className="no" onClick={close}>No thanks</button>
      </form>
    </div>
  )
}

export default function App() {
  return (
    <>
      <a href="#main" className="btn" style={{ position: 'absolute', left: -999 }} onFocus={e => (e.target.style.left = '8px')}>Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<P.Home />} />
          <Route path="/about" element={<P.About />} />
          {Object.keys(P.pillars).map(k => <Route key={k} path={`/${k}`} element={<P.Pillar k={k} />} />)}
          <Route path="/books" element={<P.Books />} />
          <Route path="/speaking" element={<P.Speaking />} />
          <Route path="/the-forge" element={<P.Forge />} />
          <Route path="/assay" element={<P.Assay />} />
          <Route path="/manifesto" element={<P.Manifesto />} />
          <Route path="/letters" element={<P.Letters />} />
          <Route path="/contact" element={<P.Contact />} />
          <Route path="*" element={<P.NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Popup />
    </>
  )
}
