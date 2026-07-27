/**
 * Hexasolv - Main JavaScript
 * Handles: Navigation, Animations, Forms, Counters, Accordion, Chat
 */

'use strict';

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    initPageLoader();
    initStickyHeader();
    syncHeaderHeight();
    initMobileMenu();
    initHeroSlider();
    initCounters();
    initAccordion();
    initBackToTop();
    initForms();
    initPortfolioFilter();
    initAccordionTabs();

});

// ============================================================
// PAGE LOADER
// ============================================================
function initPageLoader() {
    const loader = document.getElementById('pagePreloader') || document.getElementById('pageLoader');
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
            if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 600);
    }, 600);
}

// ============================================================
// HERO SLIDER
// ============================================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startAutoPlay() {
        stopAutoPlay();
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            startAutoPlay();
        });
    }
    
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', function() {
            showSlide(idx);
            startAutoPlay();
        });
    });
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoPlay);
        heroSection.addEventListener('mouseleave', startAutoPlay);
    }
    
    startAutoPlay();
}

// ============================================================
// STICKY HEADER
// ============================================================
function initStickyHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ============================================================
// FIXED HEADER HEIGHT SYNC (prevents hero content overlap)
// ============================================================
function syncHeaderHeight() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-h', h + 'px');
}
window.addEventListener('load', syncHeaderHeight);
window.addEventListener('resize', syncHeaderHeight);


// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay    = document.getElementById('menuOverlay');
    const mobClose   = document.getElementById('mobClose');

    if (!hamburger || !mobileMenu) return;

    function openMenu() {
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        if (overlay) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.classList.add('open'), 10);
        }
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        if (overlay) {
            overlay.classList.remove('open');
            setTimeout(() => { overlay.style.display = 'none'; }, 300);
        }
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay && overlay.addEventListener('click', closeMenu);
    mobClose && mobClose.addEventListener('click', closeMenu);

    const servicesToggle  = document.getElementById('servicesToggle');
    const servicesSubmenu = document.getElementById('servicesSubmenu');
    if (servicesToggle && servicesSubmenu) {
        servicesToggle.addEventListener('click', function() {
            servicesSubmenu.classList.toggle('open');
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target   = parseInt(el.dataset.counter, 10);
    const duration = parseInt(el.dataset.duration || '2000', 10);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const start    = performance.now();

    function update(currentTime) {
        const elapsed  = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(eased * target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
        }
    }

    requestAnimationFrame(update);
}

// ============================================================
// ACCORDION / FAQ
// ============================================================
function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    if (!items.length) return;

    items.forEach(function(item) {
        const header = item.querySelector('.accordion-header');
        const body   = item.querySelector('.accordion-body');
        if (!header || !body) return;

        header.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            items.forEach(function(i) {
                i.classList.remove('open');
                const b = i.querySelector('.accordion-body');
                if (b) b.style.height = '0';
            });
            if (!isOpen) {
                item.classList.add('open');
                body.style.height = body.scrollHeight + 'px';
            }
        });
    });
}

// ============================================================
// BACK TO TOP
// ============================================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// FORMS
// ✅ FIX: contactForm is handled by its own page JS — skip it here
// Only quoteForm and newsletterForm are handled by main.js
// ============================================================
function initForms() {
    // ✅ contactForm intentionally SKIPPED — has its own handler in pages/contact.php

    // ✅ quoteForm intentionally SKIPPED — has its own handler in pages/quote.php

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleFormSubmit);
    }

    // Real-time validation
    document.querySelectorAll('.form-control').forEach(function(input) {
        input.addEventListener('blur', function() { validateField(input); });
        input.addEventListener('input', function() {
            if (input.classList.contains('error')) validateField(input);
        });
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form   = e.target;
    const btn    = form.querySelector('button[type="submit"]');
    const action = form.dataset.action || form.action;
    const msgEl  = form.querySelector('.form-status');

    let valid = true;
    form.querySelectorAll('.form-control[required]').forEach(function(field) {
        if (!validateField(field)) valid = false;
    });
    if (!valid) return;

    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.disabled  = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    try {
        const formData = new FormData(form);
        formData.append('source_page', window.location.pathname);

        const response = await fetch(action || '/api/contact', {
            method : 'POST',
            body   : formData,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        const result = await response.json();

        if (result.success) {
            showFormMessage(msgEl, 'success', result.message || '✅ Message sent successfully!');
            form.reset();
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', { event_category: 'engagement', event_label: form.id });
            }
        } else {
            showFormMessage(msgEl, 'error', result.message || '❌ Something went wrong. Please try again.');
        }

    } catch (error) {
        showFormMessage(msgEl, 'error', '❌ Network error. Please check your connection and try again.');
        console.error('Form submit error:', error);
    } finally {
        if (btn) {
            btn.disabled  = false;
            btn.innerHTML = originalText;
        }
    }
}

function validateField(field) {
    const value    = field.value.trim();
    const type     = field.type;
    const required = field.hasAttribute('required');
    let error      = '';

    if (required && !value) {
        error = 'This field is required.';
    } else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address.';
    } else if (type === 'tel' && value && !/^[\d\s\+\-\(\)]{7,20}$/.test(value)) {
        error = 'Please enter a valid phone number.';
    } else if (field.minLength > 0 && value && value.length < field.minLength) {
        error = `Minimum ${field.minLength} characters required.`;
    }

    const errorEl = field.parentElement?.querySelector('.form-error');
    if (error) {
        field.classList.add('error');
        field.classList.remove('success');
        if (errorEl) errorEl.textContent = error;
    } else {
        field.classList.remove('error');
        if (value) field.classList.add('success');
        if (errorEl) errorEl.textContent = '';
    }

    return !error;
}

function showFormMessage(el, type, text) {
    if (!el) {
        el = document.createElement('div');
        el.className = 'form-status';
        document.querySelector('form')?.appendChild(el);
    }
    el.className = `flash-message flash-${type}`;
    el.innerHTML = text;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
        setTimeout(() => { el.style.opacity = '0'; }, 8000);
    }
}

// ============================================================
// PORTFOLIO FILTER
// ============================================================
function initPortfolioFilter() {
    const filterBtns     = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!filterBtns.length || !portfolioItems.length) return;

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            portfolioItems.forEach(function(item) {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    requestAnimationFrame(() => {
                        item.style.opacity   = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity   = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// ============================================================
// TAB SYSTEM
// ============================================================
function initAccordionTabs() {
    const tabs   = document.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll('[data-panel]');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.querySelector(`[data-panel="${target}"]`);
            if (panel) panel.classList.add('active');
        });
    });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
});

// ============================================================
// PHONE TRACKING
// ============================================================
document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
    link.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_click', { event_category: 'contact', event_label: link.href });
        }
    });
});

// ============================================================
// CHAT WIDGET WITH GENERIC REFERRAL SUPPORT
// ============================================================
const chatBtn = document.getElementById('chatBtn');
if (chatBtn) {
    // Get referral data from button attributes (set by PHP)
    const isReferred = chatBtn.getAttribute('data-referred') === '1';
    const referralCode = chatBtn.getAttribute('data-code') || '';
    const referralSource = chatBtn.getAttribute('data-source') || '';
    
    chatBtn.addEventListener('click', function() {
        let message = '';
        
        // Generic message for ANY referral
        if (isReferred && referralCode) {
            message = `Hi! I was referred through ${referralCode.toUpperCase()}. I'd like to discuss a project with Hexasolv.`;
        } else {
            message = "Hi! I'd like to discuss a project with Hexasolv.";
        }
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/923214530103?text=${encodedMessage}`, '_blank');
    });
}
// ============================================================
// LAZY LOAD IMAGES
// ============================================================
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window && lazyImages.length) {
    const imgObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imgObserver.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => imgObserver.observe(img));
}

// ============================================================
// THEME SWITCHER (DARK/LIGHT MODE)
// ============================================================
window.toggleTheme = function() {
    const root = document.documentElement;
    const icon = document.getElementById('themeToggleIcon');
    if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (icon) icon.textContent = '🌙';
    } else {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (icon) icon.textContent = '☀️';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const icon = document.getElementById('themeToggleIcon');
    if (icon) {
        icon.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    }
});
