import { motion } from "framer-motion";
import { Folder, UserRound, Wrench, GraduationCap, Award, Mail, FileText, BriefcaseBusiness } from "lucide-react";
const icons = { profile: UserRound, works: Folder, contact: Folder, resume: Folder, skills: Wrench, journey: GraduationCap, certificates: Award, about: UserRound };
export default function DesktopIcon({ id, label, onOpen }) {
  const Icon = icons[id] || BriefcaseBusiness;
  return <motion.button className={`desktop-icon ${id === "profile" ? "profile-icon" : ""}`} onDoubleClick={() => onOpen(id)} onClick={() => onOpen(id)} whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: .96 }} aria-label={`Open ${label}`}>
    <span className={`desktop-icon-art ${id === "profile" ? "avatar-art" : ""}`}>{id === "profile" ? "AS" : <Icon size={31} strokeWidth={1.7} />}</span>
    <span className="desktop-icon-label">{label}</span>
  </motion.button>;
}
