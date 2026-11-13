/**
 * Hexasolv Blog Renderer
 * Dynamically builds grid templates from blog posts data with category filtering.
 */

document.addEventListener('DOMContentLoaded', function() {
    initBlog();
});

function initBlog() {
    const blogContainer = document.getElementById('blogGridContainer');
    const filterBtns = document.querySelectorAll('.blog-filter-btn');

    if (!blogContainer || typeof BLOG_DATA === 'undefined') return;

    function renderPosts(categoryFilter = 'all') {
        blogContainer.innerHTML = '';

        const filtered = categoryFilter === 'all'
            ? BLOG_DATA
            : BLOG_DATA.filter(post => post.categoryGroup === categoryFilter || post.category.toLowerCase().includes(categoryFilter.toLowerCase()));

        filtered.forEach((post, index) => {
            const delayClass = index % 3 > 0 ? ` delay-${index % 3}` : '';
            const readTime = post.readTime || '5 min read';
            const postHTML = `
                <a href="${post.link}" class="blog-card reveal${delayClass}" data-group="${post.categoryGroup || 'all'}">
                    <img src="${post.image}" alt="${post.title}" class="blog-card-img" loading="lazy" />
                    <div class="blog-card-body">
                        <span class="blog-card-cat">${post.category}</span>
                        <h3 class="blog-card-title">${post.title}</h3>
                        <p class="blog-card-desc">${post.description}</p>
                        <div class="blog-card-meta">
                            <span>${post.author}</span>
                            <span style="margin:0 0.4rem;">&bull;</span>
                            <span>${post.date}</span>
                            <span style="margin:0 0.4rem;">&bull;</span>
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

    renderPosts('all');

    if (filterBtns && filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter') || 'all';
                renderPosts(filter);
            });
        });
    }
}
