function startInfiniteScroll(callback: any, observer$: HTMLElement) {
  console.log(observer$);
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    // TODO: isLoading 빼고도 정상 동작하는지 확인
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  }, options);

  observer.observe(observer$);
}

export default startInfiniteScroll;
