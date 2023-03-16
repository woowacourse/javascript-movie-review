import { fetchData } from '../http';
const BASE_URL = 'https://api.themoviedb.org/3';

interface IMovieProps {
  curPage: number;
}

interface IFindMovieProps extends IMovieProps {
  query: string;
}

class Movie {
  async getPopularMovies({ curPage = 1 }: IMovieProps) {
    const movieList = await fetchData(
      `${BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${curPage}`
    );

    return movieList;
  }

  async findMovies({ query, curPage = 1 }: IFindMovieProps) {
    const foundedMovies = await fetchData(
      `${BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${curPage}`
    );

    return foundedMovies;
  }
}

export default Movie;
