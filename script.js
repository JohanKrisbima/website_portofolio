/**
 * PORTFOLIO SCRIPTS - JOHAN KRISBIMA ABI
 * Modern Interactive Navigation, Dynamic Typewriter, CLI Terminal,
 * Card Spotlight, Category Filters, Stat Counters & Toast System
 */

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
    const roles = ["Software Developer", "Backend & RESTful API Specialist", "Web Automation Engineer", "Laravel & Node.js Specialist"];
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
  <div><span class="text-warning">date</span>     : Menampilkan tanggal & waktu lokal saat ini</div>
  <div><span class="text-warning">clear</span>    : Membersihkan tampilan terminal</div>
</div>`,

    whoami: () => `
<div class="term-output-block">
  <div class="text-white fw-bold">Johan Krisbima Abi</div>
  <div class="text-muted small mb-2">D4 Teknik Informatika - Politeknik Negeri Jember (2025)</div>
  <p class="mb-1 text-light">Saya Johan Krisbima Abi, lulusan D4 Teknik Informatika Politeknik Negeri Jember (2025) dengan pengalaman profesional dalam pengembangan aplikasi web melalui program MagangHub dan berlanjut ke kontrak kerja di PT PAL Indonesia.

Memiliki keahlian teruji dalam siklus penuh pengembangan perangkat lunak—mulai dari analisis kebutuhan bisnis, perancangan basis data, implementasi backend & frontend, security hardening, hingga testing dan deployment di lingkungan server perusahaan. Kolaboratif, adaptif, serta berorientasi pada solusi nyata.</p>
  <div class="text-cyan small"><i class="bi bi-geo-alt"></i> Indonesia (Remote / On-site Ready)</div>
</div>`,

    skills: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Keahlian & Tech Stack:</div>
  <div><strong class="text-info">• Backend:</strong> Laravel, Node.js, Express.js, C#, .NET, Odoo ERP</div>
  <div><strong class="text-info">• Database:</strong> MySQL, PostgreSQL (Query Optimization & Schema Design)</div>
  <div><strong class="text-info">• Web Automation:</strong> Desktop Data Scraper (C#/.NET), Multi-threading</div>
  <div><strong class="text-info">• Tools & DevOps:</strong> Git, Postman, Swagger, Jest, Server Deployment</div>
</div>`,

    projects: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Riwayat Pengalaman & Proyek:</div>
  <div class="mb-2">
    <span class="text-warning">1. PT PAL Indonesia</span> - Pemrogram Komputer Contract (2025 - 2026)<br/>
    <span class="text-white-50">Mengembangkan & mengamankan sistem enterprise end-to-end: Website Subkon (Absensi Vendor), Simandok (Refactoring & Security), Siamang (Absensi Makan), serta Ebidding (Lelang Tender) beserta dokumentasi UAT & panduan pengguna.</span>
  </div>
  <div class="mb-2">
    <span class="text-warning">2. PT Universal Big Data</span> - Web Automation Intern (2024)<br/>
    <span class="text-white-50">Nobox Extractor desktop application (C# .NET) untuk automated marketplace scraping.</span>
  </div>
  <div>
    <span class="text-warning">3. PT Stechoq Robotika</span> - Backend Developer Intern (2024)<br/>
    <span class="text-white-50">Warehouse Management RESTful API menggunakan Express.js, Node.js, dan MySQL.</span>
  </div>
</div>`,

    cert: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Sertifikasi Terverifikasi:</div>
  <div>✓ Sertifikat Kepesertaan MSIB - Kampus Merdeka Kemendikbudristek</div>
  <div>✓ Backend Developer Intern - PT Stechoq Robotika Indonesia</div>
  <div>✓ Web Automation Intern - PT Universal Big Data</div>
  <div>✓ Sertifikat PKM - Program Kreativitas Mahasiswa</div>
  <div>✓ Certificate of Completion - Universal Big Data</div>
  <div>✓ Sertifikat MagangHub - Kemnaker & PT PAL Indonesia</div>
</div>`,

    contact: () => `
<div class="term-output-block">
  <div class="text-cyan fw-bold mb-1">Hubungi Johan:</div>
  <div>• WhatsApp : <a href="https://wa.me/6287851865091" target="_blank" class="text-decoration-none text-success">+62 878-5186-5091</a></div>
  <div>• Email    : <span class="text-light">johankrisbimaabi@gmail.com</span></div>
  <div>• GitHub   : <a href="https://github.com/JohanKrisbima" target="_blank" class="text-decoration-none text-info">github.com/JohanKrisbima</a></div>
  <div>• Instagram: <a href="https://instagram.com/johankrisbima" target="_blank" class="text-decoration-none text-danger">@johankrisbima</a></div>
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
  // 9. Quick Copy to Clipboard & Toast System
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
