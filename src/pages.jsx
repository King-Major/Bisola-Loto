import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SITE = 'https://bisolaloto.com'
export function Seo({ title, desc, path = '', noindex }) {
  useEffect(() => {
    document.title = title ? `${title} · Bisola Loto` : 'Bisola Loto · Refined Leadership for Faith-Driven Leaders'
    const set = (sel, attr, v) => { let el = document.head.querySelector(sel); if (!el) { el = document.createElement(sel.startsWith('link') ? 'link' : 'meta'); const m = sel.match(/\[(.+?)="(.+?)"\]/); el.setAttribute(m[1], m[2]); document.head.appendChild(el) } el.setAttribute(attr, v) }
    set('meta[name="description"]', 'content', desc)
    set('link[rel="canonical"]', 'href', SITE + path)
    set('meta[property="og:title"]', 'content', title || 'Bisola Loto')
    set('meta[property="og:description"]', 'content', desc)
    set('meta[property="og:url"]', 'content', SITE + path)
    set('meta[name="robots"]', 'content', noindex ? 'noindex' : 'index,follow')
  }, [title, desc, path, noindex])
  return null
}

const Lbl = ({ children, style }) => <span className="lbl" style={style}>{children}</span>
const Cov = ({ cls = '', by = 'Bisola Loto', title, sub, big }) => (
  <div className={`cov ${cls} ${big ? 'big' : ''}`} role="img" aria-label={`${title} book cover`}><b>{by}</b><span>{title}</span><small>{sub}</small></div>
)

function Form({ fields, cta, thanks, children }) {
  const [done, setDone] = useState(false)
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT // e.g. Formspree / ConvertKit / Mailchimp proxy
  const submit = async e => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    try { if (endpoint) await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) }) } catch {}
    setDone(true)
  }
  if (done) return <p className="ok" role="status">{thanks}</p>
  return (
    <form onSubmit={submit}>
      <div className="g3">{fields.map(([n, l, type]) => <label key={n}>{l}{type === 'select' ? <select name={n}>{['Refined Leadership', 'Identity & healing', 'Ethical leadership', 'Wealth & stewardship', 'Business growth', 'Real estate', 'Women & wealth', 'Impact & legacy'].map(o => <option key={o}>{o}</option>)}</select> : <input name={n} type={type || 'text'} required={['name', 'email', 'first'].includes(n)} />}</label>)}</div>
      {children}
      <button className="btn">{cta}</button>
    </form>
  )
}
const TA = ({ l, n = 'message' }) => <label>{l}<textarea name={n} /></label>

/* ---------- HOME ---------- */
const journey = [
  ['I · Vision', 'What has God shown me?', 'Clarity on your vision, turned into a plan.', [['Free guide', 'Find Your North Star'], ['Course', 'North Star']]],
  ['II · Identity & mindset', 'Who am I, really?', 'Healing, a renewed mindset and clarity on who you are.', [['Free guide', 'Rooted'], ['Book', 'Reclaim']]],
  ['III · Life design & ethical leadership', 'How do I build?', 'Building a well-ordered life and leading with integrity, humility and courage.', [['Programme', 'Life by Design'], ['Programme', 'Lead by Design']]],
  ['IV · Wealth & stewardship', 'How do I resource it?', 'Healing money wounds, building profitable businesses and stewarding wealth wisely.', [['Book', 'The Wealth Path™'], ['Real estate', 'Arkstone Real Estate']]],
  ['V · Impact', 'What will outlive me?', 'Passing on what you have built to the next generation.', [['Organisation', 'BloomHER Africa'], ['Programme', 'Legacy Blueprint']]],
]
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
const BookGrid = () => (
  <div className="bk">
    <div><Cov title="Protocols of Greatness" sub="30 truths for the leader" /><Lbl>Ethical leadership</Lbl><h3>Protocols of Greatness</h3><p>30 truths for every leader. Free to download.</p></div>
    <div><Cov cls="l" title="Reclaim" sub="A 30-day devotional" /><Lbl>Identity</Lbl><h3>Reclaim</h3><p>A 30-day soul-healing journey to freedom from emotional hurts and pain.</p></div>
    <div><Cov cls="d" title="The Wealth Path" sub="Financial confidence" /><Lbl>Wealth & stewardship</Lbl><h3>The Wealth Path™</h3><p>A leader's transformational guide to financial confidence.</p></div>
    <div><Cov cls="t" title="Set Apart" sub="A prayer guide" /><Lbl>Coming soon</Lbl><h3>Set Apart</h3><p>30 days of prayer to awaken hunger, break lukewarmness and ignite devotion.</p></div>
  </div>
)
const Forged = () => (
  <div className="feat">
    <Cov big title="Forged" sub="Rethinking Greatness" />
    <div><Lbl style={{ color: 'var(--ch)' }}>The book of Refined Leadership · Coming soon</Lbl>
      <h2><i>Forged</i><br />Rethinking Greatness</h2>
      <p style={{ margin: '22px 0 28px' }}>Leaders aren't born or trained. They are forged: healed, shown, tested, resourced and sent, until what remains is refined. A new way of thinking about leadership, where wholeness comes before greatness.</p>
      <Link className="btn c" to="/the-forge">Join the waitlist</Link></div>
  </div>
)
const Speak = () => (
  <section className="sec dk2"><div className="wrap two dk">
    <div><Lbl>Speaking</Lbl><h2>Bring Refined Leadership <em>to your stage.</em></h2>
        <p style={{ margin: '24px 0 32px' }}>Keynotes, workshops and conversations for conferences, organisations and communities.</p>
      <Link className="btn o" to="/speaking#invite">Invite Bisola</Link></div>
    <ol className="ol">{['Refined Leadership', 'Vision & life design', 'Identity & healing', 'Mindset', 'Ethical leadership', 'Wealth & stewardship', 'Business growth', 'Real estate', 'Impact & legacy'].map((t, i) => <li key={t}><i>{roman[i]}.</i>{t}</li>)}</ol>
  </div></section>
)
const Stay = ({ cta = true }) => (
  <section className="sec ctr"><div className="wrap">
    <Lbl>Stay connected</Lbl><h2>The refining <em>journey.</em></h2>
    <div className="three" style={{ marginTop: 48, textAlign: 'left', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))' }}>
      <div className="card"><Lbl>Free · Newsletter</Lbl><h3>Letters for the Road</h3><p>Reflections on identity, leadership and wealth, written for leaders who want to grow.</p><Link className="lnk" to="/letters">Subscribe</Link></div>
      <div className="card d"><Lbl style={{ color: 'var(--ch)' }}>Membership</Lbl><h3>The Forge</h3><p>Where leaders are refined. A private community for coaching, courses and priority access to gatherings. Come in. Be refined.</p><Link className="btn c" to="/the-forge">Join the waitlist</Link></div>
    </div></div></section>
)

export function Home() {
  return (<>
    <Seo desc="Bisola Loto refines faith-driven leaders who carry greatness, through clear vision, rooted identity, renewed mindset and lasting impact." />
    <section className="sec"><div className="wrap hero rise">
      <div><Lbl>Founder · Author · Coach</Lbl>
        <h1>Refining faith-driven leaders <em>who carry greatness.</em></h1><div className="rule" />
        <p>For emerging leaders ready to make lasting change: clear vision, rooted identity, renewed mindset and impact.</p>
        <div className="sm">Refined Leadership · Wholeness before greatness</div>
        <div className="row"><Link className="btn" to="/assay">Clarify your season</Link><Link className="btn o" to="/speaking#invite">Invite Bisola</Link></div></div>
      <div className="ph"><img src="/images/bisola-hero.webp" alt="Portrait of Bisola Loto" width="295" height="393" fetchpriority="high" /></div>
    </div></section>
    <section className="sec dk ctr"><div className="wrap">
      <Lbl>The mission</Lbl><p className="q">"Wholeness before greatness. You can only lead from who you are at your core."</p><div className="vr" />
      <p style={{ maxWidth: '50ch' }}>Gold is refined in the fire until only what is pure remains. Leaders are the same. Refined leadership burns away what doesn't belong, so that what remains can carry vision, wealth and influence with integrity.</p>
    </div></section>
    <section className="sec"><div className="wrap">
      <div className="head2"><div><Lbl>Refined Leadership</Lbl><h2>Five pillars. <em>One whole leader.</em></h2></div><p style={{ maxWidth: '34ch' }}>Lasting success starts on the inside. Each pillar builds on the one before it, from a clear vision to a legacy that outlives you.</p></div>
      <div className="jr">{journey.map(([k, q, d, items], i) => <div key={q}><span className="n">{roman[i]}.</span><div><Lbl style={{ marginBottom: 8 }}>{k}</Lbl><h3>{q}</h3></div><div><p>{d}</p><ul>{items.map(([a, b]) => <li key={b}><span className="k">{a}</span>{b}</li>)}</ul></div></div>)}</div>
      <div className="box"><div><Lbl>Free · Begin here</Lbl><h2 style={{ fontSize: 44 }}>The Cycle <em>of Rise</em></h2><p style={{ marginTop: 12 }}>Find out which season you're in and what to do next. A free assessment, about 10 minutes.</p></div><Link className="btn" to="/assay">Clarify your season</Link></div>
    </div></section>
    <section className="ctr" style={{ padding: '0 0 80px' }}><div className="wrap"><p className="tq" style={{ fontSize: 30 }}>Identity comes before assignment. Integrity is proven under pressure. Excellence is a form of worship.</p><Link className="lnk" to="/manifesto">Read the manifesto</Link></div></section>
    <section className="sec tan ctr"><div className="wrap"><Lbl>The books</Lbl><h2>Words to <em>grow</em> with.</h2><div style={{ textAlign: 'left' }}><Forged /></div><BookGrid /></div></section>
    <section className="sec ctr"><div className="wrap"><Lbl>In their words</Lbl>
      <p className="tq">"I was in a place where, aside from having passion for my business, I didn't have enough clarity on how to channel my drive into profit. All that has changed. I have more clarity now, more structure, and I show up more intentionally for my business."</p>
      <p style={{ fontSize: 14 }}>"She brings clarity to any business. She will teach you accountability. She guides and will give your business the direction it needs to scale, stand and flourish."</p>
      <div className="av" aria-hidden="true">J</div><Lbl style={{ margin: 0, color: 'var(--ox)' }}>Joy Mojisola Akerele</Lbl><Lbl>Entrepreneur</Lbl></div></section>
    <Speak /><Stay />
    <section className="sec tan"><div className="wrap"><Lbl>One mission, many houses</Lbl>
      <div className="houses">
        <div><h3>True Disciple International</h3><p>A non-denominational community where the Word is taught and disciples are raised.</p><a className="lnk" href="#">Visit</a></div>
        <div><h3>Arkstone Real Estate</h3><p>Helping individuals and organisations buy homes, invest and build wealth through property.</p><a className="lnk" href="https://arkstonerealestate.ng" rel="noopener">Visit</a></div>
        <div><h3>BloomHER Africa</h3><p>An impact-driven organisation championing the economic empowerment of African women. Home of Women and Wealth.</p><a className="lnk" href="#">Visit</a></div>
      </div></div></section>
  </>)
}

/* ---------- ABOUT ---------- */
export function About() {
  return (<>
    <Seo title="About" path="/about" desc="Bisola Loto is a founder, author, speaker and coach. Her approach, Refined Leadership™, puts wholeness before greatness." />
    <section className="sec"><div className="wrap two" style={{ gridTemplateColumns: '.8fr 1.2fr' }}>
      <div className="ph"><img src="/images/bisola-about.webp" alt="Bisola Loto in an ivory blazer" width="277" height="372" loading="lazy" /></div>
      <div><Lbl>About</Lbl><h1>Bisola Loto</h1><Lbl style={{ margin: '14px 0 26px' }}>Founder · Author · Coach</Lbl>
        <p>Bisola Loto is a founder, author, speaker and coach. Her approach, Refined Leadership™, puts wholeness before greatness. It grew from a simple observation: many gifted people rise quickly but struggle to sustain it, because who they are has not yet caught up with what they hold.</p>
        <p>Bisola helps faith-driven leaders who feel stuck gain clarity to build lives aligned with God's design. Her faith-centred coaching moves through five pillars: vision, identity, life design, wealth and impact.</p>
        <p>Beyond coaching, Bisola has built three organisations. Arkstone Real Estate is an advisory-led company helping individuals and organisations buy homes, invest and build wealth through property. True Disciple International is a non-denominational community where she teaches the Word. BloomHER Africa champions the economic empowerment of African women; through it, she convened Women and Wealth, a gathering that equipped women to grow and manage their money.</p>
        <p>Bisola is the author of Reclaim, The Wealth Path, Protocols of Greatness and her signature book, Forged: Rethinking Greatness. Her programmes include North Star, Life by Design and Lead by Design. She also convenes The Forge, a community where leaders are refined.</p></div>
    </div></section>
    <section className="sec dk ctr"><div className="wrap"><Lbl>Refined Leadership™</Lbl><p className="q">"Wholeness before greatness. You can only lead from who you are at your core."</p>
      <div className="three" style={{ marginTop: 56, textAlign: 'left', borderTop: '1px solid rgba(185,143,110,.4)', paddingTop: 24 }}>{journey.map(([, q], i) => <div key={q}><span className="serif" style={{ color: 'var(--ch)' }}>{roman[i]}.</span><div className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--iv)' }}>{q}</div></div>)}</div></div></section>
    <section className="sec ctr"><div className="wrap"><Lbl>Stay connected</Lbl><h2>Let's walk this <em>together.</em></h2><div className="row" style={{ marginTop: 32 }}><Link className="btn" to="/letters">Join the Letters</Link><Link className="btn o" to="/speaking#invite">Invite Bisola</Link></div></div></section>
  </>)
}

/* ---------- PILLARS ---------- */
export const pillars = {
  vision: { label: 'I · Vision', q: 'What has God shown me?', title: 'Vision', d: 'Everything begins here. Before you build or lead, get clear on your vision, then put it into words and a plan.', quote: 'Vision is received from God, not manufactured.', items: ['Clarity on direction', 'A written vision', 'Priorities that fit it', 'A plan you can follow'], next: ['II · Who am I, really?', '/identity'],
    cards: [['Free · 7-day guide', 'Find Your North Star', 'Seven days to clarity on your vision. Fifteen focused minutes a day.', 'Get the free guide', '/letters'], ['Free this season', 'Year-End Review & 2027 Plan', 'Look back with honesty. Step into 2027 with vision.', 'Get the free review', '/letters'], ['Course · Opening January', 'North Star', 'Find clarity on your vision and walk boldly in it with a plan.', 'Join the waitlist', '/the-forge']] },
  identity: { n: 0, label: 'II · Identity & mindset', q: 'Who am I, really?', title: 'Identity & mindset', d: 'Before you can carry more, you have to be made whole. This is where healing, a renewed mind and true identity begin.', quote: 'Identity comes before assignment. Who you are shapes what you build.', items: ['Identity discovery', 'Inner healing', 'Mindset', 'Purpose and calling'], next: ['III · How do I build?', '/life-design'],
    cards: [['Free guide', 'Rooted', 'Get to know who you really are, beyond your roles.', 'Get the free guide', '/letters'], ['Programme', 'Life by Design', 'Align your soul, then build a life that can carry what you have been given.', 'Join the waitlist', '/the-forge'], ['Community', 'The Forge', 'A private community where leaders do this work together. Come in. Be refined.', 'Join the waitlist', '/the-forge']] },
  'life-design': { label: 'III · Life design & ethical leadership', q: 'How do I build?', title: 'Life design & ethical leadership', d: 'How you build matters as much as what you build. Build a well-ordered life and lead with integrity, humility and courage.', quote: 'Integrity is proven under pressure.', items: ['Habits and systems that hold', 'Designing a life that works', 'Leading with integrity', 'Building teams and culture rightly'], next: ['IV · How do I resource it?', '/wealth'],
    cards: [['Programme', 'Life by Design', 'Life by Design for a well-ordered life.', 'Join the waitlist', '/the-forge'], ['Programme', 'Lead by Design', 'Lead by Design for leading with integrity. First cohorts opening soon.', 'Join the waitlist', '/the-forge'], ['Speaking', 'Bring this to your team', 'Talks and workshops on ethical leadership for organisations and faith communities.', 'Invite Bisola', '/speaking#invite']] },
  wealth: { label: 'IV · Wealth & stewardship', q: 'How do I resource it?', title: 'Wealth & stewardship', d: 'Wealth is a tool for purpose. Here we heal our relationship with money, build profitable businesses, steward wealth wisely and give generously.', quote: 'Stewardship is a spiritual act.', items: ['Healing money wounds', 'A healthy wealth philosophy', 'Building a profitable business', 'Property and long-term wealth', 'Generosity and giving'], next: ['V · What will outlive me?', '/impact'],
    cards: [['Book', 'The Wealth Path™', 'A leader\'s transformational guide to financial confidence.', 'Get the book', '/books'], ['Real estate', 'Arkstone Real Estate', 'Helping individuals and organisations buy homes, invest and build wealth through property.', 'Visit Arkstone', 'https://arkstonerealestate.ng'], ['Letters', 'Letters for the Road', 'Reflections on leadership, identity and wealth.', 'Join the Letters', '/letters']] },
  impact: { label: 'V · Impact', q: 'What will outlive me?', title: 'Impact', d: 'Greatness is measured by what remains after you. Here you learn to pass on what you have built: mentoring, coaching and raising the next generation.', quote: 'We build things that outlive us.', items: ['Mentoring others', 'Coaching and raising leaders', 'Passing on wisdom, faith and wealth', 'A legacy that lasts'], next: ['Back to the start · What has God shown me?', '/vision'],
    cards: [['Community', 'The Forge', 'Where leaders are refined together. Come in. Be refined.', 'Join the waitlist', '/the-forge'], ['Letters', 'Letters for the Road', 'Reflections on leadership and legacy, straight to your inbox.', 'Get my letters', '/letters'], ['Programme · Coming soon', 'Legacy Blueprint', 'Learn how to mentor, coach and raise the next generation, so what you have built outlives you.', 'Join the waitlist', '/the-forge']] },
}
export function Pillar({ k }) {
  const p = pillars[k]
  const L = ({ to, children, ...r }) => to.startsWith('http') ? <a href={to} rel="noopener" {...r}>{children}</a> : <Link to={to} {...r}>{children}</Link>
  return (<>
    <Seo title={`${p.q} · ${p.title}`} path={`/${k}`} desc={p.d} />
    <section className="sec pill"><div className="wrap"><Lbl>{p.label}</Lbl><h1>{p.q}</h1><div className="vr" /><p>{p.d}</p></div></section>
    <section className="sec dk"><div className="wrap two" style={{ alignItems: 'center' }}><p className="q" style={{ margin: 0, fontSize: 38 }}>"{p.quote}"</p>
      <div><Lbl>In this pillar</Lbl><ul className="ol">{p.items.map(i => <li key={i} style={{ fontSize: 20 }}>{i}</li>)}</ul></div></div></section>
    <section className="sec ctr"><div className="wrap"><Lbl>Your next step</Lbl><h2>Begin <em>here.</em></h2>
      <div className="three" style={{ marginTop: 40, textAlign: 'left' }}>{p.cards.map(([a, b, c, d, to], i) => <div key={b} className={`card ${i === 2 ? 'd' : ''}`}><Lbl style={{ margin: 0, color: i === 2 ? 'var(--ch)' : undefined }}>{a}</Lbl><h3>{b}</h3><p>{c}</p><L className="lnk" to={to}>{d}</L></div>)}</div></div>
      <div className="wrap next" style={{ marginTop: 80 }}><Lbl style={{ margin: 0 }}>Next on the journey</Lbl><Link to={p.next[1]}>{p.next[0]}</Link></div></section>
  </>)
}

/* ---------- BOOKS ---------- */
export function Books() {
  return (<>
    <Seo title="Books" path="/books" desc="Books by Bisola Loto: Forged: Rethinking Greatness, Protocols of Greatness, Reclaim, The Wealth Path and Set Apart." />
    <section className="sec tan ctr"><div className="wrap"><Lbl>The books</Lbl><h1>Words to <em>grow</em> with.</h1><div style={{ textAlign: 'left' }}><Forged /></div><BookGrid /></div></section>
    <section className="sec"><div className="wrap two" style={{ gridTemplateColumns: '170px 1fr', alignItems: 'center' }}><img src="/images/bisola-about.webp" alt="Bisola Loto" width="170" height="228" loading="lazy" style={{ aspectRatio: '3/4', objectFit: 'cover' }} />
      <div><Lbl>About the author</Lbl><p className="serif" style={{ fontSize: 26, color: 'var(--ox)', lineHeight: 1.35, marginBottom: 22 }}>Bisola Loto is a founder, author and speaker, and the creator of Refined Leadership™, a philosophy built on one conviction: wholeness before greatness. She helps faith-driven leaders lead with integrity, build wisely and steward wealth well.</p><Link className="btn o" to="/about">More about Bisola</Link></div></div></section>
  </>)
}

/* ---------- SPEAKING ---------- */
export function Speaking() {
  return (<>
    <Seo title="Speaking" path="/speaking" desc="Invite Bisola Loto to speak at your conference, church, business or women's gathering on leadership, identity, wealth, property and legacy." />
    <Speak />
    <section className="sec"><div className="wrap two" style={{ gridTemplateColumns: '.8fr 1.2fr' }}><img src="/images/bisola-speaking.webp" alt="Bisola Loto wearing pearls" width="242" height="297" loading="lazy" style={{ aspectRatio: '4/5', objectFit: 'cover', width: '100%' }} />
      <div><Lbl>About Bisola</Lbl><h2 style={{ fontSize: 42 }}>Founder · Author · Coach</h2>
        <p style={{ margin: '20px 0' }}>Bisola Loto is a founder, author, speaker and coach. Her work rests on one conviction: leaders must be made whole before they can lead well. Her faith-centred approach, Refined Leadership™, moves through five pillars: vision, identity, life design, wealth and impact.</p>
        <p>Bisola is the founder of Arkstone Real Estate and True Disciple International, a non-denominational community where she teaches the Word. She is the author of Reclaim, The Wealth Path, Protocols of Greatness and her signature book, Forged: Rethinking Greatness.</p>
        <div style={{ margin: '28px 0' }}><a className="btn" href="/bisola-loto-speaker-kit.pdf">Download speaker kit</a></div>
        <Lbl>Selected engagements</Lbl><ul className="ol" style={{ fontSize: 14 }}>{['Host and convener, Women and Wealth · BloomHER Africa', 'Teacher · True Disciple International'].map(t => <li key={t} style={{ font: '300 14px var(--sans)' }}>{t}</li>)}</ul></div></div></section>
    <section className="sec tan" id="invite"><div className="wrap"><Lbl>Speaker enquiry</Lbl><h2 style={{ marginBottom: 32 }}>Invite <em>Bisola.</em></h2>
      <Form cta="Send enquiry" thanks="Thank you. Your enquiry has been received, and we'll reply within a few working days." fields={[['name', 'Name'], ['org', 'Organisation'], ['email', 'Email', 'email'], ['phone', 'Phone'], ['event', 'Event name'], ['date', 'Date'], ['location', 'Location or virtual'], ['audience', 'Audience and size'], ['topic', 'Topic', 'select']]}><TA l="Message" /></Form></div></section>
  </>)
}

/* ---------- FORGE ---------- */
export function Forge() {
  return (<>
    <Seo title="The Forge" path="/the-forge" desc="The Forge is a private community for leaders who want to grow: coaching from Bisola, courses, honest conversation and priority access to gatherings." />
    <section className="sec dk ctr"><div className="wrap"><Lbl>Community</Lbl><h1 style={{ color: 'var(--iv)' }}>The Forge</h1><p className="serif" style={{ fontStyle: 'italic', fontSize: 28, color: 'var(--ch)', marginTop: 18 }}>Where leaders are refined. Come in. Be refined.</p></div></section>
    <section className="sec"><div className="wrap two"><div><Lbl>What it is</Lbl><p>A private community for leaders who want to grow: coaching from Bisola, courses, honest conversation with others on the same journey, and priority access to gatherings.</p></div>
      <div><Lbl>What members receive</Lbl><ul className="ol">{['Coaching through the five pillars', 'Early access to Life by Design and Lead by Design', 'Priority seats at gatherings', 'Leaders walking the same road'].map(t => <li key={t} style={{ fontSize: 20, color: 'var(--ox)' }}>{t}</li>)}</ul></div></div></section>
    <section className="sec tan"><div className="wrap"><Lbl>Join the waitlist</Lbl><h2 style={{ marginBottom: 32 }}>Be first <em>in.</em></h2>
      <Form cta="Join the waitlist" thanks="You're on the list. We'll be in touch as The Forge opens." fields={[['first', 'First name'], ['email', 'Email', 'email'], ['country', 'Country']]}><TA n="hope" l="What are you hoping The Forge will help you with?" /></Form></div></section>
  </>)
}

/* ---------- ASSAY ---------- */
export function Assay() {
  return (<>
    <Seo title="The Cycle of Rise" path="/assay" desc="A free seasonal assessment for leaders. Clarify the season you're in and what God is preparing you for. About 10 minutes." />
    <section className="sec ctr"><div className="wrap"><Lbl>Free assessment · About 10 minutes</Lbl><h1>The Cycle <em>of Rise</em></h1><p style={{ marginTop: 24, fontSize: 16 }}>Clarify the season you're in, and what God is preparing you for.</p>
      <div style={{ maxWidth: 420, margin: '36px auto 0', textAlign: 'left' }}><Form cta="Take the assessment" thanks="Thank you. Check your inbox for your result and next step." fields={[['first', 'First name'], ['email', 'Email', 'email']]} /></div></div></section>
    <section className="sec dk"><div className="wrap"><Lbl>How it works</Lbl><div className="three" style={{ gap: 36 }}>{['Answer honest questions about where you are right now. It takes about ten minutes.', 'Discover your season in the Cycle of Rise and understand why it feels the way it does.', 'Get practical guidance for your season, sent straight to your inbox.'].map((t, i) => <div key={i} style={{ borderTop: '1px solid var(--ch)', paddingTop: 14 }}><span className="serif" style={{ color: 'var(--ch)', fontSize: 20 }}>{roman[i]}.</span><p style={{ fontSize: 14 }}>{t}</p></div>)}</div></div></section>
    <section className="sec ctr"><div className="wrap"><Lbl>Why it matters</Lbl><p className="tq">Not every season is for pushing forward. Knowing your season changes how you respond to it.</p></div></section>
  </>)
}

/* ---------- MANIFESTO ---------- */
export function Manifesto() {
  const m = ['Vision is received from God, not manufactured.', "Every person carries more than they've discovered.", 'Identity comes before assignment.', 'Healing is part of leadership, not a detour from it.', 'Integrity is proven under pressure.', 'Wealth is a tool for purpose, and stewardship is a spiritual act.', 'Faith-driven leaders belong in every room.', 'We build things that outlive us.', 'Excellence is a form of worship.']
  return (<>
    <Seo title="Manifesto" path="/manifesto" desc="What we believe: eight convictions of Refined Leadership, from identity before assignment to excellence as a form of worship." />
    <section className="sec"><div className="wrap" style={{ maxWidth: 820 }}><div className="ctr" style={{ marginBottom: 48 }}><Lbl>The manifesto</Lbl><h1>What we <em>believe.</em></h1></div><ol className="ol">{m.map((t, i) => <li key={t}><i style={{ fontSize: 18, minWidth: 44 }}>{roman[i]}.</i><span style={{ color: '#3a2c2c', fontSize: 24 }}>{t}</span></li>)}</ol></div></section>
    <section className="sec dk ctr"><div className="wrap"><p className="q">Wholeness before greatness.</p><div style={{ marginTop: 28 }}><Link className="btn c" to="/letters">Join the Letters</Link></div></div></section>
  </>)
}

/* ---------- LETTERS ---------- */
export function Letters() {
  return (<>
    <Seo title="Letters for the Road" path="/letters" desc="A free newsletter from Bisola Loto: reflections on leadership, identity and wealth, straight to your inbox." />
    <section className="sec ctr"><div className="wrap"><Lbl>Free · Newsletter</Lbl><h1>Letters <em>for the Road</em></h1><p style={{ marginTop: 22 }}>Reflections on leadership, identity and wealth, written for leaders who want to grow. Straight to your inbox.</p>
      <div style={{ maxWidth: 440, margin: '32px auto 12px', textAlign: 'left' }}><Form cta="Subscribe" thanks="Welcome. Your first letter is on its way." fields={[['first', 'First name'], ['email', 'Email address', 'email']]} /></div><p className="legal">One letter at a time. Unsubscribe whenever you like.</p></div></section>
    <section className="sec tan"><div className="wrap three" style={{ gap: 40 }}>{[['Honest reflections', 'Stories and lessons on leading from who you are at your core.'], ['Practical wisdom', 'Tools for building with integrity and stewarding wealth well.'], ['First to know', 'Early news of Forged, Lead by Design, The Forge and gatherings.']].map(([a, b]) => <div key={a} style={{ borderTop: '1px solid var(--br)', paddingTop: 16 }}><h3 style={{ fontSize: 22 }}>{a}</h3><p style={{ fontSize: 14, marginTop: 8 }}>{b}</p></div>)}</div></section>
  </>)
}

/* ---------- CONTACT ---------- */
export function Contact() {
  return (<>
    <Seo title="Contact" path="/contact" desc="Contact Bisola Loto for speaking, partnerships, media and general enquiries." />
    <section className="sec"><div className="wrap two"><div><Lbl>Contact</Lbl><h1>Let's <em>talk.</em></h1><p style={{ margin: '22px 0 30px' }}>For speaking, partnerships, media and general enquiries.</p>
      <Lbl style={{ marginBottom: 2 }}>Email</Lbl><p className="serif" style={{ fontSize: 22, color: 'var(--ox)', marginBottom: 20 }}><a href="mailto:hello@bisolaloto.com">hello@bisolaloto.com</a></p>
      <Lbl style={{ marginBottom: 2 }}>Follow</Lbl><p style={{ marginBottom: 20 }}><a href="https://www.linkedin.com/" rel="noopener">LinkedIn</a> · <a href="https://www.instagram.com/" rel="noopener">Instagram</a> · <a href="https://www.youtube.com/" rel="noopener">YouTube</a></p>
      <Lbl style={{ marginBottom: 2 }}>Real estate enquiries</Lbl><p><a href="https://arkstonerealestate.ng" rel="noopener">arkstonerealestate.ng</a></p></div>
      <div className="tan" style={{ padding: 32 }}><form onSubmit={e => { e.preventDefault(); e.target.outerHTML = '<p class="ok" role="status">Thank you. Your message has been received.</p>' }}>
        <div className="g3"><label>Name<input name="name" required /></label><label>Email<input name="email" type="email" required /></label></div>
        <label>Reason<select>{['Speaking', 'Partnership', 'Media', 'General'].map(o => <option key={o}>{o}</option>)}</select></label><TA l="Message" /><button className="btn">Send message</button></form></div></div></section>
  </>)
}

export function NotFound() {
  return (<><Seo title="Page not found" desc="This page could not be found." noindex /><section className="sec ctr"><div className="wrap"><Lbl>404</Lbl><h1>Page not <em>found.</em></h1><p style={{ margin: '20px auto 30px' }}>The page you're looking for has moved or doesn't exist.</p><Link className="btn" to="/">Back home</Link></div></section></>)
}
