
        // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav ul');

        hamburger.addEventListener('click', () => {
        nav.classList.toggle('show');
        });

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Display form data
    const firstName = urlParams.get('first-name') || '';
    const lastName = urlParams.get('last-name') || '';
    const fullName = `${firstName} ${lastName}`.trim();

    document.getElementById('display-name').textContent = fullName || 'Not provided';
    document.getElementById('display-email').textContent = urlParams.get('email') || 'Not provided';
    document.getElementById('display-mobile').textContent = urlParams.get('mobile') || 'Not provided';
    document.getElementById('display-organization').textContent = urlParams.get('organization') || 'Not provided';

    // Format membership level
    const membershipValue = urlParams.get('membership') || '';
    const membershipMap = {
        'np': 'NP Membership (Non-Profit)',
    'bronze': 'Bronze Membership',
    'silver': 'Silver Membership',
    'gold': 'Gold Membership'
        };
    document.getElementById('display-membership').textContent = membershipMap[membershipValue] || 'Not selected';

    // Format timestamp
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
            const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
            });
    document.getElementById('display-timestamp').textContent = formattedDate;
        } else {
        document.getElementById('display-timestamp').textContent = 'Not available';
        }

    // Footer dates
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
