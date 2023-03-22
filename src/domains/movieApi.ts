import { MovieRoot } from '../types/movieApi';

const getPopularMovieRequestUrl = (page: number) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;
};

const getSearchMovieRequestUrl = (query: string, page: number) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;
};

export const movieApi = {
  async getPopularMovieList(page: number): Promise<MovieRoot> {
    return await this.fetchMovieList('', page);
  },

  async searchMovieList(query: string, page: number): Promise<MovieRoot> {
    return await this.fetchMovieList(query, page);
  },

  async getMoreMovieList(query: string, nextPage: number): Promise<MovieRoot> {
    return await this.fetchMovieList(query, nextPage);
  },

  async fetchMovieList(query: string, currentPage: number): Promise<MovieRoot> {
    const requestUrl = query ? getSearchMovieRequestUrl(query, currentPage) : getPopularMovieRequestUrl(currentPage);
    const result = await fetch(requestUrl);

    return await result.json();
  },
};
