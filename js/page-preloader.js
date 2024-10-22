document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.querySelector('.preloader'); // 선택자 수정

    // 세션 스토리지를 사용하여 로딩 화면을 단 한 번만 표시
    if (!sessionStorage.getItem('preloaderShown')) {
        sessionStorage.setItem('preloaderShown', 'true');

        // 로딩 화면 최소 시간 설정 (예: 2.5초)
        const MIN_LOADING_TIME = 2500;

        // 페이지 로드 완료 후 로딩 화면을 최소 2.5초 동안 유지
        window.onload = function() {
            const startTime = Date.now();

            // 최소 로딩 시간이 지나야 화면을 숨김
            const hidePreloader = () => {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = MIN_LOADING_TIME - elapsedTime;

                // 부드러운 전환을 위해 opacity 사용
                const fadeOutPreloader = () => {
                    preloader.style.transition = 'opacity 0.5s ease';
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500); // 0.5초 후 완전히 사라짐
                };

                if (remainingTime > 0) {
                    setTimeout(fadeOutPreloader, remainingTime);
                } else {
                    fadeOutPreloader();
                }
            };

            hidePreloader();
        };
    } else {
        preloader.style.display = 'none'; // 로딩 화면 숨기기
    }
});
