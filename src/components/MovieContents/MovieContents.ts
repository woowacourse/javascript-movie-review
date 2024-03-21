import './style.css';
import Movie from '../../domain/Movie';
import createMovieItems from '../MovieItems/MovieItems';
import createShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { PropsType } from '../../types/props';

const createMovieContents = {
  async execute(title:string) {
    const main = document.createElement('main');
    const templates = /* html */ `
      <section class="item-view">
      <h2>${title}</h2>
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
