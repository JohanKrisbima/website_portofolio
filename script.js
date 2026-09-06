/**
 * PORTFOLIO SCRIPTS - JOHAN KRISBIMA ABI
 * Modern Interactive Navigation, Dynamic Typewriter, CLI Terminal,
 * Card Spotlight, Category Filters, Stat Counters & Toast System
 */

// =========================================================================
// 0. Immediate Theme Initialization (Prevents Flash of Unstyled Content)
// =========================================================================
(function initThemeImmediately() {
  try {
    const THEME_STORAGE_KEY = "portfolio_theme_mode";
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch (error) {
    console.warn("Theme storage access failed:", error);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. Elements & References
  // =========================================================================
  const navbar = document.querySelector(".navbar-pill");
  const backToTopBtn = document.getElementById("backToTop");
  const scrollProgressBar = document.getElementById("scrollProgressBar");
  const mobileDrawerEl = document.getElementById("mobileMenu");
  const mobileDrawer = mobileDrawerEl ? bootstrap.Offcanvas.getOrCreateInstance(mobileDrawerEl) : null;
  const desktopNavLinks = document.querySelectorAll(".nav-link-pill");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  const sections = document.querySelectorAll("section[id]");
  const certModalEl = document.getElementById("certModal");
  const certModalImg = document.getElementById("certModalImg");
  const certModalTitle = document.getElementById("certModalLabel");
  const certBootstrapModal = certModalEl ? new bootstrap.Modal(certModalEl) : null;
  const toastNotification = document.getElementById("toastNotification");
  const toastMessage = document.getElementById("toastMessage");
  const toastIcon = document.getElementById("toastIcon");

  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeToggleText = document.getElementById("themeToggleText");
  const themeSegBtns = document.querySelectorAll(".theme-seg-btn");
  const THEME_STORAGE_KEY = "portfolio_theme_mode";

  // =========================================================================
  // 2. Toast System Function
  // =========================================================================
  let toastTimer = null;

  function showToast(message, iconClass = "bi-check-circle-fill") {
    if (!toastNotification || !toastMessage) return;

    if (toastIcon) {
      toastIcon.className = `bi ${iconClass} toast-icon`;
    }
    toastMessage.textContent = message;
    toastNotification.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 3200);
  }

  // =========================================================================
  // 3. Theme Manager (Dark & Light Modes)
  // =========================================================================
  function applyTheme(theme, notify = false) {
    const isLight = theme === "light";
    const activeTheme = isLight ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", activeTheme);
    document.body.setAttribute("data-theme", activeTheme);
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme);

    const tooltipLabel = isLight ? "Ganti ke Dark Mode" : "Ganti ke Light Mode";
    const buttonLabel = isLight ? "Light Mode" : "Dark Mode";

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("title", tooltipLabel);
      themeToggleBtn.setAttribute("aria-label", tooltipLabel);
    }
    if (themeToggleText) {
      themeToggleText.textContent = buttonLabel;
    }

    // Sync segmented control buttons in mobile offcanvas
    themeSegBtns.forEach((btn) => {
      const choice = btn.getAttribute("data-theme-choice");
      if (choice === activeTheme) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (notify) {
      showToast(isLight ? "Mode Terang Aktif" : "Mode Gelap Aktif", isLight ? "bi-sun-fill" : "bi-moon-stars-fill");
    }
  }

  // Initialize theme on page load
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme, false);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark", false);
  }

  // Floating Theme button click handler
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const nextTheme = current === "light" ? "dark" : "light";
      applyTheme(nextTheme, true);
    });
  }

  themeSegBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const choice = btn.getAttribute("data-theme-choice");
      if (choice) {
        applyTheme(choice, true);
      }
    });
  });

  // =========================================================================
  // 2. Scroll Progress Bar & Floating Navbar
  // =========================================================================
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Top progress bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Floating navbar blur styling
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (scrollY > 350) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // =========================================================================
  // 3. Dynamic Typewriter Effect for Hero
  // =========================================================================
  const typewriterEl = document.getElementById("heroTypewriter");
  if (typewriterEl) {
    const roles = ["Software Developer", "Backend & RESTful API Specialist", "Experience 1 year as Web Developer"];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        // Pause at end of text
        typeSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 450;
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // =========================================================================
  // 4. Animated Number Counters
  // =========================================================================
  const statCounters = document.querySelectorAll(".stat-counter");
  if (statCounters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counterEl = entry.target;
            const targetNum = parseInt(counterEl.getAttribute("data-target"), 10) || 0;
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(now) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const easeOutProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeOutProgress * targetNum);

              counterEl.textContent = currentVal;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counterEl.textContent = targetNum;
              }
            }

            requestAnimationFrame(updateCounter);
            observer.unobserve(counterEl);
          }
        });
      },
      { threshold: 0.5 },
    );

    statCounters.forEach((counter) => counterObserver.observe(counter));
  }

  // =========================================================================
  // 5. Card Cursor Spotlight Effect (Vercel/Linear Style)
  // =========================================================================
  const spotlightCards = document.querySelectorAll(".spotlight-card");
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // =========================================================================
  // 6. Experience & Project Category Filters
  // =========================================================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const experienceCards = document.querySelectorAll(".experience-card[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterValue = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      experienceCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("is-filtered-out");
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 20);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(() => {
            card.classList.add("is-filtered-out");
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 7. Interactive Developer CLI Terminal Engine
  // =========================================================================
  const terminalInput = document.getElementById("terminalInput");
  const terminalOutput = document.getElementById("terminalOutput");
  const termClearBtn = document.getElementById("termClearBtn");
  const termChips = document.querySelectorAll(".term-chip");
  const commandHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Daftar Perintah Tersedia:</div>
  <div><span class="text-warning">whoami</span>   : Ringkasan profil dan latar belakang Johan</div>
  <div><span class="text-warning">skills</span>   : Daftar keahlian teknis & tech stack utama</div>
  <div><span class="text-warning">projects</span> : Pengalaman & proyek di PT PAL, UBig, Stechoq</div>
  <div><span class="text-warning">cert</span>     : Daftar sertifikasi resmi yang dimiliki</div>
  <div><span class="text-warning">contact</span>  : Kanal komunikasi (WhatsApp, Email, GitHub)</div>
  <div><span class="text-warning">hire</span>     : Status ketersediaan & tawaran kerja</div>
  <div><span class="text-warning">theme</span>    : Mengganti tema tampilan (Dark / Light)</div>
  <div><span class="text-warning">date</span>     : Menampilkan tanggal & waktu lokal saat ini</div>
  <div><span class="text-warning">clear</span>    : Membersihkan tampilan terminal</div>
</div>`,

    whoami: () => `
<div class="term-output-block">
  <div class="text-white fw-bold">Johan Krisbima Abi</div>
  <div class="text-cyan small mb-2">D4 Teknik Informatika &bull; Politeknik Negeri Jember (2021 - 2025) &bull; IPK: 3.87/4.00</div>
  <p class="mb-2 text-light">Saya Johan Krisbima Abi, lulusan D4 Teknik Informatika Politeknik Negeri Jember (2025) dengan pengalaman profesional dalam pengembangan web application melalui program MagangHub yang dilanjutkan dengan kontrak internship di PT PAL Indonesia. Memiliki pengalaman dalam mengembangkan dan memelihara aplikasi web, mulai dari analisis kebutuhan, perancangan, implementasi, hingga pengujian dan penyempurnaan sistem. Memiliki kemampuan teknis yang baik, manajemen waktu yang efektif, serta mampu bekerja secara kolaboratif dan adaptif dalam tim. Berorientasi pada solusi, pengembangan berkelanjutan, dan memberikan kontribusi nyata terhadap pencapaian tujuan perusahaan.</p>
  <div class="text-white-50 small"><i class="bi bi-geo-alt-fill text-danger me-1"></i>Mojokerto, Jawa Timur, 61382 | 087851865091</div>
  <div class="text-info small mt-1"><i class="bi bi-journal-bookmark me-1"></i>Publikasi Jurnal: “Sistem Deteksi Dini Banjir Berbasis GIS Cloud Web di Kelurahan Tambakkemerakan”</div>
</div>`,

    skills: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Skills & Keahlian (Berdasarkan CV):</div>
  <div><strong class="text-info">• Programming:</strong> HTML, CSS, JavaScript, PHP, Python, Bootstrap, Laravel, MySQL, Express Js, PostgreSQL</div>
  <div><strong class="text-info">• Non-Programming:</strong> Microsoft Word, Canva</div>
  <div><strong class="text-info">• Soft Skills:</strong> Problem Solving, Critical Thinking, Growth Mindset, Project Management</div>
  <div><strong class="text-info">• Bahasa:</strong> Indonesia, Passive English</div>
</div>`,

    projects: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Pengalaman & Proyek (Sesuai CV):</div>
  <div class="mb-2">
    <span class="text-warning fw-bold">1. PT Stechoq Robotika Indonesia</span> (Feb 2024 – Jul 2024)<br/>
    <span class="text-cyan small">Backend Developer Intern &bull; Project: Website Management System for Mobile Phone Warehouse</span><br/>
    <span class="text-white-50 small">• Mengembangkan website untuk manajemen gudang handphone, termasuk pencatatan stok masuk dan keluar.</span><br/>
    <span class="text-white-50 small">• Merancang dan membangun API RESTful untuk pengelolaan produk, supplier, dan transaksi gudang.</span><br/>
    <span class="text-white-50 small">• Bertanggung jawab pada sisi backend, termasuk autentikasi pengguna, manajemen database, dan dokumentasi API.</span>
  </div>
  <div class="mb-2">
    <span class="text-warning fw-bold">2. PT Universal Big Data</span> (Jul 2024 – Des 2024)<br/>
    <span class="text-cyan small">Web Automation Intern &bull; Project: Web Scraping for Nobox Extractor App</span><br/>
    <span class="text-white-50 small">• Mengembangkan dan memelihara Nobox Extractor, aplikasi desktop scraping data publik e-commerce global.</span><br/>
    <span class="text-white-50 small">• Mengimplementasikan logika pencarian, pagination, deteksi "no result", dan normalisasi nomor telepon.</span><br/>
    <span class="text-white-50 small">• Menyinkronkan data ke platform Nobox AI, pengujian, debugging, dan optimasi performa.</span>
  </div>
  <div>
    <span class="text-warning fw-bold">3. PT PAL Indonesia</span> (Oct 2025 – Aug 2026)<br/>
    <span class="text-cyan small">Pemrogram Komputer Contract</span><br/>
    <span class="text-white-50 small">• Website Siamang: optimasi absensi, deployment server, dokumentasi UAT & Manual Book.</span><br/>
    <span class="text-white-50 small">• Website Simandok: refactoring codebase framework terbaru, security hardening, dokumentasi UAT.</span><br/>
    <span class="text-white-50 small">• Website Ebidding: pengujian stabilitas lelang tender vendor, UAT, dan video tutorial.</span><br/>
    <span class="text-white-50 small">• Website Subkon: pengembangan end-to-end database, User Management, data karyawan vendor, server deployment.</span>
  </div>
</div>`,

    cert: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Sertifikasi & Penghargaan (Sesuai CV):</div>
  <div><strong class="text-warning">★ Web Developer</strong> — Badan Nasional Sertifikasi Profesi (BNSP) (Aug 2025 – Aug 2028)</div>
  <div><strong class="text-warning">★ Lolos Pendanaan PKM-PM</strong> — Kemendikbudristek (Sistem Deteksi Dini Banjir GIS Cloud Tambak Kemerakan)</div>
  <div>✓ Backend Developer Intern — PT Stechoq Robotika Indonesia (MSIB Kampus Merdeka)</div>
  <div>✓ Web Automation Intern — PT Universal Big Data (MSIB Kampus Merdeka)</div>
  <div>✓ Sertifikat Kepesertaan MSIB — Kemendikbudristek</div>
  <div>✓ Sertifikat MagangHub — Kemnaker & PT PAL Indonesia</div>
</div>`,

    contact: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Kontak Resmi (Sesuai CV):</div>
  <div>• Lokasi    : <span class="text-light">Mojokerto, Jawa Timur, 61382</span></div>
  <div>• WhatsApp  : <a href="https://wa.me/6287851865091" target="_blank" class="text-decoration-none text-success">+62 878-5186-5091 (087851865091)</a></div>
  <div>• Email     : <span class="text-light">johankrisbima77@gmail.com</span></div>
  <div>• LinkedIn  : <a href="https://www.linkedin.com/in/johan-krisbima-abi/" target="_blank" class="text-decoration-none text-info">linkedin.com/in/johan-krisbima-abi</a></div>
  <div>• GitHub    : <a href="https://github.com/JohanKrisbima" target="_blank" class="text-decoration-none text-info">github.com/JohanKrisbima</a></div>
  <div>• Portfolio : <a href="https://website-portofolio-johan.vercel.app/" target="_blank" class="text-decoration-none text-cyan">website-portofolio-johan.vercel.app</a></div>
</div>`,

    hire: () => `
<div class="term-output-block">
  <div class="text-success fw-bold mb-1">Status: Open for Opportunities!</div>
  <div>Saya siap berkontribusi untuk posisi <strong>Full-time</strong>, <strong>Contract</strong>, maupun <strong>Project Freelance</strong>.</div>
  <div class="mt-2">
    <a href="https://wa.me/6287851865091?text=Halo%20Johan,%20kami%20tertarik%20merekrut%20Anda" target="_blank" class="btn-pill-primary py-1 px-3 fs-6 text-decoration-none d-inline-block">
      Chat & Diskusi via WhatsApp
    </a>
  </div>
</div>`,

    theme: () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const nextTheme = current === "light" ? "dark" : "light";
      applyTheme(nextTheme, true);
      return `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Theme Updated:</div>
  <div>Mode tampilan berhasil diubah ke: <span class="text-warning fw-bold">${nextTheme.toUpperCase()} MODE</span></div>
</div>`;
    },

    date: () => `
<div class="term-output-block">
  <span class="text-muted">Local Time:</span> <span class="text-white">${new Date().toLocaleString("id-ID")}</span>
</div>`,
  };

  // Command aliases
  terminalCommands.certificates = terminalCommands.cert;
  terminalCommands.experience = terminalCommands.projects;
  terminalCommands.exp = terminalCommands.projects;
  terminalCommands.project = terminalCommands.projects;
  terminalCommands.bio = terminalCommands.whoami;
  terminalCommands.mode = terminalCommands.theme;
  terminalCommands.dark = () => {
    applyTheme("dark", true);
    return `<div class="term-output-block"><div class="text-cyan fw-bold">Dark Mode Activated</div></div>`;
  };
  terminalCommands.light = () => {
    applyTheme("light", true);
    return `<div class="term-output-block"><div class="text-cyan fw-bold">Light Mode Activated</div></div>`;
  };

  function executeTerminalCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(rawCmd);
    historyIndex = commandHistory.length;

    // Echo input command line (compact on mobile)
    const isMobile = window.innerWidth <= 576;
    const promptUser = isMobile ? "johan" : "guest@johan.dev";
    const cmdEcho = document.createElement("div");
    cmdEcho.className = "term-line";
    cmdEcho.innerHTML = `<span class="term-prompt-user">${promptUser}</span>:<span class="term-prompt-path">~</span>$ <span class="term-cmd-echo">${escapeHtml(rawCmd)}</span>`;
    terminalOutput.appendChild(cmdEcho);

    if (cmd === "clear" || cmd === "cls") {
      terminalOutput.innerHTML = `
        <div class="term-line term-welcome">
          <span class="text-cyan fw-bold">Johan.dev Interactive Shell v2.4</span> [Type <span class="text-warning">'help'</span> or click buttons above]
        </div>`;
      return;
    }

    const outputEl = document.createElement("div");
    outputEl.className = "term-line";

    if (terminalCommands[cmd]) {
      outputEl.innerHTML = terminalCommands[cmd]();
    } else {
      outputEl.innerHTML = `
        <div class="term-output-block text-danger">
          Perintah <span class="text-warning">'${escapeHtml(cmd)}'</span> tidak dikenali. Ketik <span class="text-cyan">'help'</span> untuk melihat perintah yang tersedia.
        </div>`;
    }

    terminalOutput.appendChild(outputEl);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        executeTerminalCommand(terminalInput.value);
        terminalInput.value = "";
      } else if (e.key === "ArrowUp") {
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex] || "";
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = "";
        }
      }
    });
  }

  if (termClearBtn) {
    termClearBtn.addEventListener("click", () => {
      executeTerminalCommand("clear");
      if (terminalInput) terminalInput.focus();
    });
  }

  const termSendBtn = document.getElementById("termSendBtn");
  if (termSendBtn && terminalInput) {
    termSendBtn.addEventListener("click", () => {
      const val = terminalInput.value.trim();
      if (val) {
        executeTerminalCommand(val);
        terminalInput.value = "";
      } else {
        executeTerminalCommand("help");
      }
      terminalInput.focus();
    });
  }

  termChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cmd = chip.getAttribute("data-cmd");
      if (cmd) {
        executeTerminalCommand(cmd);
        if (terminalInput) terminalInput.focus();
      }
    });
  });

  // =========================================================================
  // 8. Quick Message Composer (WhatsApp Direct Form)
  // =========================================================================
  const btnSendComposer = document.getElementById("btnSendComposer");
  const composerName = document.getElementById("composerName");
  const composerTopic = document.getElementById("composerTopic");
  const composerMessage = document.getElementById("composerMessage");

  if (btnSendComposer) {
    btnSendComposer.addEventListener("click", () => {
      const name = composerName && composerName.value.trim() ? composerName.value.trim() : "Rekan Kerja / Rekruter";
      const topic = composerTopic ? composerTopic.value : "Diskusi Peluang Kerja";
      const message = composerMessage && composerMessage.value.trim() ? composerMessage.value.trim() : "-";

      const formattedText = `Halo Johan Krisbima Abi,

Saya: ${name}
Topik: ${topic}
Catatan: ${message}

Saya melihat portofolio Anda di website dan ingin berdiskusi lebih lanjut. Terima kasih!`;

      const waUrl = `https://wa.me/6287851865091?text=${encodeURIComponent(formattedText)}`;
      showToast("Membuka WhatsApp...", "bi-whatsapp");
      window.open(waUrl, "_blank");
    });
  }

  // =========================================================================
  // 9. Quick Copy to Clipboard System
  // =========================================================================
  const copyButtons = document.querySelectorAll("[data-copy]");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast(`Berhasil disalin: ${textToCopy}`);
          })
          .catch(() => {
            fallbackCopy(textToCopy);
          });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showToast(`Berhasil disalin: ${text}`);
    } catch (err) {
      showToast("Gagal menyalin teks", "bi-exclamation-triangle-fill");
    }
    document.body.removeChild(textArea);
  }

  // =========================================================================
  // 10. Certificate & Experience Modal Lightbox (Single & Multi-Image Gallery)
  // =========================================================================
  const certCards = document.querySelectorAll(".cert-card");
  const expProofBtns = document.querySelectorAll(".btn-exp-proof");
  const certModalDesc = document.getElementById("certModalDesc");
  const modalSingleContainer = document.getElementById("modalSingleContainer");
  const modalGalleryCarousel = document.getElementById("modalGalleryCarousel");
  const modalGalleryInner = document.getElementById("modalGalleryInner");
  const galleryCaption = document.getElementById("galleryCaption");
  const galleryCounter = document.getElementById("galleryCounter");

  let currentGalleryItems = [];

  function updateGalleryFooter(index) {
    if (!currentGalleryItems || currentGalleryItems.length === 0) return;
    const item = currentGalleryItems[index];
    if (galleryCaption && item) {
      galleryCaption.textContent = item.caption || `Dokumentasi ${index + 1}`;
    }
    if (galleryCounter) {
      galleryCounter.textContent = `${index + 1} / ${currentGalleryItems.length}`;
    }
  }

  // Certificate card single click
  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-cert-img");
      const title = card.getAttribute("data-cert-title");

      if (imgSrc && certBootstrapModal && certModalImg && certModalTitle) {
        if (modalGalleryCarousel) modalGalleryCarousel.classList.add("d-none");
        if (modalSingleContainer) modalSingleContainer.classList.remove("d-none");

        certModalImg.src = imgSrc;
        certModalTitle.textContent = title || "Detail Sertifikat";
        if (certModalDesc) certModalDesc.textContent = "Sertifikasi Resmi & Terverifikasi";
        certBootstrapModal.show();
      }
    });
  });

  // Experience Proof click (supports data-gallery JSON or single data-proof-img)
  expProofBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const galleryAttr = btn.getAttribute("data-gallery");
      const singleImg = btn.getAttribute("data-proof-img");
      const title = btn.getAttribute("data-proof-title");
      const desc = btn.getAttribute("data-proof-desc");

      if (!certBootstrapModal || !certModalTitle) return;

      certModalTitle.textContent = title || "Dokumentasi Pengalaman Kerja";
      if (certModalDesc) certModalDesc.textContent = desc || "Dokumentasi Terverifikasi";

      currentGalleryItems = [];
      if (galleryAttr) {
        try {
          currentGalleryItems = JSON.parse(galleryAttr);
        } catch (err) {
          console.error("Failed to parse gallery JSON", err);
          currentGalleryItems = [];
        }
      } else if (singleImg) {
        currentGalleryItems = [{ src: singleImg, caption: title || "Dokumentasi Kerja" }];
      }

      if (currentGalleryItems.length > 1 && modalGalleryCarousel && modalGalleryInner) {
        // Multi-image gallery mode
        if (modalSingleContainer) modalSingleContainer.classList.add("d-none");
        modalGalleryCarousel.classList.remove("d-none");

        modalGalleryInner.innerHTML = currentGalleryItems
          .map(
            (item, idx) => `
          <div class="carousel-item ${idx === 0 ? "active" : ""}">
            <div class="text-center">
              <img src="${item.src}" class="modal-cert-img" alt="${escapeHtml(item.caption || "Dokumentasi Proyek")}" />
            </div>
          </div>
        `,
          )
          .join("");

        updateGalleryFooter(0);

        const bsCarousel = bootstrap.Carousel.getOrCreateInstance(modalGalleryCarousel, {
          interval: false,
          wrap: true,
        });
        bsCarousel.to(0);

        certBootstrapModal.show();
      } else if (currentGalleryItems.length === 1 && modalSingleContainer && certModalImg) {
        // Single image mode
        if (modalGalleryCarousel) modalGalleryCarousel.classList.add("d-none");
        modalSingleContainer.classList.remove("d-none");

        certModalImg.src = currentGalleryItems[0].src;
        if (currentGalleryItems[0].caption && certModalDesc) {
          certModalDesc.textContent = currentGalleryItems[0].caption;
        }
        certBootstrapModal.show();
      }
    });
  });

  if (modalGalleryCarousel) {
    modalGalleryCarousel.addEventListener("slid.bs.carousel", (e) => {
      updateGalleryFooter(e.to);
    });
  }

  // =========================================================================
  // 11. Navigation Links & Smooth Scrolling with Offset
  // =========================================================================
  function updateActiveNav(activeId) {
    desktopNavLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${activeId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    mobileNavItems.forEach((link) => {
      if (link.getAttribute("href") === `#${activeId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function scrollToTarget(targetId) {
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      const headerOffset = 90;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }

  desktopNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      scrollToTarget(targetId);
      updateActiveNav(targetId.replace("#", ""));
    });
  });

  mobileNavItems.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (mobileDrawer) {
        mobileDrawer.hide();
      }

      setTimeout(() => {
        scrollToTarget(targetId);
        updateActiveNav(targetId.replace("#", ""));
      }, 300);
    });
  });

  // =========================================================================
  // 12. Dynamic ScrollSpy Tracking
  // =========================================================================
  function handleScrollSpy() {
    const scrollY = window.pageYOffset;
    let currentSectionId = "home";

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
      currentSectionId = "contact";
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id");
        }
      });
    }

    updateActiveNav(currentSectionId);
  }

  window.addEventListener("scroll", handleScrollSpy);
  handleScrollSpy();
});
