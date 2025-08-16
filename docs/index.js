document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 15, 28, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 255, 157, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .project-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const heroRobot = document.querySelector('.hero-robot');
    if (heroRobot) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const rotateX = (mouseY - 0.5) * 10;
            const rotateY = (mouseX - 0.5) * 10;
            
            heroRobot.style.transform = `translateY(-50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.color = 'rgba(0, 255, 157, 0.8)';
            this.style.transform = 'scale(1.5) translateY(-10px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.color = 'rgba(0, 255, 157, 0.2)';
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const techIcons = this.querySelectorAll('.project-tech-icons i');
            techIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const techIcons = this.querySelectorAll('.project-tech-icons i');
            techIcons.forEach(icon => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });

    const robotEyes = document.querySelectorAll('.robot-eye');
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        robotEyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
            const distance = Math.min(3, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 100);
            
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
});