import { Movie } from './index.d';
import MoreButton from './components/MoreButton';
import MovieCard from './components/MovieCard';
import movieStore from './store/MovieStore';

export default class App {
  #movieStore;

  constructor() {
    this.#movieStore = movieStore;
  }

  async run() {
    this.#generateMovieList();
    this.#generateMoreButton();
  }

  async #generateMovieList() {
    const ulElement = document.querySelector('ul.item-list');

    await movieStore.getMovies();
    this.#movieStore.movies.forEach((data: Movie) => {
      const card = new MovieCard(data);

      ulElement?.appendChild(card.element);
    });
  }

  #generateMoreButton() {
    const itemView = document.querySelector('section.item-view');

    const moreBtn = new MoreButton();

    itemView?.appendChild(moreBtn.element);
  }
}
