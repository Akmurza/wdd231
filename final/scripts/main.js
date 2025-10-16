

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// ===== FOOTER DYNAMIC ================================================
const currentYearElement = document.getElementById('currentYear');
const lastModifiedElement = document.getElementById('lastModified');

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}

// ===== LAST VISIT ====================================================================
const lastVisitMessage = document.getElementById('last-visit-message');

if (lastVisitMessage) {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        lastVisitMessage.textContent = 'Welcome to your first dive! 🐋';
    } else {
        const daysSince = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysSince === 0) {
            lastVisitMessage.textContent = 'Welcome back today! The whale is glad to see you again.';
        } else if (daysSince === 1) {
            lastVisitMessage.textContent = 'You returned after 1 day. The depths await you.';
        } else {
            lastVisitMessage.textContent = `You last visited ${daysSince} days ago. The ocean remembers you.`;
        }
    }

    
    localStorage.setItem('lastVisit', now.toString());
}

// =====Functionality ================================================================
const modal = document.getElementById('strategies-modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = modal?.querySelector('.modal-close');

if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== SMOOTH SCROLLING===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for actual anchor links, not empty hrefs
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== LAZY LOADING ====================================================
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== ANIMATION ======================
const observeElements = document.querySelectorAll('.pathway-card, .info-card, .story-card');

if ('IntersectionObserver' in window && observeElements.length > 0) {
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        elementObserver.observe(el);
    });
}

console.log('🐋 Unmasked: Leave your scuba gear on the shore');