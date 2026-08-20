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

  // 2. Certificate Modal Lightbox (Click-to-zoom)
  const certCards = document.querySelectorAll(".cert-card");
  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-cert-img");
      const title = card.getAttribute("data-cert-title");

      if (imgSrc && certBootstrapModal && certModalImg && certModalTitle) {
        certModalImg.src = imgSrc;
        certModalTitle.textContent = title || "Detail Sertifikat";
        certBootstrapModal.show();
      }
    });
  });

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
