import './style.css';
import Movie from '../../domain/Movie';
import createMovieItems from '../MovieItems/MovieItems';
import createShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { PropsType } from '../../types/props';

const createMovieContents = {
  async execute(title: string) {
    const main = document.createElement('main');
    const repeatHtml = /* html */ `
    <li>
    <a href="#">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </a>
  </li>
    `;
    const skeleton = /* html */ `
    <ul class="item-list item-list--skeleton">
    ${repeatHtml.repeat(20)}
  </ul>
  `;
    const templates = /* html */ `
      <section class="item-view">
      <h2>${title}</h2>
      ${skeleton}
      </section>
      `;

    main.innerHTML = templates;

    return main;
  },

  async renderMovieData({ type, input }: PropsType) {
    const movie = new Movie();
    const { movieItems, isLastPage } = await this.setMovieData(movie, { type, input });
    document.querySelector('.item-view')?.appendChild(movieItems);

    if (!isLastPage) {
      const showMoreButton = createShowMoreButton();
      document.querySelector('.item-view')?.appendChild(showMoreButton);
      this.setEventListener(movie, { type, input });
    }
  },

  async setMovieData(movie: Movie, { type, input }: PropsType) {
    const { movieList, isLastPage } = await movie.handleMovieData(type, input);
    const movieItems = createMovieItems(movieList, isLastPage);

    return { movieItems, isLastPage };
  },

  setEventListener(movie: Movie, { type, input }: PropsType) {
    document.querySelector('.btn')?.addEventListener('click', () => {
      this.setMovieData(movie, { type, input });
    });
  },
};

export default createMovieContents;
