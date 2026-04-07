// Advanced GSAP Animations for Login Page
gsap.registerPlugin(ScrollTrigger, TextPlugin);

document.addEventListener('DOMContentLoaded', function() {
    initLoginPageAnimations();
});

function initLoginPageAnimations() {
    // Timeline for initial page load animations
    const tl = gsap.timeline();

    // Animate floating shapes
    animateFloatingShapes();

    // Animate login box
    tl.from('.login-box', {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.8,
        ease: 'back.out'
    })
    .from('.login-header', {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.6')
    .from('.form-group', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1
    }, '-=0.4')
    .from('.login-btn', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.2')
    .from('.demo-credentials', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.3');

    // SVG animation
    animateSVGShape();

    // Animate illustration
    tl.from('.login-illustration', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=1');

    // Logo text animation
    animateLogoText();

    // Tagline animation
    gsap.to('.tagline', {
        delay: 1,
        duration: 2,
        opacity: 1,
        text: {
            value: 'Enterprise Management System',
            delimiter: ''
        },
        ease: 'none'
    });
}

function animateFloatingShapes() {
    // Shape 1 - Large purple
    gsap.to('.shape-1', {
        y: 30,
        x: 30,
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        yoyo: true
    });

    // Shape 2 - Medium pink
    gsap.to('.shape-2', {
        y: -40,
        x: -40,
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'none',
        yoyo: true
    });

    // Shape 3 - Small green
    gsap.to('.shape-3', {
        y: 50,
        x: 50,
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
        yoyo: true
    });
}

function animateSVGShape() {
    const svgPath = document.querySelector('.svg-shape circle');
    const svgPath2 = document.querySelector('.svg-shape path');

    if (svgPath) {
        gsap.to(svgPath, {
            attr: { r: 90 },
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    }

    if (svgPath2) {
        gsap.to(svgPath2, {
            attr: { 'd': 'M 100 80 Q 150 80 150 100 T 100 170' },
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    }

    // Rotating SVG container
    gsap.to('.svg-shape', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
    });
}

function animateLogoText() {
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        // Split text into individual letters for staggered animation
        const letters = logoText.textContent.split('');
        logoText.innerHTML = letters.map(letter => 
            `<span style="display: inline-block;">${letter}</span>`
        ).join('');

        const letterElements = logoText.querySelectorAll('span');
        const letterTl = gsap.timeline({ repeat: -1, yoyo: true });

        letterElements.forEach((letter, index) => {
            letterTl.from(letter, {
                opacity: 0,
                y: -20,
                rotation: -180,
                duration: 0.4,
                ease: 'back.out'
            }, index * 0.05);
        });
    }
}

// Form Interactions with GSAP
const formInputs = document.querySelectorAll('.login-form input, .login-form select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Add glow effect
        gsap.to(this, {
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', function() {
        gsap.to(this, {
            scale: 1,
            boxShadow: '0 0 0 transparent',
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    // Input animation on type
    input.addEventListener('input', function() {
        gsap.to(this, {
            duration: 0.1,
            background: 'rgba(30, 41, 59, 0.9)',
            ease: 'power2.out'
        });
    });
});

// Button hover effects with GSAP
const loginBtn = document.querySelector('.login-btn');
if (loginBtn) {
    loginBtn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.4,
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.6)',
            ease: 'power2.out'
        });

        // Add ripple effect
        createRipple.call(this, event);
    });

    loginBtn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
            ease: 'power2.out'
        });
    });

    loginBtn.addEventListener('click', function() {
        gsap.to(this, {
            duration: 0.2,
            scale: 0.98,
            ease: 'power1.inOut'
        });
    });
}

// Ripple effect function
function createRipple(event) {
    const btn = event.target.closest('button');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    btn.appendChild(ripple);

    gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
    });
}

// Form validation animations
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input, select');
    if (input) {
        input.addEventListener('invalid', function() {
            gsap.to(this, {
                duration: 0.1,
                x: -5,
                repeat: 3,
                yoyo: true,
                ease: 'power1.inOut'
            });
        });
    }
});

// Demo credentials animation on hover
const demoCredentials = document.querySelector('.demo-credentials');
if (demoCredentials) {
    demoCredentials.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.02,
            borderColor: '#6366f1',
            ease: 'power2.out'
        });

        gsap.to(this.querySelectorAll('p'), {
            duration: 0.3,
            color: '#f1f5f9',
            ease: 'power2.out',
            stagger: 0.05
        });
    });

    demoCredentials.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.2,
            scale: 1,
            ease: 'power2.out'
        });

        gsap.to(this.querySelectorAll('p'), {
            duration: 0.3,
            color: '#cbd5e1',
            ease: 'power2.out',
            stagger: 0.05
        });
    });
}

// Page background animation
gsap.to('body', {
    backgroundPosition: '100% 100%',
    duration: 30,
    repeat: -1,
    yoyo: true,
    ease: 'none'
});

// Advanced parallax effect for illustration
const loginIllustration = document.querySelector('.login-illustration');
if (loginIllustration) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;

        gsap.to(loginIllustration, {
            x: x,
            y: y,
            duration: 0.5,
            ease: 'power1.out'
        });
    });
}

// Staggered animation for form fields on focus
let focusedField = null;

formInputs.forEach((input) => {
    input.addEventListener('focus', function() {
        focusedField = this;

        // Animate other labels
        const otherLabels = document.querySelectorAll('.form-group label');
        otherLabels.forEach(label => {
            if (label.parentElement !== this.parentElement) {
                gsap.to(label, {
                    opacity: 0.7,
                    scale: 0.9,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(label, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });
    });
});

// Animate form on blur
document.addEventListener('click', function(e) {
    if (!e.target.closest('.login-form input') && 
        !e.target.closest('.login-form select') &&
        focusedField) {
        focusedField = null;

        gsap.to('.form-group label', {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

// Scroll trigger for gradients (if content extends beyond viewport)
ScrollTrigger.create({
    trigger: 'body',
    onUpdate: (self) => {
        const progress = self.progress;
        document.body.style.backgroundPosition = `${progress * 100}% 50%`;
    }
});

// Mouse position tracking for interactive elements
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 5;
        const x = (e.clientX / window.innerWidth) * speed;
        const y = (e.clientY / window.innerHeight) * speed;

        gsap.to(shape, {
            x: x,
            y: y,
            duration: 0.5,
            ease: 'power1.out'
        });
    });
});

// Accessibility - Reduce motion for users with preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(0);
    // Alternative: disable heavy animations
    document.querySelectorAll('.shape-1, .shape-2, .shape-3, .svg-shape').forEach(el => {
        el.style.animation = 'none';
    });
}
