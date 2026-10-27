# Aashutosh Kumar Choudhary — AI Engineer Portfolio & Live Demo Studio

A cyber-aesthetic, high-performance portfolio website built with HTML5, CSS3, and vanilla JavaScript (ES6+). Designed to match the dark navy and electric blue reference design with a profile hero, focus domain cards, interactive live demos, patent timeline, metrics, and a dedicated **Project & Live Demo Studio** for creating and publishing interactive projects.

---

## 🌟 Key Features

1. **Faithful Visual Design & Branding**:
   - Deep cyber-navy canvas (`#020913`, `#061424`) with electric blue (`#168cff`) and cyan neon (`#00d9ff`) glow accents.
   - Hero section featuring an authentic portrait of Aashutosh with neon glow borders, live availability indicator (*"🟢 Open to Opportunities"*), and futuristic AI neural graphics.
   - **7 Core Focus Domain Cards** matching the reference:
     - 👁️ **Computer Vision** (*"See the world through AI"*)
     - 🛡️ **Cybersecurity / Ethical Hacking** (*"Secure. Detect. Prevent."*)
     - 📊 **Data Analytics** (*"Data Driven Decisions"*)
     - 🧠 **AI & Analytics** (*"Intelligence for a Better Tomorrow"*)
     - 🤖 **Robotics** (*"Machines with a Purpose"*)
     - 💻 **Software Development** (*"Build. Deploy. Scale."*)
     - ⚙️ **Machine Learning** (*"Learn from Data, Create Impact"*)

2. **4 Working In-Browser Live Demos**:
   - **Live Demo 1: Computer Vision & Real-time Canvas Filter / Target Detection**:
     - Live image processing on HTML5 Canvas.
     - Features: Sobel Edge Detection (mathematical 3x3 convolution matrix), Binary Adaptive Thresholding, Grayscale, Cyber Heatmap Inversion, 3x3 Box Blur, and Simulated AI Bounding Box detection with confidence scores!
     - Includes preset feeds (Autonomous Driving, Biometric Face, Circuit Board, Abstract) and supports custom image uploads and canvas output downloads.
   - **Live Demo 2: Conversational AI Agent & NLP Sentiment Analyzer**:
     - Interactive chatbot answering questions about Aashutosh's patents, skills, projects, and contact info.
     - Real-time NLP Sentiment & Tone Analyzer evaluating sentence polarity, enthusiasm, and tone with dynamic confidence meters.
   - **Live Demo 3: Patented Soil Health & Crop Forecasting System**:
     - Real-time agronomic simulation of Patent Application `IN-2025-RES-00309`.
     - Interactive sliders for Nitrogen, Phosphorus, Potassium, Moisture, pH, and Temperature.
     - Dynamically computes Soil Health Index (%), optimal crop recommendations (Wheat, Rice, Maize, Cotton, Chickpea), and renders an interactive **SHAP Feature Attribution Bar Chart** on Canvas!
   - **Live Demo 4: Patented Ultrasonic Autonomous Navigation Robot**:
     - Interactive simulation of Patent Application `IN-2025-PAT-00188`.
     - Interactive grid where users can click to add/remove obstacle walls.
     - Runs A* pathfinding with animated ultrasonic acoustic sonar ping rays and real-time obstacle distance readouts in centimeters.

3. **Project & Live Demo Creator Studio ("Implement Projects & Live Demos")**:
   - Built-in studio modal (**"⚡ Implement New Project / Demo"**) accessible directly from the header and projects section.
   - Allows Aashutosh to enter Project Title, Category, Summary, Architecture Details, Tech Stack, Metrics, and choose a Live Demo mode:
     - **External Web App / Streamlit / Hugging Face URL** (renders live in iframe preview)
     - **Custom Interactive Code Sandbox** (executes custom JavaScript/Canvas code live)
     - **Anchor link** directly to the `#live-demos` section
   - **In-Browser Persistence**: Saves immediately to `localStorage` so new projects remain active on page reloads!
   - **Code Exporter**: Generates a clean JSON/JavaScript snippet to easily paste into `projects-data.js` for permanent commits.

4. **Patents & Research Innovations**:
   - Official details on 5+ filed patents and research publications:
     - *Blood Glucose and Ketone Risk Detection System* (2026, Published in India)
     - *Ultrasonic Navigation Device & Obstacle Mapping* (2025, Published in India)
     - *AI for Soil Health Forecasting and Yield Optimization* (2025, Published Research & Patent Filing)
     - Multi-spectral sensor fusion & adaptive biometrics
   - Interactive modal to view technical architecture abstracts and verification links.

5. **Certifications & Milestones**:
   - 🏆 Winner — OncoQuest 2025 (Hsuite)
   - 🥉 3rd Rank — IMTheFuture 9.0 (IMT Ghaziabad)
   - 🛡️ 5th Rank — BugBuster 2.0 (S.P.I.T. IETE)
   - ⚡ Oracle Cloud Infrastructure 2024 Generative AI Certified Professional
   - 📜 Applied Machine Learning in Python (University of Michigan)
   - 🎓 B.E. Computer Science Engineering (AIML), Chandigarh University (CGPA 7.38)

6. **Interactive Resume & Contact System**:
   - In-browser formatted resume preview modal with 1-click printable layout.
   - Direct download link for `resume.pdf` + Google Drive folder link.
   - Working contact form with client-side validation, feedback alerts, and quick 1-click copy buttons for email, phone, and location.

---

## 📁 File Structure

```
Aashutosh_Portfolio/
├── index.html            # Main semantic HTML5 webpage with all sections & modals
├── style.css             # Cyber Dark & High-Contrast Light stylesheet (responsive)
├── script.js             # UI interactions, theme toggle, animated counters, copy buttons
├── live-demos.js         # Implementation of 4 working in-browser interactive demos
├── projects-data.js      # Data store for projects, patents, certifications, & local storage
├── project-studio.js     # Project Creator Studio modal, live preview, and code export
├── profile.jpg           # Portrait photo
├── README.md             # Documentation and guide
└── assets/
    └── images/
        ├── profile.jpg
        ├── ai-analytics.svg
        ├── computer-vision.svg
        ├── cybersecurity.svg
        └── data-analytics.svg
```

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open this folder in VS Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option 2: Python Local Server
Run in PowerShell or terminal:
```bash
python -m http.server 8000
```
Then open your browser at: `http://localhost:8000`

---

## 🛠️ How to Implement New Projects & Working Live Demos

You have two convenient ways to implement new projects:

### Method A: Directly from the Website UI (No Coding Required)
1. Click the purple **"⚡ Implement New Project / Demo"** button on the website.
2. Fill in:
   - **Project Title**, **Technical Category**, and **Domain Label**.
   - **Summary** & **Architecture Details**.
   - **Technologies Used** (comma-separated, e.g., `Python, PyTorch, OpenCV, Streamlit`).
   - **Key Metric** (e.g., `98.2% Accuracy`, `15ms Inference`).
   - **Live Demo Mode**: Select *External App / Web URL* (like your Streamlit app, Hugging Face space, or Vercel site), *Embed in Iframe Preview*, or *Interactive Sandbox*.
   - **Live Demo URL** and **GitHub URL**.
3. Click **"👁️ Test & Preview Live Demo"** to see it run right inside the studio.
4. Click **"✓ Save & Publish to Portfolio"**. It will immediately appear on your website!

### Method B: Adding Permanently to `projects-data.js`
Open `projects-data.js` and add an object to the `DEFAULT_PROJECTS` array:

```javascript
{
  id: "proj-custom",
  title: "Your Project Title",
  category: "ai", // 'ai', 'vision', 'analytics', 'robotics', 'cybersecurity', or 'software'
  domain: "Computer Vision & Deep Learning",
  summary: "Brief 1-2 sentence description for the card.",
  details: "Full description of your model, architecture, dataset, and results.",
  tech: ["Python", "PyTorch", "OpenCV"],
  metrics: "97.5% Precision",
  github: "https://github.com/aashutosh-kumar-choudhary/your-repo",
  liveDemoUrl: "https://your-live-demo-url.streamlit.app",
  badge: "Featured AI"
}
```

---

## 🌐 How to Publish to GitHub Pages

1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Launch Aashutosh Portfolio with Live Demo Studio"
   ```
2. Create a new repository on your GitHub account (`aashutosh-kumar-choudhary/portfolio`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/aashutosh-kumar-choudhary/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings** → **Pages** → under **Branch**, choose `main` and root (`/`), then click **Save**.
5. Your portfolio with live interactive demos will be live at:
   `https://aashutosh-kumar-choudhary.github.io/portfolio/`

---

## 👤 Author Contact
- **Name**: Aashutosh Kumar Choudhary
- **Email**: [aashutosha262@gmail.com](mailto:aashutosha262@gmail.com)
- **Phone**: +91 9608221722
- **LinkedIn**: [linkedin.com/in/aashutosh-kumar-choudhary](https://www.linkedin.com/in/aashutosh-kumar-choudhary)
- **GitHub**: [github.com/aashutosh-kumar-choudhary](https://github.com/aashutosh-kumar-choudhary)
- **Location**: Rampur Jalalpur, Dalsinghsarai, Samastipur, Bihar - 848114
