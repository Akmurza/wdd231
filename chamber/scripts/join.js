
        // hmburger menu
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav ul');

        hamburger.addEventListener('click', () => {
        nav.classList.toggle('show');
        });

   
    document.getElementById('timestamp').value = new Date().toISOString();

    // functionality
    const modalLinks = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

        modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            document.getElementById(modalId).classList.add('show');
        });
        });

        closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('show');
        });
        });

        modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
        });

    // footer dates
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;