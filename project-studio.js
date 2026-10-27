/**
 * project-studio.js
 * Enables the user to implement new projects, live demos, and achievements directly in the portfolio.
 * Provides in-browser preview, localStorage persistence, and code export for GitHub Pages.
 */

document.addEventListener("DOMContentLoaded", () => {
  initProjectStudio();
  renderProjectsGrid();
  renderPatentsGrid();
  renderCertificationsGrid();
});

// Render Projects from ProjectStore
function renderProjectsGrid(filterCategory = "all") {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const projects = ProjectStore.getAllProjects();
  const filtered = filterCategory === "all"
    ? projects
    : projects.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No projects found in this category yet.</p>
        <button class="btn primary open-studio-btn" style="margin-top: 15px;">+ Implement First Project</button>
      </div>
    `;
    attachStudioTriggers();
    return;
  }

  container.innerHTML = filtered.map((p, idx) => {
    const isCustom = p.isCustom;
    const badgeText = p.badge || (isCustom ? "Custom Project" : "Project");
    const techTags = (p.tech || []).map(t => `<span class="tech-pill">${t}</span>`).join("");
    const num = (idx + 1).toString().padStart(2, "0");

    return `
      <article class="project-card ${isCustom ? 'custom-project-card' : ''}" data-project-id="${p.id}">
        <div class="card-glow-overlay"></div>
        <div class="card-header">
          <span class="project-num">${num}</span>
          <span class="project-badge">${badgeText}</span>
          ${isCustom ? `<button class="delete-proj-btn" title="Delete custom project" data-delete-id="${p.id}">✕</button>` : ''}
        </div>
        
        <h3 class="project-title">${p.title}</h3>
        <p class="project-domain"><b>Domain:</b> ${p.domain || "AI & Software"}</p>
        <p class="project-summary">${p.summary}</p>
        
        <div class="project-metrics">
          <span class="metric-icon">⚡</span>
          <strong>${p.metrics || "Validated Prototype"}</strong>
        </div>

        <div class="project-tech-tags">
          ${techTags}
        </div>

        <div class="project-actions">
          ${p.liveDemoUrl && p.liveDemoUrl.startsWith("#") 
            ? `<a href="${p.liveDemoUrl}" class="card-btn primary-subtle">🎮 Launch Live Demo</a>` 
            : (p.liveDemoUrl 
                ? `<a href="${p.liveDemoUrl}" target="_blank" rel="noopener" class="card-btn primary-subtle">🚀 Live Demo ↗</a>` 
                : `<button class="card-btn primary-subtle view-details-btn" data-id="${p.id}">🔍 View Details</button>`)}
          
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="card-btn outline-subtle">Code ↗</a>` : ''}
        </div>
      </article>
    `;
  }).join("");

  attachDeleteHandlers();
  attachDetailsModal();
  attachStudioTriggers();
}

// Render Patents
function renderPatentsGrid() {
  const container = document.getElementById("patents-timeline");
  if (!container) return;

  container.innerHTML = PATENTS_DATA.map(pat => `
    <div class="timeline-item">
      <div class="timeline-year"><b>${pat.year}</b></div>
      <div class="timeline-card">
        <div class="pat-header">
          <span class="pat-status-pill">${pat.status}</span>
          <span class="pat-jurisdiction">📍 ${pat.jurisdiction}</span>
        </div>
        <h3 class="pat-title">${pat.title}</h3>
        <p class="pat-abstract">${pat.abstract}</p>
        <div class="pat-tags">
          ${pat.tags.map(t => `<span class="pat-tag">${t}</span>`).join("")}
        </div>
        <div class="pat-footer">
          <small>App No: <code>${pat.applicationNo}</code></small>
          <button class="text-link-btn view-patent-modal-btn" data-pat-id="${pat.id}">View Architecture Details →</button>
        </div>
      </div>
    </div>
  `).join("");

  // Patent detail modal click
  document.querySelectorAll(".view-patent-modal-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.getAttribute("data-pat-id");
      const patent = PATENTS_DATA.find(p => p.id === pid);
      if (patent) openPatentModal(patent);
    });
  });
}

// Render Certifications & Milestones
function renderCertificationsGrid() {
  const container = document.getElementById("certifications-container");
  if (!container) return;

  container.innerHTML = CERTIFICATIONS_DATA.map(cert => `
    <article class="cert-card">
      <div class="cert-top">
        <span class="cert-badge">${cert.badge}</span>
        <span class="cert-year">${cert.date}</span>
      </div>
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-issuer">🏛️ ${cert.issuer}</p>
      <p class="cert-desc">${cert.description}</p>
      <a href="${cert.verificationUrl}" target="_blank" rel="noopener" class="cert-link">Verify Credential ↗</a>
    </article>
  `).join("");
}

// Attach Delete Handlers for custom projects
function attachDeleteHandlers() {
  document.querySelectorAll(".delete-proj-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-delete-id");
      if (confirm("Are you sure you want to delete this custom project from your portfolio?")) {
        ProjectStore.removeProject(id);
        renderProjectsGrid();
        showToast("Project removed successfully.");
      }
    });
  });
}

function attachDetailsModal() {
  document.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const project = ProjectStore.getAllProjects().find(p => p.id === id);
      if (project) openProjectModal(project);
    });
  });
}

function attachStudioTriggers() {
  document.querySelectorAll(".open-studio-btn").forEach(btn => {
    btn.removeEventListener("click", openStudioModal);
    btn.addEventListener("click", openStudioModal);
  });
}

// Project Studio Modal Logic
function initProjectStudio() {
  const studioModal = document.getElementById("project-studio-modal");
  const closeBtn = document.getElementById("close-studio-modal-btn");
  const saveBtn = document.getElementById("studio-save-project-btn");
  const previewBtn = document.getElementById("studio-preview-demo-btn");
  const exportBtn = document.getElementById("studio-export-code-btn");
  const previewContainer = document.getElementById("studio-preview-container");
  const exportOutput = document.getElementById("studio-export-code-output");

  // Tab filters
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-filter");
      renderProjectsGrid(cat);
    });
  });

  if (closeBtn && studioModal) {
    closeBtn.addEventListener("click", closeStudioModal);
    studioModal.addEventListener("click", (e) => {
      if (e.target === studioModal) closeStudioModal();
    });
  }

  // Preview Live Demo
  if (previewBtn) {
    previewBtn.addEventListener("click", () => {
      const title = document.getElementById("studio-title").value || "Untitled Project";
      const demoUrl = document.getElementById("studio-demo-url").value.trim();
      const demoMode = document.getElementById("studio-demo-type").value;
      const customCode = document.getElementById("studio-custom-code").value.trim();

      previewContainer.style.display = "block";

      if (demoMode === "embed-url" && demoUrl) {
        previewContainer.innerHTML = `
          <div class="preview-header">
            <strong>Live Iframe Preview: ${title}</strong>
            <small>${demoUrl}</small>
          </div>
          <iframe src="${demoUrl}" title="${title}" class="preview-iframe" sandbox="allow-scripts allow-same-origin"></iframe>
        `;
      } else if (demoMode === "canvas" || customCode) {
        previewContainer.innerHTML = `
          <div class="preview-header">
            <strong>Custom Interactive Sandbox Preview: ${title}</strong>
          </div>
          <div id="preview-sandbox-mount" class="preview-sandbox"></div>
        `;
        const mount = document.getElementById("preview-sandbox-mount");
        try {
          const runSandbox = new Function("container", customCode || `
            container.innerHTML = "<div style='padding:20px; text-align:center; color:#00d9ff;'><h3>✨ Custom Interactive Code Active</h3><p>Canvas / WebGL rendering simulation running smoothly.</p></div>";
          `);
          runSandbox(mount);
        } catch (err) {
          previewContainer.innerHTML += `<div class="error-box">Code Execution Error: ${err.message}</div>`;
        }
      } else {
        previewContainer.innerHTML = `
          <div class="preview-header">
            <strong>Standard Card & Live Anchor Preview</strong>
          </div>
          <p style="padding:15px; color:#a0b8d2;">No external URL or custom code provided. The project will link directly to: <code>${demoUrl || '#live-demos'}</code></p>
        `;
      }
    });
  }

  // Save Project
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const title = document.getElementById("studio-title").value.trim();
      if (!title) {
        alert("Please enter a project title.");
        return;
      }

      const category = document.getElementById("studio-category").value;
      const domain = document.getElementById("studio-domain").value || "AI & Software";
      const summary = document.getElementById("studio-summary").value || "Innovative technological project and prototype.";
      const details = document.getElementById("studio-details").value || summary;
      const techStr = document.getElementById("studio-tech").value || "Python, Machine Learning";
      const tech = techStr.split(",").map(t => t.trim()).filter(Boolean);
      const metrics = document.getElementById("studio-metrics").value || "Prototype Validated";
      const liveDemoUrl = document.getElementById("studio-demo-url").value.trim() || "#live-demos";
      const github = document.getElementById("studio-github").value.trim() || "https://github.com/aashutosh-kumar-choudhary";
      const badge = document.getElementById("studio-badge").value || "Custom AI";

      const newProject = {
        title,
        category,
        domain,
        summary,
        details,
        tech,
        metrics,
        liveDemoUrl,
        github,
        badge
      };

      const added = ProjectStore.addProject(newProject);
      if (added) {
        renderProjectsGrid();
        closeStudioModal();
        showToast(`🎉 "${title}" successfully added and published to portfolio!`);

        // Scroll to projects section smoothly
        const projSec = document.getElementById("projects");
        if (projSec) projSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Export JSON Snippet
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const title = document.getElementById("studio-title").value.trim() || "New AI Project";
      const category = document.getElementById("studio-category").value;
      const domain = document.getElementById("studio-domain").value || "AI & Software";
      const summary = document.getElementById("studio-summary").value || "Project description.";
      const techStr = document.getElementById("studio-tech").value || "Python";
      const tech = techStr.split(",").map(t => t.trim()).filter(Boolean);
      const metrics = document.getElementById("studio-metrics").value || "95% Accuracy";
      const liveDemoUrl = document.getElementById("studio-demo-url").value.trim() || "#live-demos";
      const github = document.getElementById("studio-github").value.trim() || "https://github.com/aashutosh-kumar-choudhary";
      const badge = document.getElementById("studio-badge").value || "Innovative";

      const snippet = JSON.stringify({
        id: "proj-" + (Math.floor(Math.random() * 900) + 100),
        title,
        category,
        domain,
        summary,
        details: summary,
        tech,
        metrics,
        liveDemoUrl,
        github,
        badge
      }, null, 2);

      exportOutput.style.display = "block";
      exportOutput.value = snippet;
      exportOutput.select();
      document.execCommand("copy");
      showToast("Code snippet copied to clipboard! You can paste it into projects-data.js.");
    });
  }
}

function openStudioModal() {
  const modal = document.getElementById("project-studio-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeStudioModal() {
  const modal = document.getElementById("project-studio-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Project Details Modal
function openProjectModal(project) {
  let modal = document.getElementById("project-details-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "project-details-modal";
    modal.className = "custom-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div>
          <span class="project-badge">${project.badge || "Project"}</span>
          <h2>${project.title}</h2>
        </div>
        <button class="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <p class="modal-domain"><strong>Technical Domain:</strong> ${project.domain || "AI / Software"}</p>
        <p class="modal-desc">${project.details || project.summary}</p>
        
        <div class="modal-highlight-box">
          <div><span>Performance Metric</span><strong>${project.metrics || "Validated Prototype"}</strong></div>
          <div><span>Category</span><strong>${project.category.toUpperCase()}</strong></div>
        </div>

        <div class="modal-tech-list">
          <h4>Technologies Used:</h4>
          <div class="tech-pills-wrap">
            ${(project.tech || []).map(t => `<span class="tech-pill">${t}</span>`).join("")}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn outline">View GitHub Repo ↗</a>` : ''}
        ${project.liveDemoUrl && project.liveDemoUrl.startsWith("#")
          ? `<a href="${project.liveDemoUrl}" class="btn primary modal-demo-link">Launch Live Demo</a>`
          : (project.liveDemoUrl ? `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener" class="btn primary">Open Live Demo ↗</a>` : '')}
      </div>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  const close = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  modal.querySelector(".modal-close-btn").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  const demoLink = modal.querySelector(".modal-demo-link");
  if (demoLink) demoLink.addEventListener("click", close);
}

// Patent Details Modal
function openPatentModal(patent) {
  let modal = document.getElementById("patent-details-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "patent-details-modal";
    modal.className = "custom-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div>
          <span class="pat-status-pill">${patent.status}</span>
          <h2>${patent.title}</h2>
        </div>
        <button class="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-meta-row">
          <div><span>Jurisdiction</span><strong>${patent.jurisdiction}</strong></div>
          <div><span>Year</span><strong>${patent.year}</strong></div>
          <div><span>Application Reference</span><strong>${patent.applicationNo}</strong></div>
        </div>

        <h4 style="margin: 15px 0 8px; color: #3db0ff;">Technical Abstract & Innovation Architecture:</h4>
        <p class="modal-desc" style="line-height: 1.7; color: #d6e3f0;">${patent.abstract}</p>

        <div class="pat-tags" style="margin-top: 15px;">
          ${patent.tags.map(t => `<span class="pat-tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="modal-footer">
        <a href="https://ipindiaservices.gov.in/publicsearch" target="_blank" rel="noopener" class="btn outline">Verify on Indian Patent Portal ↗</a>
        <a href="mailto:aashutosha262@gmail.com?subject=Inquiry regarding Patent: ${encodeURIComponent(patent.title)}" class="btn primary">Request Full Patent Spec</a>
      </div>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  const close = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  modal.querySelector(".modal-close-btn").addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
}

// Toast Notification System
function showToast(message, duration = 3500) {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerHTML = `
    <span class="toast-icon">⚡</span>
    <span class="toast-msg">${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

window.showToast = showToast;
window.openStudioModal = openStudioModal;
