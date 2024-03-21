import HTTPError from './HttpError';

const httpRequest = {
  async fetchPopularMovies(page: number) {
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

    return { popularMovieList, isLastPage };
  },

  async fetchSearchedMovies(page: number, input: string) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`,
    );
    if (response.status !== 200) throw new Error();
    // throw new HTTPError(400); // 임의 에러 처리

    const responseData = await response.json();
    const searchedMovieList = responseData.results;

    const totalPages = responseData.total_pages;

    const currentPages = responseData.page;
    const isLastPage = totalPages === currentPages;

    return { searchedMovieList, isLastPage };
  },
};

export default httpRequest;
