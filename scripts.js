// JavaScript for Intersection Observer and Smooth Scrolling with Glow Effect

document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const projectCards = document.querySelectorAll('.project');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const xPos = e.clientX / window.innerWidth - 0.5;
            const yPos = e.clientY / window.innerHeight - 0.5;
            const hue = Math.floor((Math.atan2(yPos, xPos) + Math.PI) / (Math.PI * 2) * 360);
            card.style.setProperty('--hue', hue);
        });
    });
});