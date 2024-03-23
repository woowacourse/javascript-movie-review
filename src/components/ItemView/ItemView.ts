import { fetchPopularMovies, fetchSearchMovies } from '../../domain/DTO/Request/sendRequest';
import { BUTTON, CONTAINER_TITLE } from '../../constants/INFORMATION';
import Button from '../Button/Button';
import MovieItems from '../MovieItems/MovieItems';
import IRespondData from '../../interfaces/IRespondData';

class ItemView {
  #page: number;

  constructor(search?: string) {
    this.#page = 0;

    this.create(search ? `"${search}"${CONTAINER_TITLE.searchResult}` : CONTAINER_TITLE.popular, search);
  }

  create(itemViewTitle: string, search?: string) {
    const itemView = document.querySelector('.item-view');

    if (itemView) {
      const button = Button.create(BUTTON.showMore);

      itemView.appendChild(this.createTitle(itemViewTitle));
      itemView.appendChild(button);

      this.mountItems(button, search);
      button.addEventListener('click', () => this.mountItems(button, search));
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
    button.insertAdjacentElement('beforebegin', skeleton);

    const movieListData: IRespondData = await this.getMovieListData(search);
    MovieItems.replaceSkeletons(skeleton, movieListData);

    if (this.#page === movieListData.total_pages || this.#page === 500) {
      button.remove();
    }
  }

  async getMovieListData(search?: string) {
    if (search) {
      return await fetchSearchMovies(++this.#page, search);
    }
    return await fetchPopularMovies(++this.#page);
  }
}

export default ItemView;
