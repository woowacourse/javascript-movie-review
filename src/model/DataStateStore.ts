import dummyMovieList from "../movieList";
import { Movie } from "../type/movie";

interface DataProps {
  movieData: Movie[];
  isShowMoreButton: boolean;
}
class DataStateStore {
  #movieList: Movie[] | undefined;

  constructor() {
    // TODO: 비동기 실행해서 초기 데이터 넣어주기
    this.#movieList = dummyMovieList;
  }

  getTotalMovieData(
    { movieData, isShowMoreButton }: DataProps,
    isStack: boolean,
  ) {
    if (!(this.#movieList && isStack)) this.#movieList = movieData;
    else this.#movieList = this.#movieList.concat(movieData);

    return {
      totalMovieList: JSON.parse(JSON.stringify(this.#movieList)) as Movie[],
      isShowMoreButton,
    };
  }

  // TODO: api  구현 후 삭제 예정
  getFilteredMovieData(text: string) {
    return this.#movieList?.filter((movie) => movie.title.includes(text));
  }
}

const dataStateStore = new DataStateStore();

export default dataStateStore;
