import { Genre, Movie } from '../type/movie';
import Storage from '../type/Storage';

const getPopularMovieRequestUrl = (page = 1) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;

const getSearchMovieUrl = (query: string, page = 1) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;

const getGenreDataUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=ko-KR`;

class MovieListManager {
  #query: string = '';
  #list: Movie[] = [];
  #currentPage: number = 1;
  #lastPage = false;
  #storage: Storage;
  #genre: Record<number, string> = {};
  #starData: Record<number, number> = {};

  constructor(storage: Storage) {
    this.#storage = storage;
    this.#query = this.#storage.getItem('query');
    const starData = this.#storage.getItem('stardata');
    this.#starData = !starData ? {} : JSON.parse(starData);
    this.setGenreData();
  }

  getCurrentPage() {
    return this.#currentPage;
  }

  getMovieList() {
    return this.#list.map((movie) => ({ ...movie }));
  }

  getGenreData() {
    return this.#genre;
  }

  getMovieData(movieName: string) {
    return this.#list.find((data: Movie) => data.title === movieName);
  }

  getQuery() {
    return this.#query;
  }

  getStarData() {
    return this.#starData;
  }

  setStarData(movieId: number, numberData: number) {
    this.#starData[movieId] = numberData;
    this.#storage.setItem('stardata', JSON.stringify(this.#starData));
  }

  isLastPage() {
    return this.#lastPage;
  }

  async setGenreData() {
    if (navigator.onLine) {
      await fetch(getGenreDataUrl)
        .then((res) => res.json())
        .then((data) => {
          this.#genre = data.genres.reduce(
            (acc: Record<number, string>, genreData: Genre) => {
              acc[genreData.id] = genreData.name;
              return acc;
            },
            {}
          );
        });
    }
  }

  async fetchMovieList() {
    this.#storage.setItem('query', this.#query);

    const url =
      this.#query === ''
        ? getPopularMovieRequestUrl(this.#currentPage)
        : getSearchMovieUrl(this.#query, this.#currentPage);
    if (navigator.onLine) {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.#list.push(...data.results);
          if (data['total_results'] === this.#list.length)
            this.#lastPage = true;
          else this.#lastPage = false;
        })
        .catch(() => alert('정보 요청에 실패했습니다.'));
    }
  }

  async searchMovieList(movieName: string) {
    this.#query = movieName;
    this.#currentPage = 1;
    this.#list = [];
    await this.fetchMovieList();
  }

  async getMoreMovieList() {
    this.#currentPage += 1;
    await this.fetchMovieList();
  }
}

export default MovieListManager;
