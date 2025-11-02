/* ==========================================
   🧠 DaDon Personal Website — Main Script
   ========================================== */

/* ========== 🌐 BLOGGER FEED ========== */
function loadBloggerFeed(json) {
  const blogGrid = document.getElementById("blog-grid");
  if (!blogGrid) return; // Stop if not on homepage or blog page

  blogGrid.innerHTML = "";
  const posts = json.feed?.entry || [];

  if (!posts.length) {
    blogGrid.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    return;
  }

  posts.slice(0, 3).forEach(post => {
    const title = post.title?.$t || "Untitled Post";
    const link = post.link.find(l => l.rel === "alternate")?.href || "#";
    const content = post.content ? post.content.$t : "";
    const snippet = content.replace(/<[^>]+>/g, "").substring(0, 120) + "...";

    // Extract first image
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    const thumbnail = imgMatch ? imgMatch[1] : "assets/images/default-blog.jpg";

    const article = document.createElement("article");
    article.classList.add("blog-card");
    article.innerHTML = `
      <img src="${thumbnail}" alt="${title}" loading="lazy" />
      <h3>${title}</h3>
      <p>${snippet}</p>
      <a href="${link}" target="_blank" class="btn">Read More</a>
    `;
    blogGrid.appendChild(article);
  });
}

// Dynamically load Blogger JSON feed
(function loadBloggerScript() {
  const script = document.createElement("script");
  script.src =
    "https://onlineworkhustler.blogspot.com/feeds/posts/default?alt=json-in-script&callback=loadBloggerFeed";
  document.body.appendChild(script);
})();

/* ========== 📱 MOBILE NAV TOGGLE ========== */
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");

      // Toggle between hamburger and close icon
      menuToggle.innerHTML = navbar.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  /* ========== 🔗 ACTIVE NAV LINK ========== */
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  /* ========== 🆙 SCROLL TO TOP BUTTON (Optional) ========== */
  const scrollBtn = document.createElement("div");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = "scroll-top";
  document.body.appendChild(scrollBtn);

  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    background: var(--accent);
    color: var(--primary);
    font-size: 1.3rem;
    border-radius: 50%;
    padding: 12px 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1500;
  `;

  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top when clicked
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
