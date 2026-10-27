/**
 * live-demos.js
 * Implements 4 fully interactive, client-side live demos:
 * 1. Computer Vision & Canvas Image Processing Lab
 * 2. Conversational AI Agent & Sentiment NLP Playground
 * 3. Soil Health & Crop Forecasting Simulator (Patent-backed)
 * 4. Ultrasonic Autonomous Navigation Robot Visualizer (Patent-backed)
 */

document.addEventListener("DOMContentLoaded", () => {
  initLiveDemoTabs();
  initCVDemo();
  initChatDemo();
  initSoilHealthDemo();
  initRoboticsDemo();
});

// Demo Section Tab Navigation
function initLiveDemoTabs() {
  const tabs = document.querySelectorAll(".demo-nav-btn");
  const panes = document.querySelectorAll(".demo-pane");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-demo-target");
      tabs.forEach(b => b.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
        // Trigger resize / re-render for canvas components
        if (targetId === "demo-robotics" && window.renderRoboticsGrid) {
          window.renderRoboticsGrid();
        }
        if (targetId === "demo-soil" && window.updateSoilHealthPrediction) {
          window.updateSoilHealthPrediction();
        }
      }
    });
  });
}

// ==========================================
// 1. COMPUTER VISION & IMAGE PROCESSING DEMO
// ==========================================
function initCVDemo() {
  const canvas = document.getElementById("cv-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const filterSelect = document.getElementById("cv-filter-select");
  const threshSlider = document.getElementById("cv-thresh-slider");
  const threshVal = document.getElementById("cv-thresh-val");
  const presetBtns = document.querySelectorAll(".cv-preset-btn");
  const fileInput = document.getElementById("cv-file-input");
  const benchmarkSpan = document.getElementById("cv-benchmark");
  const downloadBtn = document.getElementById("cv-download-btn");

  let currentImage = new Image();
  currentImage.crossOrigin = "anonymous";

  // Default synthetic preset generator to avoid external CORS issues
  function generateSyntheticPreset(type) {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 460;
    tempCanvas.height = 300;
    const tCtx = tempCanvas.getContext("2d");

    if (type === "circuit") {
      // Tech circuit board
      tCtx.fillStyle = "#071728";
      tCtx.fillRect(0, 0, 460, 300);
      tCtx.strokeStyle = "#00d9ff";
      tCtx.lineWidth = 2;
      // Grid lines
      for (let x = 30; x < 460; x += 40) {
        tCtx.beginPath();
        tCtx.moveTo(x, 20);
        tCtx.lineTo(x, 280);
        tCtx.stroke();
      }
      for (let y = 30; y < 300; y += 40) {
        tCtx.beginPath();
        tCtx.moveTo(20, y);
        tCtx.lineTo(440, y);
        tCtx.stroke();
      }
      // Microchip in center
      tCtx.fillStyle = "#0c2b4d";
      tCtx.strokeStyle = "#168cff";
      tCtx.lineWidth = 3;
      tCtx.fillRect(150, 90, 160, 120);
      tCtx.strokeRect(150, 90, 160, 120);
      // Chip core
      tCtx.fillStyle = "#00f0cf";
      tCtx.font = "bold 16px monospace";
      tCtx.fillText("AI NEURAL CORE", 168, 155);
      // Pins
      tCtx.fillStyle = "#ffb300";
      for (let p = 170; p <= 290; p += 20) {
        tCtx.fillRect(p, 80, 8, 10);
        tCtx.fillRect(p, 210, 8, 10);
      }
    } else if (type === "autonomous") {
      // Autonomous Vehicle View
      tCtx.fillStyle = "#08131e";
      tCtx.fillRect(0, 0, 460, 300);
      // Road horizon
      const grad = tCtx.createLinearGradient(0, 100, 0, 300);
      grad.addColorStop(0, "#10253b");
      grad.addColorStop(1, "#03080e");
      tCtx.fillStyle = grad;
      tCtx.beginPath();
      tCtx.moveTo(230, 100);
      tCtx.lineTo(460, 300);
      tCtx.lineTo(0, 300);
      tCtx.closePath();
      tCtx.fill();
      // Lane lines
      tCtx.strokeStyle = "#ffd15c";
      tCtx.setLineDash([15, 10]);
      tCtx.lineWidth = 3;
      tCtx.beginPath();
      tCtx.moveTo(230, 100);
      tCtx.lineTo(230, 300);
      tCtx.stroke();
      tCtx.setLineDash([]);
      // Vehicle ahead
      tCtx.fillStyle = "#267cff";
      tCtx.fillRect(205, 125, 50, 35);
      tCtx.fillStyle = "#ff2a55";
      tCtx.fillRect(210, 148, 10, 6);
      tCtx.fillRect(240, 148, 10, 6);
    } else if (type === "portrait") {
      // Geometric biometric face silhouette
      tCtx.fillStyle = "#05111d";
      tCtx.fillRect(0, 0, 460, 300);
      // Face oval
      tCtx.strokeStyle = "#00d9ff";
      tCtx.lineWidth = 2;
      tCtx.beginPath();
      tCtx.ellipse(230, 150, 75, 105, 0, 0, Math.PI * 2);
      tCtx.stroke();
      // Eyes
      tCtx.fillStyle = "#168cff";
      tCtx.beginPath();
      tCtx.arc(200, 130, 10, 0, Math.PI * 2);
      tCtx.arc(260, 130, 10, 0, Math.PI * 2);
      tCtx.fill();
      // Crosshairs
      tCtx.strokeStyle = "#00f0cf";
      tCtx.beginPath();
      tCtx.moveTo(180, 130); tCtx.lineTo(220, 130);
      tCtx.moveTo(240, 130); tCtx.lineTo(280, 130);
      tCtx.stroke();
      // Mouth
      tCtx.beginPath();
      tCtx.arc(230, 195, 30, 0.2, Math.PI - 0.2);
      tCtx.stroke();
    } else {
      // Abstract shapes / test pattern
      tCtx.fillStyle = "#040b14";
      tCtx.fillRect(0, 0, 460, 300);
      for (let i = 0; i < 6; i++) {
        tCtx.fillStyle = i % 2 === 0 ? "#168cff" : "#00d9ff";
        tCtx.beginPath();
        tCtx.arc(60 + i * 65, 150, 26 + (i * 4), 0, Math.PI * 2);
        tCtx.fill();
      }
    }
    return tempCanvas.toDataURL();
  }

  function loadAndProcess(imgSrc) {
    currentImage.onload = () => {
      canvas.width = 460;
      canvas.height = 300;
      processPipeline();
    };
    currentImage.src = imgSrc;
  }

  // Initial load with autonomous driving preset
  loadAndProcess(generateSyntheticPreset("autonomous"));

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      presetBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const presetType = btn.getAttribute("data-preset");
      loadAndProcess(generateSyntheticPreset(presetType));
    });
  });

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          presetBtns.forEach(b => b.classList.remove("active"));
          loadAndProcess(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", processPipeline);
  }

  if (threshSlider) {
    threshSlider.addEventListener("input", (e) => {
      if (threshVal) threshVal.textContent = e.target.value;
      processPipeline();
    });
  }

  function processPipeline() {
    if (!currentImage.width || !canvas.width) return;
    const t0 = performance.now();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw original image scaled to canvas
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

    const filter = filterSelect ? filterSelect.value : "original";
    const threshold = threshSlider ? parseInt(threshSlider.value, 10) : 128;

    if (filter === "original") {
      updateBenchmark(performance.now() - t0);
      return;
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const w = canvas.width;
    const h = canvas.height;

    if (filter === "grayscale") {
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filter === "threshold") {
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const val = gray > threshold ? 255 : 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filter === "invert") {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filter === "blur") {
      // 3x3 Box Blur
      const copy = new Uint8ClampedArray(data);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          let r = 0, g = 0, b = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const idx = ((y + dy) * w + (x + dx)) * 4;
              r += copy[idx];
              g += copy[idx + 1];
              b += copy[idx + 2];
            }
          }
          const outIdx = (y * w + x) * 4;
          data[outIdx] = r / 9;
          data[outIdx + 1] = g / 9;
          data[outIdx + 2] = b / 9;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filter === "sobel") {
      // Sobel Edge Detection
      const grayArr = new Float32Array(w * h);
      for (let i = 0; i < data.length; i += 4) {
        grayArr[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }

      const gxMat = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
      const gyMat = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          let gx = 0;
          let gy = 0;
          let mIdx = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const pixel = grayArr[(y + ky) * w + (x + kx)];
              gx += pixel * gxMat[mIdx];
              gy += pixel * gyMat[mIdx];
              mIdx++;
            }
          }
          let mag = Math.sqrt(gx * gx + gy * gy);
          mag = mag > (threshold * 0.7) ? 255 : (mag * 0.5);
          const outIdx = (y * w + x) * 4;
          data[outIdx] = 0; // High-tech cyan edge
          data[outIdx + 1] = mag;
          data[outIdx + 2] = mag > 50 ? 255 : 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (filter === "bbox") {
      // AI Bounding Box & Feature Detection Overlay
      // First slightly tint background
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 0.6;
        data[i + 1] = data[i + 1] * 0.7 + 20;
        data[i + 2] = data[i + 2] * 0.9 + 30;
      }
      ctx.putImageData(imgData, 0, 0);

      // Render Detection Bounding Boxes
      const targets = [
        { x: 195, y: 115, w: 75, h: 60, label: "Vehicle [97.8%]", color: "#00d9ff" },
        { x: 30, y: 170, w: 90, h: 80, label: "Lane Boundary [94.2%]", color: "#00f0cf" },
        { x: 320, y: 160, w: 100, h: 70, label: "Obstacle / Guardrail [91.5%]", color: "#ffaa00" }
      ];

      targets.forEach(tgt => {
        ctx.save();
        ctx.strokeStyle = tgt.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 3]);
        ctx.strokeRect(tgt.x, tgt.y, tgt.w, tgt.h);
        ctx.setLineDash([]);

        // Corner brackets
        const bl = 8;
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(tgt.x, tgt.y + bl); ctx.lineTo(tgt.x, tgt.y); ctx.lineTo(tgt.x + bl, tgt.y);
        // Top-right
        ctx.moveTo(tgt.x + tgt.w - bl, tgt.y); ctx.lineTo(tgt.x + tgt.w, tgt.y); ctx.lineTo(tgt.x + tgt.w, tgt.y + bl);
        // Bottom-left
        ctx.moveTo(tgt.x, tgt.y + tgt.h - bl); ctx.lineTo(tgt.x, tgt.y + tgt.h); ctx.lineTo(tgt.x + bl, tgt.y + tgt.h);
        // Bottom-right
        ctx.moveTo(tgt.x + tgt.w - bl, tgt.y + tgt.h); ctx.lineTo(tgt.x + tgt.w, tgt.y + tgt.h); ctx.lineTo(tgt.x + tgt.w, tgt.y + tgt.h - bl);
        ctx.stroke();

        // Label pill
        ctx.fillStyle = "rgba(4, 15, 26, 0.85)";
        ctx.fillRect(tgt.x, tgt.y - 20, ctx.measureText(tgt.label).width + 16, 18);
        ctx.strokeStyle = tgt.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(tgt.x, tgt.y - 20, ctx.measureText(tgt.label).width + 16, 18);

        ctx.fillStyle = tgt.color;
        ctx.font = "bold 11px monospace";
        ctx.fillText(tgt.label, tgt.x + 8, tgt.y - 6);
        ctx.restore();
      });
    }

    const t1 = performance.now();
    updateBenchmark(t1 - t0);
  }

  function updateBenchmark(ms) {
    if (benchmarkSpan) {
      benchmarkSpan.textContent = `${ms.toFixed(1)} ms | Resolution: 460x300 | Frame: 60 FPS`;
    }
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "cv-processed-output.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
}

// ==========================================
// 2. CONVERSATIONAL AI & SENTIMENT NLP DEMO
// ==========================================
function initChatDemo() {
  const chatMessages = document.getElementById("ai-chat-messages");
  const chatInput = document.getElementById("ai-chat-input");
  const chatSendBtn = document.getElementById("ai-chat-send");
  const promptChips = document.querySelectorAll(".prompt-chip");

  // Sentiment elements
  const sentimentInput = document.getElementById("sentiment-input");
  const analyzeBtn = document.getElementById("sentiment-analyze-btn");
  const sentimentScoreBar = document.getElementById("sentiment-score-bar");
  const sentimentBadge = document.getElementById("sentiment-badge");
  const sentimentDetails = document.getElementById("sentiment-details");

  const KNOWLEDGE_BASE = {
    patents: "Aashutosh has filed 5+ patents, including: 1) Blood Glucose and Ketone Risk Detection System (2026, published in India) using transdermal gas flux; 2) Ultrasonic Navigation Device (2025) for robotic obstacle mapping; and 3) AI for Soil Health Forecasting (2025).",
    skills: "Aashutosh specializes in Python, C++, Machine Learning, Deep Learning (CNNs), OpenCV, OpenAI GPT APIs, SQL, Power BI, Streamlit, and IoT sensor fusion.",
    projects: "Key projects include: LLM Conversational AI Chatbot, Emotion-Driven Music Recommendation with CNN & OpenCV, DNA Data Storage using Huffman Coding, and Patented AI Soil Health Forecasting.",
    contact: "You can reach Aashutosh via email at aashutosha262@gmail.com, phone at +91 9608221722, or on LinkedIn at linkedin.com/in/aashutosh-kumar-choudhary.",
    education: "Aashutosh holds a B.E. in Computer Science Engineering (AIML) from Chandigarh University (2022–2026) with a CGPA of 7.38.",
    experience: "Aashutosh is an AI Enthusiast and Innovator actively seeking opportunities in Software Development, AI/ML Engineering, and Data Analytics.",
    default: "Thank you for asking! I'm Aashutosh's interactive AI assistant. You can ask me about his patents, projects, technical skills, education, or how to collaborate on innovative AI & software solutions."
  };

  function appendMessage(sender, text) {
    if (!chatMessages) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;
    const avatar = sender === "user" ? "👤" : "⚡";
    msgDiv.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-bubble">
        <p>${text}</p>
        <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserMessage(query) {
    if (!query || !query.trim()) return;
    appendMessage("user", query);

    const q = query.toLowerCase();
    let reply = KNOWLEDGE_BASE.default;

    if (q.includes("patent") || q.includes("research") || q.includes("glucose") || q.includes("ultrasonic")) {
      reply = KNOWLEDGE_BASE.patents;
    } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("python") || q.includes("c++")) {
      reply = KNOWLEDGE_BASE.skills;
    } else if (q.includes("project") || q.includes("work") || q.includes("chatbot") || q.includes("soil") || q.includes("dna")) {
      reply = KNOWLEDGE_BASE.projects;
    } else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire")) {
      reply = KNOWLEDGE_BASE.contact;
    } else if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("cgpa") || q.includes("degree")) {
      reply = KNOWLEDGE_BASE.education;
    } else if (q.includes("experience") || q.includes("job") || q.includes("opportunity")) {
      reply = KNOWLEDGE_BASE.experience;
    } else if (q.includes("cnn") || q.includes("neural") || q.includes("vision")) {
      reply = "CNNs (Convolutional Neural Networks) apply mathematical convolutions across matrix channels to extract hierarchical visual features—used extensively in Aashutosh's emotion detection and medical image systems.";
    }

    setTimeout(() => {
      appendMessage("ai", reply);
    }, 400);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener("click", () => {
      handleUserMessage(chatInput.value);
      chatInput.value = "";
    });

    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleUserMessage(chatInput.value);
        chatInput.value = "";
      }
    });
  }

  promptChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const promptText = chip.textContent.trim();
      handleUserMessage(promptText);
    });
  });

  // Sentiment Analysis Logic
  function analyzeSentiment(text) {
    if (!text || !text.trim()) return;
    const positiveWords = ["great", "innovative", "excellent", "love", "awesome", "intelligent", "patent", "impressive", "high", "accurate", "best", "good", "future", "success", "fast"];
    const negativeWords = ["bad", "slow", "error", "fail", "poor", "bug", "risk", "difficult", "worst", "broken", "weak"];

    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    let score = 0;
    words.forEach(w => {
      if (positiveWords.includes(w)) score += 1.5;
      if (negativeWords.includes(w)) score -= 1.5;
    });

    // Normalize score to 0 - 100
    let percentage = 50 + (score * 15);
    percentage = Math.max(5, Math.min(98, percentage));

    let label = "Neutral Sentiment";
    let badgeClass = "badge-neutral";
    let tone = "Analytical & Objective";

    if (percentage > 65) {
      label = "Positive / Enthusiastic";
      badgeClass = "badge-positive";
      tone = "Optimistic, Innovative";
    } else if (percentage < 40) {
      label = "Negative / Critical";
      badgeClass = "badge-negative";
      tone = "Cautionary, Concern Raised";
    }

    if (sentimentScoreBar) {
      sentimentScoreBar.style.width = `${percentage}%`;
    }
    if (sentimentBadge) {
      sentimentBadge.textContent = `${label} (${percentage.toFixed(0)}%)`;
      sentimentBadge.className = `status-badge ${badgeClass}`;
    }
    if (sentimentDetails) {
      sentimentDetails.textContent = `Tone: ${tone} | Processed ${words.length} tokens`;
    }
  }

  if (analyzeBtn && sentimentInput) {
    analyzeBtn.addEventListener("click", () => analyzeSentiment(sentimentInput.value));
    sentimentInput.addEventListener("input", () => analyzeSentiment(sentimentInput.value));
  }
}

// ==========================================
// 3. SOIL HEALTH & CROP FORECASTING DEMO
// ==========================================
function initSoilHealthDemo() {
  const nSlider = document.getElementById("soil-n");
  const pSlider = document.getElementById("soil-p");
  const kSlider = document.getElementById("soil-k");
  const moistureSlider = document.getElementById("soil-moisture");
  const phSlider = document.getElementById("soil-ph");
  const tempSlider = document.getElementById("soil-temp");

  const scoreDisplay = document.getElementById("soil-health-score");
  const cropDisplay = document.getElementById("soil-recommended-crop");
  const statusDisplay = document.getElementById("soil-status-text");
  const chartCanvas = document.getElementById("soil-shap-canvas");

  if (!nSlider || !scoreDisplay) return;

  function updatePrediction() {
    const N = parseFloat(nSlider.value);
    const P = parseFloat(pSlider.value);
    const K = parseFloat(kSlider.value);
    const moisture = parseFloat(moistureSlider.value);
    const pH = parseFloat(phSlider.value);
    const temp = parseFloat(tempSlider.value);

    // Update labels
    document.getElementById("soil-n-val").textContent = `${N} mg/kg`;
    document.getElementById("soil-p-val").textContent = `${P} mg/kg`;
    document.getElementById("soil-k-val").textContent = `${K} mg/kg`;
    document.getElementById("soil-moisture-val").textContent = `${moisture}%`;
    document.getElementById("soil-ph-val").textContent = pH.toFixed(1);
    document.getElementById("soil-temp-val").textContent = `${temp}°C`;

    // Algorithmic ML Soil Quality calculation
    // Ideal: N ~ 80, P ~ 50, K ~ 90, moisture ~ 55%, pH ~ 6.5, temp ~ 25°C
    const nDiff = Math.abs(N - 80) / 80;
    const pDiff = Math.abs(P - 50) / 50;
    const kDiff = Math.abs(K - 90) / 90;
    const mDiff = Math.abs(moisture - 55) / 55;
    const phDiff = Math.abs(pH - 6.5) / 6.5;

    let healthScore = 100 - (nDiff * 25 + pDiff * 20 + kDiff * 20 + mDiff * 20 + phDiff * 25);
    healthScore = Math.max(15, Math.min(99, Math.round(healthScore)));

    scoreDisplay.textContent = `${healthScore}%`;

    // Crop recommendation matrix
    let crop = "Wheat (Triticum aestivum)";
    let status = "Optimal Soil Health: High microbial respiration and balanced NPK ratio.";

    if (moisture > 70 && N > 80) {
      crop = "Paddy / Rice (Oryza sativa)";
      status = "High moisture & nitrogen favor wetland cereal grain crops.";
    } else if (pH > 7.5 && K > 100) {
      crop = "Cotton (Gossypium)";
      status = "Alkaline-resilient soil with high potassium suitable for fiber crops.";
    } else if (pH < 6.0 && P > 60) {
      crop = "Maize / Corn (Zea mays)";
      status = "Slightly acidic profile with rich phosphate ideal for maize development.";
    } else if (moisture < 35 && N < 50) {
      crop = "Chickpea / Pulses (Cicer arietinum)";
      status = "Arid soil conditions; legumes recommended for biological nitrogen fixation.";
    }

    cropDisplay.textContent = crop;
    statusDisplay.textContent = status;

    // Render SHAP Feature Attribution Chart
    renderShapChart(chartCanvas, [
      { feature: "Nitrogen (N)", val: (1 - nDiff) * 35 },
      { feature: "Phosphorus (P)", val: (1 - pDiff) * 20 },
      { feature: "Potassium (K)", val: (1 - kDiff) * 20 },
      { feature: "Moisture", val: (1 - mDiff) * 25 },
      { feature: "Soil pH", val: (1 - phDiff) * 30 }
    ]);
  }

  function renderShapChart(canvas, features) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const barHeight = 22;
    const startY = 25;
    const gap = 36;

    features.forEach((f, idx) => {
      const y = startY + idx * gap;
      ctx.fillStyle = "#8ea8c3";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(f.feature, 10, y + 15);

      // Base bar
      const barX = 130;
      const maxBarW = w - 210;
      const barW = Math.max(10, Math.min(maxBarW, (f.val / 35) * maxBarW));

      // Gradient bar
      const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      grad.addColorStop(0, "#168cff");
      grad.addColorStop(1, "#00f0cf");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(barX, y, barW, barHeight, 4) : ctx.fillRect(barX, y, barW, barHeight);
      ctx.fill();

      // Value text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px monospace";
      ctx.fillText(`+${f.val.toFixed(1)}`, barX + barW + 10, y + 15);
    });
  }

  [nSlider, pSlider, kSlider, moistureSlider, phSlider, tempSlider].forEach(s => {
    s.addEventListener("input", updatePrediction);
  });

  window.updateSoilHealthPrediction = updatePrediction;
  updatePrediction();
}

// ==========================================
// 4. ULTRASONIC AUTONOMOUS NAVIGATION DEMO
// ==========================================
function initRoboticsDemo() {
  const canvas = document.getElementById("robotics-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const runBtn = document.getElementById("robot-run-btn");
  const resetBtn = document.getElementById("robot-reset-btn");
  const mazeSelect = document.getElementById("robot-maze-select");
  const sensorDistSpan = document.getElementById("robot-sensor-distance");
  const statusSpan = document.getElementById("robot-nav-status");

  const COLS = 14;
  const ROWS = 10;
  const TILE_SIZE = 30;
  canvas.width = COLS * TILE_SIZE;
  canvas.height = ROWS * TILE_SIZE;

  let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  let startPos = { r: 1, c: 1 };
  let targetPos = { r: ROWS - 2, c: COLS - 2 };
  let currentRobot = { r: startPos.r, c: startPos.c };
  let isNavigating = false;
  let navInterval = null;

  function loadMaze(type) {
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    // Perimeter boundary
    for (let r = 0; r < ROWS; r++) {
      grid[r][0] = 1;
      grid[r][COLS - 1] = 1;
    }
    for (let c = 0; c < COLS; c++) {
      grid[0][c] = 1;
      grid[ROWS - 1][c] = 1;
    }

    if (type === "complex") {
      for (let r = 2; r < 7; r++) grid[r][4] = 1;
      for (let r = 3; r < 9; r++) grid[r][9] = 1;
      for (let c = 4; c < 8; c++) grid[6][c] = 1;
    } else if (type === "obstacles") {
      grid[3][3] = 1; grid[3][4] = 1;
      grid[6][6] = 1; grid[6][7] = 1; grid[7][6] = 1;
      grid[4][10] = 1; grid[5][10] = 1;
    }

    currentRobot = { r: startPos.r, c: startPos.c };
    if (statusSpan) statusSpan.textContent = "Autonomous Standby. Click grid to toggle obstacles.";
    render();
  }

  function render(path = [], sensorBeam = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * TILE_SIZE;
        const y = r * TILE_SIZE;

        // Grid lines
        ctx.strokeStyle = "#122a42";
        ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);

        if (grid[r][c] === 1) {
          // Obstacle / Wall
          ctx.fillStyle = "#1e3a5a";
          ctx.fillRect(x + 1, y + 1, TILE_SIZE - 2, TILE_SIZE - 2);
          ctx.strokeStyle = "#ff4d6d";
          ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        }
      }
    }

    // Planned Path
    if (path.length > 0) {
      ctx.strokeStyle = "rgba(0, 217, 255, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      path.forEach((pt, i) => {
        const px = pt.c * TILE_SIZE + TILE_SIZE / 2;
        const py = pt.r * TILE_SIZE + TILE_SIZE / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Target Node (Beacon)
    const tx = targetPos.c * TILE_SIZE + TILE_SIZE / 2;
    const ty = targetPos.r * TILE_SIZE + TILE_SIZE / 2;
    ctx.fillStyle = "#00f0cf";
    ctx.beginPath();
    ctx.arc(tx, ty, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ultrasonic Sensor Ping Rays
    if (sensorBeam) {
      ctx.strokeStyle = "rgba(0, 240, 207, 0.8)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 2]);
      ctx.beginPath();
      ctx.moveTo(sensorBeam.x1, sensorBeam.y1);
      ctx.lineTo(sensorBeam.x2, sensorBeam.y2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Robot Node
    const rx = currentRobot.c * TILE_SIZE + TILE_SIZE / 2;
    const ry = currentRobot.r * TILE_SIZE + TILE_SIZE / 2;
    ctx.fillStyle = "#168cff";
    ctx.beginPath();
    ctx.arc(rx, ry, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#00d9ff";
    ctx.lineWidth = 3;
    ctx.stroke();
    // Inner pulse
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(rx, ry, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // BFS / A* Pathfinding
  function findPath() {
    const queue = [[startPos]];
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    visited[startPos.r][startPos.c] = true;

    const dirs = [
      { r: 0, c: 1 },
      { r: 1, c: 0 },
      { r: 0, c: -1 },
      { r: -1, c: 0 }
    ];

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const head = currentPath[currentPath.length - 1];

      if (head.r === targetPos.r && head.c === targetPos.c) {
        return currentPath;
      }

      for (const d of dirs) {
        const nr = head.r + d.r;
        const nc = head.c + d.c;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          if (!visited[nr][nc] && grid[nr][nc] === 0) {
            visited[nr][nc] = true;
            queue.push([...currentPath, { r: nr, c: nc }]);
          }
        }
      }
    }
    return null;
  }

  // Calculate simulated ultrasonic distance to nearest obstacle
  function getNearestObstacleDistance(r, c) {
    let minD = 999;
    for (let dr = -2; dr <= 2; dr++) {
      for (let dc = -2; dc <= 2; dc++) {
        const cr = r + dr;
        const cc = c + dc;
        if (cr >= 0 && cr < ROWS && cc >= 0 && cc < COLS) {
          if (grid[cr][cc] === 1) {
            const dist = Math.hypot(dr * 20, dc * 20);
            if (dist < minD) minD = dist;
          }
        }
      }
    }
    return minD === 999 ? 85 : Math.round(minD + 12);
  }

  function startNavigation() {
    if (isNavigating) return;
    const path = findPath();

    if (!path) {
      if (statusSpan) statusSpan.textContent = "Route Blocked: No collision-free trajectory found!";
      return;
    }

    isNavigating = true;
    if (statusSpan) statusSpan.textContent = "Autonomous Navigation in progress...";
    let step = 0;

    clearInterval(navInterval);
    navInterval = setInterval(() => {
      if (step < path.length) {
        currentRobot = path[step];
        const dist = getNearestObstacleDistance(currentRobot.r, currentRobot.c);
        if (sensorDistSpan) sensorDistSpan.textContent = `${dist} cm`;

        const beam = {
          x1: currentRobot.c * TILE_SIZE + TILE_SIZE / 2,
          y1: currentRobot.r * TILE_SIZE + TILE_SIZE / 2,
          x2: currentRobot.c * TILE_SIZE + TILE_SIZE / 2 + 25,
          y2: currentRobot.r * TILE_SIZE + TILE_SIZE / 2
        };

        render(path, beam);
        step++;
      } else {
        clearInterval(navInterval);
        isNavigating = false;
        if (statusSpan) statusSpan.textContent = "Mission Accomplished: Target waypoint reached safely!";
        render(path);
      }
    }, 180);
  }

  // Toggle walls on click
  canvas.addEventListener("click", (e) => {
    if (isNavigating) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor(x / TILE_SIZE);
    const r = Math.floor(y / TILE_SIZE);

    if (
      (r === startPos.r && c === startPos.c) ||
      (r === targetPos.r && c === targetPos.c) ||
      r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1
    ) {
      return;
    }

    grid[r][c] = grid[r][c] === 1 ? 0 : 1;
    render();
  });

  if (runBtn) runBtn.addEventListener("click", startNavigation);
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearInterval(navInterval);
      isNavigating = false;
      loadMaze(mazeSelect ? mazeSelect.value : "complex");
    });
  }
  if (mazeSelect) {
    mazeSelect.addEventListener("change", (e) => {
      clearInterval(navInterval);
      isNavigating = false;
      loadMaze(e.target.value);
    });
  }

  window.renderRoboticsGrid = () => render();
  loadMaze("complex");
}
