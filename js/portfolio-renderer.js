/**
 * Hexasolv Portfolio & Video Case Studies Renderer
 * Dynamically builds grid templates for existing projects AND dedicated video showcase sections.
 */

document.addEventListener('DOMContentLoaded', function() {
    injectModalStyles();
    injectModalHTML();
    renderPortfolio();
    renderVideoShowcases();
});

// Original Portfolio Renderer (Preserved 100%)
function renderPortfolio() {
    const featuredContainer = document.getElementById('featuredPortfolioContainer');
    const mainGridContainer = document.getElementById('portfolioGridContainer');
    const caseStudiesContainer = document.getElementById('caseStudiesContainer');

    // 1. Render Homepage Featured Portfolio
    if (featuredContainer && typeof PORTFOLIO_DATA !== 'undefined') {
        featuredContainer.innerHTML = '';
        const featuredItems = PORTFOLIO_DATA.slice(0, 6);
        featuredItems.forEach((item, index) => {
            const delayClass = index % 3 > 0 ? ` delay-${index % 3}` : '';
            const cardHTML = `
                <div class="portfolio-project-card reveal${delayClass}">
                    <div style="position:relative; overflow:hidden; height:220px;">
                        <img src="${item.image}" alt="${item.title}" class="portfolio-card-img" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;" onerror="this.src='${item.fallbackImage}'" />
                        <span style="position:absolute; top:12px; right:12px; background:rgba(15,10,30,0.85); backdrop-filter:blur(10px); color:#a78bfa; font-size:11px; font-weight:700; padding:4px 12px; border-radius:50px; border:1px solid rgba(124,58,237,0.3);">${item.badge}</span>
                    </div>
                    <div class="portfolio-card-body" style="padding:1.8rem; display:flex; flex-direction:column; flex-grow:1;">
                        <div style="font-size:11px; font-weight:800; color:#7c3aed; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.4rem;">${item.category}</div>
                        <h3 style="font-family:'Outfit'; font-size:1.3rem; font-weight:800; margin-bottom:0.6rem; color:#0f0a1e;">${item.title}</h3>
                        <p style="font-size:0.88rem; color:#4b5563; line-height:1.6; flex-grow:1; margin-bottom:1.2rem;">${item.description}</p>
                        <div style="margin-bottom:1.2rem;">
                            ${item.techs.map(t => `<span class="tag-pill">${t}</span>`).join('')}
                        </div>
                        <a href="${item.link}" target="${item.target}" style="font-family:'Outfit'; font-size:0.9rem; font-weight:700; color:#7c3aed; text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem;">View System →</a>
                    </div>
                </div>
            `;
            featuredContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
        if (typeof initScrollReveal === 'function') {
            initScrollReveal();
        }
    }

    // 2. Render Main Portfolio Page Grid & Filter Setup
    if (mainGridContainer && typeof PORTFOLIO_DATA !== 'undefined') {
        const generateCardHTML = (item, index) => {
            const delayClass = index % 3 > 0 ? ` delay-${index % 3}` : '';
            return `
                <div class="portfolio-card reveal${delayClass}" data-category="${item.dataCategory}">
                    <div class="portfolio-img-box">
                        <img src="${item.image}" alt="${item.title}" onerror="this.src='${item.fallbackImage}'" />
                        <span class="portfolio-badge">${item.badge}</span>
                    </div>
                    <div class="portfolio-body">
                        <span class="portfolio-category">${item.category}</span>
                        <h3 class="portfolio-title">${item.title}</h3>
                        <p class="portfolio-desc">${item.description}</p>
                        <div class="portfolio-techs">
                            ${item.techs.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                        <a href="${item.link}" target="${item.target}" class="portfolio-link">View Project →</a>
                    </div>
                </div>
            `;
        };

        const renderGrid = (items) => {
            mainGridContainer.innerHTML = '';
            items.forEach((item, index) => {
                mainGridContainer.insertAdjacentHTML('beforeend', generateCardHTML(item, index));
            });
            if (typeof initScrollReveal === 'function') {
                initScrollReveal();
            }
        };

        renderGrid(PORTFOLIO_DATA);

        const filterBtns = document.querySelectorAll('.portfolio-filter-btn:not(.video-filter-btn)');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filterVal = this.getAttribute('data-filter');
                if (filterVal === 'all') {
                    renderGrid(PORTFOLIO_DATA);
                } else {
                    const filtered = PORTFOLIO_DATA.filter(item => item.dataCategory === filterVal);
                    renderGrid(filtered);
                }
            });
        });
    }

    // 3. Render Case Studies Grid & Bind Modal Click triggers
    if (caseStudiesContainer && typeof CASE_STUDIES_DATA !== 'undefined') {
        caseStudiesContainer.innerHTML = '';
        CASE_STUDIES_DATA.forEach((cs, index) => {
            const delayClass = index % 3 > 0 ? ` delay-${index % 3}` : '';
            const csHTML = `
                <div class="cs-card reveal${delayClass}" data-cs-id="${cs.id}" style="cursor:pointer; transition: transform 0.3s, border-color 0.3s;">
                    <span class="cs-stat-badge">${cs.stat}</span>
                    <h3 class="cs-title">${cs.title}</h3>
                    <p class="cs-desc">${cs.description}</p>
                    <div class="portfolio-techs" style="margin-bottom:0.5rem;">
                        ${cs.techs.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    <span style="font-family:'Outfit'; font-size:0.8rem; font-weight:700; color:#7c3aed; display:inline-flex; align-items:center; gap:0.25rem;">View Case Study Details →</span>
                </div>
            `;
            caseStudiesContainer.insertAdjacentHTML('beforeend', csHTML);
        });

        // Attach click handlers to open details modal
        const cards = caseStudiesContainer.querySelectorAll('.cs-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-cs-id');
                const data = CASE_STUDIES_DATA.find(item => item.id === id);
                if (data) {
                    openCaseStudyModal(data);
                }
            });
        });

        if (typeof initScrollReveal === 'function') {
            initScrollReveal();
        }
    }
}

// ── NEW: Dedicated Video Showcases Renderer (3 Home / 13 Portfolio) ──
function renderVideoShowcases() {
    const featuredVideoGrid = document.getElementById('featuredVideosGrid');
    const videoPortfolioGrid = document.getElementById('videoPortfolioGrid');

    if (typeof PROJECT_VIDEOS_DATA === 'undefined') return;

    // A) Render 6 Featured Videos on Homepage (3 Columns x 2 Rows)
    if (featuredVideoGrid) {
        featuredVideoGrid.innerHTML = '';
        const featuredVideos = PROJECT_VIDEOS_DATA.slice(0, 6);
        featuredVideos.forEach((item) => {
            const cardHTML = `
                <div class="video-showcase-card" data-video-id="${item.id}" style="cursor:pointer;">
                    <div class="video-thumb-container">
                        <video src="${encodeURI(item.videoUrl)}" autoplay loop muted playsinline poster="${item.image}" class="video-thumb-media"></video>
                        <div class="video-play-overlay">
                            <span class="play-button-icon"><i class="fas fa-play"></i></span>
                            <span class="play-text-label">Watch Demo</span>
                        </div>
                        <span class="video-duration-tag"><i class="far fa-clock"></i> ${item.videoDuration}</span>
                        <span class="video-platform-badge ${item.dataCategory}">${item.badge}</span>
                    </div>
                    <div class="video-card-content">
                        <div class="video-category-label">${item.category}</div>
                        <h3 class="video-card-title">${item.title}</h3>
                        <p class="video-card-desc">${item.description}</p>
                        <div class="video-tech-pills">
                            ${item.techs.map(t => `<span class="v-tag">${t}</span>`).join('')}
                        </div>
                        <div class="video-card-action">
                            <span>Watch Project Video & Case Study →</span>
                        </div>
                    </div>
                </div>
            `;
            featuredVideoGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        featuredVideoGrid.querySelectorAll('.video-showcase-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-video-id');
                const videoItem = PROJECT_VIDEOS_DATA.find(v => v.id === id);
                if (videoItem) {
                    openVideoModal(videoItem);
                }
            });
        });
    }

    // B) Render All 13 Project Videos on Portfolio Page with Filter Tabs
    if (videoPortfolioGrid) {
        const renderVideoGrid = (items) => {
            videoPortfolioGrid.innerHTML = '';
            items.forEach((item) => {
                const cardHTML = `
                    <div class="video-showcase-card" data-category="${item.dataCategory}" data-video-id="${item.id}" style="cursor:pointer;">
                        <div class="video-thumb-container">
                            <video src="${encodeURI(item.videoUrl)}" autoplay loop muted playsinline poster="${item.image}" class="video-thumb-media"></video>
                            <div class="video-play-overlay">
                                <span class="play-button-icon"><i class="fas fa-play"></i></span>
                                <span class="play-text-label">Play Video</span>
                            </div>
                            <span class="video-duration-tag"><i class="far fa-clock"></i> ${item.videoDuration}</span>
                            <span class="video-platform-badge ${item.dataCategory}">${item.badge}</span>
                        </div>
                        <div class="video-card-content">
                            <div class="video-category-label">${item.category}</div>
                            <h3 class="video-card-title">${item.title}</h3>
                            <p class="video-card-desc">${item.description}</p>
                            <div class="video-tech-pills">
                                ${item.techs.map(t => `<span class="v-tag">${t}</span>`).join('')}
                            </div>
                            <div class="video-card-action">
                                <span>Watch Video & Case Study →</span>
                            </div>
                        </div>
                    </div>
                `;
                videoPortfolioGrid.insertAdjacentHTML('beforeend', cardHTML);
            });

            videoPortfolioGrid.querySelectorAll('.video-showcase-card').forEach(card => {
                card.addEventListener('click', function() {
                    const id = this.getAttribute('data-video-id');
                    const videoItem = PROJECT_VIDEOS_DATA.find(v => v.id === id);
                    if (videoItem) {
                        openVideoModal(videoItem);
                    }
                });
            });

            if (typeof initScrollReveal === 'function') {
                initScrollReveal();
            }
        };

        renderVideoGrid(PROJECT_VIDEOS_DATA);

        // Video Filter Buttons Listener
        const videoFilterBtns = document.querySelectorAll('.video-filter-btn');
        videoFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                videoFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filterVal = this.getAttribute('data-video-filter');
                if (filterVal === 'all') {
                    renderVideoGrid(PROJECT_VIDEOS_DATA);
                } else {
                    const filtered = PROJECT_VIDEOS_DATA.filter(item => item.dataCategory === filterVal);
                    renderVideoGrid(filtered);
                }
            });
        });
    }
}

// Open Video Showcase Modal
function openVideoModal(videoItem) {
    const modal = document.getElementById('csModal');
    if (!modal) return;

    document.getElementById('modalTitle').textContent = videoItem.title;
    document.getElementById('modalStat').textContent = videoItem.stat || (videoItem.badge || 'Live Project');
    document.getElementById('modalDuration').textContent = videoItem.duration || '2-3 Weeks';
    
    // Inject Video Player Iframe
    let videoWrapper = document.getElementById('modalVideoWrapper');
    if (!videoWrapper) {
        const modalHeader = modal.querySelector('.cs-modal-header');
        videoWrapper = document.createElement('div');
        videoWrapper.id = 'modalVideoWrapper';
        videoWrapper.style.marginBottom = '1.5rem';
        modalHeader.insertAdjacentElement('afterend', videoWrapper);
    }

    const isDirectVideo = videoItem.videoUrl.endsWith('.mp4') || videoItem.videoUrl.endsWith('.webm') || videoItem.videoUrl.startsWith('videos/');
    if (isDirectVideo) {
        videoWrapper.innerHTML = `
            <div style="position:relative; border-radius:16px; overflow:hidden; background:#000; border:1px solid rgba(124,58,237,0.3); margin-top:1rem;">
                <video controls autoplay playsinline style="width:100%; height:auto; display:block; max-height:450px; margin:0 auto;">
                    <source src="${encodeURI(videoItem.videoUrl)}" type="video/mp4">
                    Your browser does not support HTML5 video playback.
                </video>
            </div>
        `;
    } else {
        videoWrapper.innerHTML = `
            <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:16px; background:#000; border:1px solid rgba(124,58,237,0.3); margin-top:1rem;">
                <iframe src="${videoItem.videoUrl}?autoplay=1&rel=0" title="${videoItem.title} Video Showcase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute; top:0; left:0; width:100%; height:100%;"></iframe>
            </div>
        `;
    }

    // Tech pills rendering
    const techWrapper = document.getElementById('modalTechs');
    if (techWrapper) {
        techWrapper.innerHTML = '';
        videoItem.techs.forEach(t => {
            const span = document.createElement('span');
            span.className = 'tag-pill';
            span.style.background = 'rgba(124, 58, 237, 0.12)';
            span.style.color = '#7c3aed';
            span.style.border = '1px solid rgba(124, 58, 237, 0.2)';
            span.style.padding = '4px 12px';
            span.style.borderRadius = '50px';
            span.style.fontSize = '0.75rem';
            span.style.fontWeight = '700';
            span.textContent = t;
            techWrapper.appendChild(span);
        });
    }

    document.getElementById('modalProblem').textContent = videoItem.problem || videoItem.description;
    document.getElementById('modalSolution').textContent = videoItem.solution || 'Engineered custom modular architecture with high-speed performance optimizations.';
    document.getElementById('modalImpact').textContent = videoItem.impact || 'Delivered outstanding performance and revenue growth for client.';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open Case Study Modal (Legacy)
function openCaseStudyModal(cs) {
    const modal = document.getElementById('csModal');
    if (!modal) return;

    // Clear video if present
    const videoWrapper = document.getElementById('modalVideoWrapper');
    if (videoWrapper) videoWrapper.innerHTML = '';

    document.getElementById('modalTitle').textContent = cs.title;
    document.getElementById('modalStat').textContent = cs.stat;
    document.getElementById('modalDuration').textContent = cs.duration;
    
    const techWrapper = document.getElementById('modalTechs');
    techWrapper.innerHTML = '';
    cs.techs.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.style.background = 'rgba(124, 58, 237, 0.08)';
        span.style.color = '#7c3aed';
        span.style.border = '1px solid rgba(124, 58, 237, 0.15)';
        span.textContent = t;
        techWrapper.appendChild(span);
    });

    document.getElementById('modalProblem').textContent = cs.problem;
    document.getElementById('modalSolution').textContent = cs.solution;
    document.getElementById('modalImpact').textContent = cs.impact;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Case Study / Video Modal
function closeCaseStudyModal() {
    const modal = document.getElementById('csModal');
    if (modal) {
        modal.classList.remove('active');
        const videoWrapper = document.getElementById('modalVideoWrapper');
        if (videoWrapper) videoWrapper.innerHTML = '';
        document.body.style.overflow = '';
    }
}

// Inject Modal HTML container dynamically
function injectModalHTML() {
    if (document.getElementById('csModal')) return;

    const modalHTML = `
        <div class="cs-modal-overlay" id="csModal">
            <div class="cs-modal-card">
                <button class="cs-modal-close" id="modalCloseBtn" aria-label="Close dialog">&times;</button>
                
                <div class="cs-modal-header">
                    <span class="cs-modal-stat-badge" id="modalStat">-</span>
                    <h3 class="cs-modal-title" id="modalTitle">Case Study Title</h3>
                    <div style="font-size: 0.8rem; color:#64748b; font-weight:700; margin-top:0.4rem; display:flex; gap:1rem;">
                        <span><i class="far fa-clock"></i> Duration: <span id="modalDuration">-</span></span>
                    </div>
                </div>

                <div class="cs-modal-body">
                    <div style="margin-bottom: 1.5rem;" id="modalTechs"></div>

                    <div class="cs-modal-section">
                        <h4>The Challenge</h4>
                        <p id="modalProblem">-</p>
                    </div>

                    <div class="cs-modal-section">
                        <h4>Our Technical Solution</h4>
                        <p id="modalSolution">-</p>
                    </div>

                    <div class="cs-modal-section">
                        <h4>Business Impact & Results</h4>
                        <p id="modalImpact" style="font-weight: 700; color: #10b981;">-</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCaseStudyModal);
    }

    const modalOverlay = document.getElementById('csModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCaseStudyModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCaseStudyModal();
        }
    });
}

// Inject Modal Styles dynamically
function injectModalStyles() {
    if (document.getElementById('csModalStyles')) return;

    const css = `
        .cs-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(3, 1, 10, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .cs-modal-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .cs-modal-card {
            background: #0d0722;
            border: 1px solid rgba(124, 58, 237, 0.3);
            border-radius: 24px;
            width: 100%;
            max-width: 780px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 2.2rem;
            position: relative;
            box-shadow: 0 25px 70px rgba(0,0,0,0.8);
            color: #ffffff;
            transform: scale(0.95);
            transition: transform 0.3s ease;
        }
        .cs-modal-overlay.active .cs-modal-card {
            transform: scale(1);
        }
        .cs-modal-close {
            position: absolute;
            top: 1.2rem;
            right: 1.4rem;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            color: #ffffff;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .cs-modal-close:hover {
            background: #7c3aed;
            color: #fff;
        }
        .cs-modal-stat-badge {
            display: inline-block;
            background: rgba(16, 185, 129, 0.15);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.3);
            font-size: 0.75rem;
            font-weight: 800;
            padding: 0.3rem 0.9rem;
            border-radius: 50px;
            margin-bottom: 0.8rem;
            text-transform: uppercase;
        }
        .cs-modal-title {
            font-family: 'Outfit', sans-serif;
            font-size: 1.6rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0;
            line-height: 1.2;
        }
        .cs-modal-section {
            margin-bottom: 1.2rem;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px;
            padding: 1.2rem;
        }
        .cs-modal-section h4 {
            font-family: 'Outfit', sans-serif;
            font-size: 0.9rem;
            font-weight: 800;
            color: #7c3aed;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 0.4rem;
        }
        .cs-modal-section p {
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.6;
            margin: 0;
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'csModalStyles';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
}
