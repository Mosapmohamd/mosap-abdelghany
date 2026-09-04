import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://mosap-abdelghany.vercel.app";
const SITE_TITLE = "Mosap Abdel-Ghany - AI Engineer | LLM Systems, RAG & Agentic AI";
const SITE_DESCRIPTION =
  "Portfolio of Mosap Abdel-Ghany, an AI Engineer specializing in production LLM systems, Retrieval-Augmented Generation (RAG), and agentic AI. Featuring Eliara, a multi-tenant AI analytics platform with Text-to-SQL and hybrid semantic retrieval, plus additional full-stack AI projects.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "AI Engineer",
    "LLM Engineer",
    "RAG",
    "Retrieval-Augmented Generation",
    "Agentic AI",
    "Text-to-SQL",
    "FastAPI",
    "Python",
    "Machine Learning",
    "Portfolio",
    "Mosap Abdel-Ghany",
  ],
  authors: [{ name: "Mosap Abdel-Ghany" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Mosap Abdel-Ghany Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mosap Abdel-Ghany - AI Engineer | LLM Systems, RAG & Agentic AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mosap Abdel-Ghany",
  jobTitle: "AI Engineer | LLM Systems, RAG & Agentic AI",
  url: SITE_URL,
  email: "mailto:abdelghanymosap@gmail.com",
  telephone: "+201013089663",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  sameAs: [
    "https://github.com/Mosapmohamd",
    "https://linkedin.com/in/mosap-abdel-ghany",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
