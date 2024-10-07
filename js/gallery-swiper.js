document.addEventListener('DOMContentLoaded', function () {

    // 이미지 경로 배열
    const images = [
        'https://qrcodethumb-phinf.pstatic.net//20241007_46/1728240478011djFBK_PNG/011.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_14/1728240478060mQeJ3_JPEG/002.jpg', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_15/1728240478055YrWBw_PNG/012.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_297/1728240478080Wz4Gm_JPEG/003.jpg', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_262/1728240478045UsPGJ_PNG/005.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_176/1728240477995tRhcw_PNG/010.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_221/1728240477970aWmVq_PNG/006.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_230/1728240478068j098G_PNG/008.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_240/1728240477972FyiLG_PNG/004.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_100/1728240478010xTgNN_PNG/009.png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_224/17282404779570lF8X_JPEG/007.jpg',
        'https://qrcodethumb-phinf.pstatic.net//20241007_155/1728240478074zGdph_PNG/001.png',
    ]



    // Swiper 컨테이너 선택
    const swiperContainer = document.querySelector('.mySwiper .swiper-wrapper');

    // 동적으로 이미지 추가
    images.forEach(src => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
            <div class="portfolio-item">
                <img src="${src}" class="img-responsive" alt="Gallery Image">
            </div>
        `;
        swiperContainer.appendChild(slide);
    });

    // Swiper 초기화
    const swiper = new Swiper('.mySwiper', {
        
        
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,

        autoplay: {
            delay: 10000,
            disableOnInteraction: false
        },

        breakpoints: {
            // 반응형 슬라이드 개수 설정
            320: {
                slidesPerView: 1, // 320px 이하에서 1개 슬라이드
            },
            768: {
                slidesPerView: 2, // 768px 이하에서 2개 슬라이드
            },
            1024: {
                slidesPerView: 3, // 1024px 이상에서 3개 슬라이드
            }
        }
    });
});



