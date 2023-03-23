import { ERROR_MESSAGE } from '../../constants';
import { ID } from '../../constants/selector';
import type Movies from '../../domain/Movies';
import MovieCardList from './MovieCardList';

const LoadMoreButton = {
  template() {
    return `<button id=${ID.LOAD_MORE_BUTTON} class="btn primary full-width">더 보기</button>`;
  },
  handleVisibility(isHide: boolean) {
    const button = document.querySelector<HTMLButtonElement>(`#${ID.LOAD_MORE_BUTTON}`);

    if (isHide) {
      return button?.classList.add('hide');
    }

    return button?.classList.remove('hide');
  },
  scroll(movies: Movies, target: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            try {
              MovieCardList.renderMoreItems();
              const newMovies = movies.getQuery() ? await movies.addSearch() : await movies.addPopular();

              if (newMovies === ERROR_MESSAGE.DATA_LOAD) {
                throw new Error(newMovies);
              }

              MovieCardList.paint(newMovies, movies.getPage());
              LoadMoreButton.handleVisibility(movies.isLastPage());
            } catch (error) {
              if (error instanceof Error) {
                movies.previousPage();
                MovieCardList.removeSkeleton();
                alert(error.message);
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const button = target.querySelector(`#${ID.LOAD_MORE_BUTTON}`) as HTMLButtonElement;
    observer.observe(button);
  },
};

export default LoadMoreButton;
