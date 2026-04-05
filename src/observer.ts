export function observeHeaderScroll() {
  // 배너영역을 기준으로 헤더의 background 색상이 변경된다.
  const topRatedMovie = document.querySelector(".top-rated-movie");
  const header = document.querySelector(".background-container");
  if (topRatedMovie && header) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("scrolled", !entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(topRatedMovie);
  }
}
