/**
 * AI Tools / SaaS Landing Page - Plugins and Third-party Integrations
 */

// Initialize all plugins when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initIsotope();
    initCounterUp();
    initOwlCarousel();
    initTypedJS();
    initParallax();
    initParticleJS();
    initChartJS();
    initDataTables();
    initSelect2();
    initDatePicker();
    initFileUpload();
    initImageLightbox();
    initSwiper();
    initGSAP();
});

/**
 * AOS (Animate On Scroll) initialization
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

/**
 * Isotope initialization for filtering
 */
function initIsotope() {
    const grid = document.querySelector('.isotope-grid');
    if (!grid || typeof Isotope === 'undefined') return;

    const iso = new Isotope(grid, {
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows'
    });

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            iso.arrange({ filter: filterValue });
        });
    });
}

/**
 * CounterUp initialization
 */
function initCounterUp() {
    if (typeof counterUp === 'undefined') return;

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counterUp(counter, {
            duration: 2000,
            delay: 16
        });
    });
}

/**
 * Owl Carousel initialization
 */
function initOwlCarousel() {
    if (typeof $ === 'undefined' || typeof $.fn.owlCarousel === 'undefined') return;

    // Testimonials carousel
    $('.testimonials-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1024: { items: 3 }
        }
    });

    // Tools carousel
    $('.tools-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            1024: { items: 4 }
        }
    });

    // Blog carousel
    $('.blog-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1024: { items: 3 }
        }
    });
}

/**
 * Typed.js initialization
 */
function initTypedJS() {
    if (typeof Typed === 'undefined') return;

    const typedElements = document.querySelectorAll('.typed-text');
    typedElements.forEach(element => {
        const strings = element.getAttribute('data-strings').split(',');
        new Typed(element, {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1000,
            loop: true
        });
    });
}

/**
 * Parallax scrolling initialization
 */
function initParallax() {
    if (typeof Parallax === 'undefined') return;

    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        new Parallax(element, {
            speed: 0.5
        });
    });
}

/**
 * Particles.js initialization
 */
function initParticleJS() {
    if (typeof particlesJS === 'undefined') return;

    const particleElement = document.getElementById('particles-js');
    if (!particleElement) return;

    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#6366f1' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
}

/**
 * Chart.js initialization
 */
function initChartJS() {
    if (typeof Chart === 'undefined') return;

    // Analytics chart
    const analyticsCtx = document.getElementById('analytics-chart');
    if (analyticsCtx) {
        new Chart(analyticsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Users',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Revenue chart
    const revenueCtx = document.getElementById('revenue-chart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ['AI Tools', 'Analytics', 'Automation', 'Support'],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#10b981',
                        '#f59e0b'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}

/**
 * DataTables initialization
 */
function initDataTables() {
    if (typeof $ === 'undefined' || typeof $.fn.DataTable === 'undefined') return;

    $('.data-table').DataTable({
        responsive: true,
        pageLength: 10,
        language: {
            search: "Search:",
            lengthMenu: "Show _MENU_ entries",
            info: "Showing _START_ to _END_ of _TOTAL_ entries",
            paginate: {
                first: "First",
                last: "Last",
                next: "Next",
                previous: "Previous"
            }
        }
    });
}

/**
 * Select2 initialization
 */
function initSelect2() {
    if (typeof $ === 'undefined' || typeof $.fn.select2 === 'undefined') return;

    $('.select2').select2({
        theme: 'default',
        width: '100%'
    });
}

/**
 * Date picker initialization
 */
function initDatePicker() {
    if (typeof $ === 'undefined' || typeof $.fn.datepicker === 'undefined') return;

    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true
    });
}

/**
 * File upload initialization
 */
function initFileUpload() {
    const fileInputs = document.querySelectorAll('.file-upload');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const files = this.files;
            const preview = this.nextElementSibling;
            
            if (preview && files.length > 0) {
                preview.innerHTML = '';
                
                Array.from(files).forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    fileItem.innerHTML = `
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${formatFileSize(file.size)}</span>
                        <button type="button" class="file-remove">&times;</button>
                    `;
                    preview.appendChild(fileItem);
                    
                    // Remove file functionality
                    fileItem.querySelector('.file-remove').addEventListener('click', function() {
                        fileItem.remove();
                    });
                });
            }
        });
    });
}

/**
 * Image lightbox initialization
 */
function initImageLightbox() {
    if (typeof lightbox === 'undefined') return;

    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false
    });
}

/**
 * Swiper initialization
 */
function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    // Hero swiper
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    // Features swiper
    const featuresSwiper = new Swiper('.features-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

/**
 * GSAP animations initialization
 */
function initGSAP() {
    if (typeof gsap === 'undefined') return;

    // Hero animation
    gsap.timeline()
        .from('.hero h1', { duration: 1, y: 50, opacity: 0 })
        .from('.hero p', { duration: 1, y: 30, opacity: 0 }, '-=0.5')
        .from('.hero-actions', { duration: 1, y: 30, opacity: 0 }, '-=0.5');

    // Feature cards animation
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            delay: index * 0.1
        });
    });

    // Counter animation
    gsap.utils.toArray('.counter').forEach(counter => {
        const endValue = parseInt(counter.getAttribute('data-target'));
        
        gsap.from(counter, {
            duration: 2,
            textContent: 0,
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%'
            },
            onUpdate: function() {
                counter.textContent = Math.ceil(this.targets()[0].textContent);
            }
        });
    });
}

/**
 * Utility functions for plugins
 */
const pluginUtils = {
    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Lazy load images
    initLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    },

    // Initialize tooltips
    initTooltips: function() {
        if (typeof tippy !== 'undefined') {
            tippy('[data-tippy-content]', {
                theme: 'light',
                arrow: true,
                animation: 'fade'
            });
        }
    },

    // Initialize popovers
    initPopovers: function() {
        if (typeof $ !== 'undefined' && typeof $.fn.popover !== 'undefined') {
            $('[data-bs-toggle="popover"]').popover();
        }
    }
};

// Export plugin utilities
window.PluginUtils = pluginUtils;
