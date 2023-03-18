import { fetchData } from '../http';
import { IMovieListAPIProps } from '../types/movie';
const BASE_URL = 'https://api.themoviedb.org/3';

interface IMovieFetchProps {
  curPage: number;
}

interface IFindMovieFetchProps extends IMovieFetchProps {
  query: string;
}

interface IFetchedMovie {
  isError: boolean;
  data: IMovieListAPIProps;
}

class Movie {
  async getPopularMovies({ curPage = 1 }: IMovieFetchProps) {
    const movieList = await fetchData<IFetchedMovie>(
      `${BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${curPage}`
    );

    return movieList;
  }

  async findMovies({ query, curPage = 1 }: IFindMovieFetchProps) {
    const foundedMovies = await fetchData<IFetchedMovie>(
      `${BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${curPage}`
    );

    return foundedMovies;
  }
}

export default Movie;
