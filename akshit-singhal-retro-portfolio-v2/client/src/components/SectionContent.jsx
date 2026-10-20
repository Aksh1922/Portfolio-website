import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, ExternalLink, Github, MapPin, Mail, ArrowUpRight, FileText, Award, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { portfolio } from "../data/portfolio";
import api from "../lib/api";

const reveal = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: .4 } } };
function SectionHeading({ kicker, title }) { return <div className="section-heading"><span>{kicker}</span><h2>{title}</h2></div>; }
function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => { const timer = setInterval(() => setRoleIndex(i => (i + 1) % portfolio.roles.length), 2600); return () => clearInterval(timer); }, []);
  return <motion.div className="hero-content" variants={reveal} initial="hidden" animate="show">
    <div className="hero-photo-wrap"><img className="hero-photo" src="/akshit-photo.jpg" alt="Akshit Singhal" onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "grid"; }}/><div className="hero-photo initials-photo photo-fallback" style={{display:"none"}} aria-label="Akshit Singhal initials">{portfolio.initials}</div><span className="photo-spark">✳</span></div>
    <p className="eyebrow">hi! i'm</p><h1 className="hero-name">{portfolio.name}</h1>
    <p className="hero-role">{portfolio.role}</p><p className="typewriter-line">✦ {portfolio.roles[roleIndex]}<span className="cursor">▍</span></p>
    <blockquote>“{portfolio.tagline}”</blockquote>
    <p className="hero-bio">{portfolio.bio}</p>
    <div className="hero-downloads"><a className="retro-button primary-button" href="/resume.pdf" download><Download size={16}/> PDF CV</a><a className="retro-button" href="/resume.docx" download><Download size={16}/> Word CV</a></div>
  </motion.div>;
}
function About() {
  return <motion.div className="section-content" variants={reveal} initial="hidden" animate="show">
    <SectionHeading kicker="A LITTLE ABOUT ME" title="Hello, world!"/><div className="about-layout"><div className="about-photo-wrap"><img className="about-photo" src="/akshit-photo.jpg" alt="Akshit Singhal" onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "grid"; }}/><div className="about-photo initials-photo photo-fallback" style={{display:"none"}} aria-label="Akshit Singhal initials">{portfolio.initials}</div></div><div><p>{portfolio.bio}</p><div className="fact-row"><MapPin size={16}/><span>{portfolio.location}</span></div><div className="fact-row"><BriefcaseBusiness size={16}/><span>{portfolio.status}</span></div><div className="fact-row"><Mail size={16}/><a href={`mailto:${portfolio.email}`}>{portfolio.email}</a></div></div></div>
    <div className="note-card"><span>✎ NOTE TO SELF</span><p>Stay curious, keep shipping, and make the internet a little more useful.</p></div>
  </motion.div>;
}
function Skills() {
  return <div className="section-content"><div className="tools-strip"><span>TOOLS / SKILLS.EXE</span><strong>TOOLBOX</strong><span>✳ STACK.TXT</span></div><div className="skills-groups">{portfolio.skills.map(group => <section className="skill-group" key={group.group}><h3>{group.group}</h3><div className="skill-tags">{group.items.map(skill => <span className="skill-tag" key={skill.name}>{skill.name}</span>)}</div></section>)}</div></div>;
}
function Projects() {
  const [filter, setFilter] = useState("All");
  const techs = ["All", ...new Set(portfolio.projects.flatMap(project => project.tech))];
  const filtered = portfolio.projects.filter(project => filter === "All" || project.tech.includes(filter));
  return <div className="section-content"><SectionHeading kicker="SELECTED WORK / 2024—2026" title="Little things I've built"/><div className="filter-row">{techs.map(tech => <button key={tech} className={`filter-chip ${filter === tech ? "active" : ""}`} onClick={() => setFilter(tech)}>{tech}</button>)}</div><div className="project-grid">{filtered.map((project, i) => <motion.article className="project-card" key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }}><div className="project-top"><span className="mini-file">▧</span><span>PROJECT_{String(project.id).padStart(2, "0")}</span><span className="project-dots">● ● ●</span></div><img className="project-image" src={project.image} alt={`${project.name} preview`} loading="lazy"/><div className="project-card-body"><h3>{project.name}</h3><p>{project.description}</p><div className="tech-badges">{project.tech.map(t => <span key={t}>{t}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub profile</a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15}/></a>}</div><p className="project-status">{project.status}</p></div></motion.article>)}</div></div>;
}
function Resume() {
  return <div className="section-content"><SectionHeading kicker="PERSONAL FILES" title="The paperwork"/><p className="muted-copy">Choose a format. Both files are bundled with the portfolio and work independently of the contact API.</p><div className="resume-files">{[{ ext: "PDF", file: "Akshit-Singhal-Resume.pdf", url: "/resume.pdf", detail: "Portable Document Format" }, { ext: "DOCX", file: "Akshit-Singhal-Resume.docx", url: "/resume.docx", detail: "Editable Microsoft Word document" }].map(item => <article className="resume-file" key={item.ext}><div className={`file-art ${item.ext.toLowerCase()}`}><FileText size={30}/><b>{item.ext}</b></div><div><h3>{item.file}</h3><p>{item.detail}</p><a className="retro-button" href={item.url} download><Download size={15}/> Download {item.ext}</a></div></article>)}</div></div>;
}
function Journey() {
  return <div className="section-content"><SectionHeading kicker="THE ROAD SO FAR" title="My journey"/><div className="timeline">{portfolio.journey.map((item, i) => <motion.article className="timeline-item" key={`${item.title}-${i}`} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: i * .08 }}><span className="timeline-marker">{item.type === "education" ? <GraduationCap size={17}/> : <BriefcaseBusiness size={16}/>}</span><span className="timeline-period">{item.period}</span><h3>{item.title}</h3><p className="timeline-place">{item.place}</p><p>{item.detail}</p></motion.article>)}</div></div>;
}
function Certificates() {
  const [selected, setSelected] = useState(null);
  return <div className="section-content"><SectionHeading kicker="BADGES & BRAGGING RIGHTS" title="Certificates + wins"/><div className="certificate-grid">{portfolio.certificates.map((item, i) => <motion.button className="certificate-card" key={item.name} onClick={() => setSelected(item)} whileHover={{ y: -3 }}><img src={item.image} alt="" loading="lazy"/><div className="certificate-copy"><Award size={17}/><div><h3>{item.name}</h3><p>{item.platform} · {item.year}</p></div><ExternalLink size={14}/></div></motion.button>)}</div>{selected && <div className="preview-backdrop" onClick={() => setSelected(null)}><motion.div className="certificate-preview" onClick={e => e.stopPropagation()} initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><button className="preview-close" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt="Certificate preview"/><h3>{selected.name}</h3><p>{selected.platform} · {selected.year}</p>{selected.link && <a className="retro-button" href={selected.link} target="_blank" rel="noreferrer">Verify / View <ExternalLink size={14}/></a>}</motion.div></div>}</div>;
}
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ status: "idle", text: "" });
  const submit = async e => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setState({ status: "error", text: "Please enter your name (at least 2 characters)." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setState({ status: "error", text: "Please enter a valid email address." });
    if (form.message.trim().length < 10) return setState({ status: "error", text: "Please write at least 10 characters." });
    setState({ status: "sending", text: "Sending your message…" });
    try {
      const response = await api.post("/api/contact", { ...form, name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
      setState({ status: "success", text: response.data.message || "Message sent!" }); setForm({ name: "", email: "", message: "" });
    } catch (error) { setState({ status: "error", text: error.response?.data?.message || "Could not send. Please try again later." }); }
  };
  return <div className="section-content"><SectionHeading kicker="INBOX / NEW MESSAGE" title="Let's talk!"/><div className="mail-app"><div className="mail-toolbar"><span>✉ COMPOSE MESSAGE</span><span>● ● ●</span></div><form className="contact-form" onSubmit={submit}><label>Name<input required minLength="2" maxLength="80" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name"/></label><label>Email<input required type="email" maxLength="254" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"/></label><label>Message<textarea required minLength="10" maxLength="3000" rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me what you're thinking…"/></label><button className="retro-button primary-button" disabled={state.status === "sending"} type="submit"><Mail size={16}/>{state.status === "sending" ? "Sending…" : "Send message"}</button>{state.status !== "idle" && <div className={`system-toast ${state.status}`} role="status"><span>{state.status === "success" ? "✓" : state.status === "error" ? "!" : "…"}</span>{state.text}</div>}</form><div className="mail-footer">OR EMAIL ME DIRECTLY: <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a></div></div></div>;
}
export default function SectionContent({ section }) {
  switch (section) {
    case "profile": return <Hero/>;
    case "about": return <About/>;
    case "skills": return <Skills/>;
    case "projects": return <Projects/>;
    case "resume": return <Resume/>;
    case "journey": return <Journey/>;
    case "certificates": return <Certificates/>;
    case "contact": return <Contact/>;
    default: return <div className="error-content"><div className="error-symbol">!</div><h2>404 — FILE NOT FOUND</h2><p>This desktop item doesn't exist or has been moved.</p></div>;
  }
}
