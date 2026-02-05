/* ================================================================
   MODERN PORTFOLIO WEBSITE - JAVASCRIPT
   Smooth animations, interactions, and dynamic functionality
   ================================================================ */

// ================================================================
// INITIALIZATION & DOM SETUP
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all features
    setupDarkMode();
    setupNavigation();
    setupScrollProgress();
    setupSmoothScroll();
    setupIntersectionObserver();
    setupTypingAnimation();
    setupProjectFilters();
    setupTestimonialSlider();
    setupContactForm();
    setupScrollToTop();
    setupFloatingAnimation();
}

// ================================================================
// DARK MODE TOGGLE
// ================================================================

function setupDarkMode() {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply saved preference
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }

    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDark);
        updateDarkModeIcon(isNowDark);
    });
}

function updateDarkModeIcon(isDark) {
    const darkModeBtn = document.getElementById('darkModeBtn');
    const icon = darkModeBtn.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// ================================================================
// NAVIGATION & MOBILE MENU
// ================================================================

function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on scroll
    document.addEventListener('scroll', function() {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add active class to nav links on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================================================
// SCROLL PROGRESS BAR
// ================================================================

function setupScrollProgress() {
    window.addEventListener('scroll', updateScrollProgress);
}

function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// ================================================================
// SMOOTH SCROLL
// ================================================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================================================
// INTERSECTION OBSERVER (Scroll Animation)
// ================================================================

function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe all elements with animation classes
    document.querySelectorAll('.skill-category, .service-card, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// ================================================================
// TYPING ANIMATION
// ================================================================

function setupTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const phrases = [
        'Software Developer & UI/UX Designer',
        'Crafting Digital Experiences',
        'Full-Stack Developer',
        'Creative Problem Solver'
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function type() {
        const phrase = phrases[currentPhrase];
        
        if (!isDeleting) {
            // Typing forward
            if (currentChar < phrase.length) {
                typingElement.textContent += phrase[currentChar];
                currentChar++;
                setTimeout(type, 50);
            } else {
                // Phrase complete, wait before deleting
                isDeleting = true;
                setTimeout(type, 3000);
            }
        } else {
            // Typing backward (delete)
            if (currentChar > 0) {
                typingElement.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
                setTimeout(type, 30);
            } else {
                // Move to next phrase
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                setTimeout(type, 500);
            }
        }
    }

    type();
}

// ================================================================
// PROJECT FILTER
// ================================================================

function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            const filter = this.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    // Trigger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ================================================================
// TESTIMONIALS SLIDER
// ================================================================

function setupTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;

    function showSlide(n) {
        cards.forEach(card => {
            card.classList.remove('active', 'prev');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        cards[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % cards.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + cards.length) % cards.length;
        showSlide(currentSlide);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance slides
    setInterval(nextSlide, 6000);

    // Initialize
    showSlide(0);
}

// ================================================================
// CONTACT FORM
// ================================================================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Validate
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 1500);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================================================
// SCROLL TO TOP
// ================================================================

function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================================================
// FLOATING ANIMATION
// ================================================================

function setupFloatingAnimation() {
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach((card, index) => {
        const randomDelay = Math.random() * 0.5;
        card.style.animationDelay = randomDelay + 's';
    });
}

// ================================================================
// PARALLAX EFFECT (Optional Enhancement)
// ================================================================

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = window.scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ================================================================
// PERFORMANCE: Throttle scroll events
// ================================================================

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    updateScrollProgress();
    updateActiveNavLink();
}, 100));

// ================================================================
// KEYBOARD NAVIGATION
// ================================================================

document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Keyboard shortcuts for navigation
    if (e.ctrlKey || e.metaKey) {
        if (e.key === '/') {
            e.preventDefault();
            // You can add search or other shortcuts here
        }
    }
});

// ================================================================
// MOBILE MENU STYLES (Added dynamically)
// ================================================================

const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(15, 15, 30, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.3);
            padding: var(--spacing-lg) 0;
            gap: 0;
            backdrop-filter: blur(10px);
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu li {
            padding: var(--spacing-md) 0;
        }

        .nav-link {
            font-size: 1.2rem;
        }

        .nav-link::after {
            display: none;
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// ================================================================
// PRELOAD ANIMATIONS
// ================================================================

// Add fade-in animation to elements on page load
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .section-header, .about-stats'
    );

    elementsToAnimate.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
    });
});

// ================================================================
// LAZY LOADING IMAGES (Optional)
// ================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ================================================================
// FORM FIELD ANIMATIONS
// ================================================================

const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ================================================================
// SMOOTH PAGE TRANSITIONS
// ================================================================

// Add smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
});

// ================================================================
// ACCESSIBILITY ENHANCEMENTS
// ================================================================

// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: white;
    padding: 8px;
    z-index: 100;
`;

skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});

skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ================================================================
// UTILITY FUNCTIONS
// ================================================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get random number in range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add multiple event listeners
function addEventListeners(elements, event, handler) {
    elements.forEach(element => {
        element.addEventListener(event, handler);
    });
}

// ================================================================
// LOG: Portfolio Initialized
// ================================================================

console.log('🚀 Portfolio website loaded successfully!');
console.log('💡 Tip: Use the dark mode toggle in the navbar for a different theme.');
