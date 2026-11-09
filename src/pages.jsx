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
  ['Identity', 'Who am I, really?', 'Healing, wholeness and coming home to who God made you.', [['Free', 'The Assay Assessment'], ['Book', 'Reclaim']]],
  ['Ethical leadership', 'How do I build?', 'Leading and building rightly, with integrity, humility and courage, on a biblical framework for ethical leadership.', [['Programme', 'Lead by Design'], ['Book', 'Protocols of Greatness']]],
  ['Wealth & stewardship', 'How do I resource it?', 'Healing money wounds, building profitable businesses, and wise decisions with money and property.', [['Book', 'The Wealth Path™'], ['Real estate', 'Arkstone Real Estate']]],
  ['Impact', 'What will outlive me?', 'Building what serves others and advances the Kingdom.', [['Organisation', 'Olive Green Foundation'], ['Initiative', 'BloomHER Africa']]],
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
    <div><Lbl>Speaking</Lbl><h2>Bring the conversation <em>to your room.</em></h2>
      <p style={{ margin: '24px 0 32px' }}>Conferences, churches, businesses, leadership teams and women's gatherings. Talks on leadership, identity, money, property and legacy that leave people seeing themselves, and their assignment, differently.</p>
      <Link className="btn o" to="/speaking#invite">Invite Bisola</Link></div>
    <ol className="ol">{['Refined Leadership', 'Identity & healing', 'Ethical leadership', 'Wealth & stewardship', 'Business growth', 'Real estate', 'Women & wealth', 'Impact & legacy'].map((t, i) => <li key={t}><i>{roman[i]}.</i>{t}</li>)}</ol>
  </div></section>
)
const Stay = ({ cta = true }) => (
  <section className="sec ctr"><div className="wrap">
    <Lbl>Stay connected</Lbl><h2>The refining <em>journey.</em></h2>
    <div className="three" style={{ marginTop: 48, textAlign: 'left', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
      <div className="card"><Lbl>Free · Newsletter</Lbl><h3>Letters for the Road</h3><p>Reflections on identity, leadership and wealth, written for leaders who want to grow.</p><Link className="lnk" to="/letters">Subscribe</Link></div>
      <div className="card d"><Lbl style={{ color: 'var(--ch)' }}>Membership</Lbl><h3>The Forge</h3><p>Where leaders are refined. A private community for teaching, courses and priority access to gatherings. Come in. Be refined.</p><Link className="btn c" to="/the-forge">Join the waitlist</Link></div>
    </div></div></section>
)

export function Home() {
  return (<>
    <Seo desc="Bisola Loto refines faith-driven leaders: made whole, proven under pressure and trusted to carry influence, wealth and impact with integrity." />
    <section className="sec"><div className="wrap hero rise">
      <div><Lbl>Founder · Author · Speaker</Lbl>
        <h1>Refining leaders <em>who carry greatness.</em></h1><div className="rule" />
        <p>For faith-driven leaders ready to make lasting change: made whole, proven under pressure, and trusted to carry influence, wealth and impact with integrity.</p>
        <div className="sm">Refined Leadership · Wholeness before greatness</div>
        <div className="row"><Link className="btn" to="/assay">Begin the journey</Link><Link className="btn o" to="/speaking#invite">Invite Bisola</Link></div></div>
      <div className="ph"><img src="/images/bisola-hero.jpg" alt="Portrait of Bisola Loto" width="295" height="393" fetchpriority="high" /></div>
    </div></section>
    <section className="sec dk ctr"><div className="wrap">
      <Lbl>The mission</Lbl><p className="q">"Wholeness before greatness. You can only lead from who you are at your core."</p><div className="vr" />
      <p style={{ maxWidth: '50ch' }}>Gold is refined in the fire until only what is pure remains. Leaders are the same. Refined leadership burns away what doesn't belong, so that what remains can carry vision, wealth and influence with integrity.</p>
    </div></section>
    <section className="sec"><div className="wrap">
      <div className="head2"><div><Lbl>The journey of a refined leader</Lbl><h2>Four questions. <em>One journey.</em></h2></div><p style={{ maxWidth: '34ch' }}>Wherever you are on the journey, there's a next step. Everything I teach, write and build answers one of these questions.</p></div>
      <div className="jr">{journey.map(([k, q, d, items], i) => <div key={q}><span className="n">{roman[i]}.</span><div><Lbl style={{ marginBottom: 8 }}>{k}</Lbl><h3>{q}</h3></div><div><p>{d}</p><ul>{items.map(([a, b]) => <li key={b}><span className="k">{a}</span>{b}</li>)}</ul></div></div>)}</div>
      <div className="box"><div><Lbl>Free · Begin here</Lbl><h2 style={{ fontSize: 44 }}>The Assay <em>Assessment</em></h2><p style={{ marginTop: 12 }}>A refining assessment for leaders. Find out what's gold, what still needs the fire, and your clearest next step.</p></div><Link className="btn" to="/assay">Take the Assay Assessment</Link></div>
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
        <div><h3>Olive Green Foundation</h3><p>An impact-driven, grant-making organisation investing in women and children. Home of BloomHER Africa.</p><Lbl>Coming soon</Lbl></div>
      </div></div></section>
  </>)
}

/* ---------- ABOUT ---------- */
export function About() {
  return (<>
    <Seo title="About" path="/about" desc="Bisola Loto is a founder, author and speaker, creator of Refined Leadership™, founder of Arkstone Real Estate and True Disciple International." />
    <section className="sec"><div className="wrap two" style={{ gridTemplateColumns: '.8fr 1.2fr' }}>
      <div className="ph"><img src="/images/bisola-about.jpg" alt="Bisola Loto in an ivory blazer" width="277" height="372" loading="lazy" /></div>
      <div><Lbl>About</Lbl><h1>Bisola Loto</h1><Lbl style={{ margin: '14px 0 26px' }}>Founder · Author · Speaker</Lbl>
        <p>Bisola Loto is a founder, author and speaker, and the creator of Refined Leadership™, a way of thinking about leadership that puts wholeness before greatness. Her work is shaped by a simple observation: many gifted people rise quickly but struggle to carry what they are given, because who they are has not yet caught up with what they hold.</p>
        <p>Through Refined Leadership, Bisola walks faith-driven leaders through four questions: Who am I, really? How do I build? How do I resource it? What will outlive me? Her frameworks are rooted in Scripture and serve leaders in identity and healing, ethical leadership, wealth, impact and business.</p>
        <p>She is the founder of Arkstone Real Estate, an advisory-led real estate company helping individuals and organisations buy homes, invest and build wealth through property, and of True Disciple International, a non-denominational community where she teaches the Word. Through BloomHER Africa, she champions the economic empowerment of African women, and convened Women and Wealth, a gathering that equipped women to grow and manage their money.</p>
        <p>Bisola is the author of Reclaim, The Wealth Path, Protocols of Greatness and her signature book, Forged: Rethinking Greatness. She is the creator of Lead by Design, a leadership programme built on a biblical framework for ethical leadership, and the convener of The Forge, a community where leaders are refined.</p></div>
    </div></section>
    <section className="sec dk ctr"><div className="wrap"><Lbl>Refined Leadership™</Lbl><p className="q">"Wholeness before greatness. You can only lead from who you are at your core."</p>
      <div className="three" style={{ marginTop: 56, textAlign: 'left', borderTop: '1px solid rgba(185,143,110,.4)', paddingTop: 24 }}>{journey.map(([, q], i) => <div key={q}><span className="serif" style={{ color: 'var(--ch)' }}>{roman[i]}.</span><div className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--iv)' }}>{q}</div></div>)}</div></div></section>
    <section className="sec ctr"><div className="wrap"><Lbl>Stay connected</Lbl><h2>Let's walk this <em>together.</em></h2><div className="row" style={{ marginTop: 32 }}><Link className="btn" to="/letters">Join the Letters</Link><Link className="btn o" to="/speaking#invite">Invite Bisola</Link></div></div></section>
  </>)
}

/* ---------- PILLARS ---------- */
export const pillars = {
  identity: { n: 0, label: 'I · Identity', q: 'Who am I, really?', title: 'Identity', d: 'Before you can carry what God entrusts to you, you have to be made whole. This is where healing, wholeness and true identity begin.', quote: 'Identity comes before assignment. Who you are shapes what you build.', items: ['Identity discovery', 'Inner healing', 'Mindset', 'Purpose and calling'], next: ['II · How do I build?', '/ethical-leadership'],
    cards: [['Free', 'The Assay Assessment', 'A refining assessment for leaders. Find out what\'s gold, and what still needs the fire.', 'Take the Assay Assessment', '/assay'], ['Devotional', 'Reclaim', 'Thirty days of soul-healing, and freedom from emotional hurts and pain.', 'Get the book', '/books'], ['Community', 'The Forge', 'A private community where leaders do this work together. Come in. Be refined.', 'Join the waitlist', '/the-forge']] },
  'ethical-leadership': { label: 'II · Ethical leadership', q: 'How do I build?', title: 'Ethical leadership', d: 'Leadership is not only what you build, but how you build it. Here we lead and build rightly, with integrity, humility and courage, on a biblical framework for ethical leadership.', quote: 'Integrity is proven under pressure.', items: ['Leading with integrity', 'Decisions under pressure', 'Humility and accountability', 'Building teams and culture rightly'], next: ['III · How do I resource it?', '/wealth'],
    cards: [['Programme', 'Lead by Design', 'A leadership programme built on a biblical framework for ethical leadership. First cohort opening soon.', 'Join the waitlist', '/the-forge'], ['Free download', 'Protocols of Greatness', '30 truths for every leader.', 'Download free', '/books'], ['Speaking', 'Bring this to your team', 'Talks and workshops on ethical leadership for organisations and faith communities.', 'Invite Bisola', '/speaking#invite']] },
  wealth: { label: 'III · Wealth & stewardship', q: 'How do I resource it?', title: 'Wealth & stewardship', d: 'Wealth is a tool for purpose. Here we heal our relationship with money, build profitable businesses, and steward wealth wisely.', quote: 'Stewardship is a spiritual act.', items: ['Healing money wounds', 'A healthy wealth philosophy', 'Building a profitable business', 'Property and long-term wealth'], next: ['IV · What will outlive me?', '/impact'],
    cards: [['Book', 'The Wealth Path™', 'A leader\'s transformational guide to financial confidence.', 'Get the book', '/books'], ['Real estate', 'Arkstone Real Estate', 'Helping individuals and organisations buy homes, invest and build wealth through property.', 'Visit Arkstone', 'https://arkstonerealestate.ng'], ['Letters', 'Letters for the Road', 'Reflections on leadership, identity and wealth.', 'Join the Letters', '/letters']] },
  impact: { label: 'IV · Impact', q: 'What will outlive me?', title: 'Impact', d: 'Greatness is measured by what remains after you. Here we build what serves others and advances the Kingdom: generosity, legacy, and raising the next generation of leaders.', quote: 'We build things that outlive us.', items: ['Generosity and giving', 'Legacy', 'Raising other leaders', 'Advancing the Kingdom'], next: ['Back to the start · Who am I, really?', '/identity'],
    cards: [['Organisation', 'Olive Green Foundation', 'An impact-driven, grant-making organisation investing in women and children. Home of BloomHER Africa. Coming soon.', 'Stay informed', '/letters'], ['Initiative', 'BloomHER Africa', 'Economic empowerment for African women. Its first gathering, Women and Wealth, equipped women to grow and manage their money.', 'Stay informed', '/letters'], ['Community', 'The Forge', 'Where leaders are refined. Come in. Be refined.', 'Join the waitlist', '/the-forge']] },
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
    <section className="sec"><div className="wrap two" style={{ gridTemplateColumns: '170px 1fr', alignItems: 'center' }}><img src="/images/bisola-about.jpg" alt="Bisola Loto" width="170" height="228" loading="lazy" style={{ aspectRatio: '3/4', objectFit: 'cover' }} />
      <div><Lbl>About the author</Lbl><p className="serif" style={{ fontSize: 26, color: 'var(--ox)', lineHeight: 1.35, marginBottom: 22 }}>Bisola Loto is a founder, author and speaker, and the creator of Refined Leadership™, a philosophy built on one conviction: wholeness before greatness. She helps faith-driven leaders lead with integrity, build wisely and steward wealth well.</p><Link className="btn o" to="/about">More about Bisola</Link></div></div></section>
  </>)
}

/* ---------- SPEAKING ---------- */
export function Speaking() {
  return (<>
    <Seo title="Speaking" path="/speaking" desc="Invite Bisola Loto to speak at your conference, church, business or women's gathering on leadership, identity, wealth, property and legacy." />
    <Speak />
    <section className="sec"><div className="wrap two" style={{ gridTemplateColumns: '.8fr 1.2fr' }}><img src="/images/bisola-speaking.jpg" alt="Bisola Loto wearing pearls" width="242" height="297" loading="lazy" style={{ aspectRatio: '4/5', objectFit: 'cover', width: '100%' }} />
      <div><Lbl>About Bisola</Lbl><h2 style={{ fontSize: 42 }}>Founder · Author · Speaker</h2>
        <p style={{ margin: '20px 0' }}>Bisola Loto is a founder, author and speaker, and the creator of Refined Leadership™. Her work rests on one conviction: leaders must be made whole before they can carry greatness. She walks faith-driven leaders through four questions: who they are, how they build, how they resource their assignment, and what will outlive them.</p>
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
    <Seo title="The Forge" path="/the-forge" desc="The Forge is a private community for leaders who want to grow: teaching from Bisola, courses, honest conversation and priority access to gatherings." />
    <section className="sec dk ctr"><div className="wrap"><Lbl>Community</Lbl><h1 style={{ color: 'var(--iv)' }}>The Forge</h1><p className="serif" style={{ fontStyle: 'italic', fontSize: 28, color: 'var(--ch)', marginTop: 18 }}>Where leaders are refined. Come in. Be refined.</p></div></section>
    <section className="sec"><div className="wrap two"><div><Lbl>What it is</Lbl><p>A private community for leaders who want to grow: teaching from Bisola, courses, honest conversation with others on the same journey, and priority access to gatherings.</p></div>
      <div><Lbl>What members receive</Lbl><ul className="ol">{['Teaching through the four questions', 'Early access to courses and Lead by Design', 'Priority seats at gatherings', 'Leaders walking the same road'].map(t => <li key={t} style={{ fontSize: 20, color: 'var(--ox)' }}>{t}</li>)}</ul></div></div></section>
    <section className="sec tan"><div className="wrap"><Lbl>Join the waitlist</Lbl><h2 style={{ marginBottom: 32 }}>Be first <em>in.</em></h2>
      <Form cta="Join the waitlist" thanks="You're on the list. We'll be in touch as The Forge opens." fields={[['first', 'First name'], ['email', 'Email', 'email'], ['country', 'Country']]}><TA n="hope" l="What are you hoping The Forge will help you with?" /></Form></div></section>
  </>)
}

/* ---------- ASSAY ---------- */
export function Assay() {
  return (<>
    <Seo title="The Assay Assessment" path="/assay" desc="A free refining assessment for leaders. Find out what's gold, what still needs the fire, and your clearest next step. About 10 minutes." />
    <section className="sec ctr"><div className="wrap"><Lbl>Free · Begin here</Lbl><h1>The Assay <em>Assessment</em></h1><p style={{ marginTop: 24, fontSize: 16 }}>A refining assessment for leaders. Find out what's gold, what still needs the fire, and your clearest next step.</p>
      <div style={{ maxWidth: 420, margin: '36px auto 0', textAlign: 'left' }}><Form cta="Start the assessment" thanks="Thank you. Check your inbox for your link to begin the assessment." fields={[['first', 'First name'], ['email', 'Email', 'email']]} /></div></div></section>
    <section className="sec dk"><div className="wrap"><Lbl>How it works</Lbl><div className="three" style={{ gap: 36 }}>{['Answer honest questions across the four pillars. It takes about 10 minutes.', 'Receive your results by email: where you\'re strong, and where you need refining.', 'Get your recommended next step: a book, a programme, or The Forge.'].map((t, i) => <div key={i} style={{ borderTop: '1px solid var(--ch)', paddingTop: 14 }}><span className="serif" style={{ color: 'var(--ch)', fontSize: 20 }}>{roman[i]}.</span><p style={{ fontSize: 14 }}>{t}</p></div>)}</div></div></section>
    <section className="sec ctr"><div className="wrap"><Lbl>What is an assay?</Lbl><p className="tq">Before gold is refined, it is tested. That test is called an assay. This is yours.</p></div></section>
  </>)
}

/* ---------- MANIFESTO ---------- */
export function Manifesto() {
  const m = ["Every person carries more than they've discovered.", 'Identity comes before assignment.', 'Healing is part of leadership, not a detour from it.', 'Integrity is proven under pressure.', 'Wealth is a tool for purpose, and stewardship is a spiritual act.', 'Faith-driven leaders belong in every room.', 'We build things that outlive us.', 'Excellence is a form of worship.']
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
