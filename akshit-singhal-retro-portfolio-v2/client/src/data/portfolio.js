export const portfolio = {
  name: "Akshit Singhal",
  initials: "AS",
  role: "COMPUTER SCIENCE STUDENT & DEVELOPER",
  roles: ["Full-Stack Developer", "Data Engineering Intern", "Problem Solver"],
  tagline: "Building useful software at the intersection of web development, data, and AI.",
  bio: "I'm a Computer Science Engineering student at JK Lakshmipat University, interested in building practical full-stack products and data-driven systems. I've worked with React, Node.js, Express, MongoDB, Databricks, Apache Spark, and PySpark, and I enjoy turning real-world problems into useful software.",
  location: "Jaipur, Rajasthan, India",
  status: "B.Tech CSE · 2024–2028",
  email: "akshitt1922@gmail.com",
  avatar: "",
  social: {
    github: "https://github.com/Aksh1922",
    linkedin: "https://linkedin.com/in/akshit-singhal22"
  },
  skills: [
    { group: "Languages", items: [{ name: "C" }, { name: "Python" }, { name: "JavaScript" }] },
    { group: "Full-Stack Development", items: [{ name: "React" }, { name: "Next.js" }, { name: "Node.js" }, { name: "Express.js" }, { name: "Tailwind CSS" }, { name: "MongoDB" }] },
    { group: "Data Engineering", items: [{ name: "Databricks" }, { name: "Apache Spark / PySpark" }, { name: "Spark SQL" }, { name: "Delta Tables" }, { name: "REST APIs" }] },
    { group: "CS & AI", items: [{ name: "Data Structures & Algorithms" }, { name: "DBMS" }, { name: "Basic NLP" }, { name: "AI-assisted development" }] }
  ],
  projects: [
    { id: 1, name: "EV Battery Health ML", description: "A machine-learning project focused on analyzing electric-vehicle battery data to assess battery health and support performance analysis. Model details and evaluation metrics can be added as the implementation is verified.", tech: ["Python", "Machine Learning", "Battery Data Analysis"], github: "https://github.com/Aksh1922", image: "/ev-battery-ml.svg", status: "In development" },
    { id: 2, name: "Hintro Dashboard", description: "A frontend dashboard built with reusable React and Next.js UI components, mock API data, localStorage-based functionality, and CSS Modules.", tech: ["Next.js", "React", "CSS Modules", "localStorage"], github: "https://github.com/Aksh1922", image: "/hintro-dashboard-preview.svg", status: "Project" },
    { id: 3, name: "AI Resume Analyzer", description: "A Python and Streamlit tool that extracts key information from PDF resumes and applies basic NLP processing to analyze resume content.", tech: ["Python", "Streamlit", "PyPDF2", "NLP"], github: "https://github.com/Aksh1922", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80", status: "Project" }
  ],
  journey: [
    { type: "education", title: "B.Tech — Computer Science Engineering", place: "JK Lakshmipat University", period: "2024 — 2028", detail: "Undergraduate studies focused on computer science fundamentals, software development, and data-driven applications." },
    { type: "experience", title: "IT/AI Intern — Wealth Management Analytics Platform", place: "Anytime Invest Services Pvt. Ltd.", period: "Internship", detail: "Worked with Databricks, Apache Spark, PySpark, Spark SQL, data cleaning, schema validation, Delta Tables, and Node.js/Express REST APIs." },
    { type: "education", title: "Senior Secondary (Class XII)", place: "CBSE", period: "2024", detail: "Completed senior secondary education under the CBSE curriculum." },
    { type: "experience", title: "Core Member — Sports Events", place: "Inter-college & intra-college events", period: "University activities", detail: "Contributed to team coordination, volunteer management, and event planning." }
  ],
  certificates: [
    { name: "Fundamentals of UI/UX Design", platform: "Microsoft", year: "Year not listed", link: "", image: "/certificate-illustration.svg" }
  ]
};
