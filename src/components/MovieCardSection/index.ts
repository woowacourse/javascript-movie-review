import './MovieCardSection.style.css';

import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import ErrorMessage from './ErrorMessage';
import { CLASS } from '../../constants/selector';
import { CustomErrorMessage, SEARCH_ERROR_MESSAGE } from '../../constants/message';
import { $ } from '../../utils/dom';
import Movies from '../../domain/Movies';
import { GetMovies } from '../../App';

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

  async render(movies: Movies, getMovies: GetMovies, query: string = '') {
    MovieCardSection.renderInit(query, movies);

    const newMovies = await getMovies(query);

    if (!newMovies) {
      movies.previousPage();
      MovieCardList.removeSkeleton();
      return;
    }

    if (newMovies.list.length === 0) {
      return MovieCardSection.renderErrorMessage(SEARCH_ERROR_MESSAGE.NO_RESULT);
    }

    MovieCardList.paint(newMovies.list, movies.getPage());
    LoadMoreButton.handleVisibility(movies.isLastPage(newMovies.totalPages));
  },

  renderInit(query: string, movies: Movies) {
    MovieCardSection.removeErrorMessage();
    MovieCardSection.renderTitle(query);
    MovieCardList.renderSkeletonItems(movies.isCurrentQuery(query));
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
};

export default MovieCardSection;
