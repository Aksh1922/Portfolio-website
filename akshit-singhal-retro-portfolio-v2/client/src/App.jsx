import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { portfolio } from "./data/portfolio";
import useTheme from "./hooks/useTheme";
import DesktopIcon from "./components/DesktopIcon";
import RetroWindow from "./components/RetroWindow";
import Taskbar from "./components/Taskbar";
import SectionContent from "./components/SectionContent";

const sectionByPath = { "/": "profile", "/about": "about", "/skills": "skills", "/projects": "projects", "/resume": "resume", "/journey": "journey", "/certificates": "certificates", "/contact": "contact" };
const pathBySection = { profile: "/", about: "/about", skills: "/skills", projects: "/projects", resume: "/resume", journey: "/journey", certificates: "/certificates", contact: "/contact" };
const icons = [
  { id: "profile", label: "profile" }, { id: "works", label: "works", route: "projects" },
  { id: "skills", label: "skills" }, { id: "journey", label: "journey" },
  { id: "contact", label: "contact" }, { id: "resume", label: "resume" },
  { id: "certificates", label: "certificates" }, { id: "about", label: "about" }
];
const titleBySection = { profile: "profile", about: "about", skills: "tools", projects: "works", resume: "resume", journey: "journey", certificates: "certificates", contact: "contact" };

function Desktop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const section = sectionByPath[location.pathname];
  const [openWindows, setOpenWindows] = useState(["profile"]);
  const [active, setActive] = useState("profile");

  useEffect(() => {
    if (section) {
      setOpenWindows(current => current.includes(section) ? current : [...current, section]);
      setActive(section);
    }
  }, [section]);

  const open = id => {
    const resolved = id === "works" ? "projects" : id;
    if (!pathBySection[resolved]) return;
    setOpenWindows(current => current.includes(resolved) ? current : [...current, resolved]);
    setActive(resolved);
    navigate(pathBySection[resolved]);
  };
  const close = id => {
    setOpenWindows(current => current.filter(item => item !== id));
    if (active === id) {
      const remaining = openWindows.filter(item => item !== id);
      const next = remaining[remaining.length - 1] || null;
      setActive(next);
      navigate(next ? pathBySection[next] : "/");
    }
  };
  const focus = id => {
    if (active === id) { close(id); return; }
    setActive(id);
    navigate(pathBySection[id] || "/");
  };
  return <main className="desktop">
    <div className="desktop-ambient" aria-hidden="true">
      <span className="ambient-star star-one">✳</span><span className="ambient-star star-two">✦</span>
      <span className="ambient-star star-three">✧</span><span className="ambient-label">WELCOME.EXE</span>
      <span className="ambient-orbit"></span>
    </div>
    <div className="desktop-topline"><span>AKSHIT.SYS / PERSONAL DESKTOP</span><span>{portfolio.location} · AVAILABLE FOR OPPORTUNITIES</span></div>
    <section className="desktop-welcome" aria-label="Welcome">
      <div className="welcome-windowbar"><span><i></i><i></i><i></i> WELCOME.EXE</span><span>— □ ×</span></div>
      <div className="welcome-content">
        <div className="welcome-copy">
          <span className="welcome-kicker">✳ HELLO, WORLD! I'M</span>
          <h1>Akshit <em>Singhal.</em></h1>
          <p className="welcome-role">COMPUTER SCIENCE STUDENT · FULL-STACK DEVELOPER</p>
          <p className="welcome-description">I build thoughtful web experiences and explore the intersection of software, data, and AI.</p>
          <div className="welcome-actions">
            <button className="retro-button primary-button" onClick={() => open("profile")}>Meet me <span>↗</span></button>
            <button className="retro-button" onClick={() => open("works")}>Explore projects <span>→</span></button>
          </div>
          <div className="welcome-meta"><span><b className="status-dot"></b> OPEN TO LEARNING & BUILDING</span><span>EST. 2000s ENERGY</span></div>
        </div>
        <div className="welcome-portrait">
          <div className="portrait-sticker">DESIGN<br/>MEETS<br/>CODE ✳</div>
          <img src="/akshit-photo.jpg" alt="Akshit Singhal on campus" />
          <div className="portrait-caption"><span>AKSHIT SINGHAL</span><span>JAIPUR, INDIA</span></div>
        </div>
      </div>
      <div className="welcome-footer"><span>✦ BUILT WITH CURIOSITY</span><span>DOUBLE-CLICK DESKTOP ICONS TO EXPLORE</span><span>v1.0.26</span></div>
    </section>
    <div className="desktop-icons">{icons.map(icon => <DesktopIcon key={icon.id} {...icon} onOpen={open}/>)}</div>
    <div className="desktop-windows"><AnimatePresence>{openWindows.map(id => <RetroWindow key={id} id={id} title={titleBySection[id]} active={active === id} onFocus={setActive} onClose={close}><SectionContent section={id}/></RetroWindow>)}</AnimatePresence></div>
    <div className="desktop-hint">DOUBLE CLICK A FOLDER TO EXPLORE <span>✳</span></div>
    <Taskbar theme={theme} toggleTheme={toggleTheme} openWindows={openWindows} active={active} onFocus={focus} onClose={close}/>
  </main>;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Desktop/>}/>
    <Route path="/about" element={<Desktop/>}/>
    <Route path="/skills" element={<Desktop/>}/>
    <Route path="/projects" element={<Desktop/>}/>
    <Route path="/resume" element={<Desktop/>}/>
    <Route path="/journey" element={<Desktop/>}/>
    <Route path="/certificates" element={<Desktop/>}/>
    <Route path="/contact" element={<Desktop/>}/>
    <Route path="*" element={<div className="not-found"><div className="error-dialog"><div className="error-title">SYSTEM ERROR <span>×</span></div><div className="error-dialog-body"><div className="error-symbol">!</div><div><h2>404 — FILE NOT FOUND</h2><p>The requested desktop location could not be found.</p><a className="retro-button" href="/">Return to desktop</a></div></div></div></div>}/>
  </Routes>;
}
