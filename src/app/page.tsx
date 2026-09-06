"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Target,
  ChevronRight,
  Download,
  Menu,
  X,
  ArrowRight,
  Cpu,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [
        "hero",
        "snapshot",
        "about",
        "impact",
        "featured-work",
        "experience",
        "projects",
        "skills",
        "teaching",
        "education",
        "certifications",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "featured-work", label: "Work" },
    { id: "skills", label: "Capabilities" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  const impactCards = [
    {
      key: "engineer",
      label: "BUILD",
      title: "AI Engineer",
      description: "I design and build AI systems across LLM orchestration, RAG, Text-to-SQL, agentic workflows, backend architecture, validation, testing, monitoring, and deployment.",
      icon: Cpu,
      dominant: true,
      ctaLabel: "View Selected Systems",
      ctaTarget: "featured-work",
    },
    {
      key: "instructor",
      label: "TEACH",
      title: "Technical Instructor",
      description: "I teach Python, AI, and machine learning through practical learning experiences focused on understanding how systems work and applying concepts through projects.",
      icon: BookOpen,
      dominant: false,
      ctaLabel: "Explore Teaching Experience",
      ctaTarget: "teaching",
    },
    {
      key: "consultant",
      label: "ADVISE",
      title: "AI Consultant",
      description: "I help individuals, teams, and organizations explore AI opportunities, evaluate technical approaches, and translate ideas into practical AI system designs.",
      icon: Lightbulb,
      dominant: false,
      ctaLabel: "Start a Conversation",
      ctaTarget: "contact",
    },
  ];

  const skillGroups = [
    {
      category: "LLM Systems",
      items: ["LLM Orchestration", "Prompt Engineering", "Structured Outputs", "Model Integration"],
    },
    {
      category: "Retrieval Systems",
      items: ["RAG", "Vector Search", "Hybrid Retrieval", "Embeddings", "BM25"],
    },
    {
      category: "Agentic Systems",
      items: ["Agent Workflows", "Tool Use", "State Management"],
    },
    {
      category: "Backend & Infrastructure",
      items: ["Python", "FastAPI", "SQL", "PostgreSQL", "SQLite", "Firebase/Firestore", "Docker", "REST APIs", "Automated Testing"],
    },
    {
      category: "Data & ML",
      items: ["Machine Learning", "Deep Learning", "NLP", "Scikit-learn", "PyTorch", "TensorFlow"],
    },
  ];

  // Tier 2 — strong supporting projects
  const strongProjects = [
    {
      title: "Pathora — AI-Powered Career Assessment Platform",
      badges: ["Graduation Project", "Team Lead"],
      description: "Led a 5-person team building an LLM-integrated AI product for CV/JD analysis, job-title prediction, personalized assessment generation, and course recommendations. Implemented a dual-provider LLM architecture — Ollama for local inference, Hugging Face Inference API as a switchable alternative — tuned for constrained hardware, plus an LLM tracing system for cross-stack debugging.",
      technologies: ["LLM Integration", "Dual-Provider Architecture", "Ollama", "Hugging Face Inference API", "LLM Tracing"],
      github: "https://github.com/Mosapmohamd/Pathora",
    },
    {
      title: "Sola POS — Commercial Desktop POS System",
      badges: ["Freelance Project"],
      description: "Production-ready desktop Point of Sale application for restaurants and cafés. Electron + React + TypeScript frontend and FastAPI + PostgreSQL backend, structured as a Clean Architecture monorepo with role-based access, reporting, and CI. Covers the full order lifecycle, multi-method payments, and cash-shift management, with a self-contained deployment requiring no setup on the end user's machine.",
      technologies: ["Electron", "React", "TypeScript", "FastAPI", "PostgreSQL", "Clean Architecture"],
      github: "https://github.com/Mosapmohamd/Sola",
    },
  ];

  // Tier 3 — project archive (smaller, more compact presentation)
  const archiveProjects = [
    {
      title: "Multilingual Sentiment Analysis",
      description: "NLP pipeline over TripAdvisor and Quora Egypt datasets (Arabic + English), benchmarking Logistic Regression, SVM, LSTM, and BERT.",
      technologies: ["NLP", "BERT", "LSTM"],
      github: "https://github.com/Mosapmohamd/Sentiment-Analysis-for-TripAdvisor-and-Quora-Egypt",
    },
    {
      title: "Customer Churn Prediction Dashboard",
      description: "Streamlit dashboard built around a Random Forest model — 91% accuracy predicting churn risk.",
      technologies: ["Python", "Random Forest", "Streamlit"],
      github: "https://github.com/Mosapmohamd/customer-churn-prediction",
    },
  ];

  const certifications = [
    { name: "Digital Egypt Pioneers Program - Data Scientist", issuer: "DEPI", year: "2025", id: "DEPI Certificate", date: "November to May 2025", duration: "6 Months", priority: 1 },
    { name: "Machine Learning Course", issuer: "MLANG", year: "2024", id: "LLbRxQea11", date: "September 23, 2024", duration: "10 Hours", priority: 1 },
    { name: "Applied Deep Learning", issuer: "MLANG", year: "2025", id: "JACOy6OHbP", date: "June 19, 2025", duration: "2 Hours 50 Minutes", priority: 1 },
    { name: "Python Programmer Bootcamp", issuer: "365 Data Science", year: "2024", id: "CC-E08D606468", date: "10/11/2024", priority: 1 },
    { name: "Database Fundamentals", issuer: "Mahara Tech", year: "2024", id: "wpsFZYag4i", date: "18/09/24", duration: "2 Hour, 47 Minutes", priority: 1 },
    { name: "Data Scientist Career Track", issuer: "365 Data Science", year: "2024", id: "DD-5322621219", date: "20/11/2024", priority: 1 },
    { name: "Deep Learning with TensorFlow 2", issuer: "365 Data Science", year: "2024", id: "CC-7CA970BCF3", date: "16/11/2024", priority: 2 },
    { name: "The Machine Learning Process A-Z", issuer: "365 Data Science", year: "2024", id: "CC-1C4E864E7B", date: "05/11/2024", priority: 2 },
    { name: "SQL", issuer: "365 Data Science", year: "2024", id: "CC-955270FF20", date: "13/11/2024", priority: 2 },
    { name: "Statistics", issuer: "365 Data Science", year: "2024", id: "CC-E3933B1C3C", date: "11/11/2024", priority: 2 },
    { name: "Introduction to Data and Data Science", issuer: "365 Data Science", year: "2024", id: "CC-9E73C587DA", date: "10/11/2024", priority: 2 },
    { name: "Introduction to Python", issuer: "365 Data Science", year: "2024", id: "CC-991B002BB4", date: "05/11/2024", priority: 2 },
    { name: "Probability", issuer: "365 Data Science", year: "2024", id: "CC-F21B31A09E", date: "13/11/2024", priority: 2 },
    { name: "Mathematics", issuer: "365 Data Science", year: "2024", id: "CC-0D967FD405", date: "16/11/2024", priority: 2 },
    { name: "Data Manipulation with pandas", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 09, 2025", duration: "4 HRS", priority: 3 },
    { name: "Intermediate Python", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 07, 2025", duration: "4 HRS", priority: 3 },
    { name: "Joining Data with pandas", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 16, 2025", duration: "4 HRS", priority: 3 },
    { name: "Supervised Learning with scikit-learn", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 14, 2025", duration: "4 HRS", priority: 3 },
  ];

  const topCertifications = certifications.filter((c) => c.priority === 1);

  const timeline = [
    {
      title: "AI Engineer",
      org: "Core Business Solutions",
      period: "November 2025 – September 2026",
      description: "Architected and built production AI systems for enterprise business analytics, focusing on LLM orchestration, constrained Text-to-SQL, semantic retrieval, and agentic workflows.",
      bullets: [
        "Built a multi-tenant AI analytics platform over a 3.9GB enterprise database (378 tables, 464 views)",
        "Designed a two-model architecture separating LLM orchestration from constrained SQL generation",
        "Implemented layered safety using read-only restrictions and AST-based SQL validation",
        "Developed hybrid BM25 + vector retrieval achieving 100% top-3 accuracy on a 90-question benchmark",
        "Productionized with Docker, monitoring, audit logging, automated backups, and 400+ automated tests",
      ],
      current: true,
    },
    {
      title: "Python Instructor",
      org: "TM Academy",
      period: "November 2024 – November 2025",
      description: "Taught Python fundamentals and translated technical concepts into clear explanations, mentoring learners through practical programming projects.",
      bullets: [],
      current: false,
    },
  ];

  const teaching = [
    {
      title: "Python Instructor",
      org: "TM Academy",
      period: "November 2024 – November 2025",
      description: "Delivered a structured Python curriculum from fundamentals through practical projects, translating technical concepts into clear, understandable explanations.",
    },
    {
      title: "AI & Machine Learning Instructor",
      org: "RTC",
      period: "July 2024 – Present",
      description: "Mentored students in ML techniques using Python and relevant libraries, fostering a collaborative learning environment through regular Q&A sessions and constructive feedback.",
    },
    {
      title: "OC Team Leader",
      org: "RTC",
      period: "March 2024 – Present",
      description: "Led team monitoring and progress tracking, developing team-leadership and coordination experience alongside technical work.",
    },
  ];

  const training = [
    { title: "Generative AI", issuer: "DEPI", period: "November 2025 – July 2026" },
    { title: "AI for Business", issuer: "NTI", period: "October – December 2025" },
    { title: "Machine Learning", issuer: "NTI", period: "August – September 2025" },
    { title: "Data Science", issuer: "DEPI", period: "October 2024 – May 2025" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-300 ${isScrolled ? "py-2 shadow-lg" : "py-4"}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#0B0F14] flex items-center justify-center flex-shrink-0 p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <g fill="none" stroke="#22D3EE" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20,22 L20,78 M80,22 L80,78 M20,22 L50,58 L80,22" />
                  </g>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold">Mosap Abdel-Ghany</div>
                <div className="text-xs text-muted-foreground">AI Engineer</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    activeSection === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={() => scrollToSection("contact")}>
                Hire Me
              </Button>
              <Button size="sm" onClick={() => scrollToSection("featured-work")}>
                View Work
              </Button>
            </div>
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 flex flex-col gap-1 border-t pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm font-medium py-2 px-2 rounded-md transition-colors ${
                    activeSection === item.id ? "text-primary bg-muted" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => scrollToSection("contact")}>
                  Hire Me
                </Button>
                <Button size="sm" className="flex-1" onClick={() => scrollToSection("featured-work")}>
                  View Work
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-6 text-primary border-primary/40">
                AI Engineer
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Building <span className="gradient-text">Production AI Systems</span> with LLMs, RAG &amp; Agentic Workflows
              </h1>
              <p className="text-lg md:text-xl mb-4 max-w-2xl text-muted-foreground leading-relaxed">
                I build production AI systems that combine LLM orchestration, semantic retrieval, Text-to-SQL,
                agentic workflows, backend engineering, validation, testing, and deployment.
              </p>
              <p className="text-base mb-8 max-w-2xl text-muted-foreground/80">
                I also teach technical concepts and help teams turn AI ideas into practical system decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection("featured-work")} className="px-8 gradient-bg hover:opacity-90 transition-opacity text-white">
                  Explore My Work
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8">
                  <Link href="/projects/eliara">
                    View Eliara Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" asChild className="px-8">
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative mx-auto w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-primary/30 bg-muted/40">
                <Image
                  src="/profile.jpeg"
                  alt="Mosap Abdel-Ghany, AI Engineer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 400px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Snapshot — compact signals only */}
      <section id="snapshot" className="py-14 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Current Role</div>
              <div className="font-semibold">AI Engineer</div>
              <div className="text-sm text-muted-foreground">Core Business Solutions</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Specialization</div>
              <div className="font-semibold">LLM Systems, RAG</div>
              <div className="text-sm text-muted-foreground">Agentic AI, Text-to-SQL</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Education</div>
              <div className="font-semibold">B.Sc. Artificial Intelligence</div>
              <div className="text-sm text-muted-foreground">Graduated 2026 · Excellent</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Selected Result</div>
              <div className="font-semibold">100% Top-3 Retrieval</div>
              <div className="text-sm text-muted-foreground">Eliara, 90-question benchmark</div>
            </div>
          </div>
        </div>
      </section>

      {/* About — short and focused */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What I Build</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm an AI Engineer focused on building AI systems beyond demos and prototypes — LLM-powered
              applications, retrieval systems, agentic workflows, and AI backends that interact with real business
              data.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My background across machine learning, NLP, and backend engineering helps me approach AI products as
              complete systems — retrieval quality, validation layers, observability, testing, and deployment —
              rather than isolated models.
            </p>
          </div>
        </div>
      </section>

      {/* Build · Teach · Advise */}
      <section id="impact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">How I Create Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Building AI systems, teaching technical concepts, and helping others make practical technology
                decisions.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {impactCards.map((card) => (
                <Card key={card.key} className={card.dominant ? "h-full border-2 border-primary shadow-lg md:scale-105" : "h-full"}>
                  <CardHeader>
                    <div className="text-xs font-semibold tracking-wider text-primary mb-2">{card.label}</div>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${card.dominant ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                        <card.icon className="h-5 w-5" />
                      </div>
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm">{card.description}</p>
                    <button
                      onClick={() => scrollToSection(card.ctaTarget)}
                      className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {card.ctaLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work — Eliara, full-width, dominant */}
      <section id="featured-work" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-semibold tracking-wider text-primary mb-3 text-center">FEATURED ENGINEERING CASE STUDY</div>
            <Card className="border-2 border-primary shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Eliara</h2>
                <p className="text-lg text-muted-foreground mb-6">Enterprise AI System for Natural Language Data Access</p>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  A production, multi-tenant AI analytics platform enabling natural-language interaction with
                  complex business data through LLM orchestration, constrained Text-to-SQL, hybrid semantic
                  retrieval, and layered validation — an engineered system, not just an LLM demo.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-8">
                  {[
                    { value: "3.9GB", label: "Database" },
                    { value: "378", label: "Tables" },
                    { value: "464", label: "Views" },
                    { value: "100%", label: "Top-3 Retrieval" },
                    { value: "400+", label: "Automated Tests" },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="text-xl md:text-2xl font-bold text-primary">{m.value}</div>
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["RAG", "Agentic AI", "Text-to-SQL", "LLM Orchestration", "Hybrid Retrieval", "AST Validation"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href="/projects/eliara">
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => window.open("https://github.com/CarFLex-Team/Eliara-V2", "_blank")}>
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Experience — timeline, detailed */}
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            </div>
            <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
              {timeline.map((item) => (
                <div key={item.title + item.org} className="relative">
                  <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2 ${item.current ? "bg-primary border-primary" : "bg-background border-muted-foreground"}`} />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.period}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">{item.org}</div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  {item.bullets.length > 0 && (
                    <ul className="space-y-1.5">
                      {item.bullets.map((b) => (
                        <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Projects — tiered */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {strongProjects.map((project) => (
                <Card key={project.title} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.badges.map((b) => (
                        <Badge key={b} variant="outline">
                          {b}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-base">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.open(project.github, "_blank")} className="w-full">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Project archive — compact, de-emphasized */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Project Archive</h3>
              <div className="space-y-3">
                {archiveProjects.map((project) => (
                  <div key={project.title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b py-3">
                    <div>
                      <div className="font-medium text-sm">{project.title}</div>
                      <div className="text-sm text-muted-foreground">{project.description}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {project.technologies.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Capabilities</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillGroups.map((group) => (
                <Card key={group.category} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching & Leadership — narrative timeline */}
      <section id="teaching" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Teaching &amp; Leadership</h2>
            </div>
            <div className="relative border-l-2 border-muted pl-8 space-y-8">
              {teaching.map((item) => (
                <div key={item.title + item.org} className="relative">
                  <div className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.period}
                    </div>
                  </div>
                  <div className="text-sm text-primary mb-1">{item.org}</div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Professional Training */}
      <section id="education" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">B.Sc. in Artificial Intelligence</CardTitle>
                  <CardDescription>Helwan International Technological University</CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    2022 – 2026 · Graduated
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-4">
                    Final Grade: Excellent
                  </Badge>
                  <Separator className="mb-4" />
                  <div className="text-sm font-medium mb-1">Graduation Project</div>
                  <div className="text-sm text-muted-foreground mb-2">Pathora — AI-Powered Career Assessment Platform</div>
                  <Badge variant="outline">Role: Team Lead</Badge>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-muted-foreground" />
                Professional Training
              </h3>
              <div className="space-y-3">
                {training.map((item) => (
                  <Card key={item.title}>
                    <CardContent className="py-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.issuer}</div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">{item.period}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Certifications */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Credentials</h2>
              <p className="text-lg text-muted-foreground">Most relevant to AI engineering — full list available on request</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {topCertifications.map((cert) => (
                <Card key={cert.name + cert.id} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <Award className="h-10 w-10 text-primary mx-auto mb-3" />
                    <CardTitle className="text-base leading-tight">{cert.name}</CardTitle>
                    <CardDescription className="text-sm">{cert.issuer}</CardDescription>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                      <Calendar className="h-3 w-3" />
                      <span>{cert.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        ID: {cert.id}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {cert.year}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" size="lg" onClick={() => setShowAllCertifications(!showAllCertifications)} className="px-8">
                {showAllCertifications ? (
                  <>
                    <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                    Hide All Certifications
                  </>
                ) : (
                  <>
                    View All Certifications ({certifications.length})
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            {showAllCertifications && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-8 text-center">All Certifications</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {certifications.map((cert) => (
                    <Card key={cert.name + cert.id + cert.date} className="text-center hover:shadow-md transition-shadow">
                      <CardHeader>
                        <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                        <CardTitle className="text-sm leading-tight">{cert.name}</CardTitle>
                        <CardDescription className="text-xs">{cert.issuer}</CardDescription>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                          <Calendar className="h-3 w-3" />
                          <span>{cert.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            ID: {cert.id}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {cert.year}
                          </Badge>
                          {cert.duration && (
                            <Badge variant="outline" className="text-xs">
                              {cert.duration}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Open to AI Engineering opportunities and collaborations involving LLM systems, RAG, agentic
                workflows, and production AI infrastructure.
              </p>
              <p className="text-sm text-muted-foreground/80 mt-2">
                Have an AI idea or technical challenge? Let's discuss how it can become a practical system.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Contact Information</CardTitle>
                <CardDescription className="text-center">
                  Feel free to reach out for collaborations, job opportunities, or just to say hello!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <a href="mailto:abdelghanymosap@gmail.com" className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">abdelghanymosap@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+201013089663" className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+201013089663</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Cairo, Egypt</p>
                    </div>
                  </div>
                  <a href="https://github.com/Mosapmohamd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border">
                    <Github className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-muted-foreground">github.com/Mosapmohamd</p>
                    </div>
                  </a>
                  <a href="https://linkedin.com/in/mosap-abdel-ghany" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border md:col-span-2">
                    <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">in</span>
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-muted-foreground">linkedin.com/in/mosap-abdel-ghany</p>
                    </div>
                  </a>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" onClick={() => window.open("mailto:abdelghanymosap@gmail.com")}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => window.open("tel:+201013089663")}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Me
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Mosap Abdel-Ghany. All rights reserved.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" onClick={() => scrollToSection("contact")}>
                Contact
              </Button>
              <Button variant="ghost" size="sm" onClick={() => scrollToSection("projects")}>
                Projects
              </Button>
              <Button variant="ghost" size="sm" onClick={() => scrollToSection("skills")}>
                Skills
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
