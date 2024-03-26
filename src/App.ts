import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import Header from './components/Header';

export default class App {
  #movieListElement;

  constructor() {
    const header = new Header();
    this.#movieListElement = new MovieList();
  }

  async run() {
    const itemView = document.querySelector('.item-view');

    itemView?.appendChild(this.#movieListElement.element);
    this.#generateSearchBox();
    this.#addHomeButtonEvent();
  }

  #generateSearchBox() {
    const header = document.querySelector('header');
    const searchBox = new SearchBox({
      onSearch: (query: string) => {
        this.#movieListElement.renderSearchList(query);
      },
    });

    header?.appendChild(searchBox.element);
  }

  #addHomeButtonEvent() {
    const homeButton = document.getElementById('home-button');

    if (homeButton) {
      homeButton.addEventListener('click', () => {
        this.#movieListElement.renderPreviousPopularList();
      });
    }
  }
}
