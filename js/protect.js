/**
 * Hexasolv Website Protection Script
 * Prevents casual inspection, right-click, and DevTools access.
 * © 2026 Hexasolv. All rights reserved.
 */

(function() {
    'use strict';

    // ─── 1. DISABLE RIGHT-CLICK ───────────────────────────────────────────────
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // ─── 2. BLOCK KEYBOARD SHORTCUTS ─────────────────────────────────────────
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (Element inspector)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View source)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (Save page)
        if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            return false;
        }
        // Ctrl+A (Select all)
        if (e.ctrlKey && (e.key === 'a' || e.key === 'A' || e.keyCode === 65)) {
            e.preventDefault();
            return false;
        }
    });

    // ─── 3. DISABLE TEXT SELECTION ───────────────────────────────────────────
    document.addEventListener('selectstart', function(e) {
        // Allow selection only on form inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        e.preventDefault();
        return false;
    });

    // ─── 4. DISABLE DRAG ─────────────────────────────────────────────────────
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // ─── 5. DEVTOOLS DETECTION ───────────────────────────────────────────────
    var devToolsOpen = false;
    var warningShown = false;

    function createWarningOverlay() {
        if (warningShown) return;
        warningShown = true;

        var overlay = document.createElement('div');
        overlay.id = 'hexasolv-protect-overlay';
        overlay.style.cssText = [
            'position:fixed',
            'top:0',
            'left:0',
            'width:100vw',
            'height:100vh',
            'background:rgba(8,3,18,0.97)',
            'z-index:999999',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'flex-direction:column',
            'font-family:Outfit,Inter,sans-serif',
            'text-align:center',
            'padding:2rem'
        ].join(';');

        overlay.innerHTML = [
            '<div style="max-width:480px;">',
            '<div style="font-size:4rem;margin-bottom:1.5rem;">🔒</div>',
            '<h2 style="color:#fff;font-size:1.8rem;font-weight:800;margin-bottom:1rem;">',
            'Access Restricted',
            '</h2>',
            '<p style="color:#94a3b8;font-size:1rem;line-height:1.7;margin-bottom:2rem;">',
            'Developer tools are not permitted on this website. ',
            'This site\'s code, design, and content are proprietary and protected under copyright law.',
            '</p>',
            '<div style="background:rgba(88,19,188,0.15);border:1px solid rgba(88,19,188,0.3);',
            'border-radius:12px;padding:1rem 1.5rem;margin-bottom:2rem;">',
            '<p style="color:#AC22CB;font-size:0.85rem;margin:0;font-weight:600;">',
            '© 2026 Hexasolv — All Rights Reserved',
            '</p>',
            '<p style="color:#64748b;font-size:0.78rem;margin:0.3rem 0 0;">',
            'Unauthorized copying or reproduction is prohibited.',
            '</p>',
            '</div>',
            '<button onclick="location.reload()" style="',
            'background:linear-gradient(135deg,#5813BC,#AC22CB);',
            'color:#fff;border:none;padding:0.8rem 2rem;',
            'border-radius:8px;font-weight:700;font-size:0.95rem;',
            'cursor:pointer;font-family:Outfit,sans-serif;">',
            'Close DevTools &amp; Continue →',
            '</button>',
            '</div>'
        ].join('');

        document.body.appendChild(overlay);
    }

    function removeWarningOverlay() {
        var overlay = document.getElementById('hexasolv-protect-overlay');
        if (overlay) {
            overlay.remove();
            warningShown = false;
        }
    }

    // Method 1: Window size difference detection
    function checkDevToolsBySize() {
        var widthThreshold = 160;
        var heightThreshold = 160;
        var widthDiff = window.outerWidth - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;

        if (widthDiff > widthThreshold || heightDiff > heightThreshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                createWarningOverlay();
            }
        } else {
            if (devToolsOpen) {
                devToolsOpen = false;
                removeWarningOverlay();
            }
        }
    }

    // Method 2: console.log timing trick
    var devToolsChecker = /./;
    devToolsChecker.toString = function() {
        devToolsOpen = true;
        createWarningOverlay();
        return '';
    };

    // Run checks
    setInterval(checkDevToolsBySize, 1000);

    // ─── 6. CONSOLE WARNING MESSAGE ──────────────────────────────────────────
    var consoleStyles = [
        'color:#AC22CB',
        'font-size:16px',
        'font-weight:bold',
        'font-family:Outfit,sans-serif'
    ].join(';');

    var consoleStyles2 = [
        'color:#ef4444',
        'font-size:13px',
        'font-weight:600'
    ].join(';');

    var consoleStyles3 = [
        'color:#94a3b8',
        'font-size:12px'
    ].join(';');

    setTimeout(function() {
        console.clear();
        console.log('%c🔒 HEXASOLV — STOP!', consoleStyles);
        console.log('%c⚠️  This is a protected website. Unauthorized inspection, copying, or reproduction of this code is strictly prohibited.', consoleStyles2);
        console.log('%c© 2026 Hexasolv. All rights reserved. | contact@hexasolv.com', consoleStyles3);
    }, 100);

    // ─── 7. DISABLE PRINT ────────────────────────────────────────────────────
    window.addEventListener('beforeprint', function(e) {
        e.preventDefault();
        return false;
    });

    // ─── 8. IFRAME BUST (Prevent site from being iframed by competitors) ─────
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

})();
