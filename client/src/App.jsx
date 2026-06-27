import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'

const technicalSkills = ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'JavaScript', 'MongoDB', 'REST APIs']
const managementSkills = ['Event Management', 'Logistics & Operations', 'Hospitality', 'Leadership', 'Team Coordination', 'Marketing']
const coursework = ['Database Management Systems (DBMS)', 'Computer Organization and Architecture', 'Automata Theory']

const timeline = [
  {
    title: 'MBATECH in Computer Engineering',
    subtitle: 'NMIMS Shirpur',
    description:
      'Pursuing an integrated management and technology degree with a strong focus on software development, problem solving, and applied technical learning.'
  },
  {
    title: 'Leadership in University Committees',
    subtitle: 'NMMUN, Flavium, NMPL, Ambiora',
    description:
      'Led and supported operations, discipline, coordination, hospitality, sports/event execution, and marketing initiatives across major campus activities.'
  },
  {
    title: 'Recognition & Achievements',
    subtitle: 'Hackathon certification and project execution',
    description:
      'Earned recent hackathon recognition and consistently delivered 100-mark semester projects with practical implementation and team collaboration.'
  }
]

const projects = [
  {
    title: 'Future Interns Portfolio Website',
    tag: 'Featured',
    description:
      'A full-stack portfolio platform built to function as a digital resume and proof of work, featuring responsive design, dark/light mode, and a backend-powered contact form.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    title: 'Hackathon Project',
    tag: 'Recent',
    description:
      'A certified hackathon build that demonstrates rapid problem solving, prototyping, and team-based execution under deadlines.',
    stack: ['JavaScript', 'React', 'API Integration']
  },
  {
    title: 'Semester Project Showcase',
    tag: 'Academic',
    description:
      'Placeholder for 100-mark semester work, highlighting technical depth, documentation, and end-to-end problem solving.',
    stack: ['Full Stack', 'Documentation']
  },
  {
    title: 'Upcoming Academic Assignment',
    tag: 'Coming Soon',
    description:
      'Reserved space for future assignments, mini projects, and experiments that strengthen the portfolio over time.',
    stack: ['TBD']
  }
]

const stats = [
  { value: '4+', label: 'Core Web Technologies' },
  { value: '6+', label: 'Leadership & Ops Skills' },
  { value: '100-mark', label: 'Semester Project Standard' },
  { value: '1 Hackathon', label: 'Recent Certified Build' }
]

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
]

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to send message')

      setStatus({ type: 'success', message: 'Message sent successfully. Thank you for reaching out!' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Sanidhya Singh Sisodiya | Full Stack Developer Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Sanidhya Singh Sisodiya, an MBATECH Computer Engineering student blending full stack development with leadership, logistics, and event operations experience."
        />
      </Helmet>

      <div className="app-shell">
        <header className="site-header" id="home">
          <div className="container nav-wrap">
            <a className="brand" href="#home">
              <span className="brand-mark">SS</span>
              <div>
                <strong>Sanidhya Singh Sisodiya</strong>
                <span>Full Stack Developer Portfolio</span>
              </div>
            </a>

            <nav className="nav-links" aria-label="Primary">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id === 'home' ? 'home' : link.id}`}>
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              className="theme-toggle"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle dark and light mode"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

        <main>
          <section className="hero section">
            <div className="container hero-grid">
              <div>
                <p className="eyebrow">MBATECH Computer Engineering Student • NMIMS Shirpur</p>
                <h1>Building digital products with engineering discipline and leadership-driven execution.</h1>
                <p className="hero-copy">
                  I’m <strong>Sanidhya Singh Sisodiya</strong>, a full stack web development enthusiast who combines
                  <strong> React.js, Node.js, Express.js, HTML, CSS, and JavaScript</strong> with strong experience in
                  event management, logistics, operations, hospitality, leadership, team coordination, and marketing.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#projects">View Projects</a>
                  <a className="btn btn-secondary" href="#contact">Contact Me</a>
                </div>
              </div>

              <aside className="hero-card" aria-label="Professional highlights">
                <h2>Why recruiters should notice me</h2>
                <ul>
                  <li>Modern frontend development with React.js</li>
                  <li>Backend fundamentals using Node.js and Express.js</li>
                  <li>Leadership proven across high-responsibility university committees</li>
                  <li>Strong execution on hackathons and semester projects</li>
                </ul>
              </aside>
            </div>
          </section>

          <section className="stats section-sm">
            <div className="container stat-grid">
              {stats.map((item) => (
                <article key={item.label} className="stat-card">
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="about">
            <div className="container">
              <div className="section-heading">
                <p className="eyebrow">About / Resume</p>
                <h2>Technical growth backed by leadership, coordination, and execution</h2>
              </div>

              <div className="about-grid">
                <div className="panel">
                  <h3>Profile Summary</h3>
                  <p>
                    I am an MBATECH Computer Engineering student who enjoys creating practical web experiences while
                    understanding how teams, users, and real operations work. My background helps me approach software
                    projects with both technical thinking and organizational clarity.
                  </p>
                  <p>
                    Relevant coursework includes <strong>{coursework.join(', ')}</strong>, strengthening my foundation
                    in databases, systems, and theoretical computer science.
                  </p>
                </div>

                <div className="panel">
                  <h3>Technical Skills</h3>
                  <div className="chip-wrap">
                    {technicalSkills.map((skill) => (
                      <span key={skill} className="chip">{skill}</span>
                    ))}
                  </div>

                  <h3 className="subheading">Management & Soft Skills</h3>
                  <div className="chip-wrap">
                    {managementSkills.map((skill) => (
                      <span key={skill} className="chip chip-alt">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="timeline">
                {timeline.map((item, index) => (
                  <article key={item.title} className="timeline-item">
                    <div className="timeline-dot">0{index + 1}</div>
                    <div className="timeline-content">
                      <span>{item.subtitle}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="committee-grid">
                <article className="panel">
                  <h3>NMMUN</h3>
                  <p>Organizing Committee member recognized with <strong>Best OC</strong> for strong execution and coordination.</p>
                </article>
                <article className="panel">
                  <h3>Flavium</h3>
                  <p>Managed table tennis and wider event operations, supporting smooth participant experience and logistics.</p>
                </article>
                <article className="panel">
                  <h3>NMPL</h3>
                  <p>Contributed to discipline management and operational structure in a high-energy event environment.</p>
                </article>
                <article className="panel">
                  <h3>Ambiora</h3>
                  <p>Supported marketing initiatives and outreach, combining communication with strategic coordination.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="section accent-section" id="projects">
            <div className="container">
              <div className="section-heading">
                <p className="eyebrow">Projects</p>
                <h2>Proof of work with space to grow</h2>
              </div>

              <div className="project-grid">
                {projects.map((project) => (
                  <article key={project.title} className="project-card">
                    <div className="project-top">
                      <span className="tag">{project.tag}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <p>{project.description}</p>
                    <div className="chip-wrap">
                      {project.stack.map((item) => (
                        <span key={item} className="chip">{item}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="contact">
            <div className="container contact-grid">
              <div>
                <div className="section-heading left">
                  <p className="eyebrow">Contact</p>
                  <h2>Let’s connect for internships, projects, and opportunities</h2>
                </div>
                <p className="contact-copy">
                  This contact section is connected to a Node.js + Express API and designed to save inquiries to MongoDB while also sending an email notification.
                </p>
                <div className="contact-points">
                  <div className="contact-card"><strong>Focus</strong><span>Full Stack Web Development</span></div>
                  <div className="contact-card"><strong>Strength</strong><span>Technical + leadership hybrid profile</span></div>
                  <div className="contact-card"><strong>Open To</strong><span>Internships, collaborations, and project work</span></div>
                </div>
              </div>

              <form className="contact-form panel" onSubmit={handleSubmit}>
                <label>
                  Name
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                </label>
                <label>
                  Subject
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project / internship / collaboration" required />
                </label>
                <label>
                  Message
                  <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Write your message here..." required />
                </label>
                <button className="btn btn-primary full" type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {status.message && <p className={`form-message ${status.type}`}>{status.message}</p>}
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
