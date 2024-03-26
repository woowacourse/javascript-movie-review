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
    if (search) {
      this.create(`"${search}"${CONTAINER_TITLE.searchResult}`, search);
    } else {
      this.create(CONTAINER_TITLE.popular, search);
    }
  }

  async create(movieListTitle: string, search?: string) {
    const movieList = getDomElement('.item-view');
    const listEnd = document.createElement('div');
    listEnd.classList.add('list-end');

    movieList.appendChild(this.createTitle(movieListTitle));
    movieList.appendChild(listEnd);
    await this.mountItems(listEnd, search);

    await setupInfiniteScroll(listEnd, this.mountItems.bind(this), search);

    getDomElement('#app').appendChild(movieList);
  }

  createTitle(containerTitle: string) {
    const title = document.createElement('h2');

    title.textContent = `${containerTitle}`;

    return title;
  }

  async mountItems(listEnd: HTMLElement, search?: string): Promise<void> {
    const skeleton = MovieItems.createSkeleton();
    listEnd.insertAdjacentElement('beforebegin', skeleton);

    const movieListData: IRespondData = await this.getMovieListData(search);
    MovieItems.replaceAllSkeletons(skeleton, movieListData);
    if (this.#page === movieListData.total_pages || this.#page === OPTIONS.maxPage) {
      listEnd.remove();
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
