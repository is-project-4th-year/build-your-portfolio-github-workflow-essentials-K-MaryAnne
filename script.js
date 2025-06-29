// Portfolio Navigation and Interactions
// Mary Anne Kariuki Portfolio

let currentPage = 0;
const totalPages = 7;
const pages = document.querySelectorAll('.page');
const navDots = document.querySelectorAll('.nav-dot');

/**
 * Navigate to a specific page
 * @param {number} pageIndex - Index of the page to navigate to
 */
function goToPage(pageIndex) {
    if (pageIndex === currentPage) return;

    // Remove active class from current page
    pages[currentPage].classList.remove('active');
    navDots[currentPage].classList.remove('active');

    // Add prev class to current page if moving forward
    if (pageIndex > currentPage) {
        pages[currentPage].classList.add('prev');
    } else {
        pages[currentPage].classList.remove('prev');
    }

    // Update current page
    currentPage = pageIndex;

    // Add active class to new page
    setTimeout(() => {
        pages[currentPage].classList.add('active');
        navDots[currentPage].classList.add('active');
    }, 50);

    // Clean up prev classes
    setTimeout(() => {
        pages.forEach(page => {
            if (!page.classList.contains('active')) {
                page.classList.remove('prev');
            }
        });
    }, 800);
}

/**
 * Keyboard navigation handler
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentPage < totalPages - 1) {
                goToPage(currentPage + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentPage > 0) {
                goToPage(currentPage - 1);
            }
        }
    });
}

/**
 * Touch/swipe navigation for mobile
 */
function setupTouchNavigation() {
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;

        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;

        let diffX = startX - endX;
        let diffY = startY - endY;

        // Only trigger if horizontal swipe is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0 && currentPage < totalPages - 1) {
                // Swipe left - go to next page
                goToPage(currentPage + 1);
            } else if (diffX < 0 && currentPage > 0) {
                // Swipe right - go to previous page
                goToPage(currentPage - 1);
            }
        }

        startX = 0;
        startY = 0;
    });
}

/**
 * Mouse wheel navigation
 */
function setupWheelNavigation() {
    let isScrolling = false;
    
    document.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        isScrolling = true;
        setTimeout(() => { isScrolling = false; }, 1000);

        if (e.deltaY > 0 && currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        } else if (e.deltaY < 0 && currentPage > 0) {
            goToPage(currentPage - 1);
        }
    }, { passive: true });
}

/**
 * Photo placeholder drag and drop functionality
 */
function setupPhotoUpload() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    heroImage.addEventListener('dragover', (e) => {
        e.preventDefault();
        heroImage.style.border = '3px dashed #390007';
        heroImage.style.background = '#9ca0ab';
    });
    
    heroImage.addEventListener('dragleave', () => {
        heroImage.style.border = 'none';
        heroImage.style.background = '#9ca0ab';
    });
    
    heroImage.addEventListener('drop', (e) => {
        e.preventDefault();
        heroImage.innerHTML = '<p class="lato-light">Photo uploaded successfully!</p>';
        heroImage.style.background = '#390007';
        heroImage.style.color = '#f0f4f5';
        heroImage.style.border = 'none';
    });
}

/**
 * Enhanced hover effects for interactive elements
 */
function setupHoverEffects() {
    // Skill cards, project cards, and quirky cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .quirky-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 30px rgba(57, 0, 7, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.background = 'rgba(57, 0, 7, 0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.background = 'rgba(240, 244, 245, 0.1)';
        });
    });
}

/**
 * Smooth page transitions with enhanced animations
 */
function enhanceTransitions() {
    // Add smooth transition delays for staggered animations
    const skillCards = document.querySelectorAll('#page-2 .skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const projectCards = document.querySelectorAll('#page-3 .project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const quirkyCards = document.querySelectorAll('#page-5 .quirky-card');
    quirkyCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Accessibility improvements
 */
function setupAccessibility() {
    // Add ARIA labels to navigation dots
    navDots.forEach((dot, index) => {
        const pageNames = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Quirky', 'Contact'];
        dot.setAttribute('aria-label', `Go to ${pageNames[index]} page`);
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        
        // Add keyboard support for nav dots
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToPage(index);
            }
        });
    });

    // Add focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Ensure focus stays within current page
            const currentPageElement = pages[currentPage];
            const focusableElements = currentPageElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) {
                e.preventDefault();
            }
        }
    });
}

/**
 * Performance optimizations
 */
function optimizePerformance() {
    // Preload next/previous pages for smoother transitions
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Page is visible, ensure smooth rendering
                entry.target.style.willChange = 'transform, opacity';
            } else {
                // Page is not visible, remove will-change for better performance
                entry.target.style.willChange = 'auto';
            }
        });
    });

    pages.forEach(page => {
        observer.observe(page);
    });
}

/**
 * Development helpers and debugging
 */
function setupDevHelpers() {
    // Add keyboard shortcut for quick navigation (Ctrl/Cmd + number)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '7') {
            e.preventDefault();
            const pageIndex = parseInt(e.key) - 1;
            goToPage(pageIndex);
        }
    });

    // Console welcome message
    console.log('🎨 Mary Anne Kariuki Portfolio');
    console.log('📱 Navigation: Arrow keys, mouse wheel, touch swipe, or click dots');
    console.log('⌨️  Quick navigation: Ctrl/Cmd + 1-7');
    console.log('🚀 Pages: Home → About → Skills → Projects → Experience → Quirky → Contact');
}

/**
 * Initialize all functionality when DOM is loaded
 */
function init() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePortfolio);
    } else {
        initializePortfolio();
    }
}

/**
 * Main initialization function
 */
function initializePortfolio() {
    setupKeyboardNavigation();
    setupTouchNavigation();
    setupWheelNavigation();
    setupPhotoUpload();
    setupHoverEffects();
    enhanceTransitions();
    setupAccessibility();
    optimizePerformance();
    setupDevHelpers();

    // Ensure first page is properly displayed
    if (pages.length > 0 && navDots.length > 0) {
        pages[0].classList.add('active');
        navDots[0].classList.add('active');
    }

    console.log('✨ Portfolio initialized successfully');
}

// Start the application
init();