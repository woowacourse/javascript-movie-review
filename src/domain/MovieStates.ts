import Movie, { initialMovieDetailState, initialMovieStats } from './Movie';
import { IMovieDetailItem, IMovieHandleProps, IMovieItemProps, IMovieState } from '../types/movie';

export interface TMDBAPIParams {
  query?: string;
  curPage?: number;
}

class MovieStates {
  private movie: Movie;
  private movieState: IMovieState;
  private movieDetailState: IMovieDetailItem;

  constructor() {
    this.movie = new Movie();
    this.movieState = initialMovieStats;
    this.movieDetailState = initialMovieDetailState;
  }

  async getPopularMovies({ curPage = 1 }: TMDBAPIParams) {
    const { results, total_pages, page } = await this.movie.getPopularMovies({
      curPage,
    });

    this.setPopularProperty();
    this.setMovies({ results, total_pages, page });
  }

  async getSearchedMovies({ query = '', curPage = 1 }: TMDBAPIParams) {
    const { results, total_pages, page } = await this.movie.getFindMovies({
      query,
      curPage,
    });

    this.setSearchProperty(query);
    this.setMovies({ results, total_pages, page });
  }

  async getMovieDetail(movieId: number) {
    const movieDetail = await this.movie.getMovieDetails({ movieId });

    this.setDetailMovieItems(movieDetail);
  }

  private setPopularProperty() {
    this.movieState.query = '';
    if (this.movieState.category === 'search') {
      this.movieState.category = 'popular';
      this.movieState.nextPage = 1;
    }
  }

  private setSearchProperty(query: string) {
    this.movieState.query = query;
    if (this.movieState.category === 'popular') {
      this.movieState.category = 'search';
      this.movieState.nextPage = 1;
    }
  }

  private setMovies({ results, total_pages, page }: IMovieHandleProps<IMovieItemProps>) {
    this.movieState.results = results;
    this.movieState.nextPage = total_pages === page ? -1 : page + 1;
    this.movieState.error = '';
  }

  private setDetailMovieItems(movieInfos: IMovieDetailItem) {
    this.movieDetailState = { ...movieInfos };
  }

  getMovieDetails() {
    return { ...this.movieDetailState };
  }

  getMovieState() {
    return {
      ...this.movieState,
    };
  }
}

const movieState = new MovieStates();

export default movieState;
