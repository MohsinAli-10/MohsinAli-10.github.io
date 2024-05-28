// Optional JavaScript for additional interactivity or animations

document.addEventListener("DOMContentLoaded", () => {
    // Example: Smooth scrolling for navigation links
    const links = document.querySelectorAll("nav ul li a");

    for (const link of links) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjust for fixed header
                behavior: "smooth"
            });
        });
    }
});