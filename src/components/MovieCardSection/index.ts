import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import ErrorMessage from './ErrorMessage';

import { convertToAppMovies } from '../../domain/util';

import { getPopularMovies, getSearchedMovies } from '../../api';
import { MAX_PAGE } from '../../constants';
import { CustomErrorMessage, DEFAULT_ERROR_MESSAGE, isCustomErrorMessage, SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { CLASS } from '../../constants/selector';
import movieStates from '../../states/movies';
import { $ } from '../../utils/dom';

import './MovieCardSection.style.css';

const MovieCardSection = {
  template() {
    return `
      <section class=${CLASS.ITEM_VIEW}>
        ${MovieSectionTitle.template()}
        ${MovieCardList.template()}
        ${LoadMoreButton.template()}
      </section>
    `;
  },

  setEvent() {
    MovieCardList.setEvent();
    LoadMoreButton.setEvent();
  },

  async render(query: string = '') {
    MovieCardSection.renderInit(query);

    const newMovies = await MovieCardSection.getMovies(query);

    if (!newMovies) {
      movieStates.previousPage();
      MovieCardList.removeSkeleton();
      return;
    }

    if (newMovies.list.length === 0) {
      return MovieCardSection.renderErrorMessage(SEARCH_ERROR_MESSAGE.NO_RESULT);
    }

    MovieCardList.paint(newMovies.list, movieStates.getPage());
    LoadMoreButton.handleVisibility(movieStates.isLastPage(newMovies.totalPages));
  },

  renderInit(query: string) {
    MovieCardSection.removeErrorMessage();
    MovieCardSection.renderTitle(query);
    MovieCardList.renderSkeletonItems(movieStates.isCurrentQuery(query));
  },

  renderTitle(query: string) {
    const itemView = $<HTMLElement>(`.${CLASS.ITEM_VIEW}`);

    itemView.firstElementChild?.remove();
    itemView.insertAdjacentHTML('afterbegin', MovieSectionTitle.template(query));
  },

  renderErrorMessage(errorMessage: CustomErrorMessage) {
    const itemView = $<HTMLElement>(`.${CLASS.ITEM_VIEW}`);

    MovieCardList.handleVisibility(true);
    LoadMoreButton.handleVisibility(true);
    ErrorMessage.render(itemView, errorMessage);
  },

  removeErrorMessage() {
    const itemView = $<HTMLElement>(`.${CLASS.ITEM_VIEW}`);

    ErrorMessage.remove(itemView);
  },

  async getMovies(query: string) {
    try {
      if (!movieStates.isCurrentQuery(query)) {
        movieStates.reset(query);
      }

      movieStates.getQuery();
      movieStates.addPage();

      const { results, total_pages: totalPages } =
        query === '' ? await getPopularMovies(movieStates.getPage()) : await getSearchedMovies(query, movieStates.getPage());
      const movies = convertToAppMovies(results);

      movieStates.add(movies);

      return { list: movies, totalPages: Math.min(MAX_PAGE, totalPages) };
    } catch (error) {
      if (isCustomErrorMessage(error)) {
        MovieCardSection.renderErrorMessage(error);
        return;
      }

      if (error instanceof Error) {
        MovieCardSection.renderErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    }
  },
};

export default MovieCardSection;
