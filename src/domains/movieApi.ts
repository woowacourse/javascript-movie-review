import { FetchMovieListProps } from '../types/movieApi';

const getPopularMovieRequestUrl = (page: number = 1) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;

const getSearchMovieRequestUrl = (query: FormDataEntryValue, page: number = 1) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;

export const movieApi = {
  async searchMovieList(query: FormDataEntryValue, page: number) {
    return await this.fetchMovieList({ query, currentPage: page });
  },

  async getMoreMovieList(currentPage: number) {
    return await this.fetchMovieList({ query: '', currentPage: currentPage + 1 }).then(data => data);
  },

  async fetchMovieList({ query, currentPage }: FetchMovieListProps) {
    const requestUrl = query ? getSearchMovieRequestUrl(query, currentPage) : getPopularMovieRequestUrl(currentPage);

    return await fetch(requestUrl)
      .then(result => result.json())
      .then(data => data);
  },
};
