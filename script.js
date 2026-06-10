

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 800);
        });
    }
    
   
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileBtn.querySelector('i')) {
                    mobileBtn.querySelector('i').classList.add('fa-bars');
                    mobileBtn.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }
    
    
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const triggerBottom = window.innerHeight * 0.8;
        const statsSection = document.querySelector('.hero-stats');
        
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 20);
                });
            }
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
  
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
    
   
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            if (!name || !email || !message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            
            showFormStatus('Sending message...', 'success');
            
            setTimeout(() => {
                showFormStatus('Thank you! I will get back to you within 48 hours.', 'success');
                contactForm.reset();
                
                
                setTimeout(() => {
                    if (formStatus) formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.innerHTML = `<div class="${type}">${message}</div>`;
            formStatus.style.color = type === 'error' ? '#e74c3c' : '#2ecc71';
            
            setTimeout(() => {
                if (formStatus.innerHTML === `<div class="${type}">${message}</div>`) {
                    formStatus.innerHTML = '';
                }
            }, 5000);
        }
    }
    
   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent === 'Informatics Specialist | Data Analyst | Systems Architect') {
       
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(10px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.6s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
  
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .resume-item, .info-card');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealThreshold = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealThreshold) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
  
    const downloadBtn = document.querySelector('.resume-download .btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
           
            alert('PDF download would start here. In production, link to your actual CV file.');
            
        });
    }
    
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Project details would open here. In production, link to your case study or GitHub repository.');
        });
    });
    
    const socialLinks = document.querySelectorAll('.footer-social a, .info-card a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Connect with me on professional platforms. Add your actual profile links.');
            }
        });
    });
    
    console.log('Portfolio initialized successfully | Virginiash Mueni');
});
