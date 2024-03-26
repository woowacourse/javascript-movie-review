import './style.css';
import Movie from '../../domain/Movie';
import movieItems from '../MovieItems/MovieItems';
import { PropsType } from '../../types/props';
import Skeleton from '../Skeleton/Skeleton';
import DOM from '../../utils/DOM';

const { $ } = DOM;

const createMovieContents = {
  execute(title: string) {
    const main = document.createElement('main');

    const templates = /* html */ `
      <section class="item-view">
        <h2>${title}</h2>
        <div class="item-container"></div>
        <button class="btn primary full-width">더 보기</button>
      </section>
      `;

    main.innerHTML = templates;

    return main;
  },

  async renderMovieData({ type, input }: PropsType) {
    const movie = new Movie();
    const isLastPage = await this.setMovieData(movie, { type, input });

    if (!isLastPage) {
      this.setEventListener(movie, { type, input });
    }
  },

  async setMovieData(movie: Movie, { type, input }: PropsType) {
    $('.item-container')?.appendChild(Skeleton.render(20));

    const { movieList, isLastPage } = await movie.handleMovieData(type, input);
    movieItems.createMovieItems(movieList, isLastPage);
    return isLastPage;
  },

  setEventListener(movie: Movie, { type, input }: PropsType) {
    $('.btn')?.addEventListener('click', () => {
      this.setMovieData(movie, { type, input });
    });
  },
};

export default createMovieContents;
