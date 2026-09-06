import type { Metadata } from "next";
import EliaraCaseStudyClient from "./EliaraCaseStudyClient";

const SITE_URL = "https://mosap-abdelghany.vercel.app";
const PAGE_URL = `${SITE_URL}/projects/eliara`;
const TITLE = "Eliara — Enterprise AI Analytics Platform | Mosap Abdel-Ghany";
const DESCRIPTION =
  "A production, multi-tenant AI analytics platform enabling natural-language interaction with enterprise data through LLM orchestration, constrained Text-to-SQL, hybrid semantic retrieval, and layered validation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Mosap Abdel-Ghany Portfolio",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eliara — Enterprise AI Analytics Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function EliaraCaseStudyPage() {
  return <EliaraCaseStudyClient />;
}
