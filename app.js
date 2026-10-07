document.addEventListener("DOMContentLoaded", function () {
    // ==============================
    // MOBILE MENU
    // ==============================
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            navigation.classList.toggle("active");
            if (navigation.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }
        });
        // Close menu after clicking a link
        const links = navigation.querySelectorAll("a");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("active");
                menuToggle.textContent = "☰";
            });
        });
    }
    // ==============================
    // CONTACT FORM
    // ==============================
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            if (!name || !email || !subject || !message) {
                formMessage.textContent =
                    "Please complete all fields.";
                return;
            }
            formMessage.textContent =
                "Thank you. Your message has been received.";
            contactForm.reset();
        });
    }
    // ==============================
    // AUTOMATIC COPYRIGHT YEAR
    // ==============================
    const footerText =
        document.querySelector(".footer-bottom p");
    if (footerText) {
        footerText.textContent =
            `© ${new Date().getFullYear()} Tamale Metro Scout Council. All rights reserved.`;
    }
});