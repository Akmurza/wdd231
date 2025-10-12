// Discover Page JavaScript for Tbilisi Chamber

// Load places from JSON file
async function loadPlaces() {
    try {
        const response = await fetch('data/places.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayPlaces(data.places);
    } catch (error) {
        console.error('Error loading places:', error);
        // Fallback to sample data if JSON fails
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
    return [
        {
            id: 1,
            name: "Old Tbilisi",
            address: "Abanotubani District, Tbilisi, Georgia",
            description: "Historic heart of Tbilisi featuring traditional sulfur baths, narrow cobblestone streets, and iconic wooden balconies.",
            image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            name: "Narikala Fortress",
            address: "Sololaki District, Tbilisi, Georgia",
            description: "Ancient fortress overlooking Tbilisi from the Sololaki hill, dating back to the 4th century.",
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            name: "Rustaveli Avenue",
            address: "Rustaveli Avenue, Tbilisi, Georgia",
            description: "Main thoroughfare of Tbilisi lined with theatres, museums, cafes, and boutiques.",
            image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400&h=300&fit=crop"
        },
        {
            id: 4,
            name: "Bridge of Peace",
            address: "Rike Park, Tbilisi, Georgia",
            description: "Modern pedestrian bridge across the Mtkvari River featuring stunning glass and steel architecture.",
            image: "https://images.unsplash.com/photo-1590073844006-33d7f7f8c78a?w=400&h=300&fit=crop"
        },
        {
            id: 5,
            name: "Mtatsminda Park",
            address: "Mtatsminda Plateau, Tbilisi, Georgia",
            description: "Amusement park atop Mount Mtatsminda offering breathtaking city views and entertainment.",
            image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&h=300&fit=crop"
        },
        {
            id: 6,
            name: "Georgian National Museum",
            address: "3 Rustaveli Avenue, Tbilisi, Georgia",
            description: "Premier museum showcasing Georgia's rich history from ancient times to modern day.",
            image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400&h=300&fit=crop"
        },
        {
            id: 7,
            name: "Tbilisi Botanical Garden",
            address: "1 Botanikuri Street, Tbilisi, Georgia",
            description: "Lush 161-hectare garden featuring diverse flora from around the world and waterfalls.",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
        },
        {
            id: 8,
            name: "Dry Bridge Flea Market",
            address: "Dry Bridge, Tbilisi, Georgia",
            description: "Famous open-air market selling Soviet memorabilia, antiques, artwork, and handcrafted items.",
            image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop"
        }
    ];
}

// Initialize page on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadPlaces();
    displayVisitorMessage();
    setupMobileMenu();
    updateFooter();
});