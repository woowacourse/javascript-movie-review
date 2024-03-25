import { fetchPopularMovies, fetchSearchMovies } from '../../domain/Request/sendRequest';
import { BUTTON, CONTAINER_TITLE } from '../../constants/INFORMATION';
import Button from '../Button/Button';
import MovieItems from '../MovieItems/MovieItems';
import IRespondData from '../../interfaces/FetchMovieListDTO';
import { getDomElement } from '../../util/DOM';
import OPTIONS from '../../constants/OPTIONS';

class MovieList {
  #page: number;
  #search?: string;
  constructor(search?: string) {
    this.#page = 0;
    this.#search = search;
    if (search) {
      this.create(`"${search}"${CONTAINER_TITLE.searchResult}`, search);
    } else {
      this.create(CONTAINER_TITLE.popular, search);
    }
  }

  create(movieListTitle: string, search?: string) {
    const movieList = getDomElement('.item-view');
    const button = Button.create(BUTTON.showMore);

    movieList.appendChild(this.createTitle(movieListTitle));
    movieList.appendChild(button);

    this.mountItems(button, search);
    button.addEventListener('click', () => this.mountItems(button, search));
    return movieList;
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
    MovieItems.replaceAllSkeletons(skeleton, movieListData);
    if (this.#page === movieListData.total_pages || this.#page === OPTIONS.maxPage) {
      button.remove();
    }
  }

  async getMovieListData(search?: string) {
    if (search) {
      return await fetchSearchMovies(++this.#page, search);
    } else {
      return await fetchPopularMovies(++this.#page);
    }
  }
}

export default MovieList;
