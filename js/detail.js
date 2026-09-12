/**
 * ==========================================================================
 * Portfolio Case Study / Detail Page Interactive Script (detail.js)
 * ==========================================================================
 *
 * @author Johan Krisbima Abi
 * @description Modul interaktif terpusat untuk seluruh halaman detail portofolio.
 *              Mengatur inisialisasi tema instan (bebas FOUC), progress bar scroll,
 *              tombol back to top, sinkronisasi tema, dan lightbox modal pratinjau gambar.
 */

// ==========================================================================
// 1. TEMA: INISIALISASI CEPAT (IMMEDIATE THEME INITIALIZATION)
// ==========================================================================
// Dijalankan segera saat script dimuat untuk mencegah Flash of Unstyled Content (FOUC).
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

// ==========================================================================
// 2. MODUL INTERAKTIF DOM (DOM INTERACTIVE LOGIC)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const THEME_STORAGE_KEY = "portfolio_theme_mode";

  /**
   * Mengatur indikator baris progres membaca artikel berdasarkan posisi scroll pengguna.
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
   * Mengontrol visibilitas dan interaksi tombol 'Kembali ke Atas' (Back to Top).
   */
  function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    const toggleBackToTop = () => {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  /**
   * Mengatur tombol pengalih tema (Dark/Light Mode) pada navbar detail dan
   * menyinkronkannya dengan status penyimpanan lokal (localStorage).
   */
  function initThemeSwitcher() {
    const themeToggleBtn = document.getElementById("blogThemeToggleBtn");
    const themeText = document.getElementById("blogThemeText");

    const updateThemeDisplay = (theme) => {
      const isLight = theme === "light";
      const label = isLight ? "Light Mode" : "Dark Mode";
      const tooltip = isLight ? "Ganti ke Dark Mode" : "Ganti ke Light Mode";

      if (themeText) {
        themeText.textContent = label;
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute("title", tooltip);
        themeToggleBtn.setAttribute("aria-label", tooltip);
      }
    };

    // Sinkronisasi status awal teks tombol
    const initialTheme = document.documentElement.getAttribute("data-theme") || "dark";
    updateThemeDisplay(initialTheme);

    // Event listener pergantian mode tema
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", nextTheme);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch (error) {
          console.warn("Failed to persist theme choice in localStorage:", error);
        }

        updateThemeDisplay(nextTheme);
      });
    }
  }

  /**
   * Mengatur interaksi klik gambar screenshot untuk membuka pratinjau resolusi tinggi (Lightbox Modal).
   */
  function initImageLightbox() {
    const zoomModalEl = document.getElementById("imageZoomModal");
    const zoomModalImg = document.getElementById("zoomModalImg");
    const zoomModalTitle = document.getElementById("zoomModalTitle");

    // Validasi ketersediaan Bootstrap Modal dan elemen yang diperlukan
    if (!zoomModalEl || typeof bootstrap === "undefined" || !bootstrap.Modal) return;

    const zoomModal = new bootstrap.Modal(zoomModalEl);
    const zoomableImages = document.querySelectorAll("[data-zoom-img]");

    zoomableImages.forEach((img) => {
      img.addEventListener("click", () => {
        const fullImgSrc = img.getAttribute("data-zoom-img");
        if (zoomModalImg && fullImgSrc) {
          zoomModalImg.src = fullImgSrc;
          if (zoomModalTitle) {
            zoomModalTitle.textContent = img.alt || "Pratinjau Dokumentasi Sistem";
          }
          zoomModal.show();
        }
      });
    });
  }

  /**
   * Modul Animasi Scroll Reveal Otomatis
   */
  function initScrollReveal() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    document.documentElement.classList.add("reveal-init");

    const targetSelectors = [
      ".section-title-wrapper",
      ".detail-hero-card",
      ".detail-figure-box",
      ".detail-article-card",
      ".blog-metric-card",
      ".blog-author-card",
      ".blog-switch-card",
      ".card-modern",
      ".spotlight-card"
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
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  /**
   * Mengatur bahasa halaman detail berdasarkan preferensi tersimpan di localStorage ('portfolio_language_choice').
   * Jika pilihan adalah 'en', maka otomatis menerjemahkan seluruh konten halaman ke Bahasa Inggris.
   */
  function initLanguageManager() {
    const LANG_STORAGE_KEY = "portfolio_language_choice";
    const blogLangToggleBtn = document.getElementById("blogLangToggleBtn");
    const blogLangText = document.getElementById("blogLangText");

    function applyDetailLanguage(lang) {
      const targetLang = lang === "en" ? "en" : "id";
      document.documentElement.setAttribute("lang", targetLang);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, targetLang);
      } catch (e) {
        console.warn("Language storage access failed:", e);
      }

      if (typeof portfolioTranslations !== "undefined" && portfolioTranslations[targetLang]) {
        const dict = portfolioTranslations[targetLang];

        // 1. Terjemahkan elemen yang memiliki atribut data-i18n
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          const key = el.getAttribute("data-i18n");
          if (dict[key] !== undefined) {
            el.innerHTML = dict[key];
          }
        });

        // 2. Terjemahkan atribut title jika ada data-i18n-title
        document.querySelectorAll("[data-i18n-title]").forEach((el) => {
          const key = el.getAttribute("data-i18n-title");
          if (dict[key] !== undefined) {
            el.setAttribute("title", dict[key]);
          }
        });

        // 3. Terjemahkan document title & meta description jika dispesifikasikan
        const pageMetaTitleKey = document.querySelector("meta[name='page-meta-title-key']");
        if (pageMetaTitleKey) {
          const key = pageMetaTitleKey.getAttribute("content");
          if (dict[key]) document.title = dict[key];
        }
        const pageMetaDescKey = document.querySelector("meta[name='page-meta-desc-key']");
        if (pageMetaDescKey) {
          const key = pageMetaDescKey.getAttribute("content");
          const metaDesc = document.querySelector("meta[name='description']");
          if (dict[key] && metaDesc) metaDesc.setAttribute("content", dict[key]);
        }
      }

      // 4. Perbarui indikator tombol bahasa
      if (blogLangText) {
        blogLangText.textContent = targetLang === "id" ? "EN" : "ID";
      }
      if (blogLangToggleBtn) {
        const titleText = targetLang === "id" ? "Ganti ke English" : "Switch to Bahasa Indonesia";
        blogLangToggleBtn.setAttribute("title", titleText);
        blogLangToggleBtn.setAttribute("aria-label", titleText);
      }
    }

    // Inisialisasi status awal bahasa dari localStorage (default: 'id')
    let savedLang = "id";
    try {
      savedLang = localStorage.getItem(LANG_STORAGE_KEY) || "id";
    } catch (e) {
      savedLang = "id";
    }
    applyDetailLanguage(savedLang);

    // Event listener pergantian bahasa
    if (blogLangToggleBtn) {
      blogLangToggleBtn.addEventListener("click", () => {
        let currentLang = "id";
        try {
          currentLang = localStorage.getItem(LANG_STORAGE_KEY) || "id";
        } catch (e) {
          currentLang = "id";
        }
        const nextLang = currentLang === "id" ? "en" : "id";
        applyDetailLanguage(nextLang);
      });
    }
  }

  // Jalankan semua modul inisialisasi
  initLanguageManager();
  initReadingProgressBar();
  initBackToTop();
  initThemeSwitcher();
  initImageLightbox();
  initScrollReveal();
});
