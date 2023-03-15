import './MovieCardSection.style.css';

import type { Movie } from '../../types/movie';
import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';
import Movies from '../../domain/Movies';

const MovieCardSection = {
  template(list: Movie[]) {
    return `
      <section class="item-view">
        ${MovieSectionTitle.template()}
        ${MovieCardList.template(list)}
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
