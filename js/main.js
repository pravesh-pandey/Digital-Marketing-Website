// ===================================
// Portfolio Website - Main JavaScript
// ===================================

// Global state
let portfolioData = null;
let currentSlide = 0;
let totalSlides = 0;

// ===================================
// Initialize on DOM load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
    initNavigation();
    initMobileMenu();
    setCurrentYear();
    initScrollAnimations();
});

// ===================================
// Load Portfolio Data from JSON
// ===================================
async function loadPortfolioData() {
    try {
        const response = await fetch('data/portfolio.json');
        if (!response.ok) {
            throw new Error('Failed to load portfolio data');
        }
        portfolioData = await response.json();
        populateAboutSection();
        populateTestimonials();
        populateContactInfo();
        initContactForm();
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        showErrorMessage();
    }
}

// ===================================
// Populate About Section
// ===================================
function populateAboutSection() {
    if (!portfolioData || !portfolioData.about) return;

    const { name, title, bio, headshot, skills } = portfolioData.about;

    // Set about content
    document.getElementById('about-name').textContent = name;
    document.getElementById('about-title').textContent = title;
    document.getElementById('about-bio').textContent = bio;

    // Set headshot with fallback
    const headshotImg = document.getElementById('headshot');
    headshotImg.src = headshot;
    headshotImg.alt = `${name} - ${title}`;

    // Handle image load error
    headshotImg.onerror = () => {
        headshotImg.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23e2e8f0" width="400" height="400"/%3E%3Ctext fill="%2364748b" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAdd Your Photo%3C/text%3E%3C/svg%3E';
    };

    // Populate skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');
}

// ===================================
// Populate Testimonials
// ===================================
function populateTestimonials() {
    if (!portfolioData || !portfolioData.testimonials) return;

    const testimonials = portfolioData.testimonials;
    totalSlides = testimonials.length;
    const track = document.getElementById('testimonials-track');
    const dotsContainer = document.getElementById('carousel-dots');

    // Create testimonial cards
    track.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <p class="testimonial-quote">${testimonial.quote}</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}"
                     alt="${testimonial.name}"
                     class="author-image"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22%3E%3Ccircle fill=%22%23e2e8f0%22 cx=%2230%22 cy=%2230%22 r=%2230%22/%3E%3Ctext fill=%22%2364748b%22 font-family=%22Arial%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E${testimonial.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role} at ${testimonial.company}</p>
                </div>
            </div>
        </div>
    `).join('');

    // Create dots
    dotsContainer.innerHTML = testimonials.map((_, index) => `
        <span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
    `).join('');

    // Initialize carousel
    initCarousel();
}

// ===================================
// Carousel Functionality
// ===================================
function initCarousel() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');

    // Next slide
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });

    // Previous slide
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentSlide = parseInt(e.target.dataset.slide);
            updateCarousel();
        });
    });

    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
    }
}

function updateCarousel() {
    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('.dot');

    // Move track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// ===================================
// Populate Contact Info
// ===================================
function populateContactInfo() {
    if (!portfolioData || !portfolioData.contact) return;

    const { email, phone, linkedin, twitter } = portfolioData.contact;

    document.getElementById('contact-email').textContent = email;
    document.getElementById('contact-phone').textContent = phone;
    document.getElementById('linkedin-link').href = linkedin;
    document.getElementById('twitter-link').href = twitter;
}

// ===================================
// Contact Form Handling
// ===================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Basic spam check - honeypot field
        if (formData.get('_gotcha')) {
            return; // Silent fail for bots
        }

        // Validate email
        if (!isValidEmail(data.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Option 1: Using Formspree (requires setup)
            if (portfolioData.contact.formspreeId && portfolioData.contact.formspreeId !== 'your_formspree_id_here') {
                await submitToFormspree(data, portfolioData.contact.formspreeId);
            } else {
                // Option 2: Mailto fallback
                submitViaMailto(data);
            }

            showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

async function submitToFormspree(data, formspreeId) {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Form submission failed');
    }
}

function submitViaMailto(data) {
    const mailtoLink = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`)}`;
    window.location.href = mailtoLink;
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;

    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const nav = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
}

// ===================================
// Mobile Menu
// ===================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (toggle && navMenu) {
        toggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
    }
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===================================
// Utility Functions
// ===================================
function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function showErrorMessage() {
    const about = document.querySelector('.about-content');
    if (about) {
        about.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #991b1b;">Unable to load portfolio data</h3>
                <p style="color: #64748b;">Please check that the data/portfolio.json file exists and is properly formatted.</p>
            </div>
        `;
    }
}

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Console message
// ===================================
console.log('%c Portfolio Website ', 'background: #2563eb; color: white; padding: 10px; font-size: 16px; font-weight: bold;');
console.log('%c Built with HTML, CSS, and JavaScript ', 'color: #64748b; font-size: 12px;');
