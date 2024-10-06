document.addEventListener('DOMContentLoaded', function () {

    // 이미지 경로 배열
    const images = [
        'https://qrcodethumb-phinf.pstatic.net/20230504_82/16832049920215qGVn_PNG/%EC%95%BC%EC%9E%98%EC%A1%B0%EC%95%84%EC%9A%94(arca).png', 
        'https://qrcodethumb-phinf.pstatic.net/20230504_175/1683204991270Fjv51_PNG/%EC%82%90%EC%9A%94-%EB%A7%88%EB%8F%84_ai-painter.png', 
        'https://qrcodethumb-phinf.pstatic.net/20230520_280/168455967628507XgR_JPEG/%EB%8B%88%EB%82%98%EC%A7%B1-SD.jpg', 
        'https://qrcodethumb-phinf.pstatic.net/20230504_198/1683204990963tCeek_PNG/NANKAM_%EB%8B%89%EB%84%B4x.png', 
        'https://qrcodethumb-phinf.pstatic.net/20230504_28/1683204992476mUfvX_PNG/%EC%9E%A1%EC%B4%88%EC%96%91_%EC%A0%84%EC%8B%A0_%ED%9D%B0%EB%B0%B0%EA%B2%BD.png', 
        'https://qrcodethumb-phinf.pstatic.net/20230504_174/1683204991769Hp9QD_JPEG/%EC%8B%B8%EB%A3%A8_%EB%85%B8%EC%9D%84.jpg', 
        'https://qrcodethumb-phinf.pstatic.net/20230504_112/1683204991595v7mNA_PNG/%EC%82%AC%EC%BF%A0%EC%97%90_%EC%88%98%EC%A0%95%EB%B3%B8(%EC%B5%9C%EC%A2%85).png', 
        'https://qrcodethumb-phinf.pstatic.net//20241007_184/1728233510335oQBAE_PNG/%BD%BA%C6%BC%BA%EC%B9%E9.png', 
        'https://qrcodethumb-phinf.pstatic.net//20240213_253/1707763035002FH3cM_PNG/%C5%E4%C7%C7%B3%D3%B6%F3%B6%BC.png', 
        'https://qrcodethumb-phinf.pstatic.net/20230504_65/1683204992257X4Dpk_PNG/%EC%9E%A1%EC%B4%88%EC%96%91_%EB%B0%98%EC%8B%A0_%ED%9D%B0%EB%B0%B0%EA%B2%BD.png', 
        'https://qrcodethumb-phinf.pstatic.net/20230504_217/1683204992648HdCDH_JPEG/ha4444.jpg'
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
        
        slidesPerView: 3, // 기본적으로 한 줄에 3개 슬라이드 표시
        
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



