import { TMDBFetcher } from '../api/http';
import { TMDB_MOVIE_BASE_URL } from '../utils/constants';
import {
  IMovieDetail,
  IMovieDetailItem,
  IMovieHandleProps,
  IMovieItemProps,
  IMovieProps,
  IMovieState,
} from '../types/movie';

interface IMovieFetchProps {
  curPage: number;
}

interface IFindMovieFetchProps extends IMovieFetchProps {
  query: string;
}

export interface ITMDBFetchedError {
  success: boolean;
  status_code: number;
  status_message: string;
}

export const initialMovieStats: IMovieState = {
  results: [],
  nextPage: 1,
  query: '',
  category: 'popular',
  error: '',
};

export const initialMovieDetailState: IMovieDetailItem = {
  title: '',
  overview: null,
  voteAverage: 0,
  movieId: -1,
  genres: [],
  posterPath: null,
};

class Movie {
  private urlParams: URLSearchParams;

  constructor() {
    this.urlParams = new URLSearchParams(`api_key=${process.env.MOVIE_API_KEY}&language=ko-KR`);
  }

  async getPopularMovies({
    curPage = 1,
  }: IMovieFetchProps): Promise<IMovieHandleProps<IMovieItemProps>> {
    this.urlParams.set('page', `${curPage}`);
    const { results, total_pages, page } = await TMDBFetcher<IMovieHandleProps<IMovieProps>>(
      `${TMDB_MOVIE_BASE_URL}/movie/popular?${this.urlParams.toString()}`
    );

    const movieList = results.map((currentMovie) => ({
      id: currentMovie.id,
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));

    this.urlParams.delete('page');

    return {
      results: movieList,
      total_pages,
      page,
    };
  }

  async getFindMovies({
    query,
    curPage = 1,
  }: IFindMovieFetchProps): Promise<IMovieHandleProps<IMovieItemProps>> {
    this.urlParams.set('page', `${curPage}`);
    this.urlParams.set('query', `${query}`);

    const { results, total_pages, page } = await TMDBFetcher<IMovieHandleProps<IMovieProps>>(
      `${TMDB_MOVIE_BASE_URL}/search/movie?${this.urlParams.toString()}`
    );

    const movieList = results.map((currentMovie) => ({
      id: currentMovie.id,
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));
    this.urlParams.delete('page');
    this.urlParams.delete('query');
    return {
      results: movieList,
      total_pages,
      page,
    };
  }

  async getMovieDetails({ movieId }: { movieId: number }): Promise<IMovieDetailItem> {
    const { genres, overview, title, vote_average, poster_path } = await TMDBFetcher<IMovieDetail>(
      `${TMDB_MOVIE_BASE_URL}/movie/${movieId}?${this.urlParams.toString()}`
    );

    const movieDetails = {
      title,
      overview,
      voteAverage: vote_average,
      movieId,
      genres: genres.map(({ name }) => name),
      posterPath: poster_path,
    };

    return movieDetails;
  }
}

export default Movie;
