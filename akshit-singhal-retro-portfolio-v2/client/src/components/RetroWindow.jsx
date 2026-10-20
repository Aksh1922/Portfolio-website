import { motion } from "framer-motion";
import { Maximize2, Minus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function RetroWindow({ id, title, active, onFocus, onClose, children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [maximized, setMaximized] = useState(false);
  const drag = useRef(null);
  useEffect(() => {
    if (window.innerWidth > 760 && ref.current && position.x === 0 && position.y === 0) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({ x: Math.max(0, (window.innerWidth - rect.width) / 2 - 35), y: Math.max(20, (window.innerHeight - 90 - rect.height) / 2 - 20) });
    }
  }, []);
  const startDrag = e => {
    if (window.innerWidth <= 760 || maximized || e.target.closest("button")) return;
    onFocus(id);
    drag.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const moveDrag = e => {
    if (!drag.current) return;
    setPosition({ x: Math.max(0, Math.min(window.innerWidth - 240, e.clientX - drag.current.x)), y: Math.max(0, Math.min(window.innerHeight - 120, e.clientY - drag.current.y)) });
  };
  const endDrag = () => { drag.current = null; };
  return <motion.section ref={ref} className={`retro-window ${active ? "window-active" : ""} ${maximized ? "window-maximized" : ""}`} style={{ zIndex: active ? 100 : 10, "--window-x": `${position.x}px`, "--window-y": `${position.y}px` }} initial={{ opacity: 0, scale: .88, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .9, y: 8 }} transition={{ type: "spring", stiffness: 330, damping: 28 }} onMouseDown={() => onFocus(id)}>
    <header className="window-titlebar" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
      <span className="window-path">C:\\{title.toUpperCase()}\\portfolio</span>
      <div className="window-controls">
        <button aria-label="Minimize window" onClick={() => onClose(id)}><Minus size={13}/></button>
        <button aria-label="Maximize window" onClick={() => setMaximized(v => !v)}><Maximize2 size={12}/></button>
        <button className="close-window" aria-label="Close window" onClick={() => onClose(id)}><X size={13}/></button>
      </div>
    </header>
    <div className="window-body">{children}</div>
    <div className="window-status"><span>READY</span><span>© {new Date().getFullYear()} / PERSONAL DESKTOP</span></div>
  </motion.section>;
}
