import { MovieResult } from '../types/movieApi';

const getPopularMovieRequestUrl = (page: number) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${page}`;
};

const getSearchMovieRequestUrl = (query: FormDataEntryValue, page: number) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;
};

export const movieApi = {
  async searchMovieList(query: FormDataEntryValue, page: number) {
    return await this.fetchMovieList(query, page);
  },

  async getMoreMovieList(currentPage: number) {
    return await this.fetchMovieList('', currentPage + 1);
  },

  async fetchMovieList(query: FormDataEntryValue, currentPage: number): Promise<MovieResult[]> {
    const requestUrl = query ? getSearchMovieRequestUrl(query, currentPage) : getPopularMovieRequestUrl(currentPage);
    const result = await fetch(requestUrl);

    return await result.json();
  },
};
