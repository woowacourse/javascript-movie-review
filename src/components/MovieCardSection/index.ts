import './MovieCardSection.style.css';

import type { Movie } from '../../types/movie';
import LoadMoreButton from './LoadMoreButton';
import MovieCardList from './MovieCardList';
import MovieSectionTitle from './MovieSectionTitle';

const MovieCardSection = {
  template(list: Movie[], title: string) {
    return `
      <section class="item-view">
        ${MovieSectionTitle.template(title)}
        ${MovieCardList.template(list)}
        ${LoadMoreButton.template()}
      </section>
    `;
  },
};

export default MovieCardSection;
