import httpRequest from '../../api/httpRequest';
import { MovieListType, MovieType } from '../../types/movie';
import createMovieItems from '../MovieItems/MovieItems';
import createShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import './style.css';

const createMovieContents = {
  // eslint-disable-next-line max-lines-per-function
  async execute() {
    const main = document.createElement('main');
    const templates =
      /* html */
      `
      <section class="item-view">
      <h2>지금 인기 있는 영화</h2>
      </section>
      `;

    main.innerHTML = templates;
    await this.setMovieData(main);
    return main;
  },

  async getMovieData() {
    const movieList: MovieListType = await httpRequest
      .fetchPopularMovies(1)
      .then((popularMovieList) =>
        popularMovieList.map((movie: MovieType) => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title,
          vote_average: movie.vote_average,
        })),
      )
      .catch((error) => console.error(error));
    return movieList;
  },

  handleCreateMovieItems(movieList: MovieListType) {
    const movieItems = createMovieItems(movieList);
    return movieItems;
  },

  async setMovieData(main: HTMLElement) {
    const movieList = await this.getMovieData();
    const movieItems = this.handleCreateMovieItems(movieList);
    const showMoreButton = this.setEventListener(movieList);

    main.querySelector('.item-view')?.appendChild(movieItems);
    main.querySelector('.item-view')?.appendChild(showMoreButton);
  },

  setEventListener(movieList: MovieListType) {
    const showMoreButton = createShowMoreButton();
    showMoreButton.addEventListener('click', () => {
      this.handleCreateMovieItems(movieList);
    });
    return showMoreButton;
  },
};

export default createMovieContents;
