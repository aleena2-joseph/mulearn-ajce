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
