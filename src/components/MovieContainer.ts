import { MovieInfo } from '../api/api-type';
import { getPopularMovieList } from '../api/popularMovieList';
import MovieItem from './MovieItem';

class MovieContainer {
  #page;

  constructor() {
    this.#page = 1;
  }

  async getMovies(page: number) {
    const movieData = await getPopularMovieList(page);
    return movieData;
  }

  createMovieItems(data: MovieInfo[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  async getTemplate() {
    const section = document.createElement('section');

    const h2 = document.createElement('h2');
    const movieList = document.createElement('ul');
    const button = document.createElement('button');

    section.classList.add('item-view');
    movieList.classList.add('item-list');
    button.classList.add('btn', 'primary', 'full-width');

    button.textContent = '더 보기';
    h2.textContent = '지금 인기 있는 영화';

    section.appendChild(h2);
    section.appendChild(movieList);
    section.appendChild(button);

    const movieData = await this.getMovies(this.#page);

    this.createMovieItems(movieData).forEach((movieItem) => {
      movieList.appendChild(movieItem);
    });
    return section;
  }
}

export default MovieContainer;
