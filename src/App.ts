import { Movie } from './index.d';
import MoreButton from './components/MoreButton';
import MovieCard from './components/MovieCard';
import movieStore from './store/MovieStore';
import SearchBox from './components/SearchBox';
import searchMovieStore from './store/SearchMovieStore';

const SKELETON_UI_FIXED = 8; // 스켈레톤 UI 갯수

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

    if (ulElement) {
      this.#generateSkeletonUI(ulElement as HTMLElement);
      const newData = await movieStore.getMovies();

      this.#removeSkeletonUI();
      this.#appendMovieCard(newData, ulElement as HTMLElement);
    }
  }

  #appendMovieCard(newData: Movie[], ulElement: HTMLElement) {
    newData.forEach((data: Movie) => {
      const card = new MovieCard(data);

      ulElement?.appendChild(card.element);
    });
  }

  #generateSkeletonUI(ulElement: HTMLElement) {
    for (let i = 0; i < SKELETON_UI_FIXED; i++) {
      const card = new MovieCard();

      ulElement?.appendChild(card.element);
    }
  }

  #removeSkeletonUI() {
    const skeletonElements = document.querySelectorAll('.skeleton');

    skeletonElements.forEach((skeletonElement) => {
      skeletonElement.parentNode?.removeChild(skeletonElement);
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
