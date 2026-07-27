/**
 * Hexasolv Agency Upgrades Controller
 * Manages behaviors for interactive collapsible FAQs and other agency modules.
 */

document.addEventListener('DOMContentLoaded', function() {
    initFaqAccordion();
    initReviewsSlider();
});

function initFaqAccordion() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.faq-content');
            const isActive = item.classList.contains('active');
            
            // Close all other active FAQ items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = '0';
                }
            });

            // Toggle current FAQ item
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

function initReviewsSlider() {
    const track = document.querySelector('.reviews-carousel-track');
    const dots = document.querySelectorAll('.reviews-dot');
    
    if (!track || !dots.length) return;
    
    let currentIndex = 0;
    let autoPlayInterval = null;
    const intervalTime = 5000; // 5 seconds
    
    function moveToSlide(index) {
        if (index < 0) index = dots.length - 1;
        if (index >= dots.length) index = 0;
        
        currentIndex = index;
        
        // Slide track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots state
        dots.forEach(d => d.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, intervalTime);
    }
    
    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
    }
    
    // Bind click events to dots
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            moveToSlide(idx);
            resetAutoPlay();
        });
    });
    
    // Start interval
    startAutoPlay();
}
