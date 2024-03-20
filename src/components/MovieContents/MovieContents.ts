import Movie from '../../domain/Movie';
import createMovieItems from '../MovieItems/MovieItems';
import createShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import './style.css';

const createMovieContents = {
  // eslint-disable-next-line max-lines-per-function
  async execute() {
    const main = document.createElement('main');
    const templates = /* html */ `
      <section class="item-view">
      <h2>지금 인기 있는 영화</h2>
      </section>
      `;

    main.innerHTML = templates;
    const movie = new Movie();
    const movieItems = await this.setMovieData(movie);
    const showMoreButton = createShowMoreButton();

    this.setEventListener(showMoreButton, movie);
    main.querySelector('.item-view')?.appendChild(movieItems);
    main.querySelector('.item-view')?.appendChild(showMoreButton);
    return main;
  },

  async setMovieData(movie: Movie) {
    const movieList = await movie.getMovieData();
    const movieItems = createMovieItems(movieList);
    return movieItems;
  },

  setEventListener(showMoreButton: HTMLButtonElement, movie: Movie) {
    showMoreButton.addEventListener('click', () => {
      this.setMovieData(movie);
    });
    return showMoreButton;
  },
};

export default createMovieContents;
