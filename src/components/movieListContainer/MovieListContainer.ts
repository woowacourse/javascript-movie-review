import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';
import MovieItem from '../movieItem/MovieItem';

class MovieListContainer {
  $target: HTMLUListElement;
  page = 0;

  constructor() {
    this.$target = document.createElement('ul');
    this.$target.classList.add('item-list');
    this.$target.innerHTML += this.template();
    (async () => {
      this.page += 1;
      const { movies } = await this.fetchMovies();
      await this.paint(movies);
    })();
  }

  template() {
    return `<li>
              <a href="#">
                <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
                </div>
              </a>
            </li>`.repeat(20);
  }

  async paint(movies: IMovie[]) {
    this.$target.replaceChildren();
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }

  async attach() {
    this.page += 1;
    this.$target.innerHTML += this.template();
    const { movies, totalPages } = await this.fetchMovies();
    Array.from({ length: 20 }).forEach(() => {
      this.$target.removeChild(this.$target.lastChild!);
    });
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
    if (this.page === totalPages && this.$target.parentElement) {
      const parent = dom.getElement(this.$target.parentElement, '#more-button');
      parent.classList.add('hidden');
    }
  }

  async fetchMovies() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode') ?? 'popular';
    const title = urlSearchParams.get('title') ?? '';

    const movies = mode === 'search' ? await searchMoviesByTitle(title, this.page) : await getPopularMovies(this.page);
    return movies;
  }
}

export default MovieListContainer;
