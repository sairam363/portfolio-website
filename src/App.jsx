import { useState, useEffect, useRef } from "react";

// ── Scroll progress indicator ──────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${pct}%`, background: "linear-gradient(90deg,#3b82f6,#6366f1)" }}
      />
    </div>
  );
}

// ── Fade-in on scroll ──────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ id, children, className = "" }) {
  return (
    <section id={id} style={{width:"100%"}} className={className}>
      <div style={{maxWidth:"1024px", margin:"0 auto", padding:"80px 24px", textAlign:"center"}}>
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ label, title }) {
  return (
    <FadeIn className="mb-12 text-center">
      <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-2 block">{label}</span>
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
      <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
    </FadeIn>
  );
}

// ── Skill pill ─────────────────────────────────────────────────────────────
function Pill({ text, color = "blue" }) {
  const map = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
    sky: "bg-sky-50 text-sky-700 border-sky-100",
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${map[color]} mr-2 mb-2`}>
      {text}
    </span>
  );
}

// ── Tech badge (for project cards) ────────────────────────────────────────
function TechBadge({ text }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-600 border border-slate-200 mr-1 mb-1">
      {text}
    </span>
  );
}

// ── Social icon SVGs ──────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
function LeetCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About","Education","Projects","Skills","Achievements","Contact"];
  const scroll = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-slate-800 tracking-tight text-sm">SD</span>
        {/* desktop */}
        <ul className="hidden md:flex gap-7">
          {links.map(l => (
            <li key={l}>
              <button
                onClick={() => scroll(l)}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >{l}</button>
            </li>
          ))}
        </ul>
        {/* mobile burger */}
        <button className="md:hidden text-slate-600" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4">
          {links.map(l => (
            <button key={l} onClick={() => scroll(l)} className="block w-full text-left py-2 text-sm text-slate-700 hover:text-blue-600">
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  const socials = [
    { label:"LinkedIn",  href:"https://www.linkedin.com/in/sairam-devarakonda/", icon:<LinkedInIcon/>, color:"hover:text-blue-600" },
    { label:"GitHub",    href:"https://github.com/sairam363",                   icon:<GitHubIcon/>,   color:"hover:text-slate-900" },
    { label:"LeetCode",  href:"https://leetcode.com/u/sairam003/",              icon:<LeetCodeIcon/>, color:"hover:text-amber-500" },
  ];
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{
        background:"linear-gradient(160deg,#f0f6ff 0%,#f8f9ff 50%,#eef2ff 100%)"
      }}
    >
      {/* decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20" style={{background:"radial-gradient(circle,#93c5fd,transparent)"}} />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20" style={{background:"radial-gradient(circle,#a5b4fc,transparent)"}} />

      {/* social links */}
      <div className="flex gap-5 mb-10 z-10">
        {socials.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-slate-500 ${s.color} transition-colors group`}
          >
            <span className="group-hover:scale-110 transition-transform">{s.icon}</span>
            <span className="text-xs font-medium hidden sm:inline">{s.label}</span>
          </a>
        ))}
      </div>

      {/* name */}
      <div className="z-10">
        <h1
          className="font-extrabold text-slate-800 leading-none mb-3"
          style={{ fontSize:"clamp(2.5rem,7vw,5rem)", letterSpacing:"-0.03em" }}
        >
          Devarakonda<br/>
          <span style={{background:"linear-gradient(135deg,#3b82f6,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
            Sairam
          </span>
        </h1>
        <p className="text-slate-500 font-medium text-lg mb-2">Software Engineer · Full-Stack Developer</p>
        <p className="text-slate-400 text-sm mb-1">B.Tech in ECE · GITAM University · 2025</p>
      </div>

      {/* tagline */}
      <p className="mt-6 max-w-xl text-slate-600 text-base leading-relaxed z-10">
        "Building software with curiosity, creativity, and a passion for turning ideas into real-world impact."
      </p>

      {/* CTA */}
      <button
        className="mt-8 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 z-10"
        style={{background:"linear-gradient(135deg,#3b82f6,#6366f1)"}}
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })}
      >
        View Projects ↓
      </button>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────────────
function About() {
  return (
    <Section id="about">
      <SectionTitle label="Who I Am" title="About Me" />
      <FadeIn delay={100}>
        <div className="max-w-2xl mx-auto text-center">
          <p style={{textAlign:"center"}} className="text-slate-600 leading-relaxed mb-5">
            I'm a software engineer and full-stack developer with a B.Tech in Electronics & Communication Engineering from GITAM University. My journey in tech is driven by a genuine curiosity for how software solves real problems — from designing intuitive web interfaces to building robust backend systems and intelligent ML pipelines.
          </p>
          <p style={{textAlign:"center"}} className="text-slate-600 leading-relaxed mb-5">
            I thrive at the intersection of engineering and creativity. Whether it's architecting a MERN-stack application, writing clean REST APIs, or training a deep-learning model to detect electrolyte imbalances from ECG signals, I care deeply about crafting solutions that are both technically sound and practically impactful.
          </p>
          <p style={{textAlign:"center"}} className="text-slate-600 leading-relaxed">
            I've internship experience at DRDO, 100+ LeetCode problems under my belt, and a continuous drive to learn. I'm looking for opportunities where I can grow alongside talented teams and contribute meaningfully from day one.
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}

// ── EDUCATION ─────────────────────────────────────────────────────────────
function Education() {
  const items = [
    {
      degree: "B.Tech — Electronics & Communication Engineering",
      school: "GITAM University",
      period: "2021 – 2025",
      score: "CGPA: 7.79 / 10",
      icon: "🎓",
    },
    {
      degree: "Intermediate (PCM)",
      school: "Narayana Junior College",
      period: "2018 – 2020",
      score: "980 / 1000",
      icon: "📘",
    },
    {
      degree: "SSC — 10th Grade",
      school: "Paramita Residential School",
      period: "2017 – 2018",
      score: "CGPA: 9.2 / 10",
      icon: "🏫",
    },
  ];
  return (
    <Section id="education" className="bg-slate-50/60">
      <SectionTitle label="Academic Background" title="Education" />
      <div className="relative max-w-2xl mx-auto">
        {/* vertical line */}
        <div className="absolute left-7 top-4 bottom-4 w-px bg-slate-200 hidden sm:block" />
        <div className="flex flex-col gap-8">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-white shadow-sm border border-slate-100 z-10">
                  {item.icon}
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-slate-800 text-base">{item.degree}</h3>
                  <p className="text-blue-600 text-sm font-medium mt-0.5">{item.school}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-slate-400 text-xs">{item.period}</span>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">{item.score}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── INTERNSHIP ────────────────────────────────────────────────────────────
function Internship() {
  return (
    <Section id="internship">
      <SectionTitle label="Work Experience" title="Internship" />
      <FadeIn delay={80}>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-7">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">🛡️</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">Research Intern</h3>
                  <p className="text-blue-600 font-medium text-sm">DRDO, Hyderabad</p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">May 2024 – Jul 2024</span>
              </div>
              <ul className="mt-4 space-y-2">
                {[
                  "Developed Python scripts for data processing and automation of research workflows.",
                  "Built modular software components with emphasis on maintainability and debugging.",
                  "Collaborated with engineering teams on documentation, validation, and problem solving.",
                ].map((pt, i) => (
                  <li key={i} className="flex gap-2 text-slate-600 text-sm">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────────────────
const projects = [
  {
    title: "Restaurant Review Website",
    description: "A feature-complete full-stack web application where users can discover restaurants, write reviews, and manage their profiles through a clean and responsive interface.",
    techs: ["MongoDB","Express.js","React.js","Node.js","REST APIs"],
    highlights: [
      "Designed and built REST APIs for user authentication and full CRUD operations on reviews.",
      "Integrated React frontend with backend services for a seamless single-page experience.",
      "Optimised MongoDB queries and applied modular architecture for scalability.",
    ],
    github: "https://github.com/sairam363",
    emoji: "🍽️",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
  },
  {
    title: "Electrolyte Imbalance Detection",
    description: "An AI-powered clinical tool that classifies electrolyte imbalances from ECG signals using a CNN-based deep learning model, with a real-time Streamlit web interface.",
    techs: ["Python","TensorFlow","Scikit-learn","Streamlit","NumPy","Pandas"],
    highlights: [
      "Trained a CNN on the PTB-XL ECG dataset with preprocessing and feature extraction pipelines.",
      "Built a Streamlit web app for real-time ECG signal prediction and visualisation.",
      "Evaluated and optimised model performance across multi-class imbalance categories.",
    ],
    github: "https://github.com/sairam363",
    emoji: "🫀",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-100",
  },
];

function Projects() {
  return (
    <Section id="projects" className="bg-slate-50/60">
      <SectionTitle label="What I've Built" title="Projects" />
      <div className="grid md:grid-cols-2 gap-7">
        {projects.map((p, i) => (
          <FadeIn key={i} delay={i * 150}>
            <div className={`bg-gradient-to-br ${p.color} border ${p.border} rounded-2xl p-6 h-full flex flex-col hover:shadow-lg transition-all hover:-translate-y-1 group`}>
              <div className="text-3xl mb-3">{p.emoji}</div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.description}</p>
              <div className="mb-4">
                {p.techs.map(t => <TechBadge key={t} text={t} />)}
              </div>
              <ul className="flex-1 space-y-1.5 mb-5">
                {p.highlights.map((h, j) => (
                  <li key={j} className="flex gap-2 text-slate-600 text-xs">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-indigo-700 transition-colors mt-auto"
              >
                <GitHubIcon/>
                View on GitHub →
              </a>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────
const skillGroups = [
  { label:"Programming Languages", color:"blue",   items:["Python","JavaScript","SQL","C++"] },
  { label:"Frontend",              color:"sky",    items:["React.js","HTML5","CSS3"] },
  { label:"Backend",               color:"indigo", items:["Node.js","Express.js","REST APIs","JSON"] },
  { label:"Databases",             color:"teal",   items:["MongoDB","MySQL"] },
  { label:"AI / Machine Learning", color:"violet", items:["TensorFlow","Scikit-learn","NumPy","Pandas"] },
  { label:"Tools & Platforms",     color:"rose",   items:["Git","GitHub","VS Code","Linux","Streamlit"] },
  { label:"Core CS",               color:"amber",  items:["OOP","Data Structures & Algorithms","DBMS","OS","Computer Networks"] },
];

function Skills() {
  return (
    <Section id="skills">
      <SectionTitle label="What I Work With" title="Skills" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((g, i) => (
          <FadeIn key={i} delay={i * 70}>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow h-full">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{g.label}</h3>
              <div className="flex flex-wrap">
                {g.items.map(s => <Pill key={s} text={s} color={g.color} />)}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ── ACHIEVEMENTS ──────────────────────────────────────────────────────────
const achievements = [
  { emoji:"⚡", text:"Solved 100+ LeetCode problems, strengthening Data Structures, Algorithms, and problem-solving skills." },
  { emoji:"🌐", text:"Built full-stack MERN applications with REST APIs, JWT authentication, and MongoDB database integration." },
  { emoji:"🤖", text:"Developed and deployed a machine learning app using Python, TensorFlow, and Streamlit for real-time ECG predictions." },
  { emoji:"🛡️", text:"Completed a research internship at DRDO, Hyderabad, working on data processing automation and modular software components." },
  { emoji:"🏗️", text:"Applied OOP principles, clean API design, Git workflows, debugging, and database design across multiple production-level projects." },
];

function Achievements() {
  return (
    <Section id="achievements" className="bg-slate-50/60">
      <SectionTitle label="Milestones" title="Achievements" />
      <div className="max-w-2xl mx-auto grid gap-4">
        {achievements.map((a, i) => (
          <FadeIn key={i} delay={i * 90}>
            <div className="flex gap-4 items-start bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
              <span className="text-2xl flex-shrink-0">{a.emoji}</span>
              <p className="text-slate-600 text-sm leading-relaxed">{a.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ── CONTACT / FOOTER ─────────────────────────────────────────────────────
function Contact() {
  const socials = [
    { label:"LinkedIn",  href:"https://www.linkedin.com/in/sairam-devarakonda/", icon:<LinkedInIcon/> },
    { label:"GitHub",    href:"https://github.com/sairam363",                   icon:<GitHubIcon/>   },
    { label:"LeetCode",  href:"https://leetcode.com/u/sairam003/",              icon:<LeetCodeIcon/>  },
  ];
  return (
    <footer id="contact" className="py-16 px-6 text-center" style={{background:"linear-gradient(160deg,#1e3a5f 0%,#1e1b4b 100%)"}}>
      <FadeIn>
        <p className="text-blue-300 text-sm font-medium tracking-widest uppercase mb-3">Get In Touch</p>
        <h2 className="text-3xl font-bold text-white mb-6">Thanks for visiting.</h2>
        <p className="text-slate-300 text-sm mb-8 max-w-sm mx-auto">
          I'm actively looking for new opportunities. Whether you have a question or just want to say hello — my inbox is always open.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a href="mailto:sairamdsr143@gmail.com" className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm">
            <MailIcon/> sairamdsr143@gmail.com
          </a>
          <a href="tel:+919701590652" className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm">
            <PhoneIcon/> +91 9701590652
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-10">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors">
              {s.icon}
            </a>
          ))}
        </div>

        <p className="text-slate-500 text-xs">© 2025 Devarakonda Sairam. All rights reserved.</p>
      </FadeIn>
    </footer>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans text-slate-800 scroll-smooth">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Education />
      <Internship />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </div>
  );
}
