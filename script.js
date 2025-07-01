document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".navbar-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-menu-link");
  const mainContent = document.getElementById("main-content");

  const loadedSections = new Map();

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavOnScroll();
  });

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  async function loadSection(sectionName) {
    try {
      if (loadedSections.has(sectionName)) {
        console.log(`Section ${sectionName} already loaded`);
        return;
      }

      const response = await fetch(`sections/${sectionName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load ${sectionName}.html`);
      }

      const html = await response.text();

      const sectionElement = document.createElement("section");
      sectionElement.id = sectionName;
      sectionElement.innerHTML = html;
      mainContent.appendChild(sectionElement);
      loadedSections.set(sectionName, sectionElement);

      console.log(`Section ${sectionName} loaded successfully`);

      executeScripts(sectionElement);
    } catch (error) {
      console.error(`Error loading section ${sectionName}:`, error);
      const errorSection = document.createElement("section");
      errorSection.id = sectionName;
      errorSection.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem; color: #ef4444;">
          <h2>Error Loading Section</h2>
          <p>Could not load ${sectionName}.html</p>
        </div>
      `;
      mainContent.appendChild(errorSection);
      loadedSections.set(sectionName, errorSection);
    }
  }

  function executeScripts(element) {
    const scripts = element.querySelectorAll("script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      document.head.appendChild(newScript);
    });
  }

  function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }

  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const navbarHeight = navbar.offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + 100;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      setActiveLink(currentSection);
    }
  }

  function setActiveLink(sectionId) {
    navLinks.forEach((link) => link.classList.remove("active"));
    mobileNavLinks.forEach((link) => link.classList.remove("active"));

    const activeDesktopLink = document.querySelector(
      `.navbar-link[href="#${sectionId}"]`
    );
    const activeMobileLink = document.querySelector(
      `.mobile-menu-link[href="#${sectionId}"]`
    );

    if (activeDesktopLink) activeDesktopLink.classList.add("active");
    if (activeMobileLink) activeMobileLink.classList.add("active");
  }

  function handleNavClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    mobileMenuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");

    scrollToSection(targetId); // Directly scroll without loading
    setActiveLink(targetId);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => handleNavClick(e, link));
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => handleNavClick(e, link));
  });
});

function handleJoinClick() {
  window.open("https://mulearn.org/", "_blank");
}

function handleExploreClick() {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
}
// About Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  let isVisible = false;

  function handleScroll() {
    const section = document.getElementById("about");
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75 && !isVisible) {
      isVisible = true;

      // Animate text section
      const textSection = document.querySelector(".text-section");
      if (textSection) {
        textSection.classList.add("visible");
      }

      // Animate visual section
      const visualSection = document.querySelector(".visual-section");
      if (visualSection) {
        visualSection.classList.add("visible");
      }

      // Animate feature items with delays
      const featureItems = document.querySelectorAll(".feature-item");
      featureItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible");
        }, (index + 1) * 100); // 100ms delay between each item
      });
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Call handleScroll on page load to check initial position
  handleScroll();

  // Clean up event listener when page is unloaded (optional)
  window.addEventListener("beforeunload", function () {
    window.removeEventListener("scroll", handleScroll);
  });
});
// Join MuLearn Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  let joinIsVisible = false;

  function handleJoinScroll() {
    const section = document.getElementById("join-mulearn-section");
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75 && !joinIsVisible) {
      joinIsVisible = true;
      section.classList.add("join-visible");
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleJoinScroll);

  // Call handleJoinScroll on page load to check initial position
  handleJoinScroll();

  // Clean up event listener when page is unloaded (optional)
  window.addEventListener("beforeunload", function () {
    window.removeEventListener("scroll", handleJoinScroll);
  });
});
// Highlights Section JavaScript

class HighlightsSection {
  constructor() {
    this.isVisible = false;
    this.selectedImage = null;
    this.currentImageIndex = 0;
    this.showModal = false;

    // Image data - replace these paths with your actual image paths
    this.images = [
      {
        id: 1,
        src: "assets/highlights1.jpg", // Replace with actual path
        alt: "Highlight Image 1",
        title: "Perμte'25",
        desc: "µLearn's Skill Festival",
      },
      {
        id: 2,
        src: "assets/awards.jpg", // Replace with actual path
        alt: "Appreciations",
        title: "Appreciations",
        desc: "Honoring Excellence at µLearn",
      },
      {
        id: 3,
        src: "assets/workshop.jpg", // Replace with actual path
        alt: "Highlight Image 3",
        title: "μFest",
        desc: "MuLearn's 3-Day Event",
      },
      {
        id: 4,
        src: "assets/react.jpg", // Replace with actual path
        alt: "Highlight Image 4",
        title: "React Workshop",
        desc: "React Hands-On Workshop",
      },
    ];

    // Popup images data - replace these paths with your actual image paths
    this.popupImages = [
      {
        id: 1,
        src: "assets/highlights1.jpg",
        alt: "Perμte'25 Full View",
        title: "Perμte'25",
        desc: "The µLearn AJCE team had the wonderful opportunity to participate in Perµte 2025, the flagship event of the µLearn Foundation. It was an inspiring experience where we connected with CEOs, industry leaders, and passionate individuals, explored innovative projects, and built valuable networks. The event featured fun activities, engaging discussions, and showcased the true spirit of collaboration, innovation, and skill development. We are grateful to µLearn for providing such an enriching platform and look forward to applying these experiences in our future journey!",
        additionalImages: [
          { src: "assets/events/permute (1).jpg", alt: "Perμte'25" },
          { src: "assets/events/permute (2).jpg", alt: "Perμte'25" },
          { src: "assets/events/permute (3).jpg", alt: "Perμte'25" },
          { src: "assets/events/permute (4).jpg", alt: "Perμte'25" },
          { src: "assets/events/permute (5).jpg", alt: "Perμte'25" },
          { src: "assets/events/permute (6).jpg", alt: "Perμte'25" },
          { src: "assets/events/permute (7).jpg", alt: "Perμte'25" },
          { src: "assets/events/permute (8).jpg", alt: "Perμte'25" },
        ],
      },
      {
        id: 2,
        src: "assets/awards.jpg",
        alt: "Appreciations Full View",
        title: "Token of Appreciation",
        desc: "To express our heartfelt gratitude, µLearn AJCE presented a small memento to Navya Lizabeth for leading the React Hands-On Workshop. Her dedication, guidance, and effort made the sessions truly impactful for all participants. We deeply appreciate her support in empowering the community through learning and inspiration.",
        additionalImages: [
          { src: "assets/awards.jpg", alt: "Token of Appreciation" },
          { src: "assets/events/award2.jpg", alt: "Token of Appreciation" },
        ],
      },
      {
        id: 3,
        src: "assets/workshop.jpg",
        alt: "μFest Full View",
        title: "μFest",
        desc: "µLearn AJCE organized MuFest, a 3-day offline event held from January 7–9, 2025, led by Campus Lead Aibal Jose. The event kicked off with an orientation session introducing participants to µLearn's vision and community. On the second day, attendees explored the concept of karma mining through interactive activities, encouraging skill development and collaboration. The final day featured a hands-on no-code app development workshop, where participants brought their creative ideas to life, making the event a transformative and inspiring experience.",
        additionalImages: [
          {
            src: "assets/events/mufest1 (1).jpg",
            alt: "Day 1: μFest Opening Ceremony",
          },
          {
            src: "assets/events/mufest1 (2).jpg",
            alt: "Day 1: μFest Opening Ceremony",
          },
          { src: "assets/events/mufest1 (3).jpg", alt: "μFest Day 2" },
          { src: "assets/events/mufest1 (4).jpg", alt: "μFest Day 2" },
          { src: "assets/events/mufest3 (1).jpg", alt: "μFest Day 3" },
          { src: "assets/events/mufest3 (2).jpg", alt: "μFest Day 3" },
          { src: "assets/events/mufest3 (3).jpg", alt: "μFest Day 3" },
          { src: "assets/events/mufest3 (4).jpg", alt: "μFest Day 3" },
          { src: "assets/events/mufest3 (5).jpg", alt: "μFest Day 3" },
          { src: "assets/events/mufest3 (6).jpg", alt: "μFest Day 3" },
        ],
      },
      {
        id: 4,
        src: "assets/react.jpg",
        alt: "React Workshop Full View",
        title: "React Workshop",
        desc: "µLearn AJCE successfully conducted a 3-day React Hands-On Workshop from March 10–12, 2025, led by Navya Lizabeth. Designed for coding enthusiasts, the workshop offered a fun, beginner-friendly environment focused on real coding rather than just theory. Participants actively built projects, tackled challenges, and received guidance whenever needed, making it a valuable and engaging experience for those looking to level up their React skills",
        additionalImages: [
          { src: "assets/events/react1 (2).jpg", alt: "React Workshop Day 1" },
          { src: "assets/events/react1 (3).jpg", alt: "React Workshop Day 1" },
          { src: "assets/events/react1 (1).jpg", alt: "React Workshop Day 1" },
          { src: "assets/events/react 2 (1).jpg", alt: "React Workshop Day 2" },
          { src: "assets/events/react 2 (2).jpg", alt: "React Workshop Day 2" },
          { src: "assets/events/react 2 (3).jpg", alt: "React Workshop Day 2" },
          { src: "assets/events/react 2 (4).jpg", alt: "React Workshop Day 2" },
          { src: "assets/events/react 2 (5).jpg", alt: "React Workshop Day 2" },
          { src: "assets/events/react 2 (6).jpg", alt: "React Workshop Day 2" },
          { src: "assets/events/react3 (1).jpg", alt: "React Workshop Day 3" },
          { src: "assets/events/react3 (2).jpg", alt: "React Workshop Day 3" },
          { src: "assets/events/react3 (3).jpg", alt: "React Workshop Day 3" },
        ],
      },
    ];

    this.init();
  }

  init() {
    this.setupScrollHandler();
    this.setupScroller();
    this.setupModal();
    this.renderImages();
  }

  setupScrollHandler() {
    const handleScroll = () => {
      const section = document.getElementById("highlights-section");
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("highlights-visible");
          this.isVisible = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
  }

  setupScroller() {
    const scrollerInner = document.querySelector(".highlights-scroller-inner");
    if (!scrollerInner) return;

    // Add animation class
    scrollerInner.classList.add("highlights-animate-scroll");

    // Add hover pause functionality
    const handleMouseEnter = () => {
      scrollerInner.classList.remove("highlights-animate-scroll");
      scrollerInner.classList.add("highlights-pause-animation");
    };

    const handleMouseLeave = () => {
      scrollerInner.classList.remove("highlights-pause-animation");
      scrollerInner.classList.add("highlights-animate-scroll");
    };

    scrollerInner.addEventListener("mouseenter", handleMouseEnter);
    scrollerInner.addEventListener("mouseleave", handleMouseLeave);
  }

  renderImages() {
    const scrollerInner = document.querySelector(".highlights-scroller-inner");
    if (!scrollerInner) return;

    // Create double array for infinite scroll
    const allImages = [...this.images, ...this.images];

    // Clear existing content
    scrollerInner.innerHTML = "";

    allImages.forEach((image, index) => {
      const item = document.createElement("div");
      item.className = "highlights-scroller-item";
      item.setAttribute("data-image-id", image.id);

      item.innerHTML = `
                <div class="highlights-item-image">
                    <img src="${image.src}" alt="${image.alt}" class="highlights-item-img">
                </div>
                <div class="highlights-item-content">
                    <div class="highlights-item-bar"></div>
                    <h3 class="highlights-item-title">${image.title}</h3>
                    <p class="highlights-item-desc">${image.desc}</p>
                </div>
            `;

      // Add click handler
      item.addEventListener("click", () => this.handleImageClick(image.id));

      scrollerInner.appendChild(item);
    });

    // Clone items for seamless infinite scroll
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", "true");

      // Re-add click handler to duplicated item
      const imageId = duplicatedItem.getAttribute("data-image-id");
      duplicatedItem.addEventListener("click", () =>
        this.handleImageClick(parseInt(imageId))
      );

      scrollerInner.appendChild(duplicatedItem);
    });
  }

  setupModal() {
    const modal = document.getElementById("highlights-modal");
    const closeBtn = document.getElementById("highlights-close-btn");
    const prevBtn = document.getElementById("highlights-prev-btn");
    const nextBtn = document.getElementById("highlights-next-btn");

    // Close button
    closeBtn.addEventListener("click", () => this.closeModal());

    // Navigation buttons
    prevBtn.addEventListener("click", () => this.prevImage());
    nextBtn.addEventListener("click", () => this.nextImage());

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.showModal) {
        this.closeModal();
      }
    });
  }

  handleImageClick(imageId) {
    const popupImage = this.popupImages.find((img) => img.id === imageId);
    if (popupImage) {
      this.selectedImage = popupImage;
      this.currentImageIndex = 0;
      this.showModal = true;
      this.openModal();
    }
  }

  openModal() {
    const modal = document.getElementById("highlights-modal");
    modal.classList.add("highlights-modal-active");
    document.body.style.overflow = "hidden";
    this.updateModalContent();
  }

  closeModal() {
    const modal = document.getElementById("highlights-modal");
    modal.classList.remove("highlights-modal-active");
    this.showModal = false;
    this.selectedImage = null;
    document.body.style.overflow = "auto";
  }

  updateModalContent() {
    if (!this.selectedImage) return;

    const mainImage = document.getElementById("highlights-main-image");
    const title = document.getElementById("highlights-modal-title");
    const counter = document.getElementById("highlights-modal-counter");
    const subtitle = document.getElementById("highlights-modal-subtitle");
    const description = document.getElementById("highlights-modal-description");
    const thumbnailNav = document.getElementById("highlights-thumbnail-nav");

    const currentImg =
      this.selectedImage.additionalImages[this.currentImageIndex];

    // Update main image
    mainImage.src = currentImg.src;
    mainImage.alt = currentImg.alt;

    // Update content
    title.textContent = this.selectedImage.title;
    counter.textContent = `Image ${this.currentImageIndex + 1} of ${
      this.selectedImage.additionalImages.length
    }`;
    subtitle.textContent = currentImg.alt;
    description.textContent = this.selectedImage.desc;

    // Update thumbnails
    thumbnailNav.innerHTML = "";
    this.selectedImage.additionalImages.forEach((img, idx) => {
      const thumbnail = document.createElement("div");
      thumbnail.className = `highlights-thumbnail ${
        idx === this.currentImageIndex ? "highlights-thumbnail-active" : ""
      }`;
      thumbnail.innerHTML = `<img src="${img.src}" alt="Thumbnail ${idx + 1}">`;
      thumbnail.addEventListener("click", () => {
        this.currentImageIndex = idx;
        this.updateModalContent();
      });
      thumbnailNav.appendChild(thumbnail);
    });
  }

  nextImage() {
    if (this.selectedImage) {
      this.currentImageIndex =
        this.currentImageIndex ===
        this.selectedImage.additionalImages.length - 1
          ? 0
          : this.currentImageIndex + 1;
      this.updateModalContent();
    }
  }

  prevImage() {
    if (this.selectedImage) {
      this.currentImageIndex =
        this.currentImageIndex === 0
          ? this.selectedImage.additionalImages.length - 1
          : this.currentImageIndex - 1;
      this.updateModalContent();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HighlightsSection();
});
