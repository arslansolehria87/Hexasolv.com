/**
 * Hexasolv Blog Renderer
 * Dynamically builds grid templates from blog posts data.
 */

document.addEventListener('DOMContentLoaded', function() {
    renderBlog();
});

function renderBlog() {
    const blogContainer = document.getElementById('blogGridContainer');

    if (blogContainer && typeof BLOG_DATA !== 'undefined') {
        blogContainer.innerHTML = '';

        BLOG_DATA.forEach((post, index) => {
            const delayClass = index % 3 > 0 ? ` delay-${index % 3}` : '';
            const readTime = post.readTime || '5 min read';
            const postHTML = `
                <a href="${post.link}" class="blog-card reveal${delayClass}">
                    <img src="${post.image}" alt="${post.title}" class="blog-card-img" loading="lazy" />
                    <div class="blog-card-body">
                        <span class="blog-card-cat">${post.category}</span>
                        <h3 class="blog-card-title">${post.title}</h3>
                        <p class="blog-card-desc">${post.description}</p>
                        <div class="blog-card-meta">
                            <span>${post.author}</span>
                            <span style="margin:0 0.4rem;">·</span>
                            <span>${post.date}</span>
                            <span style="margin:0 0.4rem;">·</span>
                            <span><i class="fas fa-clock" style="font-size:0.7rem; margin-right:3px;"></i>${readTime}</span>
                        </div>
                    </div>
                </a>
            `;
            blogContainer.insertAdjacentHTML('beforeend', postHTML);
        });

        // Initialize Scroll Reveal on newly injected elements
        if (typeof initScrollReveal === 'function') {
            initScrollReveal();
        }
    }
}
