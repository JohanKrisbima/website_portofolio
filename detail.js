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

  // Jalankan semua modul inisialisasi
  initReadingProgressBar();
  initBackToTop();
  initThemeSwitcher();
  initImageLightbox();
});
