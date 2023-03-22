import MovieInfo from "../type/MovieInfo";
import Storage from "../type/Storage";
import makeMovieSummary from "./makeMovieSummary";

const getPopularMovieRequestUrl = (page = 1) => (
  `${process.env.HOST}/${process.env.REQUEST_POPULAR}&language=ko&page=${page}`
);

const getSearchMovieUrl = (query: string, page = 1) => (
  `${process.env.HOST}/${process.env.REQUEST_SEARCH}&language=ko&query=${query}&page=${page}&include_adult=false`
);

class MovieListManager {
  private query: string = "";
  private list: MovieInfo[] = [];
  private currentPage: number = 1;
  private lastPage = false;
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.query = this.storage.getItem('query');
  }

  getCurrentPage(){
    return this.currentPage;
  }

  getMovieList() {
    return this.list.map((movie) => ({ ...movie }));
  }   

  getQuery() {
    return this.query;
  }

  isLastPage() {
    return this.lastPage;
  }

  async fetchMovieList() {
    this.storage.setItem('query', this.query);

    const url = this.query === "" 
      ? getPopularMovieRequestUrl(this.currentPage)
      : getSearchMovieUrl(this.query, this.currentPage);

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.list.push(...[...data.results].map((movie) => makeMovieSummary(movie)));
        if (data["total_results"] === this.list.length) this.lastPage = true;
        else this.lastPage = false;
      })
      .catch(() => alert('정보 요청에 실패했습니다.'));
  }

  async searchMovieList(movieName: string){
    this.query = movieName;
    this.currentPage = 1;
    this.list = [];
    await this.fetchMovieList();
  }

  async getMoreMovieList () {
    this.currentPage += 1;
    await this.fetchMovieList();
  }
}

export default MovieListManager;
