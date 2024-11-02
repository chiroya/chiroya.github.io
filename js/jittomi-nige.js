document.addEventListener('DOMContentLoaded', () => {
  // 코드 블록에 하이라이팅 적용
  document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
  });

  let isShow = false;
  let lock = false;
  const backToTopButton = document.querySelector('.back-to-top');

  // 스크롤 이벤트
  window.addEventListener('scroll', () => {
    if (lock) return;

    if (window.scrollY >= 400) {
      if (!isShow) {
        backToTopButton.classList.add('load');
        isShow = true;
      }
    } else if (isShow) {
      backToTopButton.classList.remove('load');
      isShow = false;
    }
  });

  // 모바일 터치 이벤트 처리
  let touchTimer;
  backToTopButton.addEventListener('touchstart', () => {
    clearTimeout(touchTimer);
  });

  backToTopButton.addEventListener('touchend', () => {
    // 터치 종료 후 약간의 지연 시간을 두고 상태 초기화
    touchTimer = setTimeout(() => {
      backToTopButton.classList.remove('touch-active');
    }, 300);
  });

  // 클릭 시 맨 위로 스크롤
  backToTopButton.addEventListener('click', () => {
    lock = true;
    backToTopButton.classList.add('ani-leave');

    // 부드러운 스크롤
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      backToTopButton.classList.remove('ani-leave');
      backToTopButton.classList.add('leaved');
    }, 390);

    setTimeout(() => {
      backToTopButton.classList.add('ending');
    }, 120);

    setTimeout(() => {
      backToTopButton.classList.remove('load');
    }, 1500);

    setTimeout(() => {
      lock = false;
      isShow = false;
      backToTopButton.classList.remove('leaved', 'ending', 'touch-active');
    }, 2000);
  });
});