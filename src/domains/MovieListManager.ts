// 필드: 검색어, 영화목록, 현재 페이지 번호
// 검색 기능
// 현재 받아온 영화 목록들을 저장하는 기능
// 더보기 기능
// 현재 영화 목록에 가져온 페이지 정보 추가
// 마지막 페이지인지 아닌지 판단하는 기능

import { Movie } from '../types/movie';

const getPopularMovieRequestUrl = (page = 1) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;

const getSearchMovieUrl = (query: string, page = 1) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;

interface MovieInfo {
  query: string;
  list: Movie[];
  currentPage: number;
  isLastPage: boolean;
}

class MovieListManager {
  private static instance: MovieListManager;
  private movieInfo: MovieInfo = {
    query: '',
    list: [],
    currentPage: 1,
    isLastPage: false,
  };

  private constructor() {
    if (!MovieListManager.instance) {
      MovieListManager.instance = this;
    }
  }

  public static getInstance() {
    if (!MovieListManager.instance) {
      MovieListManager.instance = new MovieListManager();
    }

    return MovieListManager.instance;
  }

  public getMovieList() {
    return this.movieInfo.list;
  }

  public async searchMovieList(movieName: string) {
    this.movieInfo.query = movieName;
    this.movieInfo.currentPage = 1;
    this.movieInfo.list = [];
    await this.fetchMovieList();
  }

  public async getMoreMovieList() {
    this.movieInfo.currentPage += 1;
    await this.fetchMovieList();
  }

  public async fetchMovieList() {
    const url =
      this.movieInfo.query === ''
        ? getPopularMovieRequestUrl(this.movieInfo.currentPage)
        : getSearchMovieUrl(this.movieInfo.query, this.movieInfo.currentPage);

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data['total_results'] === this.movieInfo.list.length) this.movieInfo.isLastPage = true;
        this.movieInfo.list.push(...data.results);
      });
  }
}

export default MovieListManager;
