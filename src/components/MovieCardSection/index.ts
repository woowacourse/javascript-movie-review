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
};

export default MovieCardSection;
