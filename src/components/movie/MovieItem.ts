import { dataStateStore, movieInfoDataFetcher } from '../../model';
import { Movie } from '../../type/movie';
import { debouceFunc } from '../../utils';
import MovieInfoModal from '../modal/MovieInfoModal';

import MovieCard from './MovieCard';

class MovieItem {
  #element: HTMLElement;

  constructor(movie: Movie) {
    this.#element = this.#makeMovieItem(movie);
  }

  get element() {
    return this.#element;
  }

  #makeMovieItem(movie: Movie) {
    const $li = document.createElement('li');
    const $card = new MovieCard(movie).element;
    $li.appendChild($card);
    $li.addEventListener('click', (event) => {
      debouceFunc(() => this.handleClickToOpenModal(event, movie.id));
    });
    return $li;
  }

  async handleClickToOpenModal(event: Event, id: number) {
    event.stopPropagation();
    const movieInfo = await this.getMovieInfo(id);
    if (!movieInfo) {
      // TODO: 상수화
      console.error('정보를 찾을 수 없습니다.');
      return;
    }

    new MovieInfoModal(movieInfo);
  }

  async getMovieInfo(id: number) {
    const movieInfoInDataStateStore = dataStateStore.movieInfo;
    const isInDataStore = movieInfoInDataStateStore?.id === id;
    if (isInDataStore) {
      return movieInfoInDataStateStore;
    }
    await movieInfoDataFetcher.handleGetMovieInfo(id);
    return dataStateStore.movieInfo;
  }
}

export default MovieItem;
