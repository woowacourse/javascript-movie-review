import { fetchData } from '../api/http';
import { TMDB_MOVIE_BASE_URL } from '../utils/constants';
import {
  IGenre,
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

export interface IFetchedError {
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

class Movie {
  #genreList!: Array<IGenre>;

  async initialSetting() {
    this.#genreList = await this.getGenreList();
  }

  async getPopularMovies({
    curPage = 1,
  }: IMovieFetchProps): Promise<IMovieHandleProps<IMovieItemProps>> {
    const { results, total_pages, page } = await fetchData<IMovieHandleProps<IMovieProps>>(
      `${TMDB_MOVIE_BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${curPage}`
    );

    const movleList = results.map((currentMovie) => ({
      id: currentMovie.id,
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));

    return {
      results: movleList,
      total_pages,
      page,
    };
  }

  async getFindMovies({
    query,
    curPage = 1,
  }: IFindMovieFetchProps): Promise<IMovieHandleProps<IMovieItemProps>> {
    const { results, total_pages, page } = await fetchData<IMovieHandleProps<IMovieProps>>(
      `${TMDB_MOVIE_BASE_URL}/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${query}&page=${curPage}`
    );

    const movieList = results.map((currentMovie) => ({
      id: currentMovie.id,
      title: currentMovie.title,
      posterPath: currentMovie.poster_path,
      voteAverage: currentMovie.vote_average,
    }));

    return {
      results: movieList,
      total_pages,
      page,
    };
  }

  async getMovieDetails({ movieId }: { movieId: number }) {
    /**
     * 제목
     * 장르
     * 포스터
     * 평균 별점
     * 줄거리
     */
  }

  async getGenreList() {
    const genreLists = await fetchData<Array<IGenre>>(
      `${TMDB_MOVIE_BASE_URL}/genre/movie/list?api_key=83abefa42986ae190c0bbb24c6d2e0ae&language=ko-KR`
    );

    return genreLists;
  }
}

export default Movie;
