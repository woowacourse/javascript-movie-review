import './style.css';
import Movie from '../../domain/Movie';
import { PropsType } from '../../types/props';
import Skeleton from '../Skeleton/Skeleton';
import DOM from '../../utils/DOM';
import MovieListManager from '../MovieList/MovieList';

const { $ } = DOM;

const MovieContentManager = {
  renderMain(title: string) {
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
    const { movieList, isLastPage } = await this.setMovieData(movie, { type, input });

    MovieListManager.renderMovieList(movieList, isLastPage);

    if (!isLastPage) {
      this.setEventListener(movie, { type, input });
    }
  },

  async setMovieData(movie: Movie, { type, input }: PropsType) {
    $('.item-container')?.appendChild(Skeleton.render(20));

    const { movieList, isLastPage } = await movie.handleMovieData(type, input);
    return { movieList, isLastPage };
  },

  setEventListener(movie: Movie, { type, input }: PropsType) {
    $('.btn')?.addEventListener('click', async () => {
      const { movieList, isLastPage } = await this.setMovieData(movie, { type, input });

      MovieListManager.renderMovieList(movieList, isLastPage);
    });
  },
};

export default MovieContentManager;
