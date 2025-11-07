// Mobile Menu Toggle Functionality
(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;

        if (!mobileMenuBtn || !mobileMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    closeMenu();
                }
            }
        });

        // Close menu when clicking on menu links (but not language dropdown)
        const menuLinks = mobileMenu.querySelectorAll('.mobile-menu-link:not(.mobile-lang-dropdown)');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Language dropdown toggle
        const langToggle = document.getElementById('mobile-lang-toggle');
        const langOptions = document.getElementById('mobile-lang-options');

        if (langToggle && langOptions) {
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                langOptions.classList.toggle('show');
            });
        }

        // Language switcher functionality in mobile menu
        const langButtons = document.querySelectorAll('.mobile-lang-btn');
        const currentLangSpan = document.getElementById('current-language');
        const currentLangMobile = document.getElementById('current-language-mobile');

        langButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');

                // Update active state
                langButtons.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');

                const langMap = {
                    'en': '🇬🇧 EN',
                    'pt': '🇧🇷 PT',
                    'es': '🇪🇸 ES'
                };

                const flagMap = {
                    'en': '🇬🇧',
                    'pt': '🇧🇷',
                    'es': '🇪🇸'
                };

                // Update current language display
                if (currentLangSpan) {
                    currentLangSpan.textContent = langMap[lang] || '🇬🇧 EN';
                }
                if (currentLangMobile) {
                    currentLangMobile.textContent = flagMap[lang] || '🇬🇧';
                }

                // Hide language options
                if (langOptions) {
                    langOptions.classList.remove('show');
                }

                // Trigger language change event for existing language switcher
                const existingLangLinks = document.querySelectorAll('[data-lang="' + lang + '"]');
                if (existingLangLinks.length > 0) {
                    existingLangLinks[0].click();
                }
            });
        });

        // Prevent scrolling when menu is open
        function toggleMenu() {
            const isActive = mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);

            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Close mobile menu if resizing to desktop
                if (window.innerWidth > 767 && mobileMenu.classList.contains('active')) {
                    closeMenu();
                }
            }, 250);
        });
    });
})();
