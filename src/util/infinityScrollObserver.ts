const infinityScrollObserver = (target: Element, callback: () => Promise<void>) => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // 스크롤이 빠르게 내려갈 경우 → 감지 → 데이터 로딩 → 아직도 보이는 중 → 또 감지 (방지하고자, 감지 해제후, 비동기처리가 끝나면 다시 감지)
        observer.unobserve(target);
        callback().then(() => {
          observer.observe(target);
        });
      }
    },
    {
      root: null,
      threshold: 0.1,
    },
  );
  observer.observe(target);
};

export default infinityScrollObserver;
