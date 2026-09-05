"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  Users,
  ChevronRight,
  Download,
  Menu,
  X,
  Layers,
  Shield,
  Network,
  ArrowRight,
  CheckCircle2,
  Server,
  Cpu,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

function EliaraArchitecture() {
  const nodes: { label: string; sub?: string; safety?: boolean }[] = [
    { label: "User Question" },
    { label: "LLM Orchestration Layer" },
    { label: "Intent Analysis" },
    { label: "Hybrid Semantic Retrieval", sub: "BM25 + Vector Search" },
    { label: "Relevant Schema Context" },
    { label: "Constrained SQL Generation" },
    { label: "AST Validation" },
    { label: "Read-Only Validation Layer", safety: true },
    { label: "Enterprise SQL Database" },
    { label: "Result Processing" },
    { label: "LLM Response" },
  ];

  const boxHeight = 50;
  const gap = 24;
  const boxWidth = 320;
  const centerX = 200;
  const startY = 20;
  const positions = nodes.map((_, i) => startY + i * (boxHeight + gap));
  const viewHeight = positions[positions.length - 1] + boxHeight + 20;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950 p-4 md:p-8 overflow-x-auto">
      <svg
        viewBox={`0 0 400 ${viewHeight}`}
        className="mx-auto"
        style={{ minWidth: 320, maxWidth: 480, width: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#22d3ee" />
          </marker>
        </defs>

        {nodes.slice(0, -1).map((_, i) => (
          <line
            key={`line-${i}`}
            x1={centerX}
            y1={positions[i] + boxHeight}
            x2={centerX}
            y2={positions[i + 1]}
            stroke="#22d3ee"
            strokeWidth="1.5"
            markerEnd="url(#arrow-cyan)"
          />
        ))}

        {nodes.map((node, i) => (
          <g key={node.label}>
            <rect
              x={centerX - boxWidth / 2}
              y={positions[i]}
              width={boxWidth}
              height={boxHeight}
              rx="8"
              fill={node.safety ? "#1c1410" : "#0f172a"}
              stroke={node.safety ? "#f97316" : "#22d3ee"}
              strokeWidth="1.5"
            />
            <text
              x={centerX}
              y={positions[i] + (node.sub ? 22 : boxHeight / 2 + 5)}
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="600"
              fill={node.safety ? "#fdba74" : "#e2e8f0"}
            >
              {node.label}
            </text>
            {node.sub && (
              <text
                x={centerX}
                y={positions[i] + 38}
                textAnchor="middle"
                fontSize="10.5"
                fill="#94a3b8"
              >
                {node.sub}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

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
        "about",
        "principles",
        "case-study",
        "architecture",
        "experience",
        "skills",
        "projects",
        "education",
        "training",
        "leadership",
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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "case-study", label: "Case Study" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  const metrics = [
    { value: "3.9GB", label: "Enterprise Database" },
    { value: "378", label: "Database Tables" },
    { value: "464", label: "Database Views" },
    { value: "100%", label: "Top-3 Retrieval Accuracy" },
    { value: "390+", label: "Automated Tests" },
  ];

  const principles = [
    {
      title: "Production over Demos",
      description: "I focus on reliability, evaluation, validation, and deployment rather than proof-of-concept implementations.",
      icon: Server,
    },
    {
      title: "Retrieval is a System Problem",
      description: "Effective RAG systems depend on retrieval quality, context selection, ranking, and evaluation.",
      icon: Layers,
    },
    {
      title: "Safety by Design",
      description: "AI systems interacting with enterprise data require constrained execution, validation layers, and clear boundaries.",
      icon: Shield,
    },
    {
      title: "End-to-End Ownership",
      description: "I work across models, APIs, databases, testing, monitoring, and deployment.",
      icon: Network,
    },
  ];

  const skills = [
    {
      category: "AI & LLM Engineering",
      items: ["LLM Applications", "RAG", "Agentic AI", "AI Agents", "LLM Orchestration", "Prompt Engineering", "Text-to-SQL", "Semantic Search", "Hybrid Search", "Vector Search", "Embeddings", "BM25"],
      description: "Building production LLM systems — retrieval, orchestration, and agentic reasoning",
    },
    {
      category: "Machine Learning & NLP",
      items: ["Machine Learning", "Deep Learning", "NLP", "Transformers", "BERT", "PyTorch", "TensorFlow", "Scikit-learn"],
      description: "Classical ML and deep learning foundations underpinning applied AI work",
    },
    {
      category: "Backend & AI Systems",
      items: ["Python", "FastAPI", "SQLAlchemy", "REST APIs", "Async Python", "Streaming", "Multi-Tenant Architecture"],
      description: "Designing and shipping production-grade backend services for AI applications",
    },
    {
      category: "Databases",
      items: ["SQL Server", "PostgreSQL", "SQLite", "Firebase", "Firestore"],
      description: "Working across relational and document databases in production systems",
    },
    {
      category: "Infrastructure & Tools",
      items: ["Docker", "Git", "GitHub", "Jupyter", "Ollama", "Automated Testing", "Monitoring"],
      description: "Deployment, version control, testing, and local/hosted model inference",
    },
  ];

  const projects = [
    {
      title: "Eliara — Enterprise AI Analytics Platform",
      description: "Multi-tenant AI analytics platform enabling natural-language interaction with a 3.9GB enterprise database. Full case study above.",
      technologies: ["RAG", "Agentic AI", "Text-to-SQL", "LLM Orchestration", "Hybrid Search"],
      type: "Flagship Project — Featured Case Study",
      category: "featured",
      caseStudyLink: true,
    },
    {
      title: "Pathora — AI-Powered Career Assessment Platform",
      description: "Led a 5-person team building an LLM-integrated platform for CV/JD-based job-title prediction, personalized exam generation, and course recommendations. Implemented a dual-provider LLM architecture — Ollama for local inference, Hugging Face Inference API as a switchable alternative — tuned for constrained hardware (4GB VRAM), plus an LLM call tracing system for cross-stack debugging of JSON malformation, scoring logic, and pipeline issues.",
      technologies: ["LLM Applications", "LLM Orchestration", "FastAPI", "Async SQLAlchemy 2.0", "React 19", "Ollama", "Hugging Face Inference API"],
      type: "Graduation Project — Team Lead",
      category: "featured",
      showGithub: false,
    },
    {
      title: "Sola POS — Commercial Desktop POS System",
      description: "Production-ready desktop Point of Sale application for restaurants and cafés. Electron + React + TypeScript frontend and FastAPI + PostgreSQL backend, structured as a Clean Architecture monorepo with role-based access and reporting. Covers the full order lifecycle, multi-method payments, and cash-shift management, with a self-contained deployment (bundled PostgreSQL, PyInstaller-packaged backend) requiring no setup on the end user's machine.",
      technologies: ["Electron", "React", "TypeScript", "FastAPI", "PostgreSQL", "Clean Architecture"],
      type: "Freelance Project",
      category: "engineering",
      showGithub: false,
    },
    {
      title: "Production OS — Manufacturing Production Management System",
      description: "Production management and BOM-tracking system for a manufacturing client, backed by Firebase Auth and Firestore. Implements a 12-sheet data model with relationships joined on ERP codes, role-based controls for BOM lock/unlock, and a full audit trail.",
      technologies: ["Firebase", "Firestore", "Role-Based Access Control", "Data Modeling"],
      type: "Freelance Project",
      category: "engineering",
      showGithub: false,
    },
    {
      title: "Multilingual Sentiment Analysis",
      description: "NLP pipeline over TripAdvisor and Quora Egypt datasets, handling both Arabic and English text. Implemented preprocessing and back-translation data augmentation, then benchmarked Logistic Regression, SVM, LSTM, and BERT models with an interactive visualization layer.",
      technologies: ["Python", "NLP", "BERT", "LSTM", "Streamlit", "Plotly"],
      type: "Graduation Project",
      category: "ml",
      github: "https://github.com/Mosapmohamd/Sentiment-Analysis-for-TripAdvisor-and-Quora-Egypt",
    },
    {
      title: "Customer Churn Prediction Dashboard",
      description: "Interactive Streamlit dashboard built around a Random Forest model for predicting customer churn, with real-time visualization and an automated risk-scoring view for business decision-making.",
      technologies: ["Python", "Random Forest", "Streamlit", "Data Visualization"],
      type: "Machine Learning Project",
      category: "ml",
      impact: "91% model accuracy predicting churn risk",
      github: "https://github.com/Mosapmohamd/customer-churn-prediction",
    },
  ];

  const experiences = [
    {
      title: "AI Engineer",
      company: "Core Business Solutions",
      period: "November 2025 – September 2026",
      description: "Architected and built production AI systems for enterprise business analytics, focusing on LLM orchestration, Text-to-SQL, semantic retrieval, and agentic workflows.",
      achievements: [
        "Built a multi-tenant AI analytics platform over a 3.9GB enterprise database (378 tables, 464 views)",
        "Designed a two-model architecture separating LLM orchestration from constrained SQL generation",
        "Implemented layered validation — AST-based SQL validation and read-only execution safeguards",
        "Built hybrid BM25 + vector retrieval achieving 100% top-3 accuracy on a 90-question benchmark",
        "Added agentic reasoning workflows for open-ended investigative queries",
        "Deployed with Docker, automated backups, health monitoring, structured audit logging, and a 390+ automated test suite",
      ],
      featured: true,
    },
    {
      title: "Python Instructor",
      company: "TM Academy",
      period: "November 2024 – Present",
      achievements: [
        "Taught Python fundamentals — variables, loops, conditionals, functions, and file handling — to bootcamp students, developing hands-on coding exercises and assessments",
      ],
      featured: false,
    },
  ];

  const training = [
    {
      title: "Generative AI",
      issuer: "Digital Egypt Pioneers Initiative (DEPI)",
      period: "November 2025 – June 2026",
    },
    {
      title: "Data Science",
      issuer: "Digital Egypt Pioneers Initiative (DEPI)",
      period: "October 2024 – May 2025",
    },
    {
      title: "Machine Learning",
      issuer: "National Telecommunication Institute (NTI)",
    },
    {
      title: "AI for Business",
      issuer: "National Telecommunication Institute (NTI)",
    },
  ];

  const leadership = [
    {
      title: "AI & Machine Learning Instructor",
      organization: "RTC",
      period: "July 2024 – Present",
      description: "Mentored students in ML techniques using Python and relevant libraries, fostering a collaborative learning environment through regular Q&A sessions and constructive feedback.",
    },
    {
      title: "OC Team Leader",
      organization: "RTC",
      period: "March 2024 – Present",
      description: "Led team monitoring and progress tracking, developing team-leadership and coordination experience alongside technical work.",
    },
  ];

  const education = {
    degree: "B.Sc. in Artificial Intelligence",
    university: "Helwan International Technological University",
    graduationYear: "2026",
    grade: "Excellent",
    project: "Pathora — AI-Powered Career Assessment Platform",
    role: "Team Lead",
  };

  const certifications = [
    // Most Important Certifications
    { name: "Digital Egypt Pioneers Program - Data Scientist", issuer: "DEPI", year: "2025", id: "DEPI Certificate", date: "November to May 2025", duration: "6 Months", priority: 1 },
    { name: "Machine Learning Course", issuer: "MLANG", year: "2024", id: "LLbRxQea11", date: "September 23, 2024", duration: "10 Hours", priority: 1 },
    { name: "Applied Deep Learning", issuer: "MLANG", year: "2025", id: "JACOy6OHbP", date: "June 19, 2025", duration: "2 Hours 50 Minutes", priority: 1 },
    { name: "Python Programmer Bootcamp", issuer: "365 Data Science", year: "2024", id: "CC-E08D606468", date: "10/11/2024", priority: 1 },
    { name: "Database Fundamentals", issuer: "Mahara Tech", year: "2024", id: "wpsFZYag4i", date: "18/09/24", duration: "2 Hour, 47 Minutes", priority: 1 },
    { name: "Data Scientist Career Track", issuer: "365 Data Science", year: "2024", id: "DD-5322621219", date: "20/11/2024", priority: 1 },

    // Other 365 Data Science Certifications
    { name: "Deep Learning with TensorFlow 2", issuer: "365 Data Science", year: "2024", id: "CC-7CA970BCF3", date: "16/11/2024", priority: 2 },
    { name: "The Machine Learning Process A-Z", issuer: "365 Data Science", year: "2024", id: "CC-1C4E864E7B", date: "05/11/2024", priority: 2 },
    { name: "SQL", issuer: "365 Data Science", year: "2024", id: "CC-955270FF20", date: "13/11/2024", priority: 2 },
    { name: "Statistics", issuer: "365 Data Science", year: "2024", id: "CC-E3933B1C3C", date: "11/11/2024", priority: 2 },
    { name: "Introduction to Data and Data Science", issuer: "365 Data Science", year: "2024", id: "CC-9E73C587DA", date: "10/11/2024", priority: 2 },
    { name: "Introduction to Python", issuer: "365 Data Science", year: "2024", id: "CC-991B002BB4", date: "05/11/2024", priority: 2 },
    { name: "Probability", issuer: "365 Data Science", year: "2024", id: "CC-F21B31A09E", date: "13/11/2024", priority: 2 },
    { name: "Mathematics", issuer: "365 Data Science", year: "2024", id: "CC-0D967FD405", date: "16/11/2024", priority: 2 },

    // DataCamp Certifications
    { name: "Data Manipulation with pandas", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 09, 2025", duration: "4 HRS", priority: 3 },
    { name: "Intermediate Python", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 07, 2025", duration: "4 HRS", priority: 3 },
    { name: "Joining Data with pandas", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 16, 2025", duration: "4 HRS", priority: 3 },
    { name: "Supervised Learning with scikit-learn", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 14, 2025", duration: "4 HRS", priority: 3 },
  ];

  const topCertifications = certifications.filter((cert) => cert.priority === 1);

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
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={() => scrollToSection("contact")}>
                Hire Me
              </Button>
              <Button size="sm" onClick={() => scrollToSection("projects")}>
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
                <Button size="sm" className="flex-1" onClick={() => scrollToSection("projects")}>
                  View Work
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
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
              <p className="text-lg md:text-xl mb-8 max-w-2xl text-muted-foreground leading-relaxed">
                I build AI systems that go beyond demos and prototypes — combining LLM orchestration,
                Text-to-SQL, hybrid semantic retrieval, and agentic workflows with real backend
                engineering: validation, testing, monitoring, and deployment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection("projects")} className="px-8 gradient-bg hover:opacity-90 transition-opacity text-white">
                  Explore My Work
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("case-study")} className="px-8">
                  View Featured Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Engineering at Scale */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-10">
            Engineering at Scale
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>
            </div>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  How I Think About Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm an AI Engineer focused on building AI systems beyond prototypes. My work centers around
                  LLM-powered applications, retrieval systems, agentic workflows, and AI backends that interact
                  with real business data.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I enjoy solving the engineering challenges behind production AI systems — retrieval quality,
                  constrained Text-to-SQL generation, multi-tenant architectures, validation layers,
                  observability, testing, and deployment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My background across machine learning, NLP, and backend engineering helps me approach AI
                  products as complete systems rather than isolated models.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      <section id="principles" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Principles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                How I approach building AI systems
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle) => (
                <Card key={principle.title} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <principle.icon className="h-5 w-5 text-primary" />
                      </div>
                      {principle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study — Eliara */}
      <section id="case-study" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 gradient-bg text-white border-0">FLAGSHIP PROJECT — FEATURED CASE STUDY</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Eliara</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Enterprise AI Analytics Platform</p>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
                A production multi-tenant AI analytics platform that enables natural-language interaction with
                complex enterprise business data using LLM orchestration, constrained Text-to-SQL, hybrid
                semantic retrieval, and agentic reasoning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Enterprise teams need to ask questions of their business data in plain language, without
                    writing SQL or understanding a sprawling underlying schema.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Natural-language interaction over hundreds of tables and views is hard: the right schema
                    context has to be found before a query can even be written, and any generated SQL touching
                    real business data has to be safe, correct, and auditable by default.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Eliara separates orchestration from SQL generation, retrieves schema context with a hybrid
                  search engine, and validates every generated query before it can touch the database. Key
                  components:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Multi-company architecture",
                    "Data isolation",
                    "Two-model LLM architecture",
                    "Orchestration model",
                    "Constrained SQL generation model",
                    "Triple read-only safeguards",
                    "AST-based SQL validation",
                    "Hybrid BM25 + vector retrieval",
                    "Semantic schema discovery",
                    "Agentic investigation workflows",
                    "Real-time streaming",
                  ].map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Key Engineering Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    { q: "Why two separate models?", a: "Keeps open-ended reasoning from ever having direct, unconstrained access to write SQL against production data." },
                    { q: "Why constrained SQL generation?", a: "The SQL-generating model only ever produces SELECT-only queries, with no access to conversation context or secrets." },
                    { q: "Why hybrid retrieval?", a: "Combining BM25 keyword search with vector embeddings makes schema discovery work for both exact-term and semantically-phrased questions." },
                    { q: "Why AST validation?", a: "Every generated query is parsed and validated against an AST-based validator before execution, rejecting anything outside the allowed read-only surface." },
                    { q: "Why multi-tenant isolation?", a: "The platform serves multiple companies from one codebase, with isolated data, caches, and configuration per tenant." },
                  ].map((item) => (
                    <li key={item.q} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">{item.q}</span>{" "}
                        <span className="text-muted-foreground">{item.a}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Evaluation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Top-3 retrieval accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">90</div>
                    <div className="text-sm text-muted-foreground">Question benchmark</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Production Readiness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Automated Backups", "Health Monitoring", "Structured Audit Logging", "390+ Automated Tests"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Outcome</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Eliara operates as a production analytics layer over a live enterprise database, with every
                  generated query constrained, validated, and logged before it touches business data.
                </p>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" onClick={() => scrollToSection("architecture")}>
                View Architecture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Eliara Architecture Diagram */}
      <section id="architecture" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Eliara Architecture</h2>
            <p className="text-muted-foreground">
              From natural-language question to validated, read-only SQL execution
            </p>
          </div>
          <EliaraArchitecture />
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <Card
                  key={exp.title + exp.company}
                  className={exp.featured ? "border-l-4 border-l-primary shadow-md" : "border-l-4 border-l-muted"}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className={exp.featured ? "text-xl" : "text-lg"}>{exp.title}</CardTitle>
                        <CardDescription className="text-base font-medium">{exp.company}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {exp.description && <p className="text-muted-foreground mb-4">{exp.description}</p>}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
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
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Engineering categories, not proficiency scores
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup) => (
                <Card key={skillGroup.category} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Cpu className="h-4 w-4 text-primary" />
                      </div>
                      {skillGroup.category}
                    </CardTitle>
                    <CardDescription className="text-sm">{skillGroup.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
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

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Organized by the kind of engineering evidence each one demonstrates
              </p>
            </div>

            {[
              { key: "featured", title: "Featured AI Systems" },
              { key: "engineering", title: "Engineering Projects" },
              { key: "ml", title: "AI / Machine Learning Projects" },
            ].map((group) => (
              <div key={group.key} className="mb-16 last:mb-0">
                <h3 className="text-xl font-semibold mb-6">{group.title}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {projects
                    .filter((p) => p.category === group.key)
                    .map((project) => (
                      <Card key={project.title} className="h-full hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                          <Badge variant="outline" className="mb-2 w-fit">
                            {project.type}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="mb-4 text-base">{project.description}</CardDescription>
                          {project.impact && (
                            <div className="mb-4 p-3 bg-muted rounded-lg">
                              <div className="text-sm font-medium text-primary mb-1">Key Result:</div>
                              <div className="text-sm text-muted-foreground">{project.impact}</div>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          {project.caseStudyLink ? (
                            <Button size="sm" className="w-full" onClick={() => scrollToSection("case-study")}>
                              Read Full Case Study
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          ) : project.showGithub !== false ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(project.github, "_blank")}
                              className="w-full"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              View on GitHub
                            </Button>
                          ) : (
                            <p className="text-xs text-muted-foreground italic text-center">
                              Code private — case study available on request
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            </div>
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  {education.degree}
                </CardTitle>
                <CardDescription className="text-base">{education.university}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">Graduated {education.graduationYear}</Badge>
                  <Badge variant="secondary">Grade: {education.grade}</Badge>
                </div>
                <Separator className="mb-6" />
                <div>
                  <div className="text-sm font-medium mb-1">Graduation Project</div>
                  <div className="text-muted-foreground mb-1">{education.project}</div>
                  <Badge variant="outline">Role: {education.role}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Training */}
      <section id="training" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Training</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {training.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription>{item.issuer}</CardDescription>
                    {item.period && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </div>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Community */}
      <section id="leadership" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                <Users className="h-6 w-6" />
                Leadership &amp; Community
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {leadership.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription className="text-sm font-medium">{item.organization}</CardDescription>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.period}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Certifications */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Certifications</h2>
              <p className="text-lg text-muted-foreground">
                Most relevant to AI engineering — full list available on request
              </p>
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
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllCertifications(!showAllCertifications)}
                className="px-8"
              >
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
              <div id="all-certifications" className="mt-16">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
              <p className="text-lg text-muted-foreground">
                I'm always interested in new opportunities and collaborations
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
                  <a
                    href="mailto:abdelghanymosap@gmail.com"
                    className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border"
                  >
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">abdelghanymosap@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="tel:+201013089663"
                    className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border"
                  >
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
                  <a
                    href="https://github.com/Mosapmohamd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border"
                  >
                    <Github className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-muted-foreground">github.com/Mosapmohamd</p>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/mosap-abdel-ghany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-background rounded-lg hover:bg-muted transition-colors border"
                  >
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
            <div>
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Mosap Abdel-Ghany. All rights reserved.
              </p>
            </div>
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
