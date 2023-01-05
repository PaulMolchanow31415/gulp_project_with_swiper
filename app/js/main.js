document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт подключилися !!! \nmain.min.js');
    /*
    const slider = new Swiper('.swiper', {
        loop: true,
        lazy: {
            loadPrevNext: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            clickable: true,
            el: '.swiper-pagination',
            renderBullet: (index, className) => {
                return `<span class="${className}">${index}</span>`;
            },
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerView: 1,
                spaceBetween: 10,
            },
            815: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                initialSlide: 1,
            },
            1220: {
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
    */

    /*
    const mobileBtn = document.querySelector('.mobile-btn');
    const menu = document.querySelector('.menu');
    mobileBtn.addEventListener('click', () => {
        if (mobileBtn.classList.toggle('mobile-btn--active')) {
            menu.classList.add('menu--visible');
            document.querySelector('.mobile').classList.add('mobile--close');
            document.querySelector('.menu__list').style.cssText = 'display: flex;';
            document.querySelector('.menu__login').style.cssText = 'display: flex;';
            document.body.classList.add('lock');
        }
        else {
            menu.classList.remove('menu--visible');
            document.querySelector('.mobile').classList.remove('mobile--close');
            document.querySelector('.menu__list').style.cssText = 'display: none;';
            document.querySelector('.menu__login').style.cssText = 'display: none;';
            document.body.classList.remove('lock');
        }
    });
    */
});