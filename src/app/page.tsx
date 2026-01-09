"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Github, Mail, Phone, MapPin, Calendar, Award, BookOpen, Briefcase, Code, GraduationCap, Target, Users, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
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
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const skills = [
    { 
      category: "Programming", 
      items: ["Python", "SQL", "R"], 
      level: 95,
      description: "Core programming languages for data science and AI development"
    },
    { 
      category: "Machine Learning", 
      items: ["Supervised Learning", "Unsupervised Learning", "Ensemble Methods", "Feature Engineering", "Model Evaluation"], 
      level: 90,
      description: "Comprehensive ML techniques and methodologies"
    },
    { 
      category: "Deep Learning", 
      items: ["Neural Networks", "CNN", "RNN", "LSTM", "Transformers", "BERT", "TensorFlow", "PyTorch"], 
      level: 85,
      description: "Advanced deep learning architectures and frameworks"
    },
    { 
      category: "Data Processing & Analysis", 
      items: ["Pandas", "NumPy", "Data Cleaning", "EDA", "Statistical Analysis"], 
      level: 92,
      description: "Data manipulation, cleaning, and statistical analysis"
    },
    { 
      category: "Data Visualization", 
      items: ["Matplotlib", "Seaborn", "Plotly", "Streamlit", "Power BI"], 
      level: 88,
      description: "Creating compelling visualizations and interactive dashboards"
    },
    { 
      category: "Natural Language Processing", 
      items: ["Text Preprocessing", "Sentiment Analysis", "Tokenization", "BERT"], 
      level: 80,
      description: "NLP techniques and language models"
    },
    { 
      category: "Tools & Technologies", 
      items: ["Git", "Jupyter Notebook", "VS Code", "Excel", "APIs"], 
      level: 85,
      description: "Essential tools and technologies for development"
    }
  ];

  const projects = [
    {
      title: "Sentiment Analysis for TripAdvisor and Quora Egypt",
      description: "Developed a comprehensive sentiment analysis NLP project handling both Arabic and English text. Implemented advanced preprocessing techniques, data augmentation (EDA, back translation), and trained multiple models including Logistic Regression, SVM, LSTM, and BERT.",
      technologies: ["Python", "NLP", "BERT", "LSTM", "Streamlit", "Plotly"],
      type: "Graduation Project",
      impact: "Improved sentiment classification accuracy by 25% using ensemble methods",
      github: "https://github.com/Mosapmohamd/Sentiment-Analysis-for-TripAdvisor-and-Quora-Egypt"
    },
    {
      title: "Disease Prediction System Using Machine Learning",
      description: "Engineered an AI-powered ensemble voting system combining Decision Tree, Random Forest, and Naïve Bayes models to enhance prediction accuracy. Implemented sophisticated ensemble learning techniques to reduce bias and improve reliability in medical diagnosis.",
      technologies: ["Python", "Machine Learning", "Ensemble Learning", "Scikit-learn"],
      type: "Healthcare AI",
      impact: "Achieved 88% accuracy in disease prediction, outperforming individual models",
      github: "https://github.com/Mosapmohamd/Disease-Prediction-System"
    },
    {
      title: "Customer Churn Prediction Dashboard",
      description: "Built an interactive Streamlit dashboard featuring Random Forest model with 91% accuracy for predicting customer churn. Implemented real-time visualization, automated risk insights, and user-friendly interface for business decision-making.",
      technologies: ["Python", "Random Forest", "Streamlit", "Data Visualization"],
      type: "Business Intelligence",
      impact: "Outperformed manual methods by 28%, reducing customer acquisition costs by 5-25x",
      github: "https://github.com/Mosapmohamd/customer-churn-prediction"
    },
    {
      title: "Business Intelligence Dashboards for Retail",
      description: "Designed and deployed multiple Power BI dashboards for supermarkets and clothing stores. Conducted comprehensive sales data analysis, identified key performance indicators, and delivered actionable insights that drove significant business growth.",
      technologies: ["Power BI", "Data Analysis", "Business Intelligence", "SQL"],
      type: "Business Analytics",
      impact: "Increased supermarket sales by 15% and clothing store profits by 18%",
      github: "https://github.com/Mosapmohamd/retail-bi-dashboards",
      showGithub: false
    }
  ];

  const experiences = [
    {
      title: "AI Engineer",
      company: "Core Business Solutions",
      period: "November 2025 – Present",
      description: "Completed an intensive training program focused on the AI engineering lifecycle. Built and deployed end-to-end machine learning models using supervised and unsupervised algorithms. Designed and trained neural networks using modern deep learning frameworks. Worked with real-world datasets from data preparation to model deployment. Optimized models for performance and accuracy and integrated them into practical AI-driven applications.",
      achievements: [
        'Built prediction and classification models',
        'Designed end to end ML pipelines',
        'Improved model performance through tuning',
      ]
    },
    {
      title: "Python Instructor",
      company: "TM Academy",
      period: "November 2024 – Present",
      description: "Delivered comprehensive Python programming instruction covering fundamental to intermediate concepts. Developed curriculum, hands-on coding exercises, and assessments that enhanced student engagement and learning outcomes.",
      achievements: [
        "Taught variables, loops, conditionals, functions, and file handling",
        "Developed practical coding exercises and mini-projects",
        "Improved student coding proficiency by 40%"
      ]
    },
        {
      title: "Gen AI Trainee",
      company: "Digital Egypt Pioneers Initiative",
      period: "November 2025 – June 2026",
      description: "Completed an intensive Generative AI training program focused on building and deploying AI systems powered by large language models. Worked on prompt design model fine tuning and inference workflows. Built practical GenAI solutions using real datasets and real use cases. Integrated models into applications and evaluated outputs for quality and reliability.",
      achievements: [
        "Designed effective prompts for task specific generation",
        "Fine tuned and evaluated large language models",
        "Built end to end GenAI pipelines from data to deployment",
        "Applied NLP techniques for text generation summarization and classification",
        "Integrated GenAI models into real applications"
      ]
    },
    {
      title: "Data Science Trainee",
      company: "Digital Egypt Pioneers Initiative",
      period: "October 2024 – May 2025",
      description: "Completed intensive training program covering the complete data science lifecycle. Gained hands-on experience with cutting-edge machine learning algorithms, deep learning frameworks, and real-world data science applications.",
      achievements: [
        "Mastered data collection, preprocessing, analysis, and visualization",
        "Built end-to-end machine learning pipelines",
        "Applied statistical techniques for data-driven decision making"
      ]
    }
  ];

  const volunteering = [
    {
      title: "AI & Machine Learning Instructor",
      organization: "RTC",
      period: "July 2024 – Present",
      description: "Mentored students in ML techniques using Python and relevant libraries. Fostered collaborative learning environment through regular Q&A sessions and constructive feedback.",
      skills: ["Leadership", "Mentoring", "Technical Communication"]
    },
    {
      title: "OC Team Leader",
      organization: "RTC",
      period: "March 2024 – Present",
      description: "Led team monitoring and progress tracking, ensuring timely intervention and support. Developed strong leadership and mentoring capabilities through effective team management.",
      skills: ["Team Leadership", "Project Management", "Coordination"]
    },
    {
      title: "HR Team Member",
      organization: "Enactus",
      period: "August 2024 – May 2025",
      description: "Managed recruitment processes, interface creation, and assignment distribution. Gained valuable experience in talent management and organizational development.",
      skills: ["Recruitment", "Talent Management", "HR Operations"]
    }
  ];

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
    { name: "Supervised Learning with scikit-learn", issuer: "DataCamp", year: "2025", id: "DataCamp Certificate", date: "AUG 14, 2025", duration: "4 HRS", priority: 3 }
  ];

  // Get top 6 certifications for main display
  const topCertifications = certifications.filter(cert => cert.priority === 1);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-300 ${isScrolled ? "py-2 shadow-lg" : "py-4"}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">MA</span>
              </div>
              <div>
                <div className="text-lg font-bold">Mosap Abdel-Ghany</div>
                <div className="text-xs text-muted-foreground">Junior AI Engineer</div>
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
            <div className="flex gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={() => scrollToSection("contact")}>
                Hire Me
              </Button>
              <Button size="sm" onClick={() => scrollToSection("projects")}>
                View Work
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Professional data scientist working with modern data visualization dashboards" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Hi, I'm <span className="gradient-text">Mosap Abdel-Ghany</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white/90">
              Junior AI Engineer & Data Scientist
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/80 leading-relaxed">
              Passionate about transforming raw data into meaningful business solutions through statistical analysis, 
              predictive modeling, and interactive dashboards.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection("projects")} className="px-8 gradient-bg hover:opacity-90 transition-opacity">
                View My Projects
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" onClick={() => scrollToSection("contact")} className="px-8 bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get to know my background, education, and professional objectives
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Professional Summary */}
              <div className="lg:col-span-2">
                <Card className="h-full border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Professional Objective
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      As a motivated Junior AI Engineer & Data Scientist, I aim to leverage my knowledge in data analysis, 
                      statistics, and machine learning to solve real-world problems and contribute to data-driven 
                      decision-making processes. With hands-on experience in Python, SQL, and data visualization, 
                      I am eager to grow within a dynamic organization while continuously expanding my technical 
                      and analytical skills. My objective is to apply innovative AI solutions to business challenges 
                      and drive meaningful insights from complex datasets.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">Problem Solver</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">Quick Learner</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">Team Player</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">Detail Oriented</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Education */}
              <div>
                <Card className="h-full border-l-4 border-l-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-secondary" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Helwan International Technology University</h4>
                        <p className="text-sm text-muted-foreground">The Technological College in Cairo</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>2022 - 2026</span>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          Artificial Intelligence (AI)
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive technical expertise across data science and AI domains
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <Card key={index} className="h-full colorful-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold skill-gradient-${(index % 4) + 1}`}>
                        {skillGroup.category.charAt(0)}
                      </div>
                      {skillGroup.category}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {skillGroup.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Proficiency Level</span>
                        <span className="font-bold text-primary">{skillGroup.level}%</span>
                      </div>
                      <Progress value={skillGroup.level} className="h-3" />
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Showcasing innovative solutions and measurable impact
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                        <Badge variant="outline" className="mb-2">
                          {project.type}
                        </Badge>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-base">
                      {project.description}
                    </CardDescription>
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                      <div className="text-sm font-medium text-primary mb-1">Key Impact:</div>
                      <div className="text-sm text-muted-foreground">{project.impact}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.showGithub !== false && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(project.github, '_blank')}
                        className="w-full"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
              <p className="text-lg text-muted-foreground">
                Building expertise through hands-on projects and leadership roles
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Work Experience */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <CardTitle className="text-lg">{exp.title}</CardTitle>
                            <CardDescription className="text-base font-medium">
                              {exp.company}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Volunteering */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Leadership & Volunteering
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {volunteering.map((vol, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-base">{vol.title}</CardTitle>
                        <CardDescription className="text-sm font-medium">
                          {vol.organization}
                        </CardDescription>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {vol.period}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{vol.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {vol.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
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
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
              <p className="text-lg text-muted-foreground">
                Continuous learning and professional development
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {topCertifications.map((cert, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow colorful-card">
                  <CardHeader>
                    <Award className="h-12 w-12 text-primary mx-auto mb-3" />
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
            
            {/* Explore All Certifications Button */}
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
                    Explore All Certifications ({certifications.length})
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            
            {/* All Certifications Section */}
            {showAllCertifications && (
              <div id="all-certifications" className="mt-16">
                <h3 className="text-2xl font-bold mb-8 text-center">All Certifications</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {certifications.map((cert, index) => (
                    <Card key={index} className="text-center hover:shadow-md transition-shadow">
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
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">abdelghanymosap@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+201013089663</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Cairo, Egypt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Github className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-muted-foreground">github.com/Mosapmohamd</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">in</span>
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-muted-foreground">linkedin.com/in/mosap-abdel-ghany</p>
                    </div>
                  </div>
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
