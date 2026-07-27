/**
 * Hexasolv Interactive Scope & Budget Estimator
 * Manages steps, state, budget tallies, and forms synchronization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Estimator State
    const state = {
        platform: null,
        size: 'size_small',
        addons: [],
        speed: 'speed_normal'
    };

    // Configuration Data
    const config = {
        platforms: {
            web_laravel: { price: 800, weeks: 4, name: "Web App (Laravel/PHP)", contactVal: "Web Development (Laravel)" },
            web_mern: { price: 900, weeks: 4, name: "MERN Stack App", contactVal: "MERN Stack Application" },
            mobile_flutter: { price: 1000, weeks: 6, name: "Mobile App (Flutter)", contactVal: "Mobile App Development" },
            cms_wordpress: { price: 400, weeks: 2, name: "WordPress Website", contactVal: "WordPress Website" },
            shopify: { price: 500, weeks: 2, name: "Shopify Store", contactVal: "Shopify Store" },
            pos_desktop: { price: 800, weeks: 4, name: "POS & Desktop Software", contactVal: "Desktop/POS Software" }
        },
        sizes: {
            size_small: { mult: 1.0, name: "Small / Basic Layout" },
            size_medium: { mult: 1.35, name: "Medium / Custom Dashboards" },
            size_large: { mult: 1.75, name: "Large / Multi-Tenant SaaS" }
        },
        addons: {
            add_crm: { price: 150, name: "CRM & Auto-Responders" },
            add_chat: { price: 200, name: "AI Chatbot Assistant" },
            add_payments: { price: 150, name: "Stripe/PayPal Payments" },
            add_ads: { price: 300, name: "Meta/Google Ads Setup" }
        },
        speeds: {
            speed_normal: { mult: 1.0, name: "Standard (4-8 weeks)", weeksOffset: 0 },
            speed_rush: { mult: 1.25, name: "Rush Delivery (2-3 weeks)", weeksOffset: -2 }
        }
    };

    let currentStep = 1;
    const totalSteps = 4;

    // DOM Elements
    const steps = document.querySelectorAll('.estimator-step');
    const prevBtn = document.getElementById('estPrevBtn');
    const nextBtn = document.getElementById('estNextBtn');
    const fillBar = document.getElementById('estProgressFill');
    const stepText = document.getElementById('estProgressText');
    const budgetVal = document.getElementById('estBudgetVal');
    const timelineVal = document.getElementById('estTimelineVal');
    const successView = document.getElementById('estSuccessView');
    const estimatorBody = document.getElementById('estBody');
    const estTallyBar = document.getElementById('estTallyBar');

    if (!steps.length || !nextBtn || !prevBtn || !fillBar) return;

    // Initialize Selection Listeners
    initOptionsListeners();

    // Event Handlers for Navigation Buttons
    nextBtn.addEventListener('click', function() {
        if (currentStep === 1 && !state.platform) {
            alert('Please select a platform to proceed.');
            return;
        }
        
        if (currentStep < totalSteps) {
            goToStep(currentStep + 1);
        } else if (currentStep === totalSteps) {
            calculateFinalEstimate();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });

    // Go to specific wizard step
    function goToStep(stepNum) {
        steps.forEach(s => s.classList.remove('active'));
        currentStep = stepNum;
        
        const activeStep = document.querySelector(`.estimator-step[data-step="${currentStep}"]`);
        if (activeStep) activeStep.classList.add('active');

        // Update progress bar
        const pct = (currentStep / totalSteps) * 100;
        fillBar.style.width = `${pct}%`;
        if (stepText) stepText.textContent = `Step ${currentStep} of ${totalSteps}`;

        // Update button states
        prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
        
        if (currentStep === totalSteps) {
            nextBtn.textContent = 'Get Instant Estimate';
        } else {
            nextBtn.textContent = 'Next Step';
        }

        tallyLiveBudget();
    }

    // Set up click handlers on option cards
    function initOptionsListeners() {
        // Step 1: Platforms
        const platCards = document.querySelectorAll('.estimator-step[data-step="1"] .estimator-option-card');
        platCards.forEach(card => {
            card.addEventListener('click', function() {
                platCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                state.platform = this.getAttribute('data-value');
                tallyLiveBudget();
                setTimeout(() => nextBtn.click(), 250); // Auto-advance for better UX
            });
        });

        // Step 2: Size
        const sizeCards = document.querySelectorAll('.estimator-step[data-step="2"] .estimator-option-card');
        sizeCards.forEach(card => {
            card.addEventListener('click', function() {
                sizeCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                state.size = this.getAttribute('data-value');
                tallyLiveBudget();
                setTimeout(() => nextBtn.click(), 250); // Auto-advance
            });
        });

        // Step 3: Add-ons (Multi-select)
        const addonCards = document.querySelectorAll('.estimator-step[data-step="3"] .estimator-option-card');
        addonCards.forEach(card => {
            card.addEventListener('click', function() {
                const val = this.getAttribute('data-value');
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    state.addons = state.addons.filter(a => a !== val);
                } else {
                    this.classList.add('selected');
                    state.addons.push(val);
                }
                tallyLiveBudget();
            });
        });

        // Step 4: Speed
        const speedCards = document.querySelectorAll('.estimator-step[data-step="4"] .estimator-option-card');
        speedCards.forEach(card => {
            card.addEventListener('click', function() {
                speedCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                state.speed = this.getAttribute('data-value');
                tallyLiveBudget();
            });
        });
    }

    // Live tally budget function
    function tallyLiveBudget() {
        if (!state.platform) {
            if (budgetVal) budgetVal.textContent = '$0';
            if (timelineVal) timelineVal.textContent = '-';
            return;
        }

        const basePrice = config.platforms[state.platform].price;
        const sizeMult = config.sizes[state.size].mult;
        const speedMult = config.speeds[state.speed].mult;
        
        let addonSum = 0;
        state.addons.forEach(a => {
            addonSum += config.addons[a].price;
        });

        const calculatedPrice = Math.round((basePrice * sizeMult * speedMult) + addonSum);
        const minBudget = Math.round(calculatedPrice * 0.95);
        const maxBudget = Math.round(calculatedPrice * 1.15);

        // Timeline Weeks
        const baseWeeks = config.platforms[state.platform].weeks;
        const offset = config.speeds[state.speed].weeksOffset;
        let finalWeeks = Math.max(2, baseWeeks + offset);

        if (budgetVal) budgetVal.textContent = `$${minBudget} - $${maxBudget}`;
        if (timelineVal) timelineVal.textContent = `${finalWeeks} Weeks`;
    }

    // Final Calculator Output View
    function calculateFinalEstimate() {
        estimatorBody.style.display = 'none';
        estTallyBar.style.display = 'none';
        successView.style.display = 'block';

        const basePrice = config.platforms[state.platform].price;
        const sizeMult = config.sizes[state.size].mult;
        const speedMult = config.speeds[state.speed].mult;
        
        let addonSum = 0;
        state.addons.forEach(a => {
            addonSum += config.addons[a].price;
        });

        const calculatedPrice = Math.round((basePrice * sizeMult * speedMult) + addonSum);
        const minBudget = Math.round(calculatedPrice * 0.95);
        const maxBudget = Math.round(calculatedPrice * 1.15);

        // Weeks calculation
        const baseWeeks = config.platforms[state.platform].weeks;
        const offset = config.speeds[state.speed].weeksOffset;
        let finalWeeks = Math.max(2, baseWeeks + offset);

        // Populate results fields
        document.getElementById('finalBudgetVal').textContent = `$${minBudget} - $${maxBudget}`;
        document.getElementById('finalTimelineVal').textContent = `${finalWeeks} Weeks`;

        // Action Listener for Apply Scope Button
        const applyBtn = document.getElementById('estApplyBtn');
        if (applyBtn) {
            applyBtn.onclick = function() {
                applyScopeToContactForm(minBudget, maxBudget, finalWeeks);
            };
        }

        // Action Listener to reset
        const resetBtn = document.getElementById('estResetBtn');
        if (resetBtn) {
            resetBtn.onclick = function() {
                resetEstimator();
            };
        }
    }

    // Sync estimator outputs with contact form fields
    function applyScopeToContactForm(minB, maxB, weeksVal) {
        const contactForm = document.getElementById('contact');
        if (!contactForm) return;

        // Select correct service dropdown in contact form
        const platformConfig = config.platforms[state.platform];
        const formDropdown = document.querySelector('#contact form select[name="service"]');
        if (formDropdown && platformConfig.contactVal) {
            formDropdown.value = platformConfig.contactVal;
        }

        // Build scopes description note
        const platformName = platformConfig.name;
        const sizeName = config.sizes[state.size].name;
        const speedName = config.speeds[state.speed].name;
        
        let addonsText = "None";
        if (state.addons.length > 0) {
            addonsText = state.addons.map(a => config.addons[a].name).join(', ');
        }

        const messageArea = document.querySelector('#contact form textarea[name="message"]');
        if (messageArea) {
            messageArea.value = `Hi Hexasolv team!\n\nI have generated an instant project estimate using the calculator:\n` +
                               `- Platform: ${platformName}\n` +
                               `- Project Size: ${sizeName}\n` +
                               `- Requested Add-ons: ${addonsText}\n` +
                               `- Project Speed: ${speedName}\n` +
                               `- Calculated Estimate: $${minB} - $${maxB}\n` +
                               `- Expected Timeline: ${weeksVal}\n\n` +
                               `Please review my project details and get back to me!`;
        }

        // Smooth Scroll to Contact
        contactForm.scrollIntoView({ behavior: 'smooth' });

        // Highlight inputs with a quick glow
        const contactInputs = document.querySelectorAll('#contact form input, #contact form textarea, #contact form select');
        contactInputs.forEach(input => {
            input.style.boxShadow = '0 0 10px rgba(124, 58, 237, 0.4)';
            setTimeout(() => {
                input.style.boxShadow = 'none';
            }, 2500);
        });

        alert("Scope applied successfully! Check the contact form below.");
    }

    // Reset wizard back to Step 1
    function resetEstimator() {
        // Reset selections
        state.platform = null;
        state.size = 'size_small';
        state.addons = [];
        state.speed = 'speed_normal';

        // Clear UI classes
        const cards = document.querySelectorAll('.estimator-option-card');
        cards.forEach(c => {
            c.classList.remove('selected');
            // Re-select defaults
            const val = c.getAttribute('data-value');
            if (val === 'size_small' || val === 'speed_normal') {
                c.classList.add('selected');
            }
        });

        successView.style.display = 'none';
        estimatorBody.style.display = 'block';
        estTallyBar.style.display = 'flex';
        
        goToStep(1);
    }
});
