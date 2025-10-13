// Discover Page JavaScript for Tbilisi Chamber

import { places } from '../data/places.mjs';


async function loadPlaces() {
    try {
    
        displayPlaces(places);
    } catch (error) {
        console.error('Error loading places (import):', error);
        displayPlaces(getSampleData());
    }
}


// Display places in the grid
function displayPlaces(places) {
    const grid = document.getElementById('discoverGrid');
    grid.innerHTML = ''; // Clear loading message

    places.forEach((place, index) => {
        const card = createPlaceCard(place, index);
        grid.appendChild(card);
    });
}

// Create individual place card
function createPlaceCard(place, index) {
    const card = document.createElement('div');
    card.className = 'discover-card';

    card.innerHTML = `
        <figure>
            <img src="${place.image}" 
                 alt="${place.name}" 
                 loading="lazy"
                 width="300"
                 height="200">
        </figure>
        <div class="card-content">
            <h2>${place.name}</h2>
            <p>${place.cost}<p>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more-btn" data-place="${place.name}">Learn More</button>
        </div>
    `;

    // Add event listener to button
    const button = card.querySelector('.learn-more-btn');
    button.addEventListener('click', () => learnMore(place.name));

    return card;
}

// Learn more button handler
function learnMore(placeName) {
    alert(`More information about ${placeName} will be available soon!\n\nStay tuned for detailed guides and visitor information.`);
}

// Visitor message functionality using localStorage
function displayVisitorMessage() {
    const messageDiv = document.getElementById('visitorMessage');
    const lastVisitKey = 'tbilisiChamberLastVisit';
    const lastVisit = localStorage.getItem(lastVisitKey);
    const now = Date.now();

    if (!lastVisit) {
        // First visit
        messageDiv.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate days difference
        const timeDiff = now - parseInt(lastVisit);
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            // Less than a day
            messageDiv.textContent = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            // Exactly 1 day
            messageDiv.textContent = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            messageDiv.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }

    // Store current visit time
    localStorage.setItem(lastVisitKey, now.toString());
}

// Mobile menu toggle (matching your existing site)
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav ul');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
            });
        });
    }
}

// Update footer information
function updateFooter() {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
}

// Sample data fallback (Tbilisi specific)
function getSampleData() {
    return places;
}

// Initialize page on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadPlaces();
    displayVisitorMessage();
    setupMobileMenu();
    updateFooter();
});