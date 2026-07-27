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
            const postHTML = `
                <a href="${post.link}" class="blog-card reveal${delayClass}">
                    <img src="${post.image}" alt="${post.title}" class="blog-card-img" />
                    <div class="blog-card-body">
                        <span class="blog-card-cat">${post.category}</span>
                        <h3 class="blog-card-title">${post.title}</h3>
                        <p class="blog-card-desc">${post.description}</p>
                        <div class="blog-card-meta">${post.author} | ${post.date}</div>
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
