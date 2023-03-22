import './MovieCardSection.style.css';

import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import ErrorMessage from './ErrorMessage';
import { CLASS } from '../../constants/selector';
import type { CustomErrorMessage } from '../../constants/message';
import { $ } from '../../utils/dom';

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

  render(query: string = '') {
    MovieCardSection.removeErrorMessage();
    MovieCardSection.renderTitle(query);
    MovieCardList.render();
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
