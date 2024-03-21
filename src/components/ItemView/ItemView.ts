import { fetchPopularMovies, fetchSearchMovies } from '../../domain/DTO/Request/sendRequest';
import { BUTTON } from '../../constants/INFORMATION';
import Button from '../Button/Button';
import MovieItems from '../MovieItems/MovieItems';

class ItemView {
  #page: number;

  constructor(itemViewTitle: string = '지금 인기 있는 영화') {
    this.#page = 0;
    this.create(itemViewTitle);
  }

  async create(itemViewTitle: string) {
    const itemView = document.querySelector('.item-view');

    if (itemView) {
      const button = Button.create(BUTTON.showMore);

      itemView.appendChild(this.createTitle(itemViewTitle));
      itemView.appendChild(button);

      this.mountItems(button);
      button.addEventListener('click', () => this.mountItems(button));
    }
    return itemView;
  }

  createTitle(containerTitle: string) {
    const title = document.createElement('h2');

    title.textContent = `${containerTitle}`;

    return title;
  }

  async mountItems(button: HTMLElement, search?: string) {
    const skeleton = MovieItems.createSkeleton();
    const movieListData = await this.getMovieListData(search);

    button.insertAdjacentElement('beforebegin', skeleton);

    MovieItems.replaceSkeletons(skeleton, movieListData);
  }

  async getMovieListData(search?: string) {
    if (search) {
      return await fetchSearchMovies(++this.#page, search);
    } else {
      return await fetchPopularMovies(++this.#page);
    }
  }
}

export default ItemView;
