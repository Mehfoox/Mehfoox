document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully");
    
    // Add interactive effect on portfolio images
    const images = document.querySelectorAll(".portfolio-img");
    images.forEach(img => {
        img.addEventListener("click", () => {
            alert("You clicked on " + img.alt);
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Form submission handling
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Thank you for your message!");
        form.reset();
    });
});
