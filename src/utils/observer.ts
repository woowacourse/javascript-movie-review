import EventBroker from '../EventBroker';

export function createInfiniteScrollObserver(target: Element) {
  const observer = new IntersectionObserver(closeObserverAndReConnectCallback, { threshold: 0.5 });

  observer.observe(target);
}

function closeObserverAndReConnectCallback(entries: Array<any>, io: any) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      EventBroker.dispatchEvent(new CustomEvent('appendMovieListEvent'));
    }
  });
}