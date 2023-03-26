import { fetchData } from "../http";

const BASE_URL = "https://api.themoviedb.org/3";

class Movie {
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
}

export default Movie;
