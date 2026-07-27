/**
 * Hexasolv - Shared Theme Controller
 * Handles dark mode state and local storage synchronization
 */

function toggleTheme() {
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
}

document.addEventListener('DOMContentLoaded', function() {
    const icon = document.getElementById('themeToggleIcon');
    if (icon) {
        icon.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    }
    
    // Initialize Scroll Reveal Observer
    initScrollReveal();
});

function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => observer.observe(el));
}
