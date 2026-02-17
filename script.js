// DOM Elements
const body = document.body;
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const generateQuoteBtn = document.getElementById('generate-quote');
const quoteElement = document.querySelector('.quote');
const contactForm = document.querySelector('.contact-form');
const timetableRows = document.querySelectorAll('.timetable tbody tr');

// Motivational Quotes Array
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "You miss 100% of the shots you don't take. - Wayne Gretzky",
    "The best way to predict the future is to create it. - Peter Drucker",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
];

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').className = 'fas fa-sun';
}

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Generate Random Quote
function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
    quoteElement.style.animation = 'none';
    setTimeout(() => {
        quoteElement.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
}

generateQuoteBtn.addEventListener('click', generateRandomQuote);

// Initialize with a random quote
generateRandomQuote();

// Timetable Highlighting
timetableRows.forEach(row => {
    row.addEventListener('click', () => {
        timetableRows.forEach(r => r.classList.remove('highlight'));
        row.classList.add('highlight');
    });
});

// Form Validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;
    let errorMessage = '';

    if (name === '') {
        isValid = false;
        errorMessage += 'Name is required.\n';
    }

    if (email === '') {
        isValid = false;
        errorMessage += 'Email is required.\n';
    } else if (!isValidEmail(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }

    if (message === '') {
        isValid = false;
        errorMessage += 'Message is required.\n';
    }

    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } else {
        alert(errorMessage);
    }
});

// Signup Form Validation
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        let isValid = true;
        let errorMessage = '';

        if (name === '') {
            isValid = false;
            errorMessage += 'Name is required.\n';
        }

        if (email === '') {
            isValid = false;
            errorMessage += 'Email is required.\n';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }

        if (password.length < 6) {
            isValid = false;
            errorMessage += 'Password must be at least 6 characters long.\n';
        }

        if (password !== confirmPassword) {
            isValid = false;
            errorMessage += 'Passwords do not match.\n';
        }

        if (isValid) {
            alert('Account created successfully! You can now log in.');
            signupForm.reset();
        } else {
            alert(errorMessage);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking a link
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.section').forEach(section => {
    section.style.animation = 'fadeInUp 1s ease-out';
    section.style.animationPlayState = 'paused';
    observer.observe(section);
});

// --- Note card details modal ---
const modal = document.getElementById('detail-modal');
const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = modal ? modal.querySelector('.modal-close') : null;

function openModal(title, body) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

// Attach click listeners to note cards and "View Notes" links
document.querySelectorAll('.note-card').forEach(card => {
    const viewLink = card.querySelector('.view-details');
    const titleEl = card.querySelector('h3');
    const titleText = titleEl ? titleEl.innerText : 'Details';
    const full = card.dataset.full || (card.querySelector('p') ? card.querySelector('p').innerText : 'No details available.');

    // Clicking the whole card also opens details
    card.addEventListener('click', (e) => {
        // prevent opening when clicking a link that should navigate elsewhere
        if (e.target.tagName.toLowerCase() === 'a') return;
        openModal(titleText, full);
    });

    if (viewLink) {
        viewLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(titleText, full);
        });
    }
});

if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
if (modalClose) modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

