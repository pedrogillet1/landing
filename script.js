// Koda Landing Page JavaScript
// Cross-platform compatible functionality

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100; // Account for fixed navigation
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize all interactive features
    initializeNavigation();
    initializePricingTabs();
    initializeFormHandling();
    initializeAnimations();
    initializeAccessibility();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navigation');
    
    // Navbar background on scroll
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }, 10));

    // Mobile menu toggle (for future mobile implementation)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navigationMenu = document.querySelector('.homepage-navigation');
    
    if (mobileMenuButton && navigationMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navigationMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }

    // Dropdown menu interactions
    const dropdowns = document.querySelectorAll('.dropdown-header-navigation-tri');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Future dropdown functionality can be added here
                console.log('Dropdown clicked:', this.textContent.trim());
            });
        }
    });
}

// Pricing tabs functionality
function initializePricingTabs() {
    const monthlyTab = document.querySelector('.tab-button-base');
    const yearlyTab = document.querySelector('.homepage-tab-button-base');
    
    if (monthlyTab && yearlyTab) {
        monthlyTab.addEventListener('click', function() {
            switchPricingTab('monthly');
        });
        
        yearlyTab.addEventListener('click', function() {
            switchPricingTab('yearly');
        });
    }
}

function switchPricingTab(type) {
    const monthlyTab = document.querySelector('.tab-button-base');
    const yearlyTab = document.querySelector('.homepage-tab-button-base');
    const prices = document.querySelectorAll('.text84');
    
    // Update tab styles
    if (type === 'monthly') {
        monthlyTab.style.background = '#667eea';
        monthlyTab.style.color = 'white';
        yearlyTab.style.background = 'transparent';
        yearlyTab.style.color = '#64748b';
        
        // Update prices to monthly
        if (prices[0]) prices[0].textContent = '$4.99';  // Personal
        if (prices[1]) prices[1].textContent = '$9.99';  // Premium
        if (prices[2]) prices[2].textContent = '$14.99'; // Family
    } else {
        yearlyTab.style.background = '#667eea';
        yearlyTab.style.color = 'white';
        monthlyTab.style.background = 'transparent';
        monthlyTab.style.color = '#64748b';
        
        // Update prices to yearly (20% discount)
        if (prices[0]) prices[0].textContent = '$47.90'; // Personal yearly
        if (prices[1]) prices[1].textContent = '$95.90'; // Premium yearly
        if (prices[2]) prices[2].textContent = '$143.90'; // Family yearly
        
        // Update billing periods
        document.querySelectorAll('.text85, .text99').forEach(period => {
            period.textContent = '/year';
        });
    }
}

// Form handling
function initializeFormHandling() {
    // Newsletter subscription
    const newsletterForm = document.querySelector('.text143');
    if (newsletterForm) {
        newsletterForm.addEventListener('click', function(e) {
            e.preventDefault();
            handleNewsletterSignup();
        });
    }

    // Demo request forms
    const demoButtons = document.querySelectorAll('[class*="button"]');
    demoButtons.forEach(button => {
        const buttonText = button.textContent?.toLowerCase();
        if (buttonText?.includes('demo') || buttonText?.includes('request')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleDemoRequest();
            });
        }
    });

    // Early access form
    const earlyAccessButton = document.querySelector('.text7');
    if (earlyAccessButton) {
        earlyAccessButton.addEventListener('click', function(e) {
            e.preventDefault();
            const signupForm = document.querySelector('.homepage-pricing-block');
            if (signupForm) {
                signupForm.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }

    // Signup form submission
    const signupForm = document.querySelector('.homepage-form');
    if (signupForm) {
        const submitButton = document.querySelector('.button12');
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                handleSignupSubmission();
            });
        }
    }

    // Get started buttons
    const getStartedButtons = document.querySelectorAll('.button8, .button9');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planType = this.closest('.homepage-content')?.querySelector('.text9')?.textContent;
            handleGetStarted(planType);
        });
    });
}

function handleNewsletterSignup() {
    // In a real application, this would submit to your backend
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
            'event_category': 'engagement'
        });
    }
}

function handleDemoRequest() {
    // In a real application, this would open a demo request modal or redirect
    showNotification('Demo request feature coming soon! Please contact us directly.', 'info');
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'demo_request', {
            'event_category': 'leads'
        });
    }
}

function handleSignupSubmission() {
    const nameField = document.querySelector('input[placeholder*="name"], .text126');
    const emailField = document.querySelector('input[placeholder*="email"], .text126');
    const occupationField = document.querySelector('input[placeholder*="occupation"], .text126');
    
    // Basic validation (in a real app, you'd have proper form inputs)
    showNotification('Thank you for your interest! We\'ll be in touch soon.', 'success');
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'signup', {
            'event_category': 'leads'
        });
    }
}

function handleGetStarted(planType) {
    // In a real application, this would redirect to signup/payment page
    showNotification(`Getting started with ${planType || 'selected'} plan...`, 'success');
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'plan_selected', {
            'event_category': 'conversions',
            'plan_type': planType
        });
    }
}

// Animations and scroll effects
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for grid items
                const siblings = entry.target.parentNode.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling !== entry.target) {
                        setTimeout(() => {
                            sibling.style.opacity = '1';
                            sibling.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);

    // Animate cards and containers
    const animatedElements = document.querySelectorAll(`
        .box, .homepage-box, .box2, .container2, 
        .blog-post-card, .homepage-content
    `);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.lines-icon, .homepage-lines-icon');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10));
}

// Accessibility enhancements
function initializeAccessibility() {
    // Keyboard navigation for interactive elements
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals (if any)
        if (e.key === 'Escape') {
            closeModals();
        }
        
        // Enter key on buttons and interactive elements
        if (e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('text7') || 
                focusedElement.classList.contains('text150') ||
                focusedElement.classList.contains('icon-wrap')) {
                focusedElement.click();
            }
        }
    });

    // Add proper ARIA labels and roles
    const buttons = document.querySelectorAll('.button, .homepage-button-base, .text7');
    buttons.forEach(button => {
        if (!button.getAttribute('role')) {
            button.setAttribute('role', 'button');
        }
        if (!button.getAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function closeModals() {
    // Close any open modals (placeholder for future modal functionality)
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

// Platform-specific optimizations
function initializePlatformOptimizations() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    // Detect platform
    let detectedPlatform = 'unknown';
    if (platform.includes('Win')) detectedPlatform = 'windows';
    else if (platform.includes('Mac')) detectedPlatform = 'mac';
    else if (platform.includes('Linux')) detectedPlatform = 'linux';
    
    // Add platform class to body
    document.body.classList.add(`platform-${detectedPlatform}`);
    
    // Platform-specific font smoothing
    if (detectedPlatform === 'mac') {
        document.body.style.webkitFontSmoothing = 'antialiased';
        document.body.style.mozOsxFontSmoothing = 'grayscale';
    }
    
    // Windows-specific optimizations
    if (detectedPlatform === 'windows') {
        // Adjust scrollbar styling for Windows
        const style = document.createElement('style');
        style.textContent = `
            ::-webkit-scrollbar {
                width: 12px;
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 6px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }
        `;
        document.head.appendChild(style);
    }
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopButton = document.querySelector('.text165');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', debounce(function() {
        if (backToTopButton) {
            if (window.scrollY > 1000) {
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0.5';
            }
        }
    }, 100));
}

// App store badge interactions
function initializeAppStoreBadges() {
    const appStoreBadges = document.querySelectorAll('.mobile-app-store-badge, .homepage-mobile-app-store-badge');
    appStoreBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.preventDefault();
            const isApple = this.src?.includes('app-store') || this.classList.contains('mobile-app-store-badge');
            const store = isApple ? 'App Store' : 'Google Play';
            
            showNotification(`${store} download coming soon!`, 'info');
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'app_store_click', {
                    'event_category': 'downloads',
                    'store_type': store.toLowerCase().replace(' ', '_')
                });
            }
        });
    });
}

// Blog post interactions
function initializeBlogPosts() {
    const blogCards = document.querySelectorAll('.blog-post-card');
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.icon-wrap')) return;
            
            e.preventDefault();
            const title = this.querySelector('.heading')?.textContent;
            showNotification('Blog post feature coming soon!', 'info');
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'blog_post_click', {
                    'event_category': 'engagement',
                    'blog_title': title
                });
            }
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializePlatformOptimizations();
    initializeBackToTop();
    initializeAppStoreBadges();
    initializeBlogPosts();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause expensive operations when page is hidden
        console.log('Page hidden - pausing animations');
    } else {
        // Resume operations when page is visible
        console.log('Page visible - resuming animations');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Send performance data to analytics (if needed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'event_category': 'performance',
                'value': loadTime
            });
        }
    });
}