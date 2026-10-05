// 1. Initial Scroll reset
window.scrollTo(0, 0);

// 2. Lenis smooth scroll instantiation (with graceful fallback if CDN is blocked/offline)
const LenisClass = window.Lenis;
let lenis = null;
if (typeof LenisClass === "function") {
  try {
    lenis = new LenisClass({ smoothWheel: true });
    function raf(t) {
      if (lenis && typeof lenis.raf === "function") lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (err) {
    console.warn("Lenis initialization error:", err);
    lenis = null;
  }
}

if (!lenis) {
  lenis = {
    raf: function () {},
    stop: function () {},
    start: function () {},
  };
}

// 3. Scroll lock model
let scrollEnabled = true;
function stopScroll() {
  scrollEnabled = false;
  if (lenis && typeof lenis.stop === "function") lenis.stop();
  document.documentElement.style.position = "relative";
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.height = "100%";
}
function startScroll() {
  scrollEnabled = true;
  if (lenis && typeof lenis.start === "function") lenis.start();
  document.documentElement.style.removeProperty("position");
  document.documentElement.style.removeProperty("overflow");
  document.documentElement.style.removeProperty("height");
}

// 4. Smooth scrollTo(id) helper
function smoothScrollToId(targetId) {
  if (targetId === "home" || targetId === "top") {
    if (lenis && typeof lenis.stop === "function") lenis.stop();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      if (scrollEnabled && lenis && typeof lenis.start === "function") lenis.start();
    }, 100);
    return;
  }
  const el = document.getElementById(targetId);
  if (!el) return;
  if (lenis && typeof lenis.stop === "function") lenis.stop();
  setTimeout(() => {
    const headerEl = document.getElementById("siteHeader");
    const headerHeight = headerEl ? headerEl.offsetHeight : 70;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setTimeout(() => {
      if (scrollEnabled && lenis && typeof lenis.start === "function") lenis.start();
    }, 100);
  }, 50);
}

// Bind all data-scroll-to elements
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = btn.getAttribute("data-scroll-to");
    if (target) {
      closeNavMenu();
      smoothScrollToId(target);
    }
  });
});

document.getElementById("headerBrandBtn")?.addEventListener("click", () => {
  smoothScrollToId("home");
});

// Sticky Header Scroll Elevation & Glassmorphism
function initStickyHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const updateStickyState = () => {
    const isScrolled = window.scrollY > 20;
    header.classList.toggle("header-scrolled", isScrolled);
  };

  window.addEventListener("scroll", updateStickyState, { passive: true });
  if (lenis && typeof lenis.on === "function") {
    lenis.on("scroll", updateStickyState);
  }
  updateStickyState();
}
initStickyHeader();

// 5. Adaptive Grid Scale-UP above 1920px (runtime damping formula)
function applyAdaptiveGrid() {
  const FONT_BASE = 16,
    baseWidth = 1920,
    coef = 0.6666;
  const w = window.innerWidth;
  const widthReduction = ((baseWidth - w) / baseWidth) * 100;
  const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
  if (size > FONT_BASE) {
    document.documentElement.style.fontSize = size + "px";
  } else {
    document.documentElement.style.removeProperty("font-size");
  }
}
applyAdaptiveGrid();
window.addEventListener("resize", applyAdaptiveGrid);

// 6. Global intro ready flag
let introReady = false;

// 7. PageLoader Count & Entrance (1450ms easeInOutCubic)
const pageLoader = document.getElementById("pageLoader");
const loaderFill = document.getElementById("loaderFill");
const loaderCounter = document.getElementById("loaderCounter");
const loaderStatusMsg = document.getElementById("loaderStatusMsg");
const siteHeader = document.getElementById("siteHeader");
const homeSection = document.getElementById("home");

stopScroll(); // Lock scroll on mount

const FILL_MS = 1450;
const loaderStartTime = performance.now();
let loaderDismissed = false;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function dismissLoader() {
  if (loaderDismissed) return;
  loaderDismissed = true;

  if (pageLoader) {
    pageLoader.classList.add("loader-exit");
  }

  setTimeout(() => {
    introReady = true;
    startScroll();
    if (pageLoader) pageLoader.style.display = "none";

    // Reveal Header
    if (siteHeader) siteHeader.classList.add("header-ready");
    // Reveal Hero elements
    if (homeSection) homeSection.classList.add("hero-ready", "revealed");

    // Trigger above-the-fold reveals
    document.querySelectorAll("#home .reveal-fade-up").forEach((el) => {
      el.classList.add("revealed");
    });

    // Start typing animation
    startTypewriter();
  }, 750);
}

function updateLoader(now) {
  if (loaderDismissed) return;
  const elapsed = now - loaderStartTime;
  const t = Math.min(1, elapsed / FILL_MS);
  const eased = easeInOutCubic(t);
  const progress = Math.round(eased * 100);

  if (loaderFill) loaderFill.style.width = progress + "%";
  if (loaderCounter) loaderCounter.textContent = String(progress);

  if (loaderStatusMsg) {
    if (progress < 25) {
      loaderStatusMsg.textContent = "Menginisialisasi sistem...";
    } else if (progress < 60) {
      loaderStatusMsg.textContent = "Memuat portofolio & arsitektur web...";
    } else if (progress < 92) {
      loaderStatusMsg.textContent = "Menyiapkan pengalaman interaktif...";
    } else {
      loaderStatusMsg.textContent = "Selesai! Selamat datang ✨";
    }
  }

  if (t < 1) {
    requestAnimationFrame(updateLoader);
  } else {
    setTimeout(dismissLoader, 250);
  }
}
requestAnimationFrame(updateLoader);

// Failsafe: dismiss loader unconditionally after 2.3s
setTimeout(dismissLoader, 2300);

// 8. Live Clock & Calendar (updates every 1s)
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const timeStr = `${hours}:${minutes}${meridiem}`;

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dateStr = `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;

  const clockTimeEl = document.getElementById("clockTime");
  const clockDateEl = document.getElementById("clockDate");
  const overlayTimeEl = document.getElementById("overlayLocalTime");

  if (clockTimeEl) clockTimeEl.textContent = timeStr;
  if (clockDateEl) clockDateEl.textContent = dateStr;
  if (overlayTimeEl) overlayTimeEl.textContent = timeStr;
}
updateClock();
setInterval(updateClock, 1000);

// 9. LIQUID REVEAL CANVAS WITH JOHAN'S PHOTO
const liquidWrap = document.getElementById("liquidWrap");
const liquidCanvas = document.getElementById("liquidCanvas");
// Using the generated matching cyberpunk dark-mode developer portrait for hover reveal
const afterSrc = "assets/img/profile_wisuda_hover.jpg";
const baseImg = document.getElementById("liquidBaseImg");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (liquidCanvas && liquidWrap && !prefersReducedMotion) {
  const ctx = liquidCanvas.getContext("2d");
  const brushRadius = 143;
  const decay = 0.016;

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let radius = brushRadius * dpr;
  let diam = Math.ceil(radius * 2);

  // Offscreen cover canvas
  const coverCanvas = document.createElement("canvas");
  const coverCtx = coverCanvas.getContext("2d");

  // Offscreen brush canvas
  const brushCanvas = document.createElement("canvas");
  const brushCtx = brushCanvas.getContext("2d");

  // Load alternate image for brush painting
  const afterImg = new Image();
  let afterImgLoaded = false;
  afterImg.onload = () => {
    afterImgLoaded = true;
    drawCoverImage();
  };
  afterImg.src = afterSrc;

  if (baseImg) {
    baseImg.addEventListener("load", drawCoverImage);
  }

  function drawCoverImage() {
    if (!afterImgLoaded || width === 0 || height === 0) return;
    coverCanvas.width = width;
    coverCanvas.height = height;

    let dw, dh, dx, dy;
    if (baseImg && baseImg.offsetWidth > 0 && baseImg.offsetHeight > 0) {
      const baseRect = baseImg.getBoundingClientRect();
      const wrapRect = liquidWrap.getBoundingClientRect();
      dx = (baseRect.left - wrapRect.left) * dpr;
      dy = (baseRect.top - wrapRect.top) * dpr;
      dw = baseRect.width * dpr;
      dh = baseRect.height * dpr;
    } else {
      const imgRatio = afterImg.naturalWidth / afterImg.naturalHeight;
      const canvasRatio = width / height;
      if (canvasRatio > imgRatio) {
        dh = height * 0.96;
        dw = dh * imgRatio;
        dx = (width - dw) / 2 + (width > 1024 ? width * 0.03 : 0);
        dy = height - dh;
      } else {
        dw = width * 0.85;
        dh = dw / imgRatio;
        dx = (width - dw) / 2;
        dy = height - dh;
      }
    }

    coverCtx.clearRect(0, 0, width, height);
    coverCtx.drawImage(afterImg, dx, dy, dw, dh);
  }

  function resizeCanvas() {
    const rect = liquidWrap.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.round(rect.width * dpr);
    height = Math.round(rect.height * dpr);

    liquidCanvas.width = width;
    liquidCanvas.height = height;
    liquidCanvas.style.width = rect.width + "px";
    liquidCanvas.style.height = rect.height + "px";

    radius = brushRadius * dpr;
    diam = Math.ceil(radius * 2);

    brushCanvas.width = diam;
    brushCanvas.height = diam;

    drawCoverImage();
  }

  const ro = new ResizeObserver(resizeCanvas);
  ro.observe(liquidWrap);
  resizeCanvas();

  // Pointer trail points queue
  const points = [];
  let lastPoint = null;
  let idle = 0;

  window.addEventListener(
    "pointermove",
    (e) => {
      const rect = liquidWrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) * dpr;
      const py = (e.clientY - rect.top) * dpr;

      if (px < -radius || py < -radius || px > width + radius || py > height + radius) {
        lastPoint = null;
        return;
      }

      if (!lastPoint) {
        lastPoint = { x: px, y: py };
        points.push(lastPoint);
        return;
      }

      const dx = px - lastPoint.x;
      const dy = py - lastPoint.y;
      const dist = Math.hypot(dx, dy);
      const step = Math.max(radius * 0.3, 1);
      const n = Math.min(Math.ceil(dist / step), 60);

      for (let i = 1; i <= n; i++) {
        points.push({
          x: lastPoint.x + (dx * i) / n,
          y: lastPoint.y + (dy * i) / n,
        });
      }
      lastPoint = { x: px, y: py };
    },
    { passive: true },
  );

  function stamp(x, y) {
    if (!afterImgLoaded || width === 0) return;
    const c = diam / 2;

    // 1. Prepare brush gradient
    brushCtx.clearRect(0, 0, diam, diam);
    brushCtx.globalCompositeOperation = "source-over";
    const grad = brushCtx.createRadialGradient(c, c, 0, c, c, radius);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.82)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    brushCtx.fillStyle = grad;
    brushCtx.fillRect(0, 0, diam, diam);

    // 2. Mask with matching cover region
    brushCtx.globalCompositeOperation = "source-in";
    brushCtx.drawImage(coverCanvas, x - c, y - c, diam, diam, 0, 0, diam, diam);

    // 3. Stamp onto main canvas
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(brushCanvas, x - c, y - c);
  }

  function renderLiquid() {
    const drawing = points.length > 0;
    if (drawing) {
      idle = 0;
    } else {
      idle++;
    }

    if (idle <= 120) {
      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, width, height);

      if (drawing) {
        for (let i = 0; i < points.length; i++) {
          stamp(points[i].x, points[i].y);
        }
        points.length = 0;
      }

      if (idle === 120) {
        ctx.clearRect(0, 0, width, height);
      }
    }

    requestAnimationFrame(renderLiquid);
  }
  requestAnimationFrame(renderLiquid);
}

// 10. TYPEWRITER EFFECT (AS IN CV)
const roles = ["Software Developer", "Spesialis Backend & RESTful API", "Web Automation Specialist", "Pengalaman 1+ Tahun Web & API", "D4 Teknik Informatika Polije"];

let currentRoleIdx = 0;
let currentCharIdx = 0;
let isDeletingRole = false;
let typewriterTimer = null;

function startTypewriter() {
  if (typewriterTimer) clearTimeout(typewriterTimer);
  typewriterTick();
}

function typewriterTick() {
  const el = document.getElementById("typewriterText");
  if (!el) return;

  const fullText = roles[currentRoleIdx % roles.length];

  if (isDeletingRole) {
    currentCharIdx--;
    el.textContent = fullText.substring(0, currentCharIdx);
  } else {
    currentCharIdx++;
    el.textContent = fullText.substring(0, currentCharIdx);
  }

  let speed = isDeletingRole ? 35 : 75;

  if (!isDeletingRole && currentCharIdx === fullText.length) {
    speed = 2000; // Pause at completed role
    isDeletingRole = true;
  } else if (isDeletingRole && currentCharIdx === 0) {
    isDeletingRole = false;
    currentRoleIdx = (currentRoleIdx + 1) % roles.length;
    speed = 400; // Pause before typing next
  }

  typewriterTimer = setTimeout(typewriterTick, speed);
}

// 11. HeroCard Carousel Logic
const carouselItems = [
  { caption: "Backend Engineering", title: "Scalable API & Database Architecture." },
  { caption: "Web Automation", title: "Resilient Scraping & Data Normalization." },
  { caption: "Modern Full-Stack", title: "Effortless, Confident Web Solutions." },
  { caption: "Enterprise Experience", title: "PT PAL Indonesia (BUMN) Verified." },
];

let currentCardIdx = 0;
const heroCardSlot = document.getElementById("heroCardSlot");
const cardDotsContainer = document.getElementById("cardDots");

function renderCardItem(idx, direction = "down") {
  if (!heroCardSlot) return;
  const prevEl = heroCardSlot.querySelector(".card-slide-item.active");
  if (prevEl) {
    prevEl.className = `card-slide-item ${direction === "down" ? "out-up" : "out-down"}`;
    setTimeout(() => prevEl.remove(), 450);
  }

  const item = carouselItems[idx];
  const newEl = document.createElement("div");
  newEl.className = `card-slide-item ${direction === "down" ? "out-down" : "out-up"}`;
  newEl.innerHTML = `
  <div class="card-caption">${item.caption}</div>
  <div class="card-title">${item.title}</div>
`;
  heroCardSlot.appendChild(newEl);

  void newEl.offsetWidth;
  newEl.className = "card-slide-item active";

  if (cardDotsContainer) {
    cardDotsContainer.innerHTML = "";
    carouselItems.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = `card-dot ${i === idx ? "active" : "inactive"}`;
      cardDotsContainer.appendChild(dot);
    });
  }
}

renderCardItem(0);

function nextCard() {
  currentCardIdx = (currentCardIdx + 1) % carouselItems.length;
  renderCardItem(currentCardIdx, "down");
}
function prevCard() {
  currentCardIdx = (currentCardIdx - 1 + carouselItems.length) % carouselItems.length;
  renderCardItem(currentCardIdx, "up");
}

document.getElementById("heroCardNext")?.addEventListener("click", (e) => {
  e.stopPropagation();
  nextCard();
});
document.getElementById("heroCardPrev")?.addEventListener("click", (e) => {
  e.stopPropagation();
  prevCard();
});
document.getElementById("heroCardInner")?.addEventListener("click", () => {
  nextCard();
});

// 12. Word Reveal Splitter for About Heading
function splitAboutHeading() {
  const aboutHeading = document.getElementById("aboutHeading");
  if (!aboutHeading) return;
  const text = aboutHeading.textContent.trim();
  const words = text.split(/\s+/);
  aboutHeading.innerHTML = "";

  words.forEach((w, i) => {
    const span = document.createElement("span");
    span.className = "reveal-word";
    if (i >= 7) {
      span.classList.add("about-muted-text");
    }
    span.style.transitionDelay = `${i * 35}ms`;
    span.textContent = w;
    aboutHeading.appendChild(span);
    aboutHeading.appendChild(document.createTextNode(" "));
  });
}
splitAboutHeading();

// 13. IntersectionObserver for Reveal Animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal-fade-up, #about, #experience, #projects, #services, #skills, #sertifikat, #siteFooter, #statsPanel").forEach((el) => {
  revealObserver.observe(el);
});

// 15. NavMenu Overlay Controls
const navMenuOverlay = document.getElementById("navMenuOverlay");
const menuToggleBtn = document.getElementById("menuToggleBtn");
const navCloseBtn = document.getElementById("navCloseBtn");

function openNavMenu() {
  if (!navMenuOverlay) return;
  navMenuOverlay.scrollTop = 0;
  navMenuOverlay.classList.add("menu-open");
  stopScroll();
}
function closeNavMenu() {
  if (!navMenuOverlay) return;
  navMenuOverlay.classList.remove("menu-open");
  startScroll();
}

menuToggleBtn?.addEventListener("click", openNavMenu);
navCloseBtn?.addEventListener("click", closeNavMenu);

document.getElementById("overlayStartProjectBtn")?.addEventListener("click", () => {
  closeNavMenu();
  openRequestModal();
});
document.getElementById("overlayContactItemBtn")?.addEventListener("click", () => {
  closeNavMenu();
  openRequestModal();
});

// 16. Request Modal Controls
const requestModalBackdrop = document.getElementById("requestModalBackdrop");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalSuccessCloseBtn = document.getElementById("modalSuccessCloseBtn");
const requestForm = document.getElementById("requestForm");
const modalFormContainer = document.getElementById("modalFormContainer");
const modalSuccessContainer = document.getElementById("modalSuccessContainer");
const modalSubmitBtn = document.getElementById("modalSubmitBtn");
const modalSubmitText = document.getElementById("modalSubmitText");

function openRequestModal() {
  if (!requestModalBackdrop) return;
  if (modalFormContainer) modalFormContainer.style.display = "block";
  if (modalSuccessContainer) modalSuccessContainer.style.display = "none";
  if (modalSubmitBtn) modalSubmitBtn.disabled = false;
  if (modalSubmitText) modalSubmitText.textContent = "Kirim Pesan";

  requestModalBackdrop.classList.add("modal-open");
  stopScroll();
}

function closeRequestModal() {
  if (!requestModalBackdrop) return;
  requestModalBackdrop.classList.remove("modal-open");
  startScroll();
  setTimeout(() => {
    if (requestForm) requestForm.reset();
  }, 300);
}

modalCloseBtn?.addEventListener("click", closeRequestModal);
modalSuccessCloseBtn?.addEventListener("click", closeRequestModal);

requestModalBackdrop?.addEventListener("click", (e) => {
  if (e.target === requestModalBackdrop) closeRequestModal();
});

document.getElementById("navContactBtn")?.addEventListener("click", openRequestModal);
document.getElementById("heroTalkBtn")?.addEventListener("click", openRequestModal);
document.getElementById("footerStartBtn")?.addEventListener("click", openRequestModal);
document.getElementById("footerContactLink")?.addEventListener("click", openRequestModal);

document.querySelectorAll('[data-open-modal="true"]').forEach((el) => {
  el.addEventListener("click", openRequestModal);
});

requestForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("reqName");
  const emailInput = document.getElementById("reqEmail");
  const projectInput = document.getElementById("reqProject");

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const project = projectInput ? projectInput.value.trim() : "";

  if (!name || !email || !project) return;

  if (modalSubmitBtn) modalSubmitBtn.disabled = true;
  if (modalSubmitText) modalSubmitText.textContent = "Membuka WhatsApp...";

  const formattedText = `Halo Johan Krisbima Abi,

*Nama / Perusahaan:* ${name}
*Email:* ${email}
*Detail Kebutuhan:*
${project}

Saya melihat portofolio Anda di website dan ingin berdiskusi lebih lanjut. Terima kasih!`;

  const waUrl = `https://wa.me/6287851865091?text=${encodeURIComponent(formattedText)}`;

  // Buka WhatsApp langsung di tab baru
  window.open(waUrl, "_blank");

  // Perbarui tautan tombol WhatsApp di layar sukses
  const directWaLink = modalSuccessContainer?.querySelector('a[href^="https://wa.me"]');
  if (directWaLink) {
    directWaLink.href = waUrl;
  }

  setTimeout(() => {
    if (modalFormContainer) modalFormContainer.style.display = "none";
    if (modalSuccessContainer) modalSuccessContainer.style.display = "flex";
    if (modalSubmitBtn) modalSubmitBtn.disabled = false;
    if (modalSubmitText) modalSubmitText.textContent = "Kirim Pesan";
  }, 400);
});

// 17. Certificate Lightbox Modal Controls
const certModalBackdrop = document.getElementById("certModalBackdrop");
const certLightboxCloseBtn = document.getElementById("certLightboxCloseBtn");
const certLightboxImg = document.getElementById("certLightboxImg");
const certLightboxTitle = document.getElementById("certLightboxTitle");

function openCertLightbox(imgSrc, title) {
  if (!certModalBackdrop || !certLightboxImg) return;
  certLightboxImg.src = imgSrc;
  if (certLightboxTitle) certLightboxTitle.textContent = title || "Pratinjau Dokumen";
  certModalBackdrop.classList.add("lightbox-open");
  stopScroll();
}
function closeCertLightbox() {
  if (!certModalBackdrop) return;
  certModalBackdrop.classList.remove("lightbox-open");
  startScroll();
}

certLightboxCloseBtn?.addEventListener("click", closeCertLightbox);
certModalBackdrop?.addEventListener("click", (e) => {
  if (e.target === certModalBackdrop) closeCertLightbox();
});

// 18. Certificate Slider & Category Filter
const certSliderTrack = document.getElementById("certSliderTrack");
const certPrevBtn = document.getElementById("certPrevBtn");
const certNextBtn = document.getElementById("certNextBtn");
const certCounter = document.getElementById("certCounter");
const certProgressFill = document.getElementById("certProgressFill");
const certDotsWrapper = document.getElementById("certDotsWrapper");
const certFilterBtns = document.querySelectorAll(".cert-filter-btn");
const certCards = Array.from(document.querySelectorAll(".cert-card"));

let isCertDragging = false;
let certStartX = 0;
let certStartScrollLeft = 0;
let certHasDragged = false;
let certAutoPlayTimer = null;

function getVisibleCertCards() {
  return certCards.filter((card) => card.style.display !== "none");
}

// Lightbox click on cert card with drag prevention
certCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (certHasDragged) {
      e.preventDefault();
      return;
    }
    const imgSrc = card.getAttribute("data-img");
    const title = card.getAttribute("data-title");
    if (imgSrc) openCertLightbox(imgSrc, title);
  });
});

// Update slider state: counter, progress bar, active dot, nav buttons
function updateCertSliderState() {
  if (!certSliderTrack) return;
  const visible = getVisibleCertCards();
  if (visible.length === 0) return;

  const trackRect = certSliderTrack.getBoundingClientRect();
  let activeIndex = 0;
  let minDistance = Infinity;

  visible.forEach((card, idx) => {
    const cardRect = card.getBoundingClientRect();
    const dist = Math.abs(cardRect.left - trackRect.left);
    if (dist < minDistance) {
      minDistance = dist;
      activeIndex = idx;
    }
  });

  activeIndex = Math.max(0, Math.min(activeIndex, visible.length - 1));

  if (certCounter) {
    const current = String(activeIndex + 1).padStart(2, "0");
    const total = String(visible.length).padStart(2, "0");
    certCounter.textContent = `${current} / ${total}`;
  }

  if (certProgressFill) {
    const pct = ((activeIndex + 1) / visible.length) * 100;
    certProgressFill.style.width = `${pct}%`;
  }

  if (certDotsWrapper) {
    const dots = certDotsWrapper.querySelectorAll(".cert-dot-btn");
    dots.forEach((dot, idx) => {
      const isActive = idx === activeIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  const maxScroll = certSliderTrack.scrollWidth - certSliderTrack.clientWidth - 4;
  const atStart = certSliderTrack.scrollLeft <= 4;
  const atEnd = certSliderTrack.scrollLeft >= maxScroll || certSliderTrack.scrollWidth <= certSliderTrack.clientWidth + 4;

  if (certPrevBtn) {
    certPrevBtn.disabled = atStart;
    certPrevBtn.classList.toggle("disabled", atStart);
  }
  if (certNextBtn) {
    certNextBtn.disabled = atEnd;
    certNextBtn.classList.toggle("disabled", atEnd);
  }
}

// Generate pagination dots
function renderCertDots() {
  if (!certDotsWrapper) return;
  certDotsWrapper.innerHTML = "";
  const visible = getVisibleCertCards();

  if (visible.length <= 1) {
    certDotsWrapper.style.display = "none";
    return;
  }
  certDotsWrapper.style.display = "flex";

  visible.forEach((card, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `cert-dot-btn ${idx === 0 ? "active" : ""}`;
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Slide ${idx + 1}`);
    dot.addEventListener("click", () => {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      stopCertAutoplay();
    });
    certDotsWrapper.appendChild(dot);
  });
}

// Scroll Slide by Card Step
function scrollCertSlide(direction) {
  if (!certSliderTrack) return;
  const visible = getVisibleCertCards();
  if (visible.length === 0) return;

  const cardWidth = visible[0].offsetWidth;
  const gap = parseFloat(window.getComputedStyle(certSliderTrack).gap) || 24;
  const step = cardWidth + gap;

  certSliderTrack.scrollBy({
    left: direction === "next" ? step : -step,
    behavior: "smooth"
  });
}

certPrevBtn?.addEventListener("click", () => {
  scrollCertSlide("prev");
  stopCertAutoplay();
});

certNextBtn?.addEventListener("click", () => {
  scrollCertSlide("next");
  stopCertAutoplay();
});

// Scroll listener with rAF
let isCertScrollTicking = false;
certSliderTrack?.addEventListener("scroll", () => {
  if (!isCertScrollTicking) {
    window.requestAnimationFrame(() => {
      updateCertSliderState();
      isCertScrollTicking = false;
    });
    isCertScrollTicking = true;
  }
}, { passive: true });

// Mouse Drag-to-Scroll for Desktop
if (certSliderTrack) {
  certSliderTrack.addEventListener("mousedown", (e) => {
    isCertDragging = true;
    certHasDragged = false;
    certStartX = e.pageX - certSliderTrack.offsetLeft;
    certStartScrollLeft = certSliderTrack.scrollLeft;
    certSliderTrack.classList.add("is-dragging");
    stopCertAutoplay();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isCertDragging || !certSliderTrack) return;
    const x = e.pageX - certSliderTrack.offsetLeft;
    const walk = (x - certStartX) * 1.25;
    if (Math.abs(walk) > 5) {
      certHasDragged = true;
    }
    certSliderTrack.scrollLeft = certStartScrollLeft - walk;
  });

  window.addEventListener("mouseup", () => {
    if (!isCertDragging) return;
    isCertDragging = false;
    certSliderTrack?.classList.remove("is-dragging");
    if (certHasDragged) {
      setTimeout(() => {
        certHasDragged = false;
      }, 50);
    }
  });

  // Keyboard navigation
  certSliderTrack.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollCertSlide("prev");
      stopCertAutoplay();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollCertSlide("next");
      stopCertAutoplay();
    }
  });
}

// Gentle Auto-Slide
function startCertAutoplay() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  stopCertAutoplay();
  certAutoPlayTimer = setInterval(() => {
    const visible = getVisibleCertCards();
    if (visible.length <= 1 || !certSliderTrack) return;

    const maxScroll = certSliderTrack.scrollWidth - certSliderTrack.clientWidth - 5;
    if (certSliderTrack.scrollLeft >= maxScroll) {
      certSliderTrack.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollCertSlide("next");
    }
  }, 5000);
}

function stopCertAutoplay() {
  if (certAutoPlayTimer) {
    clearInterval(certAutoPlayTimer);
    certAutoPlayTimer = null;
  }
}

// Section visibility observer for autoplay
const certSectionEl = document.getElementById("sertifikat");
if (certSectionEl && "IntersectionObserver" in window) {
  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCertAutoplay();
      } else {
        stopCertAutoplay();
      }
    });
  }, { threshold: 0.25 });
  certObserver.observe(certSectionEl);
}

certSliderTrack?.addEventListener("mouseenter", stopCertAutoplay);
certSliderTrack?.addEventListener("mouseleave", () => {
  if (certSectionEl?.getBoundingClientRect().top < window.innerHeight && certSectionEl?.getBoundingClientRect().bottom > 0) {
    startCertAutoplay();
  }
});
certSliderTrack?.addEventListener("touchstart", stopCertAutoplay, { passive: true });

// Filter Button Click Handler
certFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    certFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    certCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all") {
        card.style.display = "flex";
      } else if (filter === "magang-skkni") {
        card.style.display = category === "bnsp" || category === "internship" ? "flex" : "none";
      } else {
        card.style.display = category === filter ? "flex" : "none";
      }
    });

    if (certSliderTrack) {
      certSliderTrack.scrollTo({ left: 0, behavior: "smooth" });
    }
    renderCertDots();
    setTimeout(updateCertSliderState, 150);
  });
});

// Initialize Slider State
renderCertDots();
updateCertSliderState();
window.addEventListener("resize", () => {
  updateCertSliderState();
});

// 19. ESC key listener closes open overlays
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (certModalBackdrop?.classList.contains("lightbox-open")) {
      closeCertLightbox();
    } else if (requestModalBackdrop?.classList.contains("modal-open")) {
      closeRequestModal();
    } else if (navMenuOverlay?.classList.contains("menu-open")) {
      closeNavMenu();
    }
  }
});

// 20. Interactive Terminal CLI
const toggleTerminalBtn = document.getElementById("toggleTerminalBtn");
const termBtnLabel = document.getElementById("termBtnLabel");
const terminalBox = document.getElementById("terminalBox");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");
const termClearBtn = document.getElementById("termClearBtn");
const termDotRed = document.querySelector(".term-dot-red");

function setTerminalOpen(open) {
  if (!terminalBox) return;
  terminalBox.style.display = open ? "block" : "none";
  if (termBtnLabel) {
    termBtnLabel.textContent = open ? "💻 Tutup Terminal Interaktif (CLI)" : "💻 Buka Terminal Interaktif (CLI)";
  }
  if (toggleTerminalBtn) {
    toggleTerminalBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (open && terminalInput) {
    terminalInput.focus();
  }
}

toggleTerminalBtn?.addEventListener("click", () => {
  if (!terminalBox) return;
  const isOpen = terminalBox.style.display === "block";
  setTerminalOpen(!isOpen);
});

termDotRed?.addEventListener("click", () => {
  setTerminalOpen(false);
});

termClearBtn?.addEventListener("click", () => {
  if (terminalOutput) terminalOutput.innerHTML = "";
});

function runTerminalCommand(cmdRaw) {
  if (!terminalOutput) return;
  const cmd = cmdRaw.trim().toLowerCase();
  const line = document.createElement("div");
  line.style.marginTop = "0.5rem";

  const promptSpan = `<span style="color:#cf8047; font-weight:600;">johan@porto:~$</span> ${cmdRaw}`;
  line.innerHTML = promptSpan;
  terminalOutput.appendChild(line);

  const resp = document.createElement("div");
  resp.style.color = "#ffffff";

  switch (cmd) {
    case "whoami":
      resp.innerHTML = "Johan Krisbima Abi &bull; Software Developer (D4 Teknik Informatika Politeknik Negeri Jember, IPK 3.87). Berpengalaman di PT PAL Indonesia, Universal Big Data, &amp; PT Stechoq.";
      break;
    case "skills":
      resp.innerHTML = "Core: Laravel, PHP, JavaScript, MySQL, PostgreSQL, Node.js, Express, Bootstrap, Git, RESTful API.<br>Expanding: React, TypeScript, Next.js, Docker.";
      break;
    case "projects":
      resp.innerHTML = "1. Auto-Feeding System using IoT (ESP32, PHP)<br>2. Coffee Detection System (Python, YOLOv5)<br>3. POVSHOTNBK Photo Sales (Laravel, Midtrans)<br>4. Ilham Collection E-Commerce (PHP Native)";
      break;
    case "cert":
    case "credentials":
      resp.innerHTML = "&bull; BNSP Web Developer (SKKNI)<br>&bull; MagangHub Kemnaker PT PAL Indonesia<br>&bull; MSIB Batch 6 PT Stechoq Robotika<br>&bull; Pendanaan PKM-PM Kemendikbudristek &amp; Publikasi Jurnal Ilmiah 2024";
      break;
    case "contact":
      resp.innerHTML = "Email: johankrisbima77@gmail.com | WA: +62 878-5186-5091 | Lokasi: Mojokerto, Jawa Timur";
      break;
    case "help":
      resp.innerHTML = 'Perintah tersedia: <span style="color:#cf8047;">whoami, skills, projects, cert, contact, clear, tutup, help</span>';
      break;
    case "clear":
      terminalOutput.innerHTML = "";
      return;
    case "exit":
    case "quit":
    case "close":
    case "tutup":
      setTerminalOpen(false);
      return;
    default:
      resp.innerHTML = `<span style="color:#ff5f56;">Perintah tidak ditemukan: ${cmd}</span>. Ketik <span style="color:#cf8047;">'help'</span> untuk daftar perintah.`;
  }

  terminalOutput.appendChild(resp);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = terminalInput.value;
    if (val.trim()) {
      runTerminalCommand(val);
      terminalInput.value = "";
    }
  }
});

document.querySelectorAll(".term-chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cmd = btn.getAttribute("data-cmd");
    if (cmd) runTerminalCommand(cmd);
  });
});

// 21. Active Section Scroll Spy for Navbar
const navSections = ["home", "experience", "projects", "services", "skills", "about", "sertifikat"];
const navButtons = document.querySelectorAll(".nav-link-btn[data-scroll-to]");

if ("IntersectionObserver" in window) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navButtons.forEach((btn) => {
            if (btn.getAttribute("data-scroll-to") === id) {
              btn.setAttribute("aria-current", "page");
            } else {
              btn.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { rootMargin: "-20% 0px -50% 0px", threshold: 0.1 },
  );

  navSections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) spyObserver.observe(el);
  });
}
