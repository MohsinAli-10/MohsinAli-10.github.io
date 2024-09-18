document.addEventListener('DOMContentLoaded', function() {
  // Handle navbar link clicks for smooth scrolling
  const links = document.querySelectorAll('nav ul li a');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section id
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Scroll to the target section
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  let autoScrollPaused = false;
  let isScrolling = false;
  let scrollQueue = [];

  // Detect screen width to adjust scroll increment for mobile
  let scrollIncrement = window.innerWidth <= 768 ? 150 : 300; // Adjust scroll for mobile screens

  // Handle swipe gestures for mobile users
  function handleTouchEvents() {
      let startX;
      const containers = document.querySelectorAll('.scroll-container');
      
      containers.forEach(container => {
          container.addEventListener('touchstart', (e) => {
              startX = e.touches[0].clientX;
          });
          
          container.addEventListener('touchmove', (e) => {
              const moveX = e.touches[0].clientX;
              const diffX = startX - moveX;
              
              if (Math.abs(diffX) > 50) { // If swipe distance is significant enough
                  if (diffX > 0) {
                      container.scrollBy({
                          left: scrollIncrement,
                          behavior: 'smooth'
                      }); // Swipe left, scroll right
                  } else {
                      container.scrollBy({
                          left: -scrollIncrement,
                          behavior: 'smooth'
                      }); // Swipe right, scroll left
                  }
                  autoScrollPaused = true;
                  setTimeout(() => autoScrollPaused = false, 2000); // Resume after 2 seconds
              }
          });
      });
  }

  handleTouchEvents(); // Initialize touch gestures for mobile
});