import MovieCardSection from '../MovieCardSection';
import MobileSearchBox from './MobileSearchButton';

import { searchButtonImage } from '../../assets/images';
import { SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { ID } from '../../constants/selector';
import movieStates from '../../states/movies';
import { $ } from '../../utils/dom';

const MovieSearch = {
  template() {
    return `
      <div class="search-box">
        <form id=${ID.MOVIE_SEARCH_FORM}>
          <input type="search" name="q" placeholder="검색" />
          <button class="search-button">
            <img src=${searchButtonImage} alt="영화 검색" />
          </button>
        </form>
      </div>
      ${MobileSearchBox.template()}
    `;
  },

  setEvent() {
    const movieSearchForm = $<HTMLFormElement>(`#${ID.MOVIE_SEARCH_FORM}`);

    movieSearchForm.addEventListener('submit', MovieSearch.onSubmit);
  },

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) return;

    const searchInput: HTMLInputElement = event.target.q;
    const query = searchInput.value;

    if (query.trim().length === 0) {
      MovieSearch.handleError(searchInput, SEARCH_ERROR_MESSAGE.EMPTY.error);
      return;
    }

    if (movieStates.isCurrentQuery(query)) {
      MovieSearch.handleError(searchInput, SEARCH_ERROR_MESSAGE.EMPTY.error);
      return;
    }

    MovieCardSection.render(query);
  },

  handleError(target: HTMLInputElement, message: string) {
    alert(message);
    target.focus();
  },
};

export default MovieSearch;
