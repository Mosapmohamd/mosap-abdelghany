"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, CheckCircle2 } from "lucide-react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "constraints", label: "Constraints" },
  { id: "architecture", label: "System Architecture" },
  { id: "decisions", label: "Key Technical Decisions" },
  { id: "safety", label: "Safety & Validation" },
  { id: "evaluation", label: "Evaluation" },
  { id: "testing", label: "Testing" },
  { id: "contribution", label: "My Contribution" },
  { id: "stack", label: "Tech Stack" },
  { id: "lessons", label: "Lessons Learned" },
];

const ARCHITECTURE_NODES: { id: string; label: string; sub?: string; safety?: boolean; explanation?: string }[] = [
  { id: "query", label: "User Query" },
  {
    id: "orchestration",
    label: "LLM Orchestration",
    explanation: "Handles user-facing reasoning and decides what the system needs to do next — but never writes SQL directly.",
  },
  {
    id: "retrieval",
    label: "Hybrid Schema Retrieval",
    sub: "BM25 + Vector Search",
    explanation: "Combines BM25 keyword retrieval with vector similarity search to identify relevant schema context.",
  },
  { id: "context", label: "Relevant Context" },
  {
    id: "sqlgen",
    label: "SQL Generation",
    explanation: "A separate, constrained model that only ever produces SELECT-only SQL, with no access to conversation context or secrets.",
  },
  {
    id: "ast",
    label: "AST Validation",
    safety: true,
    explanation: "Every generated query is parsed and validated against an AST-based validator before execution.",
  },
  {
    id: "readonly",
    label: "Read-Only Execution Controls",
    safety: true,
    explanation: "Enforces read-only execution as a hard boundary at the database connection level — generated SQL can never write, delete, or alter data.",
  },
  { id: "db", label: "Enterprise Database" },
  { id: "result", label: "Result Processing" },
  { id: "response", label: "Streaming Response" },
];

function ArchitectureDiagram() {
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
            <marker id="arrow-cyan-eliara" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
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
              markerEnd="url(#arrow-cyan-eliara)"
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
                <text x={centerX + boxWidth / 2 - 14} y={positions[i] + boxHeight / 2 + 4} textAnchor="middle" fontSize="11" fill="#22d3ee">
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

const DECISIONS = [
  {
    title: "Why Hybrid Retrieval (BM25 + Vector Search)?",
    challenge: "Schema elements and domain-specific identifiers were difficult to retrieve reliably using one retrieval method alone.",
    decision: "Combined lexical retrieval (BM25) with semantic vector search for schema discovery.",
    reasoning: "BM25 improved exact identifier and keyword matching, while vector retrieval improved matching on semantically similar but differently-worded questions.",
    tradeoff: "Increased system complexity, and required evaluating both retrieval strategies together rather than tuning one in isolation.",
  },
  {
    title: "Why Separate Orchestration from SQL Generation?",
    challenge: "A single model handling both open-ended reasoning and SQL generation would need broad, less-constrained access to produce SQL, increasing the risk surface.",
    decision: "Split responsibilities across two models — one orchestrates and reasons, a separate model only generates constrained, SELECT-only SQL.",
    reasoning: "Narrowing the SQL-generation model's role makes its output far easier to validate and constrain than SQL embedded inside a general-purpose reasoning response.",
    tradeoff: "Extra coordination between the two models, and more moving parts to test and keep in sync.",
  },
  {
    title: "Why AST Validation?",
    challenge: "Pattern- or string-based checks on generated SQL are easy to miss edge cases on and can be bypassed.",
    decision: "Parse every generated query into an abstract syntax tree and validate its structure before execution.",
    reasoning: "Structural validation catches disallowed operations — writes, deletes, schema changes — more reliably than text matching against a query string.",
    tradeoff: "Adds a validation layer that has to be maintained alongside the SQL dialect it parses.",
  },
  {
    title: "Why Read-Only Execution Controls?",
    challenge: "Even a validated query could still be dangerous if the execution layer itself allowed write operations.",
    decision: "Enforce read-only execution as a hard boundary at the database connection level, not only in application logic.",
    reasoning: "A boundary enforced at the lowest practical layer is harder to accidentally bypass than one enforced solely in business logic above it.",
    tradeoff: "None functionally — the system's core purpose doesn't require write access, so this constraint doesn't limit what it needs to do.",
  },
  {
    title: "Why Streaming Responses?",
    challenge: "Investigative, multi-step queries can take longer to resolve, and returning nothing until the full answer is ready feels unresponsive.",
    decision: "Stream the response back to the client as it's generated.",
    reasoning: "Improves perceived responsiveness for longer-running, multi-step queries.",
    tradeoff: "Added complexity in the API layer to support streaming alongside the validation pipeline.",
  },
];

export default function EliaraCaseStudyClient() {
  const [activeSection, setActiveSection] = useState("overview");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <Badge className="mb-2 gradient-bg text-white border-0 w-fit">Featured Engineering Case Study</Badge>
          <h1 className="text-3xl md:text-5xl font-bold">Eliara</h1>
          <p className="text-lg text-muted-foreground mt-1">Enterprise AI System for Natural Language Data Access</p>
        </div>
        <div className="border-t overflow-x-auto">
          <div className="container mx-auto px-4 flex gap-1 py-2 min-w-max">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeSection === section.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="container mx-auto px-4 max-w-4xl py-12 space-y-16">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { value: "3.9GB", label: "Enterprise Database" },
            { value: "378", label: "Tables" },
            { value: "464", label: "Views" },
            { value: "100%", label: "Top-3 Retrieval Accuracy" },
            { value: "400+", label: "Automated Tests" },
          ].map((m) => (
            <div key={m.label}>
              <div className="text-2xl md:text-3xl font-bold text-primary">{m.value}</div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>

        <section id="overview">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Eliara is a multi-tenant enterprise AI analytics platform that lets business users ask questions about
            complex relational data in plain language. It serves multiple companies from one deployment, with
            isolated data and configuration per tenant, and is built to operate under real production constraints
            rather than as a demo.
          </p>
        </section>

        <section id="problem">
          <h2 className="text-2xl font-bold mb-4">Problem</h2>
          <p className="text-muted-foreground leading-relaxed">
            Business users need to ask questions about enterprise data in plain language, without writing SQL
            themselves or understanding a large, unfamiliar relational schema.
          </p>
        </section>

        <section id="constraints">
          <h2 className="text-2xl font-bold mb-4">Constraints</h2>
          <ul className="space-y-2">
            {[
              "The schema is too large for a single retrieval pass to reliably surface the right tables (378 tables, 464 views)",
              "Multiple companies are served from one codebase and must remain fully data-isolated from each other",
              "Generated SQL must never write, delete, or alter data — read-only is a hard requirement, not a preference",
              "The system has to meet production reliability expectations — monitoring, backups, audit trail — not just work once as a demo",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="architecture">
          <h2 className="text-2xl font-bold mb-4">System Architecture</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Eliara separates orchestration from SQL generation, retrieves schema context with a hybrid search
            engine, and validates every generated query before it can touch the database.
          </p>
          <ArchitectureDiagram />
        </section>

        <section id="decisions">
          <h2 className="text-2xl font-bold mb-4">Key Technical Decisions</h2>
          <div className="space-y-4">
            {DECISIONS.map((d) => (
              <Card key={d.title}>
                <CardHeader>
                  <CardTitle className="text-base">{d.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Challenge — </span>
                    <span className="text-muted-foreground">{d.challenge}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Decision — </span>
                    <span className="text-muted-foreground">{d.decision}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Reasoning — </span>
                    <span className="text-muted-foreground">{d.reasoning}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Trade-off — </span>
                    <span className="text-muted-foreground">{d.tradeoff}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="safety">
          <h2 className="text-2xl font-bold mb-4">Safety &amp; Validation</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Because this system can generate SQL against real business data, safety is treated as a layered
            pipeline — a critical system boundary, not a single check.
          </p>
          <SafetyFlow />
          <ul className="grid sm:grid-cols-2 gap-2 mt-6">
            {["Separate orchestration model", "Separate SQL generation model", "Constrained SQL generation", "AST validation", "Read-only controls", "Layered safeguards"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                  {item}
                </li>
              )
            )}
          </ul>
        </section>

        <section id="evaluation">
          <h2 className="text-2xl font-bold mb-4">Evaluation</h2>
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

        <section id="testing">
          <h2 className="text-2xl font-bold mb-4">Testing</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The current test suite covers security, tenant isolation, and regression scenarios, alongside the
            production practices that keep the system reliable day to day.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "414+", sub: "Automated tests (current)" },
              { label: "Docker", sub: "Containerized deployment" },
              { label: "Automated Backups", sub: "" },
              { label: "Health Monitoring", sub: "" },
              { label: "Structured Audit Logging", sub: "" },
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

        <section id="contribution">
          <h2 className="text-2xl font-bold mb-4">My Contribution</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I architected and built Eliara end to end as the AI Engineer on this project. Specifically, I was
            responsible for:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {[
              "Overall system architecture",
              "Hybrid retrieval design (BM25 + vector)",
              "LLM orchestration layer",
              "SQL safety layer (AST validation, read-only controls)",
              "Backend development (FastAPI, multi-tenant context management)",
              "Evaluation framework (the 90-question retrieval benchmark)",
              "Testing infrastructure",
              "Deployment (Docker, backups, monitoring, audit logging)",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="stack">
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {["Python", "FastAPI", "SQLite", "Claude (LLM orchestration + SQL generation)", "BM25", "Vector Embeddings", "Docker"].map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        <section id="lessons" className="pb-8">
          <h2 className="text-2xl font-bold mb-4">Lessons Learned</h2>
          <p className="text-muted-foreground leading-relaxed">
            Building a system that generates SQL against real business data made clear how much of the engineering
            effort in an LLM-based system lives outside the model itself — in validation, retrieval quality, and
            isolation boundaries. Evaluating retrieval quality against a fixed benchmark, rather than judging it by
            eye, also made it much easier to compare changes to the retrieval pipeline objectively rather than
            relying on impression.
          </p>
        </section>

        <div className="pt-4">
          <Button variant="outline" asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
