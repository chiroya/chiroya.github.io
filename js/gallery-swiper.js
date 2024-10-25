document.addEventListener('DOMContentLoaded', function () {
    // 이미지 경로 배열 리스트 생성
    const images = [];

    // 파이썬 웹크롤러로 받아와 저장한 json 파일을 불러와서 적용
    fetch('module/crawler/images.json')
        .then(response => response.json())
        .then(data => {
            images.push(...data); // 불러온 이미지를 images 배열에 추가
            
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
        })
        .catch(error => console.error('Error loading images:', error));
});
