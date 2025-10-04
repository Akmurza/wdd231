// Hamburger 
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector("nav ul");
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


const API_KEY = 'd30862a86ddd151cf315cc6b216a08c0'; 
const CITY = 'Tbilisi';
const COUNTRY_CODE = 'GE';
const UNITS = 'imperial'; // Use Celsius

// Fetch Weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&units=${UNITS}&appid=${API_KEY}`
        );
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather:", error);
        document.getElementById("current-weather").innerHTML =
            '<p class="error">Unable to load weather data</p>';
    }
}

//  Current Weather
function displayCurrentWeather(data) {
    const weatherDiv = document.getElementById("current-weather");
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);

    weatherDiv.innerHTML = `
        <div class="weather-main">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <div class="temp-display">
                <span class="current-temp">${temp}°F</span>
                <p class="weather-desc">${capitalizeWords(description)}</p>
            </div>
        </div>
        <div class="weather-details">
            <p><strong>High:</strong> ${high}°F</p>
            <p><strong>Low:</strong> ${low}°F</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
        </div>
    `;
}

//  3-day Forecast
async function fetchForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY_CODE}&units=${UNITS}&appid=${API_KEY}`
        );
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast:", error);
        document.getElementById("forecast").innerHTML =
            '<p class="error">Unable to load forecast</p>';
    }
}

//  3-Day Forecast
function displayForecast(data) {
    const forecastDiv = document.getElementById("forecast");
    const dailyForecasts = [];

    // Get one forecast per day 
    for (let i = 0; i < data.list.length && dailyForecasts.length < 3; i++) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const hour = date.getHours();

        // Get forecast (12:00)
        if (hour >= 11 && hour <= 13) {
            dailyForecasts.push(forecast);
        }
    }

    // If didn't get 3 forecast
    if (dailyForecasts.length < 3) {
        dailyForecasts.length = 0;
        for (let i = 0; i < 3; i++) {
            dailyForecasts.push(data.list[i * 8]);
        }
    }

    forecastDiv.innerHTML = dailyForecasts.map(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(forecast.main.temp);
        const icon = forecast.weather[0].icon;
        const description = forecast.weather[0].description;

        return `
            <div class="forecast-day">
                <h4>${dayName}</h4>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                <p class="forecast-temp">${temp}°F</p>
                <p class="forecast-desc">${capitalizeWords(description)}</p>
            </div>
        `;
    }).join('');
}

// to capitalize words
function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Load Member Spotlights
async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error("Error loading member spotlights:", error);
        document.getElementById("spotlights-container").innerHTML =
            '<p class="error">Unable to load member spotlights</p>';
    }
}




// random Gold/Silver Member Spotlights
function displaySpotlights(members) {
    // Filter for gold (3) and silver (2) members only
    const qualifiedMembers = members.filter(member =>
        member.membership === 2 || member.membership === 3
    );

    
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3); // Show 3 spotlights

    const container = document.getElementById("spotlights-container");
    container.innerHTML = selected.map(member => {
        const membershipLevel = member.membership === 3 ? "Gold" : "Silver";
        const membershipClass = member.membership === 3 ? "gold-member" : "silver-member";

        return `
            <div class="spotlight-card ${membershipClass}">
                <img src="images/${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p class="membership-badge">${membershipLevel} Member</p>
                <div class="spotlight-details">
                    <p><strong>📍</strong> ${member.address}</p>
                    <p><strong>📞</strong> ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website →</a></p>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentWeather();
    fetchForecast();
    loadSpotlights();
});