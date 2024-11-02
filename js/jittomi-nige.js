document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
  });

  let isShow = false;
  let lock = false;
  const backToTopButton = document.querySelector('.back-to-top');

  // 컨텍스트 메뉴 방지
  backToTopButton.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // 스크롤 이벤트
  window.addEventListener('scroll', () => {
    if (lock) return;
    if (window.scrollY >= 300) {
      if (!isShow) {
        backToTopButton.classList.add('load');
        isShow = true;
      }
    } else if (isShow) {
      backToTopButton.classList.remove('load');
      isShow = false;
    }
  });

  // 터치 이벤트 처리
  let touchStartTime;
  let touchEffectTimeout;
  
  backToTopButton.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    backToTopButton.classList.add('touch-active');
    if (touchEffectTimeout) {
      clearTimeout(touchEffectTimeout);
    }
  });

  backToTopButton.addEventListener('touchend', (e) => {
    const touchDuration = Date.now() - touchStartTime;
    
    touchEffectTimeout = setTimeout(() => {
      backToTopButton.classList.remove('touch-active');
      backToTopButton.classList.add('touch-return');
      
      setTimeout(() => {
        backToTopButton.classList.remove('touch-return');
      }, 300);
    }, 800);

    if (touchDuration < 300) {
      handleClick();
    }
  });

  // 클릭 핸들러
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
      backToTopButton.classList.remove('leaved', 'ending', 'touch-active', 'touch-return');
      if (touchEffectTimeout) {
        clearTimeout(touchEffectTimeout);
      }
    }, 2000);
  };

  // PC 환경에서는 클릭 이벤트 사용
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    backToTopButton.addEventListener('click', handleClick);
  }
});