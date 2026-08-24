const includePromises = [];

class HtmlInclude extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    if (!src) return;

    includePromises.push(
      fetch(src)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.text();
        })
        .then((html) => {
          this.outerHTML = html;
        })
        .catch((error) => {
          console.error(`Kunde inte läsa in ${src}:`, error);
        })
    );
  }
}

customElements.define("html-include", HtmlInclude);

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (hash === "#") return;

      e.preventDefault();
      document.querySelector(hash).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function initHeaderScroll() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
        if (window.scrollY > 100) {
          header.style.backgroundColor = "rgba(253, 251, 247, 0.95)";
          header.style.boxShadow = "0 2px 14px rgba(36, 27, 53, 0.12)";
        } else {
      header.style.backgroundColor = "transparent";
      header.style.boxShadow = "none";
    }
  });
}

Promise.all(includePromises).then(() => {
  initSmoothScroll();
  initHeaderScroll();
});
