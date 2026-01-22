import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  ExternalLink,
  Download,
} from "lucide-react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});
  const isManualScroll = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.4, rootMargin: "-80px 0px 0px" },
    );

    Object.values(sectionRefs.current).forEach(
      (ref) => ref && observer.observe(ref),
    );

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const projects = [
    {
      title: "Parento",
      subtitle: "Full-Stack Parent–Child Management Platform",
      description:
        "Built a role-based application using React and Appwrite to separate parent and child access.",
      technical: [
        "Role-based access using Appwrite permissions",
        "Protected routes based on auth state",
        "Optimized API calls via batching",
      ],
      tags: ["React", "Firebase", "Auth"],
      liveLink: "https://parento-roan.vercel.app/",
      githubLink: "https://github.com/praveshnexus/parento",
    },
    {
      title: "Blog App",
      subtitle: "Content Management Platform",
      description:
        "Developed a blogging platform with authentication and protected content actions.",
      technical: [
        "Auth & authorization flows",
        "Reusable blog components",
        "Media uploads with Appwrite",
      ],
      tags: ["React", "Appwrite"],
      liveLink: "https://blog-app-rho-roan.vercel.app/",
      githubLink: "https://github.com/praveshnexus/BlogApp",
    },
    {
      title: "3D T-Shirt Customizer",
      subtitle: "Interactive WebGL Application",
      description:
        "Built an interactive 3D product customization experience using React and Three.js.",
      technical: [
        "React + Three.js integration",
        "Real-time color & texture updates",
        "Optimized render loop",
      ],
      tags: ["Three.js", "React"],
      liveLink: "https://3d-tshirt-bay.vercel.app/",
      githubLink: "https://github.com/praveshnexus/3d-tshirt",
    },
  ];

  const skills = {
    "Frontend Core": ["React", "JavaScript", "HTML", "CSS"],
    "UI & Styling": ["Tailwind CSS", "Material UI"],
    "Backend / Platform": ["Appwrite", "REST APIs, Firebase"],
  };

  const scrollToSection = (section) => {
    const el = sectionRefs.current[section];
    if (!el) return;

    isManualScroll.current = true;
    setActiveSection(section);

    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth",
    });

    setTimeout(() => (isManualScroll.current = false), 700);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 border-b border-slate-700/50 ${
          scrolled ? "bg-slate-900/95 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold">Pravesh Yadav</span>

          <div className="flex items-center gap-6">
            {["About", "Projects", "Education", "Skills", "Contact"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => scrollToSection(s)}
                  className={
                    activeSection === s
                      ? "text-purple-400"
                      : "text-slate-400 hover:text-purple-300"
                  }
                >
                  {s}
                </button>
              ),
            )}

            <a
              href="/Pravesh Resume.pdf"
              download
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 rounded-md hover:bg-purple-700"
            >
              <Download size={16} />
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="About"
        ref={(el) => (sectionRefs.current.about = el)}
        className="pt-32 min-h-screen flex items-center justify-center text-center"
      >
        <div>
          <p className="text-purple-400 mb-2">
            Frontend Engineer focused on React
          </p>
          <h1 className="text-6xl font-bold mb-6">Hi, I’m Pravesh</h1>
          <p className="text-slate-300 max-w-xl mx-auto mb-6">
            I build scalable, user-centric web applications with React, focusing
            on performance and clean architecture.
          </p>

          <a
            href="/Pravesh Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:border-purple-500"
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="Projects"
        ref={(el) => (sectionRefs.current.projects = el)}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <h2 className="text-4xl font-bold">Projects</h2>

          {projects.map((p, i) => (
            <div
              key={i}
              className="p-6 bg-slate-800 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition"
            >
              <h3 className="text-2xl font-bold">{p.title}</h3>
              <p className="text-slate-400 mb-4">{p.subtitle}</p>
              <p className="text-slate-300 mb-4">{p.description}</p>

              <ul className="list-disc list-inside text-slate-300 mb-4">
                {p.technical.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>

              <div className="flex gap-4">
                {p.liveLink && (
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}

                {p.githubLink ? (
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-md hover:bg-slate-600 transition"
                  >
                    <Github size={16} />
                    Public Repo
                  </a>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-md text-slate-400 cursor-not-allowed">
                    <Github size={16} />
                    Private Repo
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="Education"
        ref={(el) => (sectionRefs.current.education = el)}
        className="py-20 bg-slate-800/30"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-10 flex items-center gap-3">
            <GraduationCap className="text-purple-400" />
            Education
          </h2>

          <div className="space-y-6">
            <div className="p-6 bg-slate-800 border border-slate-700/50 rounded-xl">
              <h3 className="text-xl font-semibold">
                M.Tech – Computer Science
              </h3>
              <p className="text-slate-400">
                SRM Institute of Science and Technology, Chennai
              </p>
              <p className="text-sm text-slate-500">2025 – Present</p>
            </div>

            <div className="p-6 bg-slate-800 border border-slate-700/50 rounded-xl">
              <h3 className="text-xl font-semibold">
                B.Tech – Computer Science
              </h3>
              <p className="text-slate-400">
                Pranveer Singh Institute of Technology, Kanpur
              </p>
              <p className="text-sm text-slate-500">2018 – 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="Skills"
        ref={(el) => (sectionRefs.current.skills = el)}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Skills</h2>
          {Object.entries(skills).map(([k, v]) => (
            <p key={k} className="text-slate-300 mb-2">
              <strong>{k}:</strong> {v.join(", ")}
            </p>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="Contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        className="py-20 text-center bg-slate-800/30"
      >
        <h2 className="text-4xl font-bold mb-6">Let’s Connect</h2>

        <div className="flex justify-center gap-6">
          <a
            href="mailto:ypravesh0007@gmail.com"
            className="p-3 rounded-full hover:bg-slate-700 transition"
            aria-label="Email"
          >
            <Mail />
          </a>

          <a
            href="https://github.com/praveshnexus"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-slate-700 transition"
            aria-label="GitHub"
          >
            <Github />
          </a>

          <a
            href="https://www.linkedin.com/in/pravesh-yadav-a6536a207/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-slate-700 transition"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
        </div>

        <p className="mt-4 text-slate-400">
          or email me at{" "}
          <a
            href="mailto:ypravesh0007@gmail.com"
            className="text-purple-400 hover:underline"
          >
            ypravesh0007@gmail.com
          </a>
        </p>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-slate-400 border-t border-slate-700/50">
        © 2026 Pravesh Yadav
      </footer>
    </div>
  );
}
