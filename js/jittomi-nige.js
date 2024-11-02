document.addEventListener('DOMContentLoaded', () => {
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

  // 터치 이벤트 처리 개선
  let touchStartTime;
  
  backToTopButton.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    backToTopButton.classList.add('touch-active');
  });

  backToTopButton.addEventListener('touchend', (e) => {
    // 터치 종료 즉시 효과 제거
    backToTopButton.classList.remove('touch-active');
    backToTopButton.classList.add('touch-end');
    
    // 짧은 시간 후 touch-end 클래스도 제거
    requestAnimationFrame(() => {
      backToTopButton.classList.remove('touch-end');
    });

    // 터치 시간이 짧은 경우에만 클릭 이벤트 실행
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < 300) {
      handleClick();
    }
  });

  // 클릭 핸들러를 별도 함수로 분리
  const handleClick = () => {
    if (lock) return;
    
    lock = true;
    backToTopButton.classList.add('ani-leave');

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
      backToTopButton.classList.remove('leaved', 'ending', 'touch-active', 'touch-end');
    }, 2000);
  };

  // PC 환경에서는 클릭 이벤트 사용
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    backToTopButton.addEventListener('click', handleClick);
  }
});