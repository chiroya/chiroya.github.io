document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".pio-container");
    if (!container) return;

    const LONG_PRESS_TIME = 500; // 긴 터치로 간주할 시간 (밀리초)
    let touchStartTime = 0;
    let longPressTimeout;
    let isLongPress = false;

    const addHoverEffect = () => container.classList.add("hover-effect");
    const removeHoverEffect = () => container.classList.remove("hover-effect");

    // 터치 시작 이벤트
    container.addEventListener("touchstart", (e) => {
        e.preventDefault(); // 기본 동작 방지 (예: 스크롤)
        isLongPress = false;
        touchStartTime = Date.now();

        longPressTimeout = setTimeout(() => {
            isLongPress = true;
            addHoverEffect(); // 긴 터치 시 hover 효과 적용
        }, LONG_PRESS_TIME);
    });

    // 터치 이동 시 긴 터치 취소
    container.addEventListener("touchmove", () => {
        clearTimeout(longPressTimeout);
        removeHoverEffect();
    });

    // 터치 종료 이벤트
    container.addEventListener("touchend", (e) => {
        clearTimeout(longPressTimeout);

        if (isLongPress) {
            // 긴 터치 후 동작 (hover 효과 유지)
            console.log("긴 터치: hover 효과 유지");
        } else {
            // 짧은 터치 동작 (클릭)
            console.log("짧은 터치: onclick 동작 실행");
            removeHoverEffect(); // 짧은 터치 후 hover 효과 제거
            // pio.js에서 제공하는 클릭 동작 실행 (예: toggle)
            if (typeof window.pioClickHandler === "function") {
                window.pioClickHandler();
            }
        }
    });
});
