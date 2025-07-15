document.addEventListener('DOMContentLoaded', function () {

    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // Abre o menu
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });

    // Fecha o menu
    const closeMenu = () => {
        mobileNav.classList.remove('active');
    };

    menuClose.addEventListener('click', closeMenu);

    // Fecha o menu ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // --- EFEITO DO CABEÇALHO AO ROLAR ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- ANIMAÇÃO AO ENTRAR NA TELA (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: para de observar depois que a animação acontece
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // --- ROLAGEM SUAVE (JÁ INCLUÍDA NA LÓGICA DO MENU MOBILE) ---

    // --- INICIALIZAÇÃO DO SWIPER.JS (CARROSSEL) ---
    const swiper = new Swiper('.swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

});