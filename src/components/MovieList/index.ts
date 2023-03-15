import template from './index.html';
import { fetchPopularMovies } from '../../fetch';
import { Movie } from '../../types';

export class MovieList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
    this.getPopularMovieList(1);
  }

  async getPopularMovieList(page: number) {
    const movieList = await fetchPopularMovies(page);
    const $movieList = document.querySelector('.item-list');

    movieList.results.map((movie: Movie) => {
      const { title, poster_path, vote_average } = movie;
      $movieList?.insertAdjacentHTML(
        'beforeend',
        `<movie-item title=${`"${title}"`} poster=${poster_path} vote=${vote_average}></movie-item>`,
      );
    });
  }
}
