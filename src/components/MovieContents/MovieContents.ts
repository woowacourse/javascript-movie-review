import './style.css';
import Movie from '../../domain/Movie';
import { PropsType } from '../../types/props';
import skeletonManager from '../Skeleton/Skeleton';
import DOM from '../../utils/DOM';
import movieListManager from '../MovieList/MovieList';

const { $ } = DOM;

const movieContentManager = {
  renderMain(title: string) {
    const main = document.createElement('main');

    const templates = /* html */ `
      <section class="item-view">
        <h2>${title}</h2>
        <div class="item-container"></div>
        <div class="scroll-end"></div>
      </section>
      `;

    main.innerHTML = templates;

    return main;
  },

  async renderMovieData({ type, input }: PropsType) {
    const movie = new Movie();
    const { movieList, isLastPage } = await this.setMovieData(movie, { type, input });

    movieListManager.renderMovieList(movieList, isLastPage);

    if (!isLastPage) {
      this.setIntersectionObserver(movie, { type, input });
    }
  },

  async setMovieData(movie: Movie, { type, input }: PropsType) {
    $('.item-container')?.appendChild(skeletonManager.render(20));

    const { movieList, isLastPage } = await movie.handleMovieData(type, input);

    return { movieList, isLastPage };
  },

  setIntersectionObserver(movie: Movie, { type, input }: PropsType) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const { movieList, isLastPage } = await this.setMovieData(movie, { type, input });
          movieListManager.renderMovieList(movieList, isLastPage);

          if (isLastPage) {
            observer.disconnect();
          }
        }
      });
    });

    const target = $('.scroll-end');
    observer.observe(target!);
  },
};

export default movieContentManager;
