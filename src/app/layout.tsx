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

export const metadata: Metadata = {
  title: "Mosap Abdel-Ghany - Junior AI Engineer & Data Scientist Portfolio",
  description: "Portfolio of Mosap Abdel-Ghany, Junior AI Engineer & Data Scientist specializing in Python, machine learning, and data visualization. Showcasing projects in sentiment analysis, disease prediction, and customer churn prediction.",
  keywords: ["Junior AI Engineer", "Data Scientist", "Python", "Machine Learning", "Data Analysis", "Portfolio", "Mosap Abdel-Ghany"],
  authors: [{ name: "Mosap Abdel-Ghany" }],
  openGraph: {
    title: "Mosap Abdel-Ghany - Junior AI Engineer & Data Scientist",
    description: "Portfolio showcasing AI and data science projects including sentiment analysis, disease prediction, and customer churn prediction.",
    url: "https://mosap-portfolio.vercel.app",
    siteName: "Mosap Abdel-Ghany Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mosap Abdel-Ghany - Junior AI Engineer & Data Scientist",
    description: "Portfolio showcasing AI and data science projects including sentiment analysis, disease prediction, and customer churn prediction.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
