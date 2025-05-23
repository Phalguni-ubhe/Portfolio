document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.add('section-animated'));

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Contact form initialization
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-btn');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Get form data
        const templateParams = {
            to_email: 'phalguniubhe2005@gmail.com',
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            company: document.getElementById('company').value || 'Not specified',
            message: document.getElementById('message').value,
            reply_to: document.getElementById('email').value
        };

        // Send email using EmailJS
        emailjs.send(
            'service_i76z8tf', // Replace with your EmailJS service ID
            'template_ix31qko', // Replace with your EmailJS template ID
            templateParams
        )
        .then(function(response) {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
        })
        .catch(function(error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Oops! Something went wrong. Please try again.';
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
    });
});
