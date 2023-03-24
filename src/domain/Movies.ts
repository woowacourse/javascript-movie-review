import {
  getApiDetailMovie,
  getApiPopularMovie,
  getApiSearchMovie,
} from './api';
import { MovieItemType, DetailModalType } from '../type/movie';
import { ERROR_MESSAGE } from '../constant';

import Observable from './Observable';
import alertFetchStatus from '../validation/alertFetchStatus';

class Movies extends Observable {
  private popularPage = 1;
  private searchPage = 1;
  private isSearched = false;
  private isEnd = false;
  private query = '';

  constructor() {
    super();

    this.popularMovies();
  }

  getIsEnd() {
    return this.isEnd;
  }

  getTitle() {
    return this.isSearched
      ? `"${this.query}" 검색 결과`
      : '가장 인기 있는 영화';
  }

  getIsSearched() {
    return this.isSearched;
  }

  getQuery() {
    return this.query;
  }

  async popularMovies() {
    this.notify('loading');

    const { movieList, status } = await getApiPopularMovie(this.popularPage);
    const popularMovies = movieList;

    if (alertFetchStatus(status)) return;

    const refineMovies = popularMovies?.results.map(
      ({ id, poster_path, title, vote_average }: MovieItemType) => {
        return { id, poster_path, title, vote_average };
      }
    );

    const totalPage = popularMovies?.total_pages;
    if (!totalPage) return;
    this.isEnd = totalPage === this.popularPage;

    this.popularPage++;
    this.isSearched = false;
    this.notify('movies', refineMovies);
  }

  async searchMovies(query: string, isFromSearchButton: boolean = false) {
    this.notify('loading');

    if (this.query !== query || isFromSearchButton) this.searchPage = 1;
    this.query = query;

    const { movieList, status } = await getApiSearchMovie(
      query,
      this.searchPage
    );
    const searchMovies = movieList;

    if (alertFetchStatus(status)) return;

    const refineMovies = searchMovies?.results?.map(
      ({ id, poster_path, title, vote_average }: MovieItemType) => {
        return { id, poster_path, title, vote_average };
      }
    );

    const totalPage = searchMovies?.total_pages;
    if (!totalPage) return;
    this.isEnd = totalPage === this.searchPage;

    this.searchPage++;
    this.isSearched = true;
    this.notify('movies', refineMovies);
  }

  async detailMovies(id: number) {
    const { movieItem, status } = await getApiDetailMovie(id);

    if (alertFetchStatus(status)) return;

    const detailMovie = {
      id: movieItem.id,
      title: movieItem.title,
      poster_path: movieItem.poster_path,
      genres: movieItem.genres.map((genre: any) => genre.name).join(', '),
      vote_average: movieItem.vote_average,
      overview: movieItem.overview,
    };

    this.notify('detail', detailMovie);
  }
}

const movies = new Movies();
export default movies;
