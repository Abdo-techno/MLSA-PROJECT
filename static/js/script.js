document.addEventListener('DOMContentLoaded', function() {
    // 1. تهيئة شبكة الجسيمات في الخلفية
    initParticles();
    
    // 2. تأثير المؤشر المخصص
    initCustomCursor();
    
    // 3. القائمة المتنقلة
    initMobileMenu();
    
    // 4. تأثير التمرير للهيدر
    initHeaderScroll();
    
    // 5. تأثيرات الحركة للعناصر
    initAnimations();
    
    // 6. التمرير السلس للروابط
    initSmoothScrolling();
});

// 1. تهيئة شبكة الجسيمات
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80,
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: ["#5865F2", "#9B59B6"] 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { 
                        enable: true, 
                        speed: 1, 
                        opacity_min: 0.1 
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { 
                        enable: true, 
                        speed: 2, 
                        size_min: 0.1 
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#5865F2",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 2. المؤشر المخصص
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor || window.innerWidth <= 768) return;
    
    cursor.classList.add('active');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, .team-card, .stat-card');
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// 3. القائمة المتنقلة
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// 4. تأثير التمرير للهيدر
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// 5. تأثيرات الحركة
function initAnimations() {
    // تأثير الظهور للعناصر
    const scrollElements = document.querySelectorAll('[data-scroll]');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.setAttribute('data-scroll', entry.isIntersecting ? 'in' : 'out');
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(element => {
        element.setAttribute('data-scroll', 'out');
        scrollObserver.observe(element);
    });
    
    // تأثيرات العد للأرقام
    const counterElements = document.querySelectorAll('.stat-value');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                animateCount(target, countTo);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCount(element, target) {
    let count = 0;
    const duration = 2000; // 2 ثانية
    const increment = target / (duration / 16); // 60fps
    
    const updateCount = () => {
        count += increment;
        if (count < target) {
            element.textContent = Math.floor(count);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };
    
    updateCount();
}

// 6. التمرير السلس
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    document.querySelector('.menu-toggle').classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// تهيئة تأثيرات VanillaTilt للبطاقات (إذا كانت موجودة)
function initTiltEffects() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.team-card'), {
            max: 10,
            speed: 300,
            glare: true,
            "max-glare": 0.2,
        });
    }
}

// تسجيل تحميل الصفحة
console.log('تم تحميل الصفحة بنجاح');