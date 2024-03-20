import { Movie } from './index.d';
import MoreButton from './components/MoreButton';
import MovieCard from './components/MovieCard';
import movieStore from './store/MovieStore';
import SearchBox from './components/SearchBox';
import searchMovieStore from './store/SearchMovieStore';

export default class App {
  #movieStore;

  #searchMovieStore;

  constructor() {
    this.#movieStore = movieStore;
    this.#searchMovieStore = searchMovieStore;
  }

  async run() {
    this.#generateMovieList();
    this.#generateMoreButton();
    this.#generateSearchBox();
  }

  async #generateMovieList() {
    const ulElement = document.querySelector('ul.item-list');

    const newData = await movieStore.getMovies();
    newData.forEach((data: Movie) => {
      const card = new MovieCard(data);

      ulElement?.appendChild(card.element);
    });
  }

  #generateMoreButton() {
    const itemView = document.querySelector('section.item-view');
    const moreBtn = new MoreButton({
      onClick: () => {
        this.#generateMovieList();
      },
    });

    itemView?.appendChild(moreBtn.element);
  }

  #generateSearchBox() {
    const header = document.querySelector('header');
    const searchBox = new SearchBox();

    header?.appendChild(searchBox.element);
  }
}
