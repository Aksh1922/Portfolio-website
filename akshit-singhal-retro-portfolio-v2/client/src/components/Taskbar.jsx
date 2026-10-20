import { Github, Linkedin, Sun, Moon, Clock3, X } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";
const socials = [
  { key: "linkedin", Icon: Linkedin, className: "linkedin" },
  { key: "github", Icon: Github, className: "github" }
];
export default function Taskbar({ theme, toggleTheme, openWindows, active, onFocus, onClose }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
  return <footer className="taskbar">
    <div className="taskbar-brand"><span className="start-mark">✿</span><span>start</span></div>
    <div className="taskbar-socials">{socials.map(({ key, Icon, className }) => <a key={key} className={`social-button ${className}`} href={portfolio.social[key]} target="_blank" rel="noreferrer" aria-label={key}><Icon size={17}/></a>)}</div>
    <div className="taskbar-open-windows">{openWindows.map(id => <button key={id} className={`task-window ${active === id ? "selected" : ""}`} onClick={() => onFocus(id)}><span>{id}</span><X size={12} onClick={e => { e.stopPropagation(); onClose(id); }}/></button>)}</div>
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">{theme === "light" ? <Moon size={17}/> : <Sun size={17}/>}</button>
    <div className="taskbar-clock"><Clock3 size={14}/><span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></div>
  </footer>;
}
