/**
 * ==========================================================================
 * Portfolio Case Study / Detail Page Interactive Script (detail.js)
 * ==========================================================================
 *
 * @author Johan Krisbima Abi
 * @description Modul interaktif terpusat untuk halaman detail studi kasus.
 *              Mengatur progress bar scroll, sticky header elevation,
 *              tombol back to top, lightbox modal pratinjau gambar,
 *              dan animasi scroll reveal.
 *              (Fitur theme toggle dan translasi telah ditiadakan sesuai instruksi).
 */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * 1. Mengatur indikator baris progres membaca artikel berdasarkan posisi scroll.
   */
  function initReadingProgressBar() {
    const scrollBar = document.getElementById("scrollProgressBar");
    if (!scrollBar) return;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentProgress = (window.scrollY / scrollHeight) * 100;
        scrollBar.style.width = `${Math.min(100, Math.max(0, currentProgress))}%`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /**
   * 2. Mengatur efek elevasi bayangan navbar saat halaman di-scroll.
   */
  function initStickyNavbar() {
    const header = document.querySelector(".detail-header");
    if (!header) return;

    const toggleNavbarScrolled = () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", toggleNavbarScrolled, { passive: true });
    toggleNavbarScrolled();
  }

  /**
   * 3. Mengontrol visibilitas dan interaksi tombol 'Kembali ke Atas' (Back to Top).
   */
  function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * 4. Mengatur interaksi Lightbox Modal pratinjau gambar tangkapan layar.
   */
  function initImageLightbox() {
    const modalEl = document.getElementById("detailLightboxModal");
    const modalImg = document.getElementById("lightboxModalImg");
    const modalTitle = document.getElementById("lightboxModalTitle");
    const closeBtn = document.getElementById("lightboxCloseBtn");

    if (!modalEl || !modalImg) return;

    const openModal = (imgSrc, imgAlt) => {
      modalImg.src = imgSrc;
      if (modalTitle) {
        modalTitle.textContent = imgAlt || "Pratinjau Gambar Sistem";
      }
      modalEl.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modalEl.classList.remove("active");
      document.body.style.overflow = "";
      setTimeout(() => {
        if (!modalEl.classList.contains("active")) {
          modalImg.src = "";
        }
      }, 300);
    };

    // Pasang listener pada semua gambar yang memiliki data-zoom-img
    document.querySelectorAll("[data-zoom-img]").forEach((triggerEl) => {
      triggerEl.addEventListener("click", () => {
        const fullSrc = triggerEl.getAttribute("data-zoom-img") || triggerEl.getAttribute("src");
        const altText = triggerEl.getAttribute("alt") || triggerEl.getAttribute("data-caption");
        openModal(fullSrc, altText);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Klik di luar container untuk menutup
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) {
        closeModal();
      }
    });

    // Tekan tombol ESC untuk menutup modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalEl.classList.contains("active")) {
        closeModal();
      }
    });
  }

  /**
   * 5. Modul Animasi Scroll Reveal Otomatis
   */
  function initScrollReveal() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targetSelectors = [
      ".detail-hero-header",
      ".detail-summary-card",
      ".detail-section",
      ".detail-subsystem-card",
      ".detail-figure-frame",
      ".detail-metric-card",
      ".detail-takeaways-card",
      ".detail-author-card",
      ".detail-switch-card",
      ".detail-footer-cta"
    ];

    const elements = document.querySelectorAll(targetSelectors.join(", "));

    elements.forEach((el) => {
      if (!el.classList.contains("reveal-on-scroll")) {
        el.classList.add("reveal-on-scroll");
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // Inisialisasi seluruh modul interaktif
  initReadingProgressBar();
  initStickyNavbar();
  initBackToTop();
  initImageLightbox();
  initScrollReveal();
});
