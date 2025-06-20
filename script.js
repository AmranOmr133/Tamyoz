document.addEventListener('DOMContentLoaded', function() {
    // القائمة المتحركة للشاشات الصغيرة
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // تغيير لون شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // زر العودة للأعلى
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // فلترة المشاريع
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // تأثيرات العد للأرقام
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const speed = 2000 / target;
            let count = 0;
            
            const updateCount = () => {
                count++;
                number.textContent = count;
                
                if (count < target) {
                    setTimeout(updateCount, speed);
                }
            };
            
            updateCount();
        });
    }
    
    // تنشيط العد عند التمرير للقسم
    function checkScroll() {
        const aboutSection = document.querySelector('.about-section');
        const sectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            animateNumbers();
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    
    // إرسال نموذج التواصل
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // هنا يمكنك إضافة كود إرسال النموذج عبر AJAX
        alert('شكرًا لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
        contactForm.reset();
    });
    
    // تحديث سنة حقوق النشر تلقائيًا
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // تأثيرات التمرير (Scroll Animation)
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        function checkPosition() {
            elements.forEach(element => {
                const position = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (position < windowHeight - 100) {
                    element.classList.add('aos-animate');
                }
            });
        }
        
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('load', checkPosition);
        checkPosition(); // التحقق عند التحميل الأولي
    }
    
    initScrollAnimations();
    
    // منع الإرسال إذا كانت الحقول فارغة
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.setAttribute('data-filled', 'true');
            } else {
                this.removeAttribute('data-filled');
            }
        });
    });
});