"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// ---------------------------------------------------------------------------
// Eliara architecture diagram — used inside the Case Study overlay
// ---------------------------------------------------------------------------

const ARCHITECTURE_NODES: { id: string; label: string; sub?: string; safety?: boolean; explanation?: string }[] = [
  { id: "query", label: "User Query" },
  {
    id: "orchestration",
    label: "LLM Orchestration Layer",
    explanation: "Handles user-facing reasoning and decides what the system needs to do next — but never writes SQL directly.",
  },
  { id: "intent", label: "Intent & Task Analysis" },
  {
    id: "retrieval",
    label: "Hybrid Retrieval",
    sub: "BM25 + Vector Search",
    explanation: "Combines BM25 keyword retrieval with vector similarity search to identify relevant schema context.",
  },
  { id: "context", label: "Relevant Schema Context" },
  {
    id: "sqlgen",
    label: "Constrained SQL Generation",
    explanation: "A separate model that only ever produces SELECT-only SQLite queries, with no access to conversation context or secrets.",
  },
  {
    id: "ast",
    label: "AST Validation",
    safety: true,
    explanation: "Every generated query is parsed and validated against an AST-based validator before execution.",
  },
  {
    id: "readonly",
    label: "Read-Only Execution Layer",
    safety: true,
    explanation: "Enforces read-only execution as a hard boundary — generated SQL can never write, delete, or alter data.",
  },
  { id: "db", label: "Enterprise SQL Database" },
  { id: "result", label: "Result Processing" },
  { id: "response", label: "Final LLM Response" },
];

function EliaraArchitecture() {
  const [selected, setSelected] = useState<string | null>(null);
  const nodes = ARCHITECTURE_NODES;

  const boxHeight = 50;
  const gap = 22;
  const boxWidth = 320;
  const centerX = 200;
  const startY = 20;
  const positions = nodes.map((_, i) => startY + i * (boxHeight + gap));
  const viewHeight = positions[positions.length - 1] + boxHeight + 20;
  const selectedNode = nodes.find((n) => n.id === selected);

  return (
    <div>
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
            <g
              key={node.id}
              onClick={() => node.explanation && setSelected(node.id === selected ? null : node.id)}
              style={{ cursor: node.explanation ? "pointer" : "default" }}
            >
              <rect
                x={centerX - boxWidth / 2}
                y={positions[i]}
                width={boxWidth}
                height={boxHeight}
                rx="8"
                fill={node.safety ? "#1c1410" : "#0f172a"}
                stroke={selected === node.id ? "#facc15" : node.safety ? "#f97316" : "#22d3ee"}
                strokeWidth={selected === node.id ? "2.5" : "1.5"}
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
                <text x={centerX} y={positions[i] + 38} textAnchor="middle" fontSize="10.5" fill="#94a3b8">
                  {node.sub}
                </text>
              )}
              {node.explanation && (
                <text
                  x={centerX + boxWidth / 2 - 14}
                  y={positions[i] + boxHeight / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#22d3ee"
                >
                  i
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 min-h-[60px] rounded-lg border border-white/10 bg-slate-950 p-4 text-sm text-slate-300">
        {selectedNode ? (
          <>
            <span className="font-semibold text-cyan-400">{selectedNode.label}: </span>
            {selectedNode.explanation}
          </>
        ) : (
          <span className="text-slate-500">Click a node with an "i" marker for a short explanation.</span>
        )}
      </div>
    </div>
  );
}

function SafetyFlow() {
  const steps = ["LLM Output", "SQL Parsing", "AST Validation", "Read-Only Enforcement", "Database Execution"];
  return (
    <div className="rounded-xl border border-orange-500/30 bg-slate-950 p-6 flex flex-col items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <div className="px-4 py-2 rounded-lg border border-orange-500/60 bg-orange-500/10 text-orange-300 text-sm font-medium text-center">
            {step}
          </div>
          {i < steps.length - 1 && <div className="h-5 w-px bg-orange-500/50" />}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Eliara full-screen interactive Case Study overlay
// ---------------------------------------------------------------------------

const CASE_STUDY_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "architecture", label: "Architecture" },
  { id: "retrieval", label: "Retrieval" },
  { id: "safety", label: "Safety" },
  { id: "agentic", label: "Agentic Workflows" },
  { id: "evaluation", label: "Evaluation" },
  { id: "production", label: "Production" },
];

function EliaraCaseStudy({
  open,
  activeSection,
  onClose,
  onNavigate,
}: {
  open: boolean;
  activeSection: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollPosition = container.scrollTop + 140;
      for (const section of CASE_STUDY_SECTIONS) {
        const el = document.getElementById(`cs-${section.id}`);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            onNavigate(section.id);
            break;
          }
        }
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [open]);

  const scrollToCaseSection = (id: string) => {
    const el = document.getElementById(`cs-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in duration-200"
    >
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-start justify-between gap-4">
          <div>
            <Badge className="mb-2 gradient-bg text-white border-0">Production LLM System</Badge>
            <h2 id="case-study-title" className="text-2xl md:text-4xl font-bold">
              Eliara
            </h2>
            <p className="text-muted-foreground">Enterprise AI Analytics Platform</p>
          </div>
          <Button ref={closeButtonRef} variant="ghost" size="icon" aria-label="Close case study" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        {/* Sticky internal nav */}
        <div className="border-t overflow-x-auto">
          <div className="container mx-auto px-4 flex gap-1 py-2 min-w-max md:min-w-0">
            {CASE_STUDY_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToCaseSection(section.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 max-w-4xl py-10 space-y-16">
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { value: "3.9GB", label: "Enterprise Database" },
              { value: "378", label: "Tables" },
              { value: "464", label: "Views" },
              { value: "100%", label: "Top-3 Retrieval Accuracy" },
              { value: "390+", label: "Automated Tests" },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-2xl md:text-3xl font-bold text-primary">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          <section id="cs-overview">
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              Eliara is a multi-tenant enterprise AI analytics platform that lets business users ask questions
              about complex relational data in plain language. It serves multiple companies from one codebase,
              with isolated data and configuration per tenant, and is built to operate under real production
              constraints rather than as a demo.
            </p>
          </section>

          <section id="cs-challenge">
            <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Natural-language interaction over an enterprise schema this large is hard for reasons that have
              nothing to do with an LLM's fluency:
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {[
                "Hundreds of tables",
                "Hundreds of database views",
                "Large enterprise schema",
                "Schema hallucination risk",
                "Incorrect joins",
                "Irrelevant retrieved context",
                "Unsafe SQL generation",
                "Multi-company data isolation",
                "Open-ended business questions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="cs-architecture">
            <h3 className="text-2xl font-bold mb-4">System Architecture</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Eliara separates orchestration from SQL generation, retrieves schema context with a hybrid search
              engine, and validates every generated query before it can touch the database.
            </p>
            <EliaraArchitecture />
          </section>

          <section id="cs-retrieval">
            <h3 className="text-2xl font-bold mb-4">Hybrid Retrieval</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Schema discovery combines BM25 keyword retrieval with vector-based semantic similarity search, then
              merges both into a single ranked list of candidate tables and views. Retrieval quality is the
              foundation the rest of the system depends on — if the wrong schema context reaches the SQL-generation
              model, no amount of validation downstream can recover a meaningful answer.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["BM25", "Vector Search", "Semantic Similarity", "Hybrid Ranking", "Schema Retrieval", "Context Selection"].map(
                (tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                )
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Top-3 Retrieval Accuracy</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary">90</div>
                  <div className="text-sm text-muted-foreground">Evaluation Questions</div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="cs-safety">
            <h3 className="text-2xl font-bold mb-4">Safety &amp; Validation</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Because this system can generate SQL against real business data, safety is treated as a critical
              system boundary rather than an afterthought — a layered pipeline, not a single check.
            </p>
            <SafetyFlow />
            <ul className="grid sm:grid-cols-2 gap-2 mt-6">
              {[
                "Separate orchestration model",
                "Separate SQL generation model",
                "Constrained SQL generation",
                "AST validation",
                "Read-only controls",
                "Layered safeguards",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="cs-agentic">
            <h3 className="text-2xl font-bold mb-4">Agentic Workflows</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For open-ended, investigative questions that don't map to a single query, Eliara runs a bounded
              multi-step reasoning loop — issuing queries, evaluating results, and deciding whether another step
              is needed — rather than requiring the user to phrase a single perfect question.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Multi-step investigation", "Iterative reasoning", "Tool execution", "Structured business alerts", "Streaming responses"].map(
                (tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                )
              )}
            </div>
          </section>

          <section id="cs-evaluation">
            <h3 className="text-2xl font-bold mb-4">Evaluation</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The retrieval system was evaluated using a 90-question benchmark designed to test whether relevant
              schema context appeared within the top three retrieved results.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Top-3 Retrieval Accuracy</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary">90</div>
                  <div className="text-sm text-muted-foreground">Question Benchmark</div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section id="cs-production" className="pb-4">
            <h3 className="text-2xl font-bold mb-4">Production Readiness</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This is what makes Eliara a production AI system rather than a proof of concept:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Docker", sub: "Containerized deployment" },
                { label: "Automated Backups", sub: "" },
                { label: "Health Monitoring", sub: "" },
                { label: "Structured Audit Logging", sub: "" },
                { label: "390+", sub: "Automated Tests" },
                { label: "Real-Time Streaming", sub: "" },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="pt-6 text-center">
                    <div className="font-bold text-primary">{item.label}</div>
                    {item.sub && <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [caseStudySection, setCaseStudySection] = useState("overview");
  const caseStudyTriggerRef = useRef<HTMLElement | null>(null);

  const openCaseStudy = useCallback((section: string = "overview", trigger?: HTMLElement | null) => {
    caseStudyTriggerRef.current = trigger ?? null;
    setCaseStudySection(section);
    setIsCaseStudyOpen(true);
    window.history.pushState({ caseStudy: true }, "", `#case-study-${section}`);
  }, []);

  const closeCaseStudy = useCallback(() => {
    setIsCaseStudyOpen(false);
    if (window.location.hash.startsWith("#case-study")) {
      window.history.pushState(null, "", window.location.pathname + window.location.search);
    }
    caseStudyTriggerRef.current?.focus();
  }, []);

  // Lock body scroll while the case study overlay is open
  useEffect(() => {
    document.body.style.overflow = isCaseStudyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCaseStudyOpen]);

  // Deep-link support: open on load if the URL already points at the case study,
  // and respond to back/forward navigation while it's open.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#case-study")) {
      const section = hash.replace("#case-study-", "").replace("#case-study", "") || "overview";
      setCaseStudySection(section || "overview");
      setIsCaseStudyOpen(true);
    }
    const handlePopState = () => {
      const currentHash = window.location.hash;
      if (!currentHash.startsWith("#case-study")) {
        setIsCaseStudyOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "hero",
        "snapshot",
        "about",
        "principles",
        "impact",
        "projects",
        "skills",
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
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Capabilities" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  const principles = [
    {
      title: "Production over Demos",
      description: "I focus on reliability, evaluation, validation, and deployment rather than proof-of-concept implementations.",
      icon: Server,
    },
    {
      title: "Retrieval is a System Problem",
      description: "Effective RAG depends on retrieval quality, ranking, context selection, and evaluation.",
      icon: Layers,
    },
    {
      title: "Safety by Design",
      description: "AI systems interacting with enterprise data require constrained execution and validation layers.",
      icon: Shield,
    },
    {
      title: "End-to-End Ownership",
      description: "I work across models, APIs, databases, testing, monitoring, and deployment.",
      icon: Network,
    },
  ];

  const impactCards = [
    {
      key: "engineer",
      label: "BUILD",
      title: "AI Engineer",
      description: "I design and build AI systems across LLM orchestration, RAG, Text-to-SQL, agentic workflows, backend architecture, validation, testing, monitoring, and deployment.",
      areas: ["LLM Systems", "RAG", "Agentic AI", "Text-to-SQL", "AI Architecture"],
      icon: Cpu,
      dominant: true,
    },
    {
      key: "instructor",
      label: "TEACH",
      title: "Technical Instructor",
      description: "I teach Python, AI, and machine learning through practical learning experiences focused on understanding how systems work and applying concepts through projects.",
      areas: ["Python Instruction", "AI & ML Education", "Technical Mentorship", "Curriculum Delivery", "Project-Based Learning"],
      tagline: "Breaking complex technical concepts into practical, understandable learning experiences.",
      icon: BookOpen,
      dominant: false,
    },
    {
      key: "consultant",
      label: "ADVISE",
      title: "AI Consultant",
      description: "I help individuals, teams, and organizations explore AI opportunities, evaluate technical approaches, and translate ideas into practical AI system designs.",
      areas: ["AI Solution Architecture", "LLM Application Strategy", "RAG System Design", "AI Project Scoping", "Technology Selection", "Technical Feasibility Assessment"],
      icon: Lightbulb,
      dominant: false,
      cta: true,
    },
  ];

  const skills = [
    {
      category: "AI & LLM Engineering",
      items: ["LLM Applications", "RAG", "Agentic AI", "LLM Orchestration", "Text-to-SQL", "Semantic Search", "Hybrid Retrieval", "Vector Search", "Embeddings", "BM25"],
      description: "Building production LLM systems — retrieval, orchestration, and agentic reasoning",
    },
    {
      category: "Machine Learning & NLP",
      items: ["Machine Learning", "Deep Learning", "NLP", "Transformers", "BERT", "PyTorch", "TensorFlow", "Scikit-learn"],
      description: "Classical ML and deep learning foundations underpinning applied AI work",
    },
    {
      category: "Backend & Systems",
      items: ["Python", "FastAPI", "SQLAlchemy", "REST APIs", "Async Programming", "Streaming", "Multi-Tenant Architecture"],
      description: "Designing and shipping production-grade backend services for AI applications",
    },
    {
      category: "Databases",
      items: ["SQL Server", "PostgreSQL", "SQLite", "Firebase", "Firestore"],
      description: "Working across relational and document databases in production systems",
    },
    {
      category: "Infrastructure",
      items: ["Docker", "Git", "Automated Testing", "Monitoring", "Logging"],
      description: "Deployment, version control, testing, and observability",
    },
  ];

  const projects = [
    {
      title: "Sola POS — Commercial Desktop POS System",
      description: "Production-ready desktop Point of Sale application for restaurants and cafés. Electron + React + TypeScript frontend and FastAPI + PostgreSQL backend, structured as a Clean Architecture monorepo with role-based access and reporting. Covers the full order lifecycle, multi-method payments, and cash-shift management, with a self-contained deployment requiring no setup on the end user's machine.",
      technologies: ["Electron", "React", "TypeScript", "FastAPI", "PostgreSQL", "Clean Architecture"],
      type: "Freelance Project",
      category: "engineering",
      github: "https://github.com/Mosapmohamd/Sola",
    },
    {
      title: "Multilingual Sentiment Analysis",
      description: "NLP pipeline over TripAdvisor and Quora Egypt datasets, handling both Arabic and English text. Implemented preprocessing and back-translation data augmentation, then benchmarked Logistic Regression, SVM, LSTM, and BERT models with an interactive visualization layer.",
      technologies: ["Arabic NLP", "English NLP", "Logistic Regression", "SVM", "LSTM", "BERT"],
      type: "Applied NLP Project",
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

  const training = [
    { title: "Generative AI", issuer: "DEPI" },
    { title: "Data Science", issuer: "DEPI" },
    { title: "Machine Learning", issuer: "NTI" },
    { title: "AI for Business", issuer: "NTI" },
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
              <p className="text-lg md:text-xl mb-4 max-w-2xl text-muted-foreground leading-relaxed">
                I build production AI systems that combine LLM orchestration, semantic retrieval, Text-to-SQL,
                agentic workflows, backend engineering, validation, testing, and deployment.
              </p>
              <p className="text-base mb-8 max-w-2xl text-muted-foreground/80">
                I also teach technical concepts and help teams turn AI ideas into practical system decisions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection("projects")} className="px-8 gradient-bg hover:opacity-90 transition-opacity text-white">
                  Explore My Work
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={(e) => openCaseStudy("overview", e.currentTarget)}
                  className="px-8"
                >
                  View Eliara Case Study
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

      {/* Professional Snapshot */}
      <section id="snapshot" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Snapshot</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left: Experience */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Professional Experience
                </h3>
                <Card className="border-l-4 border-l-primary shadow-md mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Engineer</CardTitle>
                    <CardDescription className="text-base font-medium">Core Business Solutions</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      November 2025 – September 2026
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Architected and built production AI systems for enterprise business analytics, focusing on
                      LLM orchestration, constrained Text-to-SQL, semantic retrieval, and agentic workflows.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Built a multi-tenant AI analytics platform over a 3.9GB enterprise database (378 tables, 464 views)",
                        "Designed a two-model architecture separating LLM orchestration from constrained SQL generation",
                        "Implemented layered safety using read-only restrictions and AST-based SQL validation",
                        "Developed hybrid BM25 + vector retrieval achieving 100% top-3 accuracy on a 90-question benchmark",
                        "Productionized with Docker, monitoring, audit logging, automated backups, and 390+ automated tests",
                      ].map((achievement) => (
                        <li key={achievement} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-muted">
                  <CardHeader>
                    <CardTitle className="text-base">Python Instructor</CardTitle>
                    <CardDescription>TM Academy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Teaching Python fundamentals and translating technical concepts into clear explanations,
                      mentoring learners through practical programming projects.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Education */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
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
                    <div className="text-sm text-muted-foreground mb-2">
                      Pathora — AI-Powered Career Assessment Platform
                    </div>
                    <Badge variant="outline">Role: Team Lead</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Build</h2>
            </div>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm an AI Engineer focused on building AI systems beyond demos and prototypes. My work centers
                  around LLM-powered applications, retrieval systems, agentic workflows, and AI backends that
                  interact with real business data.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I focus on the engineering challenges behind production AI systems, including retrieval quality,
                  constrained Text-to-SQL generation, multi-tenant architecture, validation layers, observability,
                  testing, and deployment.
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

      {/* How I Create Impact */}
      <section id="impact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How I Create Impact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I work across building AI systems, teaching technical concepts, and helping others make practical
                technology decisions.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {impactCards.map((card) => (
                <Card
                  key={card.key}
                  className={card.dominant ? "h-full border-2 border-primary shadow-lg md:scale-105" : "h-full"}
                >
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
                    {card.tagline && (
                      <p className="text-sm italic text-muted-foreground mb-4">"{card.tagline}"</p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {card.areas.map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    {card.cta && (
                      <Button variant="outline" size="sm" className="w-full" onClick={() => scrollToSection("contact")}>
                        Start a Conversation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Systems &amp; Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Selected work spanning production LLM applications, AI platforms, backend systems, and applied
                machine learning.
              </p>
            </div>

            {/* Featured AI Systems */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold mb-6">Featured AI Systems</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Eliara — dominant card */}
                <Card className="h-full border-2 border-primary shadow-lg md:col-span-2 lg:col-span-1">
                  <CardHeader>
                    <Badge className="mb-2 gradient-bg text-white border-0 w-fit">Flagship Project</Badge>
                    <CardTitle className="text-2xl mb-1">Eliara</CardTitle>
                    <CardDescription className="text-base">Enterprise AI Analytics Platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      A multi-tenant enterprise AI analytics platform enabling natural-language interaction with
                      complex business data through LLM orchestration, constrained Text-to-SQL, hybrid semantic
                      retrieval, and agentic reasoning.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["RAG", "Agentic AI", "Text-to-SQL", "LLM Orchestration", "Hybrid Retrieval"].map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="w-full" onClick={(e) => openCaseStudy("overview", e.currentTarget)}>
                        Explore Case Study
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => window.open("https://github.com/CarFLex-Team/Eliara-V2", "_blank")}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Pathora */}
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">Graduation Project</Badge>
                      <Badge variant="outline">Team Lead</Badge>
                    </div>
                    <CardTitle className="text-xl mb-1">Pathora</CardTitle>
                    <CardDescription className="text-base">AI-Powered Career Assessment Platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Led a 5-person team building an LLM-integrated AI product for CV/JD analysis, job-title
                      prediction, personalized assessment generation, and course recommendations. Implemented a
                      dual-provider LLM architecture — Ollama for local inference, Hugging Face Inference API as a
                      switchable alternative — tuned for constrained hardware, plus an LLM tracing system for
                      cross-stack debugging.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["LLM Integration", "Dual-Provider Architecture", "Ollama", "Hugging Face Inference API", "LLM Tracing"].map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://github.com/Mosapmohamd/Pathora", "_blank")}
                      className="w-full"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Engineering Projects */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold mb-6">Engineering Projects</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {projects
                  .filter((p) => p.category === "engineering")
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
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        {project.github ? (
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

            {/* AI / ML Projects */}
            <div>
              <h3 className="text-xl font-semibold mb-6">AI &amp; Machine Learning</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {projects
                  .filter((p) => p.category === "ml")
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(project.github, "_blank")}
                          className="w-full"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Capabilities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The technologies behind the systems above
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

      {/* Professional Training */}
      <section id="training" className="py-20 bg-muted/30">
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
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Community */}
      <section id="leadership" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Leadership &amp; Community
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {leadership.map((item) => (
                <Card key={item.title} className="border-muted">
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
      <section id="certifications" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Credentials</h2>
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
      <section id="contact" className="py-20">
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
                  <a
                    href="mailto:abdelghanymosap@gmail.com"
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">abdelghanymosap@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="tel:+201013089663"
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+201013089663</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
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
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
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
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors md:col-span-2"
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

      <EliaraCaseStudy
        open={isCaseStudyOpen}
        activeSection={caseStudySection}
        onClose={closeCaseStudy}
        onNavigate={setCaseStudySection}
      />
    </div>
  );
}
