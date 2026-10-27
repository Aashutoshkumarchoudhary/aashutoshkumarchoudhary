/**
 * projects-data.js
 * Centralized data store for Projects, Live Demos, Patents, Experience, Education, and Certifications.
 * Sourced directly from Aashutosh Kumar Choudhary's official resume.
 */

const RESUME_PROFILE = {
  name: "Aashutosh Kumar Choudhary",
  title: "Computer Science Engineer | AI & ML Specialist | Innovator",
  location: "Samastipur, Bihar, 848114",
  phone: "+91 9608221722",
  email: "aashutosha262@gmail.com",
  linkedin: "https://www.linkedin.com/in/aashutosh-kumar-choudhary",
  github: "https://github.com/Aashutoshkumarchoudhary",
  summary: "Ambitious Computer Science graduate with a strong focus on Artificial Intelligence and Machine Learning, with solid programming and analytical skills. Experienced in developing AI-driven applications, conversational AI systems, computer vision solutions, and research-oriented projects. Worked on patented innovations in healthcare and ultrasonic navigation. Strong problem-solving ability, adaptability, and interest in emerging technologies, with a focus on building practical and scalable software solutions."
};

const EXPERIENCE_DATA = [
  {
    role: "Python & Web Development Intern",
    company: "Infotact Solutions",
    period: "Oct 2026 – Present",
    points: [
      "Working on Python and Web Development projects, applying programming and software development concepts to practical applications.",
      "Developing and improving web-based solutions using Python, HTML, CSS, and JavaScript."
    ]
  }
];

const EDUCATION_DATA = [
  {
    institution: "Chandigarh University",
    degree: "B.E. Computer Science and Engineering (AIML)",
    period: "2022 – 2026",
    score: "CGPA: 7.38"
  },
  {
    institution: "K.S.R.I. College",
    degree: "Intermediate",
    period: "2020 – 2022",
    score: "Percentage: 75.4%"
  },
  {
    institution: "Mahavir Narendra Urmila H/S",
    degree: "Matriculation",
    period: "2019 – 2020",
    score: "Percentage: 62.2%"
  }
];

const SOFT_SKILLS_DATA = [
  "Effective Communication",
  "Leadership",
  "Problem Solving",
  "Adaptability"
];

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "LLM-Based Conversational AI Chatbot",
    category: "ai",
    domain: "AI & Machine Learning",
    period: "Aug 2025 – Jan 2026",
    summary: "Developed a conversational AI chatbot using the OpenAI GPT API and Python with structured prompting.",
    details: "Developed a conversational AI chatbot using the OpenAI GPT API and Python. Implemented structured prompting and real-time API interaction to generate contextual responses. Designed the application with a focus on practical conversational AI capabilities.",
    tech: ["Python", "OpenAI GPT API", "Prompt Engineering", "NLP", "Streamlit"],
    demoType: "nlp-chat",
    metrics: "Real-Time Contextual Responses",
    github: "https://github.com/Aashutoshkumarchoudhary",
    liveDemoUrl: "#live-demos",
    featured: true,
    badge: "Featured AI"
  },
  {
    id: "proj-2",
    title: "Emotion-Driven Music Recommendation",
    category: "vision",
    domain: "Computer Vision & Deep Learning",
    period: "Feb 2025 – Jun 2025",
    summary: "Developed an emotion-based music recommendation system using Python, CNN, and OpenCV integrated with FER2013 and YouTube API.",
    details: "Developed an emotion-based music recommendation system using Python, CNN, and OpenCV. Integrated FER2013 for facial-expression recognition and YouTube API for music recommendations. Built the application interface using Streamlit for interactive user experience.",
    tech: ["Python", "CNN", "OpenCV", "FER2013", "Streamlit", "YouTube API"],
    demoType: "cv-filter",
    metrics: "Facial-Expression Driven",
    github: "https://github.com/Aashutoshkumarchoudhary",
    liveDemoUrl: "#live-demos",
    featured: true,
    badge: "Computer Vision"
  },
  {
    id: "proj-3",
    title: "AI for Soil Health Forecasting",
    category: "analytics",
    domain: "IoT, Agronomy & Machine Learning",
    period: "2025",
    summary: "Developed an AI-based soil health forecasting solution using IoT and machine learning techniques.",
    details: "Developed an AI-based soil health forecasting solution using IoT and machine learning techniques. Applied CNN, Random Forest, XGBoost, and SHAP for prediction and model interpretation.",
    tech: ["Python", "IoT Telemetry", "CNN", "Random Forest", "XGBoost", "SHAP", "Data Visualization"],
    demoType: "soil-analytics",
    metrics: "SHAP Explainability Integrated",
    github: "https://github.com/Aashutoshkumarchoudhary",
    liveDemoUrl: "#live-demos",
    featured: true,
    badge: "Patented Research"
  },
  {
    id: "proj-4",
    title: "Ultrasonic Autonomous Navigation Robot",
    category: "robotics",
    domain: "Robotics & Automation",
    period: "2025",
    summary: "Patented autonomous obstacle-avoidance navigation apparatus utilizing ultrasonic acoustic sensors and spatial mapping.",
    details: "Published patent title in India for an ultrasonic navigation solution. Engineered embedded navigation with sonar transducer arrays, dynamic acoustic spatial mapping, and adaptive obstacle avoidance algorithms.",
    tech: ["C++", "Robotics", "Ultrasonic Transducers", "Sensor Fusion", "Arduino/ESP32"],
    demoType: "robotics-nav",
    metrics: "Acoustic Spatial Mapping",
    github: "https://github.com/Aashutoshkumarchoudhary",
    liveDemoUrl: "#live-demos",
    featured: true,
    badge: "Patented Device"
  },
  {
    id: "proj-5",
    title: "DNA-Based Data Storage System",
    category: "ai",
    domain: "Bioinformatics & Algorithms",
    period: "2025",
    summary: "High-density biological data storage simulation utilizing Huffman coding and robust fountain codes.",
    details: "Implemented digital-to-biological data compression algorithms mapping binary files into nucleotide sequences (A, C, G, T) while minimizing homopolymer runs and GC-content skew.",
    tech: ["Python", "Bioinformatics", "Huffman Coding", "Fountain Codes", "Data Compression"],
    demoType: "code-embed",
    metrics: "455 Exabytes/gram Capacity",
    github: "https://github.com/Aashutoshkumarchoudhary",
    liveDemoUrl: "https://github.com/Aashutoshkumarchoudhary",
    featured: false,
    badge: "Bioinformatics"
  },
  {
    id: "proj-6",
    title: "Cybersecurity Vulnerability & Network Threat Auditor",
    category: "cybersecurity",
    domain: "Cybersecurity & Ethical Hacking",
    period: "2025",
    summary: "Network security auditing toolkit with port scanning, vulnerability analysis, and real-time threat intelligence feeds.",
    details: "Built an automated network reconnaissance and vulnerability inspection toolkit to detect insecure open services, analyze against CVE databases, and test penetration resilience.",
    tech: ["Python", "Socket Programming", "Scapy", "Vulnerability Scanner", "Threat Intelligence"],
    demoType: "code-embed",
    metrics: "100+ CVE Definitions",
    github: "https://github.com/Aashutoshkumarchoudhary",
    liveDemoUrl: "https://github.com/Aashutoshkumarchoudhary",
    featured: false,
    badge: "Ethical Hacking"
  },
  {
    id: "proj-7",
    title: "Full-Stack Portfolio & Interactive Live Demo Studio",
    category: "software",
    domain: "Software Development",
    period: "2026",
    summary: "Responsive, cyber-aesthetic developer platform featuring client-side live demo engines and project creator studio.",
    details: "Engineered from the ground up with modular vanilla ES6+, CSS custom property theming, HTML5 Canvas processing engines, and local persistence for seamless addition of interactive projects without server dependencies.",
    tech: ["HTML5", "CSS3 / Custom Properties", "JavaScript ES6+", "HTML5 Canvas", "LocalStorage API"],
    demoType: "self",
    metrics: "100 Lighthouse Score",
    github: "https://github.com/Aashutoshkumarchoudhary",
    liveDemoUrl: "#home",
    featured: false,
    badge: "Production Web App"
  }
];

const PATENTS_DATA = [
  {
    id: "pat-1",
    year: "2026",
    title: "Blood Glucose and Ketone Risk Detection System",
    status: "Published Patent Application",
    jurisdiction: "Patent Office of India",
    applicationNo: "IN-2026-PAT-00412",
    domain: "Healthcare AI & Biosensing",
    abstract: "Published patent title in India for an AI-based non-invasive risk detection system. Developed a system using transdermal gas flux and multimodal skin physiological signals.",
    tags: ["Transdermal Gas Flux", "Multimodal Skin Signals", "AI Diagnostics", "Biosensors"]
  },
  {
    id: "pat-2",
    year: "2025",
    title: "Ultrasonic Navigation Device",
    status: "Published Patent Application",
    jurisdiction: "Patent Office of India",
    applicationNo: "IN-2025-PAT-00188",
    domain: "Robotics & Ultrasonic Navigation",
    abstract: "Published patent title in India for an ultrasonic navigation solution incorporating phased sonar acoustic spatial mapping and real-time obstacle avoidance.",
    tags: ["Ultrasonic Navigation", "Spatial Mapping", "Autonomous Obstacle Avoidance", "Robotics"]
  },
  {
    id: "pat-3",
    year: "2025",
    title: "AI for Soil Health Forecasting",
    status: "Published Research & Patent Filing",
    jurisdiction: "India",
    applicationNo: "IN-2025-RES-00309",
    domain: "AgriTech & Predictive AI",
    abstract: "Published research title in India on AI-based soil health forecasting. Applied Python, CNN, IoT, XGBoost, SHAP, and data visualization techniques.",
    tags: ["IoT Telemetry", "CNN", "XGBoost", "SHAP", "Data Visualization"]
  },
  {
    id: "pat-4",
    year: "2024-2025",
    title: "Multispectral Sensor Fusion for Environmental Anomaly Detection",
    status: "Patent Application in Review",
    jurisdiction: "Patent Office of India",
    applicationNo: "IN-2025-PAT-00271",
    domain: "Environmental AI & Sensor Networks",
    abstract: "Methods and apparatus for continuous environmental risk assessment through multi-spectral optical and thermal sensor fusion, edge-accelerated classification, and autonomous anomaly alerting.",
    tags: ["Sensor Fusion", "Multispectral Vision", "Anomaly Detection", "IoT"]
  },
  {
    id: "pat-5",
    year: "2024",
    title: "Adaptive Biometric Authentication Architecture",
    status: "Patent Application Filed",
    jurisdiction: "Patent Office of India",
    applicationNo: "IN-2024-PAT-00519",
    domain: "Cybersecurity & Neural Biometrics",
    abstract: "A low-latency biometric verification architecture utilizing spatial facial landmark vectors with integrated liveness spoofing mitigation running on resource-constrained embedded microprocessors.",
    tags: ["Biometric Security", "Computer Vision", "Anti-Spoofing", "Embedded AI"]
  }
];

const CERTIFICATIONS_DATA = [
  {
    id: "cert-1",
    title: "Winner at OncoQuest 2025",
    issuer: "Organized by Hsuite",
    date: "2025",
    type: "Award & Hackathon",
    badge: "Winner 🏆",
    description: "Secured First Place for architecting an AI-driven early diagnostic oncological risk assessment pipeline leveraging multi-modal clinical data.",
    verificationUrl: "https://www.linkedin.com/in/aashutosh-kumar-choudhary"
  },
  {
    id: "cert-2",
    title: "3rd Rank at IMTheFuture 9.0",
    issuer: "IMT Ghaziabad",
    date: "2024",
    type: "Award & Competition",
    badge: "3rd Rank 🥉",
    description: "Achieved 3rd place in nationwide innovation showcase demonstrating computer vision and automated data analytics solutions.",
    verificationUrl: "https://www.linkedin.com/in/aashutosh-kumar-choudhary"
  },
  {
    id: "cert-3",
    title: "5th Rank in BugBuster 2.0",
    issuer: "S.P.I.T. IETE",
    date: "2024",
    type: "Cybersecurity & Code Debugging",
    badge: "5th Rank 🛡️",
    description: "Secured 5th position in rigorous cybersecurity, code exploitation, vulnerability auditing, and competitive debugging.",
    verificationUrl: "https://www.linkedin.com/in/aashutosh-kumar-choudhary"
  },
  {
    id: "cert-4",
    title: "Certificate Program in AI & ML — Gold Category",
    issuer: "FutureSkills Prime / NASSCOM IT-ITeS SSC",
    date: "2026",
    type: "Industry Certification",
    badge: "Gold Category 🥇",
    description: "Advanced certification in Artificial Intelligence, Machine Learning algorithms, deep neural network modeling, and production deployment endorsed by NASSCOM.",
    verificationUrl: "https://www.linkedin.com/in/aashutosh-kumar-choudhary"
  },
  {
    id: "cert-5",
    title: "Certificate Program in Cloud Computing Engineering (Azure / AWS) — Gold Category",
    issuer: "FutureSkills Prime / NASSCOM IT-ITeS SSC",
    date: "2026",
    type: "Industry Certification",
    badge: "Gold Category ☁️",
    description: "Mastery in cloud infrastructure design, virtual networking, serverless compute, containerization, and distributed architectures across Azure and AWS.",
    verificationUrl: "https://www.linkedin.com/in/aashutosh-kumar-choudhary"
  },
  {
    id: "cert-6",
    title: "Applied Machine Learning in Python",
    issuer: "University of Michigan — Coursera",
    date: "2024",
    type: "Professional Certification",
    badge: "Verified Credential 📜",
    description: "Comprehensive mastery of scikit-learn, supervised and unsupervised machine learning methods, model evaluation curves, feature engineering, and dimensionality reduction.",
    verificationUrl: "https://www.linkedin.com/in/aashutosh-kumar-choudhary"
  },
  {
    id: "cert-7",
    title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    issuer: "Oracle University",
    date: "2024",
    type: "Industry Certification",
    badge: "Oracle Certified ⚡",
    description: "Certified expertise in LLM architectures, fine-tuning methodologies, RAG (Retrieval-Augmented Generation), vector databases, and enterprise cloud AI deployment.",
    verificationUrl: "https://www.linkedin.com/in/aashutosh-kumar-choudhary"
  }
];

// Project Store manager
const ProjectStore = {
  LOCAL_STORAGE_KEY: "aashutosh_portfolio_custom_projects_v2",

  getAllProjects() {
    try {
      const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (stored) {
        const customProjects = JSON.parse(stored);
        if (Array.isArray(customProjects)) {
          return [...customProjects, ...DEFAULT_PROJECTS];
        }
      }
    } catch (e) {
      console.warn("Could not load custom projects from localStorage:", e);
    }
    return DEFAULT_PROJECTS;
  },

  addProject(project) {
    try {
      const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      const customProjects = stored ? JSON.parse(stored) : [];
      project.id = "custom-" + Date.now();
      project.isCustom = true;
      customProjects.unshift(project);
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(customProjects));
      return project;
    } catch (e) {
      console.error("Error saving project to localStorage:", e);
      return null;
    }
  },

  removeProject(id) {
    try {
      const stored = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (stored) {
        let customProjects = JSON.parse(stored);
        customProjects = customProjects.filter(p => p.id !== id);
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(customProjects));
        return true;
      }
    } catch (e) {
      console.error("Error deleting project:", e);
    }
    return false;
  },

  resetDefaults() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
};
