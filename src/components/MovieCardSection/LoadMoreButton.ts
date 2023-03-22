import MovieCardSection from '.';
import type { GetMovies } from '../../App';
import { ID } from '../../constants/selector';
import type Movies from '../../domain/Movies';
import { $ } from '../../utils/dom';
import MovieCardList from './MovieCardList';

const LoadMoreButton = {
  template() {
    return `<button id=${ID.LOAD_MORE_BUTTON} class="btn primary full-width">더 보기</button>`;
  },

  setEvent(movies: Movies, getMovies: GetMovies) {
    const button = $<HTMLButtonElement>(`#${ID.LOAD_MORE_BUTTON}`);

    button.addEventListener('click', async () => {
      MovieCardSection.render(movies, getMovies);
    });
  },

  handleVisibility(state: boolean) {
    const button = $<HTMLButtonElement>(`#${ID.LOAD_MORE_BUTTON}`);

    if (state) {
      return button.classList.add('hide');
    }

    return button.classList.remove('hide');
  },
};

export default LoadMoreButton;
