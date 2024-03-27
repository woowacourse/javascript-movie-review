import { fetchPopularMovies, fetchSearchMovies } from '../../domain/Request/sendRequest';
import { CONTAINER_TITLE } from '../../constants/INFORMATION';
import MovieItems from '../MovieItems/MovieItems';
import IRespondData from '../../interfaces/FetchMovieListDTO';
import { getDomElement } from '../../util/DOM';
import OPTIONS from '../../constants/OPTIONS';
import setupInfiniteScroll from '../../util/InfiniteScroll';

class MovieList {
  #page: number;
  #search?: string;
  constructor(search?: string) {
    this.#page = 0;
    this.#search = search;
    if (this.#search) {
      this.create(`"${this.#search}"${CONTAINER_TITLE.searchResult}`);
    } else {
      this.create(CONTAINER_TITLE.popular);
    }
  }

  async create(movieListTitle: string) {
    const movieList = getDomElement('.item-view');
    const listEnd = document.createElement('div');
    listEnd.classList.add('list-end');

    movieList.appendChild(this.createTitle(movieListTitle));
    movieList.appendChild(listEnd);
    this.mountItems(listEnd);

    await setupInfiniteScroll(listEnd, this.mountItems.bind(this), this.#search);

    getDomElement('#app').appendChild(movieList);
  }

  createTitle(containerTitle: string) {
    const title = document.createElement('h2');

    title.textContent = `${containerTitle}`;

    return title;
  }

  async mountItems(listEnd: HTMLElement): Promise<void> {
    const skeleton = MovieItems.createSkeleton();
    listEnd.insertAdjacentElement('beforebegin', skeleton);

    const movieListData: IRespondData = await this.getMovieListData();
    MovieItems.replaceAllSkeletons(skeleton, movieListData);
    if (this.#page === movieListData.total_pages || this.#page === OPTIONS.maxPage) {
      listEnd.remove();
    }
  }

  async getMovieListData() {
    if (this.#search) {
      return await fetchSearchMovies(++this.#page, this.#search);
    } else {
      return await fetchPopularMovies(++this.#page);
    }
  }
}

export default MovieList;
