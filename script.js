// Smooth scroll functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 60,
        behavior: 'smooth'
    });
}

// Form submission handler (for demonstration)
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    alert('Thank you for your message! I will get back to you soon.');
});
