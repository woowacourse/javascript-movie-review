import Movie from '../../domain/Movie';
import { MovieListType } from '../../types/movie';
import createMovieItems from '../MovieItems/MovieItems';
import createShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import './style.css';

const createMovieContents = {
  // eslint-disable-next-line max-lines-per-function
  async execute(type: string, input: string) {
    const main = document.createElement('main');
    const templates = /* html */ `
      <section class="item-view">
      <h2>지금 인기 있는 영화</h2>
      </section>
      `;

    main.innerHTML = templates;
    const movie = new Movie();
    const { movieItems, isLastPage } = await this.setMovieData(movie, type, input);
    const showMoreButton = createShowMoreButton();
    main.querySelector('.item-view')?.appendChild(movieItems);
    if (!isLastPage) {
      // main.querySelector('.btn')?.remove();
      main.querySelector('.item-view')?.appendChild(showMoreButton);
      this.setEventListener(showMoreButton, movie, type, input);
    } else {
      main.querySelector('.btn')?.classList.add('button-close');
    }
    return main;
  },

  async setMovieData(movie: Movie, type: string, input?: string) {
    const { movieList, isLastPage } = await movie.handleMovieData(type, input);
    const movieItems = createMovieItems(movieList);
    console.log('==', isLastPage);

    return { movieItems, isLastPage };
  },

  setEventListener(showMoreButton: HTMLButtonElement, movie: Movie, type: string, input?: string) {
    showMoreButton.addEventListener('click', () => {
      this.setMovieData(movie, type, input);
    });
    return showMoreButton;
  },
};

export default createMovieContents;
