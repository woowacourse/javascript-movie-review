import './MovieCardSection.style.css';

import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import Movies from '../../domain/Movies';
import ErrorMessage from './ErrorMessage';
import { CLASS } from '../../constants/selector';
import type { CustomErrorMessage } from '../../constants/message';

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

  setEvent(movies: Movies) {
    LoadMoreButton.setEvent(movies);
  },

  render(query: string = '') {
    MovieCardSection.removeErrorMessage();
    MovieCardSection.renderTitle(query);
    MovieCardList.render();
  },

  renderTitle(query: string) {
    const itemView = document.querySelector<HTMLElement>(`.${CLASS.ITEM_VIEW}`);
    itemView?.firstElementChild?.remove();
    itemView?.insertAdjacentHTML('afterbegin', MovieSectionTitle.template(query));
  },

  renderErrorMessage(errorMessage: CustomErrorMessage) {
    const itemView = document.querySelector<HTMLElement>(`.${CLASS.ITEM_VIEW}`);

    if (itemView === null) return;

    MovieCardList.handleVisibility(true);
    LoadMoreButton.handleVisibility(true);
    ErrorMessage.render(itemView, errorMessage);
  },

  removeErrorMessage() {
    const itemView = document.querySelector<HTMLElement>(`.${CLASS.ITEM_VIEW}`);

    if (itemView === null) return;

    ErrorMessage.remove(itemView);
  },
};

export default MovieCardSection;
