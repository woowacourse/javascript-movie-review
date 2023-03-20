import './MovieCardSection.style.css';

import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import Movies from '../../domain/Movies';
import NoSearchedMessage from './NoSearchedMessage';
import { CLASS } from '../../constants/selector';

const MovieCardSection = {
  template() {
    return `
      <section class=${CLASS.ITEM_VIEW}>
        ${MovieSectionTitle.template()}
        ${MovieCardList.template()}
        ${LoadMoreButton.template()}
        ${NoSearchedMessage.template()}
      </section>
    `;
  },
  setEvent(movies: Movies, target: HTMLElement) {
    const itemView = target.querySelector(`.${CLASS.ITEM_VIEW}`) as HTMLElement;
    LoadMoreButton.setEvent(movies, itemView);
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
    NoSearchedMessage.handleVisibility(!state);
  },
};

export default MovieCardSection;
