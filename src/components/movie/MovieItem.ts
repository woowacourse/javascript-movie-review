import { dataStateStore } from '../../model';
import { DataFetcher, SkeletonController } from '../../service';
import { Movie } from '../../type/movie';
import { debouceFunc } from '../../utils';
import MovieInfoModal from '../modal/MovieInfoModal';

import MovieCard from './MovieCard';

// TODO: 상세 모달 관련 스켈레톤을 변경
const dataFetcher = new DataFetcher({
  show: () => SkeletonController.showSkeletonListContainer(),
  hide: () => SkeletonController.hideSkeletonListContainer(),
});

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
    //2단계 상세 모달 기능 추가
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
      // TODO: 정보 없을 때 컴포넌트 추가
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
    await dataFetcher.handleGetMovieInfo(id);
    return dataStateStore.movieInfo;
  }
}

export default MovieItem;
