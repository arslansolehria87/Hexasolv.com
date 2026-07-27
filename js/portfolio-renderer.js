/**
 * Hexasolv Portfolio & Case Studies Renderer
 * Dynamically builds grid templates and handles the interactive Case Studies modal window.
 */

document.addEventListener('DOMContentLoaded', function() {
    injectModalStyles();
    injectModalHTML();
    renderPortfolio();
});

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

        const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
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

// Open Case Study Modal
function openCaseStudyModal(cs) {
    const modal = document.getElementById('csModal');
    if (!modal) return;

    document.getElementById('modalTitle').textContent = cs.title;
    document.getElementById('modalStat').textContent = cs.stat;
    document.getElementById('modalDuration').textContent = cs.duration;
    
    // Tech pills rendering
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
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

// Close Case Study Modal
function closeCaseStudyModal() {
    const modal = document.getElementById('csModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
    }
}

// Inject Modal HTML container dynamically
function injectModalHTML() {
    if (document.getElementById('csModal')) return;

    const modalHTML = `
        <div class="cs-modal-overlay" id="csModal">
            <div class="cs-modal-card">
                <button class="cs-modal-close" id="modalCloseBtn" aria-label="Close Case Study dialog">&times;</button>
                
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

                    <div class="cs-modal-section" style="border:none; padding-bottom:0; margin-bottom:0;">
                        <h4>Measurable Business Impact</h4>
                        <p id="modalImpact">-</p>
                    </div>
                </div>

                <div class="cs-modal-footer">
                    <button class="btn btn-primary" style="background:linear-gradient(135deg,#7c3aed,#a855f7); border:none; padding:0.6rem 2rem; border-radius:50px; font-family:'Outfit'; font-weight:700; font-size:0.85rem;" id="modalFooterCloseBtn">Close View</button>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = modalHTML.trim();
    document.body.appendChild(wrapper.firstChild);

    // Event listeners
    document.getElementById('modalCloseBtn').addEventListener('click', closeCaseStudyModal);
    document.getElementById('modalFooterCloseBtn').addEventListener('click', closeCaseStudyModal);
    document.getElementById('csModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCaseStudyModal();
        }
    });
}

// Inject Modal Styles dynamically
function injectModalStyles() {
    if (document.getElementById('csModalStyles')) return;

    const styleHTML = `
        <style id="csModalStyles">
            .cs-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 5, 25, 0.65);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
                padding: 1.5rem;
            }
            .cs-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .cs-modal-card {
                background: #ffffff;
                width: 100%;
                max-width: 650px;
                border-radius: 24px;
                border: 1px solid rgba(255, 255, 255, 0.7);
                box-shadow: 0 25px 50px -12px rgba(124, 58, 237, 0.25);
                display: flex;
                flex-direction: column;
                max-height: calc(100vh - 3rem);
                position: relative;
                transform: scale(0.92) translateY(15px);
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            html.dark .cs-modal-card {
                background: #130a2a;
                border-color: rgba(255, 255, 255, 0.08);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .cs-modal-overlay.active .cs-modal-card {
                transform: scale(1) translateY(0);
            }
            .cs-modal-close {
                position: absolute;
                top: 1.2rem;
                right: 1.5rem;
                font-size: 2.2rem;
                background: transparent;
                border: none;
                cursor: pointer;
                line-height: 1;
                color: #94a3b8;
                transition: color 0.2s;
                z-index: 10010;
            }
            .cs-modal-close:hover {
                color: #7c3aed;
            }
            .cs-modal-header {
                padding: 2.5rem 2.5rem 1.2rem;
                border-bottom: 1px solid #f1f5f9;
            }
            html.dark .cs-modal-header {
                border-color: rgba(255, 255, 255, 0.06);
            }
            .cs-modal-title {
                font-family: 'Outfit', sans-serif;
                font-size: 1.4rem;
                font-weight: 800;
                color: #0f172a;
                line-height: 1.3;
                margin-top: 0.6rem;
            }
            html.dark .cs-modal-title {
                color: #f1f5f9;
            }
            .cs-modal-stat-badge {
                display: inline-block;
                background: linear-gradient(135deg, #7c3aed, #06b6d4);
                color: #ffffff;
                font-size: 0.78rem;
                font-weight: 800;
                padding: 4px 14px;
                border-radius: 50px;
                box-shadow: 0 4px 10px rgba(124, 58, 237, 0.2);
            }
            .cs-modal-body {
                padding: 1.5rem 2.5rem;
                overflow-y: auto;
                flex: 1;
            }
            .cs-modal-section {
                margin-bottom: 1.5rem;
                border-bottom: 1px solid #f1f5f9;
                padding-bottom: 1.5rem;
            }
            html.dark .cs-modal-section {
                border-color: rgba(255, 255, 255, 0.06);
            }
            .cs-modal-section h4 {
                font-family: 'Outfit', sans-serif;
                font-size: 0.95rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: #7c3aed;
                margin-bottom: 0.5rem;
            }
            .cs-modal-section p {
                font-size: 0.88rem;
                line-height: 1.6;
                color: #475569;
                margin: 0;
            }
            html.dark .cs-modal-section p {
                color: #94a3b8;
            }
            .cs-modal-footer {
                padding: 1.2rem 2.5rem 2rem;
                display: flex;
                justify-content: flex-end;
                border-top: 1px solid #f1f5f9;
            }
            html.dark .cs-modal-footer {
                border-color: rgba(255, 255, 255, 0.06);
            }
        </style>
    `;
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = styleHTML.trim();
    document.head.appendChild(wrapper.firstChild);
}
