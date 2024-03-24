import createMovieItems from '../components/MovieItems/MovieItems';
import { MovieListType } from '../types/movie';
import HTTPError from './HttpError';

const httpRequest = {
  async fetchPopularMovies(
    page: number,
  ): Promise<{ popularMovieList: MovieListType; isLastPage: boolean }> {
    createMovieItems([], false);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`,
    );

    if (response.status !== 200) throw new HTTPError(response.status);

    const responseData = await response.json();
    const popularMovieList = responseData.results;

    const totalPages = responseData.total_pages;

    const currentPages = responseData.page;
    const isLastPage = totalPages === currentPages;
    return { popularMovieList, isLastPage };
  },

  async fetchSearchedMovies(
    page: number,
    input: string,
  ): Promise<{ searchedMovieList: MovieListType; isLastPage: boolean }> {
    createMovieItems([], false);

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`,
    );

    if (response.status !== 200) throw new HTTPError(response.status);

    const responseData = await response.json();
    const searchedMovieList = responseData.results;
    if (searchedMovieList.length === 0) {
      document.querySelector('.item-list--skeleton')?.remove();
      throw new HTTPError(response.status, '검색된 영화가 없습니다.');
    }

    const totalPages = responseData.total_pages;

    const currentPages = responseData.page;
    const isLastPage = totalPages === currentPages;
    return { searchedMovieList, isLastPage };
  },
};

export default httpRequest;
