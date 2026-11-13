/**
 * Hexasolv GDPR & Google AdSense Cookie Consent Banner
 * Compliant with Google EU User Consent Policy
 */
(function() {
    if (localStorage.getItem('hexasolv_cookie_consent')) return;

    const bannerHTML = `
    <div id="cookieConsentBanner" style="position:fixed; bottom:24px; left:20px; right:20px; max-width:460px; margin:0 auto; background:rgba(12,6,24,0.96); backdrop-filter:blur(14px); border:1px solid rgba(172,34,203,0.35); border-radius:18px; padding:1.2rem 1.4rem; box-shadow:0 15px 45px rgba(0,0,0,0.55); z-index:999999; display:flex; flex-direction:column; gap:0.9rem; font-family:'Plus Jakarta Sans','Inter',sans-serif; animation:slideUpCookie 0.4s ease-out;">
        <div style="display:flex; align-items:flex-start; gap:0.9rem;">
            <div style="width:38px; height:38px; border-radius:10px; background:linear-gradient(135deg,rgba(88,19,188,0.3),rgba(172,34,203,0.3)); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#c084fc; border:1px solid rgba(172,34,203,0.4);">
                <i class="fas fa-cookie-bite" style="font-size:1.15rem;"></i>
            </div>
            <div style="font-size:0.85rem; color:#cbd5e1; line-height:1.55;">
                We use cookies and Google AdSense to personalize content, deliver relevant ads, and analyze traffic in compliance with GDPR. Learn more in our <a href="/privacy-policy.html" style="color:#c084fc; text-decoration:underline;">Privacy Policy</a>.
            </div>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:0.8rem; align-items:center;">
            <a href="/privacy-policy.html" style="font-size:0.8rem; color:#94a3b8; text-decoration:none;">Learn More</a>
            <button id="acceptCookieBtn" style="background:linear-gradient(135deg,#5813BC,#AC22CB); color:#fff; border:none; padding:0.48rem 1.3rem; border-radius:10px; font-size:0.82rem; font-weight:700; cursor:pointer; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 4px 15px rgba(88,19,188,0.4);">
                Accept Cookies
            </button>
        </div>
    </div>
    <style>
        @keyframes slideUpCookie {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 600px) {
            #cookieConsentBanner { bottom: 15px !important; left: 15px !important; right: 15px !important; max-width: 100% !important; padding: 1rem !important; }
        }
    </style>
    `;

    function injectBanner() {
        if (document.getElementById('cookieConsentBanner')) return;
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        const btn = document.getElementById('acceptCookieBtn');
        if (btn) {
            btn.addEventListener('click', function() {
                localStorage.setItem('hexasolv_cookie_consent', 'accepted');
                const banner = document.getElementById('cookieConsentBanner');
                if (banner) {
                    banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    banner.style.opacity = '0';
                    banner.style.transform = 'translateY(30px)';
                    setTimeout(() => banner.remove(), 320);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectBanner);
    } else {
        injectBanner();
    }
})();
