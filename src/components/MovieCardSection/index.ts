import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import ScrollObserver from './ScrollObserver';

import { convertToAppMovies } from '../../domain/util';

import { getPopularMovies, getSearchedMovies } from '../../api';
import { CustomErrorMessage, DEFAULT_ERROR_MESSAGE, isCustomErrorMessage, SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { CLASS } from '../../constants/selector';
import movieStates from '../../states/movies';
import { $ } from '../../utils/dom';

import './MovieCardSection.style.css';
import ErrorMessage from '../common/ErrorMessage';

const MovieCardSection = {
  observer: ScrollObserver.createObserver(),

  template() {
    return `
      <section class=${CLASS.ITEM_VIEW}>
        ${MovieSectionTitle.template()}
        ${MovieCardList.template()}
        ${ScrollObserver.template()}
      </section>
    `;
  },

  setEvent() {
    MovieCardList.setEvent();
  },

  async render(query: string = '') {
    MovieCardSection.renderInit(query);

    const newMovies = await MovieCardSection.getMovies(query);

    if (!newMovies) {
      movieStates.previousPage();
      MovieCardList.removeSkeleton();
      return;
    }

    if (newMovies.length === 0) {
      return MovieCardSection.renderErrorMessage(SEARCH_ERROR_MESSAGE.NO_RESULT);
    }

    MovieCardList.paint(newMovies, movieStates.getPage());
    ScrollObserver.connect(MovieCardSection.observer);
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

      movieStates.addPage();

      const { results, total_pages: totalPages } =
        query === ''
          ? await getPopularMovies(movieStates.getPage())
          : await getSearchedMovies(movieStates.getQuery(), movieStates.getPage());
      const movies = convertToAppMovies(results);

      movieStates.add(movies);
      movieStates.setTotalPages(totalPages);

      return movies;
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
