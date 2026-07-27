/**
 * Hexasolv Interactive Chatbot Logic
 * Provides a lightweight client-side conversational assistant
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inject Chatbot Markup if not already present
    injectChatbotHTML();

    const chatbotContainer = document.getElementById('hexasolvChatbot');
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const messageContainer = document.getElementById('chatbotMessages');
    const optionsContainer = document.getElementById('chatbotOptions');

    if (!chatbotContainer || !toggleBtn || !closeBtn || !messageContainer || !optionsContainer) {
        return;
    }

    // Toggle Chat Panel visibility
    toggleBtn.addEventListener('click', function() {
        chatbotContainer.classList.toggle('open');
        if (chatbotContainer.classList.contains('open') && messageContainer.children.length === 0) {
            loadState('start');
        }
    });

    closeBtn.addEventListener('click', function() {
        chatbotContainer.classList.remove('open');
    });

    // Helper: Determine current directory depth to fix routing links
    function getCorrectPath(target) {
        if (window.location.pathname.includes('/services/')) {
            return '../' + target;
        }
        return target;
    }

    // Interactive Conversational Data Tree
    const chatTree = {
        start: {
            text: "Hi there! 👋 Welcome to Hexasolv. I'm your interactive assistant. How can I help you today?",
            options: [
                { text: "💡 Offered Services", next: "services" },
                { text: "🚀 Start a Project", next: "start_project" },
                { text: "🛠️ Technologies We Use", next: "tech_stack" },
                { text: "💬 Chat with Muhammad Arslan", next: "talk_human" }
            ]
        },
        services: {
            text: "We specialize in building end-to-end client growth ecosystems:\n\n1. **Growth & Marketing Systems** (Meta/Google performance campaigns, lead nurturing automation, CRM triggers).\n2. **Custom Software** (Laravel web applications, MERN platforms, Flutter mobile apps, POS/billing engines, and AI web API tools).",
            options: [
                { text: "📈 Tell me about Growth Systems", next: "services_growth" },
                { text: "💻 Tell me about Custom Software", next: "services_tech" },
                { text: "↩️ Main Menu", next: "start" }
            ]
        },
        services_growth: {
            text: "Our Growth Systems capture lead attention via social ads (Meta, Google, TikTok) and funnel them into automated pipeline setups. We build email/SMS follow-up systems so that no sales opportunity is lost.",
            options: [
                { text: "🚀 Start a Project", next: "start_project" },
                { text: "↩️ Main Menu", next: "start" }
            ]
        },
        services_tech: {
            text: "We engineer production-grade custom software focusing on speed, security, and scalability. This includes multi-tenant MERN SaaS platforms, secure Laravel dashboards, and mobile applications utilizing Flutter.",
            options: [
                { text: "📁 View Portfolio Projects", action: "go_portfolio" },
                { text: "↩️ Main Menu", next: "start" }
            ]
        },
        start_project: {
            text: "Initiating a project with Hexasolv is straightforward:\n\n1. **Discovery Consultation**: Book a 15-minute alignment call.\n2. **Estimate Scope**: We send a detailed written estimate within 24 hours.\n3. **IP & Code Transfer**: You retain 100% code ownership and repository access.",
            options: [
                { text: "📅 Book a Strategy Call", action: "go_contact" },
                { text: "✉️ Fill Out Contact Form", action: "go_contact" },
                { text: "↩️ Main Menu", next: "start" }
            ]
        },
        tech_stack: {
            text: "We master modern technology standards to deliver clean, maintainable systems:\n\n- **Backend**: Laravel (PHP), .NET 8 (C#)\n- **Frontend**: React, Bootstrap 5, Vanilla JS\n- **Mobile**: Flutter / Dart\n- **Database**: MySQL, SQLite, MongoDB",
            options: [
                { text: "📁 View Portfolio", action: "go_portfolio" },
                { text: "↩️ Main Menu", next: "start" }
            ]
        },
        talk_human: {
            text: "Need to speak to a real person? Muhammad Arslan (Partner & Lead Developer) is available to chat directly via WhatsApp or email.",
            options: [
                { text: "🟢 Chat on WhatsApp", action: "go_whatsapp" },
                { text: "✉️ Send an Email", action: "go_email" },
                { text: "↩️ Main Menu", next: "start" }
            ]
        }
    };

    // Load Chat State & Simulate Typing
    function loadState(stateKey) {
        const state = chatTree[stateKey];
        if (!state) return;

        // Clear option buttons while typing
        optionsContainer.innerHTML = '';

        // Add typing indicator bubble
        const typingBubble = showTypingIndicator();

        setTimeout(function() {
            // Remove typing indicator bubble
            typingBubble.remove();

            // Append assistant reply bubble
            addMessageBubble(state.text, 'assistant');

            // Render option buttons
            state.options.forEach(function(opt) {
                const btn = document.createElement('button');
                btn.className = 'chatbot-option-btn';
                btn.textContent = opt.text;
                btn.addEventListener('click', function() {
                    handleOptionClick(opt);
                });
                optionsContainer.appendChild(btn);
            });

            // Scroll message thread down
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }, 750);
    }

    // Handle User clicking an option button
    function handleOptionClick(option) {
        // Render user message bubble
        addMessageBubble(option.text, 'user');
        messageContainer.scrollTop = messageContainer.scrollHeight;

        // Check if option triggers a redirect or navigation
        if (option.action) {
            const typingBubble = showTypingIndicator();
            optionsContainer.innerHTML = '';
            
            setTimeout(function() {
                typingBubble.remove();
                if (option.action === 'go_portfolio') {
                    window.location.href = getCorrectPath('portfolio.html');
                } else if (option.action === 'go_contact') {
                    window.location.href = getCorrectPath('contact.html');
                } else if (option.action === 'go_whatsapp') {
                    window.open('https://wa.me/923214530103', '_blank');
                    loadState('start');
                } else if (option.action === 'go_email') {
                    window.location.href = 'mailto:contact@hexasolv.com';
                    loadState('start');
                }
            }, 600);
        } else if (option.next) {
            loadState(option.next);
        }
    }

    // Helper: Add Message Bubble
    function addMessageBubble(text, sender) {
        const msgRow = document.createElement('div');
        msgRow.className = 'chatbot-msg-row ' + sender;

        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        
        // Convert double newlines into paragraph breaks or preserve breaks
        bubble.innerHTML = text.replace(/\n/g, '<br>');
        
        msgRow.appendChild(bubble);
        messageContainer.appendChild(msgRow);
    }

    // Helper: Show Typing Indicator Bubble
    function showTypingIndicator() {
        const msgRow = document.createElement('div');
        msgRow.className = 'chatbot-msg-row assistant';

        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';

        const typing = document.createElement('div');
        typing.className = 'chatbot-typing';
        typing.innerHTML = `
            <span class="chatbot-typing-dot"></span>
            <span class="chatbot-typing-dot"></span>
            <span class="chatbot-typing-dot"></span>
        `;
        
        bubble.appendChild(typing);
        msgRow.appendChild(bubble);
        messageContainer.appendChild(msgRow);
        messageContainer.scrollTop = messageContainer.scrollHeight;

        return msgRow;
    }

    // Helper: Inject Chatbot DOM Elements in target page
    function injectChatbotHTML() {
        if (document.getElementById('hexasolvChatbot')) return;

        const widgetHTML = `
            <div class="hexasolv-chatbot-container" id="hexasolvChatbot">
                <!-- Floating Toggle Bubble (AI Robot Icon) -->
                <button class="chatbot-toggle-btn" id="chatbotToggle" aria-label="Open Hexasolv AI Assistant">
                    <span class="chat-icon-msg" style="display:flex; align-items:center; justify-content:center;"><i class="fas fa-robot" style="font-size:1.5rem; color:#ffffff;"></i></span>
                    <span class="chat-icon-close"><i class="fas fa-times"></i></span>
                    <span class="chatbot-ai-badge" style="position:absolute; top:-3px; right:-3px; background:linear-gradient(135deg,#06b6d4,#7c3aed); color:#ffffff; font-size:9px; font-weight:800; padding:2px 6px; border-radius:50px; border:1.5px solid #ffffff; box-shadow:0 0 10px rgba(6,182,212,0.8); letter-spacing:0.5px; font-family:'Outfit',sans-serif;">AI</span>
                </button>

                <!-- Expanded Panel -->
                <div class="chatbot-panel">
                    <!-- Panel Header -->
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-header-logo">H</div>
                            <div>
                                <div class="chatbot-header-title">Hexasolv Support</div>
                                <div class="chatbot-header-status">
                                    <span class="chatbot-status-dot"></span>
                                    Virtual Assistant Online
                                </div>
                            </div>
                        </div>
                        <button class="chatbot-close-btn" id="chatbotClose" aria-label="Close Chat panel">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Conversation Message Thread -->
                    <div class="chatbot-messages" id="chatbotMessages"></div>

                    <!-- Quick Options Layout -->
                    <div class="chatbot-options-wrapper" id="chatbotOptions"></div>
                </div>
            </div>
        `;
        
        // Append DOM markup directly to page body
        const wrapper = document.createElement('div');
        wrapper.innerHTML = widgetHTML.trim();
        document.body.appendChild(wrapper.firstChild);
    }
});
