import { fetchData } from '../http';
import { IMovieHandleProps, IMovieItemProps, IMovieProps } from '../types/movie';
const BASE_URL = 'https://api.themoviedb.org/3';

interface IMovieFetchProps {
  curPage: number;
}

interface IFindMovieFetchProps extends IMovieFetchProps {
  query: string;
}

export interface IFetchedError {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface IFetchMovie {
  isError: boolean;
  data: IMovieHandleProps<IMovieProps> | IFetchedError;
}

export interface IModifiedMovie {
  isError: boolean;
  data: IMovieHandleProps<IMovieItemProps> | IFetchedError;
}

class Movie {
  async getPopularMovies({ curPage = 1 }: IMovieFetchProps): Promise<IModifiedMovie> {
    const movieList = await fetchData<IFetchMovie>(
      `${BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${curPage}`
    );

    const { isError, data } = movieList;

    if ('results' in data) {
      const { results, total_pages, page } = data;

      const movleList = results.map((currentMovie) => ({
        title: currentMovie.title,
        posterPath: currentMovie.poster_path,
        voteAverage: currentMovie.vote_average,
      }));

      return {
        isError,
        data: { results: movleList, total_pages, page },
      };
    }

    return {
      isError,
      data,
    };
  }

  async findMovies({ query, curPage = 1 }: IFindMovieFetchProps): Promise<IModifiedMovie> {
    const foundedMovies = await fetchData<IFetchMovie>(
      `${BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${curPage}`
    );

    const { isError, data } = foundedMovies;

    if ('results' in data) {
      const { results, total_pages, page } = data;

      const movleList = results.map((currentMovie) => ({
        title: currentMovie.title,
        posterPath: currentMovie.poster_path,
        voteAverage: currentMovie.vote_average,
      }));

      return {
        isError,
        data: { results: movleList, total_pages, page },
      };
    }

    return {
      isError,
      data,
    };
  }
}

export default Movie;
