document.addEventListener('DOMContentLoaded', () => {
    const pioElement = document.querySelector('.pio-element'); // 대상 요소
    const pioAction = document.querySelector('.pio-action'); // .pio-action 요소
    const pioDialog = document.querySelector('.pio-dialog'); // 대사 요소

    let touchStartTime = 0; // 터치 시작 시간

    // 터치 시작 이벤트
    pioElement.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
    });

    // 터치 종료 이벤트
    pioElement.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;

        // 긴 터치 판단 (500ms 이상일 경우 긴 터치로 간주)
        if (touchDuration >= 500) {
            pioAction.style.display = 'block'; // .pio-action 표시
        } else {
            // 짧은 터치로 간주
            pioDialog.style.display = 'block'; // 대사 표시
        }
    });

    // PC 환경에서는 hover로 .pio-action 표시
    pioElement.addEventListener('mouseenter', () => {
        if (!isTouchDevice()) {
            pioAction.style.display = 'block';
        }
    });

    pioElement.addEventListener('mouseleave', () => {
        if (!isTouchDevice()) {
            pioAction.style.display = 'none';
        }
    });

    // 터치 장치 여부 확인 함수
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
});
