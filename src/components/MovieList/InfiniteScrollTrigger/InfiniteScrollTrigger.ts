import './InfiniteScrollTrigger.css';
import SELECTORS from '../../../constants/selectors';
import MovieStore from '../../../stores/movieStore';

const createScrollTrigger = () => {
  const $infiniteScrollTrigger = document.createElement('div');
  $infiniteScrollTrigger?.classList.add(SELECTORS.infiniteScrollTrigger);

  return $infiniteScrollTrigger;
};

const observerCallback = () => {
  const { type } = MovieStore;

  if (type === 'search')
    document.dispatchEvent(
      new CustomEvent('searchMovies', {
        bubbles: true,
      }),
    );
  if (type === 'popular')
    document.dispatchEvent(
      new CustomEvent('popularMovies', {
        bubbles: true,
      }),
    );
};

const observer = new IntersectionObserver(
  (entries) => {
    const $trigger = document.querySelector(
      `.${SELECTORS.infiniteScrollTrigger}`,
    );

    entries.forEach((entry) => {
      if (entry.isIntersecting && $trigger) {
        observerCallback();
      }
    });
  },
  {
    threshold: 0.5,
  },
);

export const restartObserving = ($trigger: Element) => {
  if ($trigger) {
    observer.observe($trigger);
    $trigger.classList.remove('hide');
  }
};

export const stopObserving = ($trigger: Element) => {
  if ($trigger) {
    observer.unobserve($trigger);
    $trigger.classList.add('hide');
  }
};

const InfiniteScrollTrigger = () => {
  const $infiniteScrollTrigger = createScrollTrigger();

  observer.observe($infiniteScrollTrigger);

  return {
    render: () => $infiniteScrollTrigger,
  };
};

export default InfiniteScrollTrigger;
