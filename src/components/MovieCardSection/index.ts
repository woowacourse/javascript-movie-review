import './MovieCardSection.style.css';

import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import Movies from '../../domain/Movies';

const MovieCardSection = {
  template() {
    return `
      <section class="item-view">
        ${MovieSectionTitle.template()}
        ${MovieCardList.template()}
        ${LoadMoreButton.template()}
      </section>
    `;
  },
  setEvent(movies: Movies) {
    LoadMoreButton.setEvent(movies);
  },
  renderTitle(query: string) {
    const itemView = document.querySelector<HTMLElement>('.item-view');
    itemView?.firstElementChild?.remove();
    itemView?.insertAdjacentHTML('afterbegin', MovieSectionTitle.template(query));
  },
  render(movies: Movies) {},
};

export default MovieCardSection;
