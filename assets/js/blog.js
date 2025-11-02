/* ==========================================
   📰 DaDon Personal Website — Blog Script
   ========================================== */

/**
 * Fetches and displays blog posts from Blogger feed.
 * Adds smooth fade-in animation to each post card.
 */

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;

  // Blogger JSON feed URL
  const bloggerFeed =
    "https://onlineworkhustler.blogspot.com/feeds/posts/default?alt=json-in-script&callback=loadBloggerFeed";

  // Dynamically inject Blogger feed script
  const script = document.createElement("script");
  script.src = bloggerFeed;
  document.body.appendChild(script);
});

/* ========== 🔄 Callback for Blogger JSON Feed ========== */
function loadBloggerFeed(json) {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;

  blogContainer.innerHTML = "";
  const posts = json.feed?.entry || [];

  if (!posts.length) {
    blogContainer.innerHTML = `<p>⚠️ No posts found. Please check back later.</p>`;
    return;
  }

  // Loop through posts
  posts.forEach((post, index) => {
    const title = post.title?.$t || "Untitled Post";
    const link = post.link.find(l => l.rel === "alternate")?.href || "#";
    const content = post.content ? post.content.$t : "";
    const snippet = content.replace(/<[^>]+>/g, "").substring(0, 160) + "...";

    // Extract first image from content
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    const thumbnail = imgMatch ? imgMatch[1] : "../assets/images/default-blog.jpg";

    // Create post card
    const postCard = document.createElement("article");
    postCard.classList.add("blog-card");
    postCard.style.opacity = "0";
    postCard.style.transform = "translateY(30px)";
    postCard.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    postCard.innerHTML = `
      <img src="${thumbnail}" alt="${title}" loading="lazy" />
      <div class="blog-content">
        <h3>${title}</h3>
        <p>${snippet}</p>
        <a href="${link}" target="_blank" class="btn">Read Full Post</a>
      </div>
    `;

    blogContainer.appendChild(postCard);

    // Fade-in animation with delay
    setTimeout(() => {
      postCard.style.opacity = "1";
      postCard.style.transform = "translateY(0)";
    }, 150 * index);
  });
}
