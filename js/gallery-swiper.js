document.addEventListener('DOMContentLoaded', function () {
    const images = [];

    // 우클릭 방지 함수
    function preventRightClick(e) {
        e.preventDefault();
        return false;
    }

    // 보호할 요소들 선택
    const protectedElements = document.querySelectorAll('.mySwiper, .img-responsive, .mascot');
    
    // 모든 보호 대상 요소들에 우클릭 방지 적용
    protectedElements.forEach(element => {
        element.addEventListener('contextmenu', preventRightClick);
        // 드래그 방지 스타일 적용
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.msUserSelect = 'none';
        element.draggable = false;
    });

    // 기존 이미지에 대한 보호 적용
    document.querySelectorAll('.img-responsive, .mascot').forEach(img => {
        img.addEventListener('contextmenu', preventRightClick);
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.msUserSelect = 'none';
        img.draggable = false;
    });

    fetch('module/crawler/images.json')
        .then(response => response.json())
        .then(data => {
            images.push(...data);
            
            const swiperContainer = document.querySelector('.mySwiper .swiper-wrapper');

            images.forEach(src => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = `
                    <div class="portfolio-item">
                        <img src="${src}" class="img-responsive" alt="Gallery Image">
                    </div>
                `;
                
                // 새로 추가된 이미지에 보호 적용
                const img = slide.querySelector('img');
                img.addEventListener('contextmenu', preventRightClick);
                img.style.userSelect = 'none';
                img.style.webkitUserSelect = 'none';
                img.style.msUserSelect = 'none';
                img.draggable = false;
                
                swiperContainer.appendChild(slide);
            });

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
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });
        })
        .catch(error => console.error('Error loading images:', error));
});