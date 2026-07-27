/**
 * Hexasolv Neural Network Particle Canvas Background
 * High-performance lightweight interactive canvas simulation.
 */

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    let particles = [];
    let animationFrameId = null;
    let maxParticles = 65;
    const connectionDistance = 110;
    
    const mouse = {
        x: null,
        y: null,
        radius: 130
    };

    // Handle Resize
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        initParticles();
    }

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            // Move particles
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off boundaries
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse interaction (gentle pull)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= dx * force * 0.03;
                    this.y -= dy * force * 0.03;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // Dynamic theme support check
            const isDark = document.documentElement.classList.contains('dark');
            ctx.fillStyle = isDark ? 'rgba(167, 139, 250, 0.45)' : 'rgba(124, 58, 237, 0.25)';
            ctx.fill();
        }
    }

    // Populate array
    function initParticles() {
        particles = [];
        // Scale particle count based on screen size
        if (window.innerWidth < 768) {
            maxParticles = 30;
        } else {
            maxParticles = 65;
        }
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    // Drawing connections
    function drawConnections() {
        const isDark = document.documentElement.classList.contains('dark');
        const lineColor = isDark ? 'rgba(167, 139, 250, ' : 'rgba(124, 58, 237, ';

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);

                if (dist < connectionDistance) {
                    // Line opacity based on proximity
                    const alpha = (1 - (dist / connectionDistance)) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = lineColor + alpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            // Connection to mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < mouse.radius) {
                    const alpha = (1 - (dist / mouse.radius)) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = lineColor + alpha + ')';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Event Listeners
    container.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    container.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize Handler
    window.addEventListener('resize', resizeCanvas);
    
    // Performance optimization: Render only when Hero is visible in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationFrameId) {
                    resizeCanvas();
                    animate();
                }
            } else {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { threshold: 0.05 });

    observer.observe(container);
});
