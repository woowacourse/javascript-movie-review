import WholeScreenMessageAlert from '../components/WholeScreenMessageAlert';
import Movie, { initialMovieDetailState, initialMovieStats } from '../domain/Movie';
import { IMovieDetailItem, IMovieHandleProps, IMovieItemProps, IMovieState } from '../types/movie';

interface StateRenderProps {
  itemViewSection: HTMLElement;
}

interface TMDBAPIParams {
  query?: string;
  curPage?: number;
}

class StateRender {
  private itemViewSection!: HTMLElement;

  private movie: Movie;
  private movieState: IMovieState;
  private movieDetailState: IMovieDetailItem;

  constructor() {
    this.movie = new Movie();
    this.movieState = initialMovieStats;
    this.movieDetailState = initialMovieDetailState;
  }

  initialize({ itemViewSection }: StateRenderProps) {
    this.itemViewSection = itemViewSection;
  }

  private apiErrorRender(value: string, $target: HTMLElement) {
    $target.innerHTML = '';
    $target.insertAdjacentElement('beforeend', WholeScreenMessageAlert(value));
  }

  async renderPopularMovies({ curPage = 1 }: TMDBAPIParams) {
    try {
      const { results, total_pages, page } = await this.movie.getPopularMovies({
        curPage,
      });

      this.setPopularProperty();
      this.setMovies({ results, total_pages, page });
    } catch (error) {
      if (error instanceof Error) {
        this.apiErrorRender(error.message, this.itemViewSection);
      }
    }
  }

  async renderSearchedMovies({ query = '', curPage = 1 }: TMDBAPIParams) {
    try {
      const { results, total_pages, page } = await this.movie.getFindMovies({
        query,
        curPage,
      });

      this.setSearchProperty(query);
      this.setMovies({ results, total_pages, page });
    } catch (error) {
      if (error instanceof Error) {
        this.apiErrorRender(error.message, this.itemViewSection);
      }
    }
  }

  async renderMovieDetail(movieId: number, $target: HTMLElement) {
    try {
      const movieDetail = await this.movie.getMovieDetails({ movieId });

      this.setDetailMovieItems(movieDetail);
    } catch (error) {
      if (error instanceof Error) {
        this.apiErrorRender(error.message, $target);
      }
    }
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

const stateRender = new StateRender();

export default stateRender;
