import type Movies from '../../domain/Movies';
import MovieCardList from './MovieCardList';

const LoadMoreButton = {
  template() {
    return `<button id="load-more-button" class="btn primary full-width">더 보기</button>`;
  },
  setEvent(movies: Movies) {
    const button = document.querySelector<HTMLButtonElement>('#load-more-button');

    button?.addEventListener('click', async () => {
      MovieCardList.renderMoreItems();

      try {
        const newMovies = movies.getQuery() ? await movies.addSearch() : await movies.addPopular();

        if (!newMovies) return;
        if (typeof newMovies === 'string') {
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
    });
  },
  handleVisibility(state: boolean) {
    const button = document.querySelector<HTMLButtonElement>('#load-more-button');

    if (state) {
      return button?.classList.add('hide');
    }

    return button?.classList.remove('hide');
  },
};

export default LoadMoreButton;
