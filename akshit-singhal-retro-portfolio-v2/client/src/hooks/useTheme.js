import { useEffect, useState } from "react";
export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
  return { theme, toggleTheme: () => setTheme(value => value === "light" ? "dark" : "light") };
}
