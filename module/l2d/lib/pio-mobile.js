document.addEventListener('DOMContentLoaded', function() {
    const pioContainer = document.querySelector('.pio-container');
    const pioAction = document.querySelector('.pio-action');
    const canvas = document.getElementById('pio');

    let touchStartTime;
    let touchTimer;
    const longPressDuration = 500; // 0.5초

    function showAction() {
        pioAction.style.display = 'block';
    }

    function hideAction() {
        pioAction.style.display = 'none';
    }

    function handleTouchStart(e) {
        touchStartTime = Date.now();
        touchTimer = setTimeout(showAction, longPressDuration);
    }

    function handleTouchEnd(e) {
        const touchDuration = Date.now() - touchStartTime;
        clearTimeout(touchTimer);

        if (touchDuration < longPressDuration) {
            // 짧은 터치: PC의 클릭 이벤트와 동일하게 처리
            if (canvas.onclick) {
                canvas.onclick();
            }
        } else {
            // 긴 터치: .pio-action을 표시한 상태 유지
            e.preventDefault(); // 기본 동작 방지
        }
    }

    function handleTouchMove(e) {
        clearTimeout(touchTimer);
        hideAction();
    }

    if ('ontouchstart' in window) {
        // 터치 이벤트 리스너 추가
        pioContainer.addEventListener('touchstart', handleTouchStart);
        pioContainer.addEventListener('touchend', handleTouchEnd);
        pioContainer.addEventListener('touchmove', handleTouchMove);

        // 기본적으로 .pio-action 숨기기
        hideAction();
    } else {
        // PC 환경에서는 hover 동작 유지
        pioContainer.addEventListener('mouseenter', showAction);
        pioContainer.addEventListener('mouseleave', hideAction);
    }
});
