

import { places } from '../data/places.mjs';

async function loadPlaces() {
    try {
        displayPlaces(places);
    } catch (error) {
        console.error('Error loading places (import):', error);
        displayPlaces(getSampleData());
    }
}


function displayPlaces(places) {
    const grid = document.getElementById('discoverGrid');
    grid.innerHTML = ''; // Clear loading message

    places.forEach((place, index) => {
        const card = createPlaceCard(place, index);
        grid.appendChild(card);
    });
}


function createPlaceCard(place, index) {
    const card = document.createElement('div');
    card.className = 'discover-card';

    
    const loadingAttr = index === 0 ? '' : 'loading="lazy"';

    card.innerHTML = `
        <figure>
            <img src="${place.image}" 
                 alt="${place.name}" 
                 ${loadingAttr}
                 width="300"
                 height="200">
        </figure>
        <div class="card-content">
            <h2>${place.name}</h2>
            <p>${place.cost}</p>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-more-btn" data-place="${place.name}" aria-label="Learn more about ${place.name}">Learn More</button>
        </div>
    `;

    
    const button = card.querySelector('.learn-more-btn');
    button.addEventListener('click', () => learnMore(place.name));

    return card;
}


function learnMore(placeName) {
    alert(`More information about ${placeName} will be available soon!\n\nStay tuned for detailed guides and visitor information.`);
}


function displayVisitorMessage() {
    const messageDiv = document.getElementById('visitorMessage');
    const lastVisitKey = 'tbilisiChamberLastVisit';
    const lastVisit = localStorage.getItem(lastVisitKey);
    const now = Date.now();

    if (!lastVisit) {
        // First visit
        messageDiv.textContent = "Welcome! Let us know if you have any questions.";
    } else {

        const timeDiff = now - parseInt(lastVisit);
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            
            messageDiv.textContent = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            
            messageDiv.textContent = "You last visited 1 day ago.";
        } else {
            
            messageDiv.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }

    
    localStorage.setItem(lastVisitKey, now.toString());
}


function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav ul');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
            // Обновляем aria-expanded для accessibility
            const isExpanded = nav.classList.contains('show');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}


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


function getSampleData() {
    return places;
}

document.addEventListener('DOMContentLoaded', () => {
    loadPlaces();
    displayVisitorMessage();
    setupMobileMenu();
    updateFooter();
});