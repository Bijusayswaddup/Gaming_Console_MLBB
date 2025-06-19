// Simulate loading progress
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('loading-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
            }, 500);
        }
    }, 200);

    // Navigation functionality
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (!link.getAttribute('href').startsWith('http') && 
            !link.getAttribute('href').includes('.html')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show the selected section
                const sectionId = this.getAttribute('href').substring(1);
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById(sectionId).classList.add('active');
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});