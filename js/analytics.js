// Google Analytics 4 (GA4) Centralized Integration
// Replace 'YOUR_GA4_ID_HERE' with your actual Measurement ID (e.g., G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = 'YOUR_GA4_ID_HERE';

if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'YOUR_GA4_ID_HERE') {
    // Dynamically insert the Google Tag Manager script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag; // Make it globally accessible

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    console.log(`[Hexasolv SEO] Google Analytics initialized with ID: ${GA_MEASUREMENT_ID}`);
} else {
    console.log('[Hexasolv SEO] Google Analytics ID is missing or set to placeholder.');
}
