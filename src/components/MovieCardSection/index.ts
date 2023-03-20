import './MovieCardSection.style.css';

import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import Movies from '../../domain/Movies';
import Message from './Message';
import { CLASS } from '../../constants/selector';

const MovieCardSection = {
  template() {
    return `
      <section class=${CLASS.ITEM_VIEW}>
        ${MovieSectionTitle.template()}
        ${MovieCardList.template()}
        ${LoadMoreButton.template()}
        ${Message.template()}
      </section>
    `;
  },

  setEvent(movies: Movies) {
    LoadMoreButton.setEvent(movies);
  },

  render(query: string = '') {
    MovieCardSection.renderEmpty(false);
    MovieCardSection.renderTitle(query);
    MovieCardList.render();
  },

  renderTitle(query: string) {
    const itemView = document.querySelector<HTMLElement>(`.${CLASS.ITEM_VIEW}`);
    itemView?.firstElementChild?.remove();
    itemView?.insertAdjacentHTML('afterbegin', MovieSectionTitle.template(query));
  },

  renderEmpty(state: boolean) {
    MovieCardList.handleVisibility(state);
    LoadMoreButton.handleVisibility(state);
    Message.handleVisibility(!state);
  },
};

export default MovieCardSection;
