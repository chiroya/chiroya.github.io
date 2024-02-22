document.addEventListener('DOMContentLoaded', function () {
    const swiperEl = document.querySelector('.mySwiper');
    Object.assign(swiperEl, {
        slidesPerView: 1,
        pagination: {
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
    swiperEl.initialize();
});
