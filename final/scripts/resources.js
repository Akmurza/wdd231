import './main.js';

// ===== FETCH  ==========================================
let allResources = [];

async function fetchResources() {
    try {
        const response = await fetch('data/resources.json');

        if (!response.ok) {
            throw new Error(`HTTP error!status: ${response.status}`);
        }

        const data = await response.json();
        allResources = data.resources;

        displayResources(allResources);
        updateResourceCount(allResources.length);

    } catch (error) {
        console.error('Error fetching resources:', error);
        displayError();
    }
}

// ============================================== DOM manipulations ============
function displayResources(resources) {
    const container = document.getElementById('resources-container');

    if (!container) return;

    if (resources.length === 0) {
        container.innerHTML = '<p class="loading">No resources found for this category.</p>';
        return;
    }

    // Use template literals and map() array method
    container.innerHTML = resources.map(resource => `
        <div class="resource-card" data-category="${resource.category}">
            <span class="resource-category">${getCategoryIcon(resource.category)} ${resource.category}</span>
            <h3>${resource.title}</h3>
            <p class="resource-description">${resource.description}</p>
            <p><strong>Type:</strong> ${resource.type}</p>
            ${resource.author ? `<p><strong>By:</strong> ${resource.author}</p>` : ''}
            <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
                Learn More →
            </a>
        </div>
    `).join('');
}

// ===== HELPER FUNCTIONS ===================================================
function getCategoryIcon(category) {
    const icons = {
        'books': '📚',
        'communities': '👥',
        'tools': '🛠️',
        'professionals': '🩺'
    };
    return icons[category] || '📌';
}

function updateResourceCount(count) {
    const countElement = document.getElementById('resource-count');
    if (countElement) {
        countElement.textContent = `Showing ${count} resource${count !== 1 ? 's' : ''}`;
    }
}

function displayError() {
    const container = document.getElementById('resources-container');
    if (container) {
        container.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="color: var(--abyssal-blue); font-size: 1.2rem; margin-bottom: 1rem;">
                    Unable to load resources at this time.
                </p>
                <p>Please try refreshing the page or check back later.</p>
            </div>
        `;
    }
}

// ===== FILTER FUNCTIONALITY ==================================
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        e.target.classList.add('active');

        const category = e.target.dataset.category;

        // Filter resources using filter() array method
        const filteredResources = category === 'all'
            ? allResources
            : allResources.filter(resource => resource.category === category);

        displayResources(filteredResources);
        updateResourceCount(filteredResources.length);

        // Save preference to localStorage
        localStorage.setItem('preferredCategory', category);
    });
});

// ===== Load FILTER PREFERENCE ====================================================
function loadFilterPreference() {
    const savedCategory = localStorage.getItem('preferredCategory');

    if (savedCategory && savedCategory !== 'all') {
        const button = document.querySelector(`[data-category="${savedCategory}"]`);
        if (button) {
            button.click();
        }
    }
}

// ===== CONTACT MODAL =====
const contactModal = document.getElementById('contact-modal');
const contactModalBtn = document.getElementById('contact-modal-btn');
const contactCloseBtn = contactModal?.querySelector('.modal-close');
const contactForm = document.getElementById('contact-form');

if (contactModalBtn && contactModal) {
    contactModalBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (contactCloseBtn && contactModal) {
    contactCloseBtn.addEventListener('click', () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== FORM HANDLING =============================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value || 'Anonymous',
            email: document.getElementById('email').value,
            journeyStage: document.getElementById('journey-stage').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        saveFormSubmission(formData);

        // Show success message
        showSuccessMessage();

        // Reset form
        contactForm.reset();

        // Close modal after delay
        setTimeout(() => {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 2000);
    });
}

function saveFormSubmission(formData) {
    // Get existing submissions from localStorage
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');

    // Add new submission
    submissions.push(formData);

    // Save back to localStorage
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    console.log('✅ Form submission saved:', formData);
}

function showSuccessMessage() {
    const modalBody = contactModal.querySelector('.modal-body');
    const originalContent = modalBody.innerHTML;

    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🐋</div>
            <h3 style="color: var(--abyssal-blue); margin-bottom: 1rem;">Message Sent!</h3>
            <p>The whale has received your message. We'll be in touch soon.</p>
        </div>
    `;

    // Restore original content after modal closes
    setTimeout(() => {
        modalBody.innerHTML = originalContent;
    }, 2500);
}

// ===== INIT ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    fetchResources();

    
    setTimeout(loadFilterPreference, 500);
});

console.log('🐋 Resources module loaded');