// Date functionality
document.addEventListener('DOMContentLoaded', function () {
    // текущего года
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // дата последней модификации
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = `Last Modification: ${ document.lastModified }`;
    }

    console.log('Date script loaded'); 
});