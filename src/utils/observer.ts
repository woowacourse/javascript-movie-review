import stateRender from '../renderer/StateRender';
import { eventThrottle } from './throttle';

export function createInfiniteScrollObserver(target: Element) {
  const observer = new IntersectionObserver(closeObserverAndReConnectCallback, { threshold: 0.5 });

  observer.observe(target);
}

function closeObserverAndReConnectCallback(entries: Array<any>, io: any) {
  const renderThrottle = eventThrottle(stateRender.renderMoreMovieList.bind(stateRender), 1000);

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      renderThrottle();
    }
  });
}
