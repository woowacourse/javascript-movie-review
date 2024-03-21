import createMovieItems from '../components/MovieItems/MovieItems';
import { MovieListType } from '../types/movie';
import HTTPError from './HttpError';

const httpRequest = {
  async fetchPopularMovies(
    page: number,
  ): Promise<{ popularMovieList: MovieListType; isLastPage: boolean }> {
    return new Promise((resolve, reject) => {
      createMovieItems([], false);
      setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`,
          );

          if (response.status !== 200) throw new HTTPError(response.status);
          // throw new HTTPError(500); // 임의 에러 처리

          const responseData = await response.json();
          const popularMovieList = responseData.results;

          const totalPages = responseData.total_pages;

          const currentPages = responseData.page;
          const isLastPage = totalPages === currentPages;

          resolve({ popularMovieList, isLastPage });
        } catch (error) {
          reject(error);
        }
      }, 3000);
    });
  },

  async fetchSearchedMovies(
    page: number,
    input: string,
  ): Promise<{ searchedMovieList: MovieListType; isLastPage: boolean }> {
    return new Promise((resolve, reject) => {
      createMovieItems([], false);
      setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`,
          );

          if (response.status !== 200)
            throw new HTTPError(response.status, '검색된 영화가 없습니다.');
          // throw new HTTPError(500); // 임의 에러 처리

          const responseData = await response.json();
          const searchedMovieList = responseData.results;

          const totalPages = responseData.total_pages;

          const currentPages = responseData.page;
          const isLastPage = totalPages === currentPages;

          resolve({ searchedMovieList, isLastPage });
        } catch (error) {
          reject(error);
        }
      }, 3000);
    });
  },
};

export default httpRequest;
