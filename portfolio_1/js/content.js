/**
 * Site copy — aligned with resume/Master.extracted.txt (source text).
 * PDF: assets/Master.pdf
 */
window.SITE = {
  name: "Aswath Suresh",
  role: "M.S. Data Science (JHU) · B.Tech Aerospace (IIT Bombay) · AI / full-stack / quant NLP",
  location: "Baltimore, MD",
  bio: [
    "M.S. in Data Science at Johns Hopkins (GPA 3.94, May 2026) and B.Tech in Aerospace Engineering from IIT Bombay (GPA 3.32, May 2022). I build healthcare AI platforms, quantitative NLP for trading, and data/ML systems—paired with consulting, product org leadership, and campus programs.",
    "This page mirrors resume/Master.extracted.txt; download the PDF for the formatted résumé.",
  ],
  email: "aswathsureshjhu@gmail.com",
  phone: "+1 (410) 493-7355",
  phoneTel: "+14104937355",
  linkedin: "https://www.linkedin.com/in/aswathsuresh25",
  cvPath: "assets/Master.pdf",
  education: [
    {
      school: "Johns Hopkins University",
      location: "Baltimore, MD",
      degree: "Master of Science in Data Science",
      meta: "GPA 3.94/4 · May 2026",
      courses:
        "Introduction to Data Science, Investment Science, Computing for Applied Mathematics, Statistical Methods and Data Analysis, Computer Vision, Artificial Intelligence, Deep Learning",
    },
    {
      school: "Indian Institute of Technology Bombay (IITB)",
      location: "Mumbai, India",
      degree: "Bachelor of Technology in Aerospace Engineering",
      meta: "GPA 3.32/4 · May 2022",
      courses:
        "Data Analysis and Interpretation, Economics, Machine Learning Based Uncertainty Quantification for Composites",
    },
  ],
  orbits: [
    {
      id: "healthtech",
      label: "Healthcare AI platforms",
      glyph: "◎",
      summary:
        "Founding Engineer at EligioAI: AI-powered patient triage and clinician scheduling—React (Tailwind, Radix), Flask, OpenAI, JWT/RBAC, PHI-safe medical document pipelines with SQLAlchemy, migration from Lovable MVP to full-stack production.",
      tags: ["EligioAI", "React", "Flask", "PHI", "OpenAI"],
    },
    {
      id: "quant",
      label: "Quantitative NLP",
      glyph: "◈",
      summary:
        "Data Scientist at Campbell: FinBERT sentiment (50+ articles/query, 95%+ extraction success on gold/crude), 1000+ articles/day CSV pipelines (−80% analysis time), Hugging Face + PyTorch (90%+ accuracy, 512-token chunking), scraping + NLP + data engineering for trading signals.",
      tags: ["FinBERT", "PyTorch", "Hugging Face", "Campbell"],
    },
    {
      id: "data",
      label: "Data science & research",
      glyph: "◇",
      summary:
        "Costac: revenue/behavior forecasting (R² 0.85, −25% MSE), viz and stats, RNN/LSTM/GRU (MAPE 8.5%). IIT Madras: AR/VR visualization for high-dimensional data, Unity demos. Earlier: energy ML, recruiting tech, SaaS analytics, UAV perception (Rakshak).",
      tags: ["time series", "AR/VR", "PyTorch", "pandas"],
    },
    {
      id: "leadership",
      label: "Leadership, consulting & creative",
      glyph: "✦",
      summary:
        "GRO executive board ($40k+ events, 2,500+ grads), JH grad consulting (Voiceitt TAM, neuro pipeline), Product Management Club director, Consulting Club co-president (inaugural intercollegiate case comp), Breezwei data + Aquipor/DWaste, Culture Show, Stand Up Comedy, international student ambassador, sustainability, IIT Abhyuday PR.",
      tags: ["GRO", "consulting", "PMC", "Breezwei", "culture"],
    },
  ],
  missions: [
    {
      phase: "Current",
      window: "Jan 2026 — present",
      title: "Founding Engineer",
      place: "EligioAI — patient triage & clinician scheduling (Baltimore, MD)",
      detail:
        "Scaled AI triage platform: production React + Flask + OpenAI; JWT/RBAC and PHI-safe document ingestion; migration from Lovable MVP to custom full-stack with real-time chat.",
    },
    {
      phase: "Current",
      window: "Jan 2026 — present",
      title: "Data Scientist",
      place: "Campbell — systematic futures & equities (Baltimore, MD)",
      detail:
        "FinBERT sentiment across gold/crude; 95%+ extraction success; 80% faster analysis with 1000+ articles/day; Hugging Face + PyTorch inference and end-to-end sentiment platform.",
    },
    {
      phase: "Internship",
      window: "Dec 2024 — Jan 2025",
      title: "Data Science Intern",
      place: "Costac — SMB financial & customer analytics (Baltimore, MD)",
      detail:
        "Revenue/behavior ML (R² 0.85, −25% MSE); visualization and 40% revenue optimization insights; RNN/LSTM/GRU sequences (8.5% MAPE).",
    },
    {
      phase: "Research",
      window: "Feb — May 2024",
      title: "Research Intern",
      place: "IIT Madras — Chennai, India",
      detail:
        "20+ paper literature review on AR/VR for high-dimensional data; 2D/3D dimensionality reduction; Unity prototypes with cross-lab demos.",
    },
    {
      phase: "Industry",
      window: "Jun 2022 — Jun 2023",
      title: "Software Developer",
      place: "Teachmint — Bengaluru, India",
      detail:
        "Python backend scalability (−50% response times); unified Flask APIs (+60%); MongoDB migration (1M+ records, −20% latency); tender scraping; React + Flask + GCP full-stack features.",
    },
    {
      phase: "Internship",
      window: "Jun — Jul 2021",
      title: "Software Intern",
      place: "Jobsage.ai — recruitment marketing & job recommendations (Charlotte, NC)",
      detail:
        "Email hiring-info extraction to GCP; Flask API + cron for MySQL promo validity (15% revenue savings).",
    },
    {
      phase: "Internship",
      window: "Apr — Jun 2020",
      title: "Machine Learning Intern",
      place: "Sustlabs — energy analytics (Mumbai, India)",
      detail:
        "2M-point load forecasting; RNN/LSTM models (R² > 0.8); Kafka streaming for 5,000+ customers; InfluxDB, Grafana, WandB.",
    },
    {
      phase: "Internship",
      window: "Dec 2019 — Jan 2020",
      title: "Data Science Intern",
      place: "Floww — SaaS for startups/MSMEs (Mumbai, India)",
      detail:
        "BeautifulSoup scraping; pandas + Google Sheets; ML for vehicle mileage prediction.",
    },
    {
      phase: "Team",
      window: "Oct 2018 — Dec 2019",
      title: "Member, Software Subsystem",
      place: "Rakshak — IITB UAV / disaster response (Mumbai, India)",
      detail:
        "OpenCV datasets; TensorFlow/Keras; U-Net semantic segmentation.",
    },
  ],
  leadership: [
    {
      phase: "Leadership",
      window: "Aug 2025 — present",
      title: "Executive Board Member",
      place: "Graduate Representative Organization — Johns Hopkins University",
      detail:
        "Largest grad org: advocacy and events for 2,500+ students; 35+ representatives; $40k+ events, 20% engagement lift; policy frameworks for administration; partners and vendors.",
    },
    {
      phase: "Leadership",
      window: "Jan 2026 — present",
      title: "Consultant",
      place: "Johns Hopkins Graduate Consulting Club",
      detail:
        "Voiceitt 2.0 market sizing (~564K patients, $1.12B U.S. TAM); TBI/Parkinson’s GTM focus; 23-disease expansion pipeline; 4-month governance and client delivery.",
    },
    {
      phase: "Leadership",
      window: "Aug — Dec 2025",
      title: "Director",
      place: "Johns Hopkins Product Management Club",
      detail:
        "Business Model Canvas for AR/VR startup; competitor analysis and GTM; 30% visibility uplift; 5+ marketing initiatives end-to-end.",
    },
    {
      phase: "Leadership",
      window: "Aug 2025 — present",
      title: "Co-President",
      place: "Johns Hopkins University Consulting Club",
      detail:
        "6+ recruiting events/workshops; firm and faculty partnerships; inaugural Intercollegiate Case Competition (25+ teams, 4+ universities, Bain/Pfizer judges).",
    },
    {
      phase: "Leadership",
      window: "Aug 2025 — present",
      title: "Partner, Data Analytics",
      place: "Breezwei — sustainability startup advisory (Johns Hopkins)",
      detail:
        "Data workstream for investment readiness; incubator + Energy Research Institute pipeline; GTM for sustainable concrete (price elasticity).",
    },
    {
      phase: "Leadership",
      window: "Aug — Dec 2025",
      title: "Consultant — Aquipor",
      place: "Breezwei — permeable concrete / stormwater (Johns Hopkins)",
      detail:
        "$10M revenue opportunity; margins 35%→45%; $25M Y5 roadmap; public-sector GTM; pilot and budget recommendations.",
    },
    {
      phase: "Leadership",
      window: "Jan 2026 — present",
      title: "Consultant — DWaste",
      place: "Breezwei — AI waste-sorting / CV / gamification (Johns Hopkins)",
      detail:
        "$660M TAM / $89–134M SAM; 3-year revenue model; sharper VC narrative.",
    },
    {
      phase: "Leadership",
      window: "Apr 2025 — present",
      title: "Event and Social Chair",
      place: "Stand Up Comedy Club — Johns Hopkins",
      detail:
        "300% performer base growth; 500+ participants; partnerships; $10K Blue Jay Dialogue grant.",
    },
    {
      phase: "Leadership",
      window: "Jan — Apr 2025",
      title: "Director of Design and Marketing",
      place: "Culture Show — Johns Hopkins",
      detail:
        "Flagship showcase: 15+ groups, 500+ attendees; unified branding; zero live-show delays.",
    },
    {
      phase: "Leadership",
      window: "Oct 2024 — present",
      title: "Student Ambassador",
      place: "International Students at Hopkins — Johns Hopkins",
      detail:
        "Orientation and inclusion; Movie Nights and Grocery Trips (35+ attendees).",
    },
    {
      phase: "Leadership",
      window: "Jan 2025 — present",
      title: "Member",
      place: "Sustainable Hopkins Innovative Projects — Johns Hopkins",
      detail:
        "500+ clothing drive items; pop-up thrift; Food Recovery Project.",
    },
    {
      phase: "Leadership",
      window: "Aug 2019 — Feb 2020",
      title: "Media and PR Coordinator",
      place: "Abhyuday — IIT Bombay social organization",
      detail:
        "35+ college reps nationwide; sponsorships; flagship festival support.",
    },
  ],
  projects: [
    {
      title: "Vector DB vs Knowledge Graph for Hyper-Personal AI Assistants",
      place: "Johns Hopkins University · Baltimore, MD",
      window: "Jan — May 2025",
      detail:
        "RAG with LangChain, ChromaDB, GPT-4; +35% retrieval accuracy; GraphRAG/NetworkX; −40% query latency; 200+ conversation entities.",
    },
    {
      title: "Multi-Modal Lip Reading with Contextual Cue Integration",
      place: "Johns Hopkins University · Baltimore, MD",
      window: "Aug — Dec 2025",
      detail:
        "PyTorch audio/video/SBERT fusion (+37% accuracy); Mel pipelines; ResNet/VGG vs LSTM-Transformer; YAML MLOps and 10+ fusion strategies.",
    },
    {
      title: "AI Modeling for Water Quality Control",
      place: "IIT Bombay · Mumbai, India",
      window: "Jun — Sep 2023",
      detail:
        "Sewage treatment forecasting (R² ~0.7); CNN/GRU/LSTM +25% performance; genetic and Bayesian HPO (+~10%).",
    },
    {
      title: "Fantasy T20 Cricket — Performance & Team Selection",
      place: "IIT Bombay · Mumbai, India",
      window: "Jun — Aug 2023",
      detail:
        "Custom metrics (+20% performance); genetic algorithm (>60% accuracy); NCMDAO @ IIT Guwahati Dec 2023.",
    },
    {
      title: "Data Analysis of Composite Structures",
      place: "IIT Bombay · Mumbai, India",
      window: "Sep — Nov 2020",
      detail:
        "Stress–strain ML/DL; Young’s modulus and fracture modeling.",
    },
    {
      title: "Indian Premier League — Data Analysis",
      place: "IIT Bombay · Mumbai, India",
      window: "Apr — May 2019",
      detail:
        "EDA and hypothesis tests on ball-by-ball IPL data; trends and visualization.",
    },
    {
      title: "E-commerce Product Management System",
      place: "Self project",
      window: "",
      detail:
        "Express.js + SQLite vinyl inventory; CRUD, pooling, vanilla JS frontend.",
    },
    {
      title: "Minimal Social Media Platform",
      place: "Self project",
      window: "",
      detail:
        "Firebase auth and Firestore; 500+ posts, time filters, real-time UI.",
    },
    {
      title: "React Sales Dashboard",
      place: "Self project",
      window: "",
      detail:
        "React + Supabase real-time sales; Chart.js; $50k+ quarterly data modeled.",
    },
  ],
  additional: [
    "Semi-finalist — AstraZeneca National Healthcare Case Competition (Johns Hopkins Carey Business School)",
    "Stand Up Comedy Club — writing, discussion, live performance",
  ],
  skills: {
    columns: [
      {
        title: "Technical skills",
        items: [
          "Python",
          "JavaScript",
          "Microsoft Excel",
          "TensorFlow",
          "Pandas",
          "scikit-learn",
          "Git",
          "Linux",
          "SQL",
          "Google Cloud",
        ],
      },
      {
        title: "Industry skills",
        items: [
          "Deep learning",
          "Machine learning",
          "Frontend",
          "Backend",
          "Databases",
          "Data analysis",
          "Optimization",
        ],
      },
      {
        title: "Résumé files",
        items: [
          "Plain text: resume/Master.extracted.txt (repository)",
          "PDF: use Download CV on this page",
        ],
      },
    ],
  },
};
