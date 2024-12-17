// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add water ripple effect on button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Product image hover effect
document.querySelectorAll('.product-card img').forEach(img => {
    img.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    img.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage && heroContent) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Smooth reveal for product cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

// Dynamic text effect for headings
const headings = document.querySelectorAll('h1, h2');
headings.forEach(heading => {
    heading.innerHTML = heading.textContent.split('').map(letter => 
        `<span style="display: inline-block; transition: transform 0.3s ease">${letter}</span>`
    ).join('');
    
    heading.addEventListener('mouseover', () => {
        const letters = heading.querySelectorAll('span');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    letter.style.transform = 'translateY(0)';
                }, 200);
            }, index * 30);
        });
    });
});

// Replace the existing bottle rotation code with this new version
document.addEventListener('DOMContentLoaded', function() {
    // Add index to product cards for staggered animations
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    // Parallax effect on mouse move for hero bottle
    const heroSection = document.querySelector('.hero');
    const heroBottle = document.querySelector('.hero-image img');

    if (heroSection && heroBottle) {
        heroSection.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = heroSection.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            heroBottle.style.transform = `
                translate(${x * 20}px, ${y * 20}px)
                scale(1.05)
            `;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroBottle.style.transform = 'translate(0, 0) scale(1)';
        });
    }

    // Add smooth reveal for product cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
});

// Smooth reveal for fade-in elements
const fadeInObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a staggered delay based on the index
            entry.target.style.transitionDelay = `${index * 0.2}s`; // Adjust the delay as needed
            entry.target.classList.add('visible'); // Add visible class
            fadeInObserver.unobserve(entry.target); // Stop observing once visible
        }
    });
}, fadeInObserverOptions);

// Observe all elements with the fade-in class
document.querySelectorAll('.fade-in').forEach((element, index) => {
    element.style.opacity = '0'; // Start hidden
    element.style.transform = 'translateY(20px)'; // Start slightly below
    fadeInObserver.observe(element);
});

// Hide loading screen after 3 seconds
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading');
    setTimeout(() => {
        loadingScreen.style.opacity = '0'; // Fade out
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Remove from view
        }, 500); // Match this with the CSS transition duration
    }, 3000); // Show for 3 seconds
});