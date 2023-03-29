import { fetchData } from '../http';

const BASE_URL = 'https://api.themoviedb.org/3';

class Movie {
  async getMovies(query: string | null, page: number) {
    if (query) {
      return this.getFoundMovies(query, page);
    }

    return this.getPopularMovies(page);
  }

  async getPopularMovies(page: number) {
    const movieList = await fetchData(
      `${BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}`
    );

    return movieList;
  }

  async getFoundMovies(query: string, page: number) {
    const foundedMovies = await fetchData(
      `${BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${page}`
    );

    return foundedMovies;
  }

  async getMovieById(id: string) {
    const detail = await fetchData(
      `${BASE_URL}/movie/${id}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR`
    );

    return detail;
  }
}

export default Movie;
