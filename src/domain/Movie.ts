import { fetchData } from '../http';
const BASE_URL = 'https://api.themoviedb.org/3';

class Movie {
  async getPopularMovies(curPage = 1) {
    const movieList = await fetchData(
      `${BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${curPage}`
    );

    const { results, total_pages, page } = movieList;

    return { results, total_pages, page };
  }

  async findMovies(query: string, curPage = 1) {
    const foundedMovies = await fetchData(
      `${BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}&page=${curPage}`
    );

    const { results, total_pages, page } = foundedMovies;

    return { results, total_pages, page };
  }
}

export default Movie;
