import MovieStore from '../../stores/movieStore';
import './LoadMoreButton.css';

const createLoadMoreBtn = () => {
  const $btn = document.createElement('button');
  $btn.classList.add('btn');
  $btn.classList.add('primary');
  $btn.classList.add('full-width');
  $btn.textContent = '더 보기';

  return $btn;
};

const LoadMoreButton = () => {
  const $btn = createLoadMoreBtn();

  const setVisibility = (isLastPage: boolean) => {
    if (isLastPage) {
      return $btn.classList.add('hide');
    }
    $btn.classList.remove('hide');
  };

  $btn.addEventListener('click', () => {
    const { type } = MovieStore;

    if (type === 'search') {
      $btn.dispatchEvent(
        new CustomEvent('searchMovies', {
          bubbles: true,
        }),
      );
    }
    if (type === 'popular') {
      $btn.dispatchEvent(
        new CustomEvent('popularMovies', {
          bubbles: true,
        }),
      );
    }
  });

  return {
    render: () => $btn,
    setVisibility,
  };
};

export default LoadMoreButton;
