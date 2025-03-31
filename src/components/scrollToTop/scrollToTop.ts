import { scrollToTop } from "../../service/scrollService.ts";

export default function initScrollToTopButton(): void {
  const scrollToTopBtn = document.getElementById("scroll-to-top-btn");

  if (!scrollToTopBtn) return;

  // 스크롤 position 추적 변수
  let lastScrollY = window.scrollY;
  let ticking = false;

  // 스크롤 이벤트를 최적화하여 처리
  const handleScroll = () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateButtonVisibility(lastScrollY);
        ticking = false;
      });

      ticking = true;
    }
  };

  // 버튼 표시/숨김 처리 함수
  const updateButtonVisibility = (scrollY: number) => {
    // 스크롤이 300px 이상일 때만 버튼 표시
    if (scrollY > 300) {
      if (!scrollToTopBtn.classList.contains("show")) {
        scrollToTopBtn.classList.remove("hide");
        // 강제 리플로우 발생 후 show 클래스 추가하여 애니메이션 효과 개선
        void scrollToTopBtn.offsetWidth;
        scrollToTopBtn.classList.add("show");
      }
    } else {
      if (scrollToTopBtn.classList.contains("show")) {
        scrollToTopBtn.classList.remove("show");
        // hide 클래스는 transition이 완료된 후 추가
        setTimeout(() => {
          scrollToTopBtn.classList.add("hide");
        }, 400); // CSS transition 시간과 일치시킴
      }
    }
  };

  // 이벤트 리스너 등록
  window.addEventListener("scroll", handleScroll, { passive: true });

  // 초기 상태 설정
  updateButtonVisibility(window.scrollY);

  // 버튼 클릭 이벤트 추가
  scrollToTopBtn.addEventListener("click", () => {
    scrollToTop();
  });
}
