/**
 * PORTFOLIO SCRIPTS - JOHAN KRISBIMA ABI
 * Modern Interactive Navigation, Certificate Lightbox & ScrollSpy
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navbar = document.querySelector(".navbar-pill");
  const backToTopBtn = document.getElementById("backToTop");
  const mobileDrawerEl = document.getElementById("mobileMenu");
  const mobileDrawer = mobileDrawerEl ? bootstrap.Offcanvas.getOrCreateInstance(mobileDrawerEl) : null;
  const desktopNavLinks = document.querySelectorAll(".nav-link-pill");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  const sections = document.querySelectorAll("section[id]");
  const certModalEl = document.getElementById("certModal");
  const certModalImg = document.getElementById("certModalImg");
  const certModalTitle = document.getElementById("certModalLabel");
  const certBootstrapModal = certModalEl ? new bootstrap.Modal(certModalEl) : null;

  // 1. Floating Navbar Scroll Effect & Back-to-Top Button
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (scrollY > 350) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // 2. Certificate & Experience Modal Lightbox (Single & Multi-Image Gallery)
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
              <img src="${item.src}" class="modal-cert-img" alt="${item.caption || "Dokumentasi Proyek"}" />
            </div>
          </div>
        `
          )
          .join("");

        updateGalleryFooter(0);

        const bsCarousel = bootstrap.Carousel.getOrCreateInstance(modalGalleryCarousel, {
          interval: false,
          wrap: true
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

  // 3. Active Link State Synchronizer
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

  // 4. Smooth Scroll with Floating Header Offset
  function scrollToTarget(targetId) {
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      const headerOffset = 90;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  // 5. Desktop Navbar Click Listeners
  desktopNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      scrollToTarget(targetId);
      updateActiveNav(targetId.replace("#", ""));
    });
  });

  // 6. Mobile Drawer Nav Click Listeners
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

  // 7. Dynamic ScrollSpy Tracking
  function handleScrollSpy() {
    const scrollY = window.pageYOffset;
    let currentSectionId = "home";

    // Near bottom -> highlight contact
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
  handleScrollSpy(); // Initial call
});
