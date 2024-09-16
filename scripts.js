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
          // Stop auto-scrolling if active
          clearInterval(autoScrollCertificatesInterval);
          clearInterval(autoScrollProjectsInterval);
  
          // Scroll to the target section
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
  
          // Restart auto-scroll after a delay
          setTimeout(() => {
            if (!autoScrollPaused) {
              startAutoScroll();
            }
          }, 500); // Adjust the delay as needed
        }
      });
    });
  
    let autoScrollPaused = false;
    let isScrolling = false;
    let scrollQueue = [];
  
    function scrollContainer(direction) {
      const scrollContainers = document.querySelectorAll('.scroll-container');
      scrollContainers.forEach(container => {
        if (!isScrolling) {
          isScrolling = true;
          container.scrollBy({
            left: direction * 300, // Adjust this value as needed
            behavior: 'smooth'
          });
  
          // Handle completion of scroll animation
          container.addEventListener('scroll', function onScroll() {
            if (container.scrollLeft % (container.offsetWidth / 3) === 0) {
              container.removeEventListener('scroll', onScroll);
              isScrolling = false;
              processScrollQueue();
            }
          });
        } else {
          scrollQueue.push(() => scrollContainer(direction));
        }
      });
    }
  
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
  
    if (arrowLeft && arrowRight) {
      arrowLeft.addEventListener('click', function() {
        scrollContainer(-1); // Scroll left
        autoScrollPaused = true;
        setTimeout(() => autoScrollPaused = false, 2000); // Resume auto-scroll after 2 seconds
      });
  
      arrowRight.addEventListener('click', function() {
        scrollContainer(1); // Scroll right
        autoScrollPaused = true;
        setTimeout(() => autoScrollPaused = false, 2000); // Resume auto-scroll after 2 seconds
      });
    }
  
    let autoScrollCertificatesInterval;
    const certificatesScrollContainer = document.querySelector('#certificates .scroll-container');
    let certificatesScrollAmount = 0;
  
    function autoScrollCertificates() {
      if (certificatesScrollContainer && !autoScrollPaused) {
        certificatesScrollAmount += certificatesScrollContainer.offsetWidth / 3; // Scroll by the width of one card
        if (certificatesScrollAmount >= certificatesScrollContainer.scrollWidth) {
          certificatesScrollAmount = 0; // Reset scroll to the start
        }
        requestAnimationFrame(() => {
          certificatesScrollContainer.scrollTo({
            left: certificatesScrollAmount,
            behavior: 'smooth'
          });
        });
      }
    }
  
    let autoScrollProjectsInterval;
    const projectsScrollContainer = document.querySelector('#projects .scroll-container');
    let projectsScrollAmount = 0;
  
    function autoScrollProjects() {
      if (projectsScrollContainer && !autoScrollPaused) {
        projectsScrollAmount += projectsScrollContainer.offsetWidth / 3; // Scroll by the width of one card
        if (projectsScrollAmount >= projectsScrollContainer.scrollWidth) {
          projectsScrollAmount = 0; // Reset scroll to the start
        }
        requestAnimationFrame(() => {
          projectsScrollContainer.scrollTo({
            left: projectsScrollAmount,
            behavior: 'smooth'
          });
        });
      }
    }
  
    function startAutoScroll() {
      if (certificatesScrollContainer) {
        autoScrollCertificatesInterval = setInterval(autoScrollCertificates, 2000); // Certificates scroll every 2 seconds
      }
      if (projectsScrollContainer) {
        autoScrollProjectsInterval = setInterval(autoScrollProjects, 2000); // Projects scroll every 2 seconds
      }
    }
  
    startAutoScroll(); // Start auto-scroll initially
  
    function processScrollQueue() {
      if (scrollQueue.length > 0) {
        const nextScroll = scrollQueue.shift();
        nextScroll();
      }
    }
  });
  