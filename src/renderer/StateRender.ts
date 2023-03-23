import ListTitle from '../components/ListTitle';
import modal from '../components/Modal';
import MovieDetail from '../components/MovieDetail';
import MovieList from '../components/MovieList';
import { Skeleton } from '../components/Skeleton';
import WholeScreenMessageAlert from '../components/WholeScreenMessageAlert';
import Movie, { initialMovieStats } from '../domain/Movie';
import { IMovieDetailItem, IMovieHandleProps, IMovieItemProps, IMovieState } from '../types/movie';
import { parseLocalStorage } from '../utils/localStorage';

interface StateRenderProps {
  listTitle: ListTitle;
  skeleton: Skeleton;
  movieList: MovieList;
  movieDetail: MovieDetail;
  itemViewSection: HTMLElement;
}

class StateRender {
  #listTitle!: ListTitle;
  #skeleton!: Skeleton;
  #movieList!: MovieList;
  #movieDetail!: MovieDetail;
  #itemViewSection!: HTMLElement;

  #movie: Movie;
  #movieState: IMovieState;

  constructor() {
    this.#movie = new Movie();
    this.#movieState = initialMovieStats;
  }

  initialize({ listTitle, skeleton, movieList, movieDetail, itemViewSection }: StateRenderProps) {
    this.#listTitle = listTitle;
    this.#skeleton = skeleton;
    this.#movieList = movieList;
    this.#movieDetail = movieDetail;
    this.#itemViewSection = itemViewSection;
  }

  #listTitleRender() {
    this.#listTitle.render(this.#itemViewSection);
  }

  #skeletonRenderAndClearMovieList() {
    this.#skeleton.attachSkeleton();
    this.#movieList.removeCurentCategory();
  }

  #movieListRender() {
    this.#skeleton.removeSkeleton();
    this.#movieList.render(this.#itemViewSection);
  }

  #apiErrorRender(value: any) {
    this.#itemViewSection.innerHTML = '';
    this.#itemViewSection.insertAdjacentElement('beforeend', WholeScreenMessageAlert(value));
  }

  async renderPopularMovies(curPage = 1) {
    try {
      const { results, total_pages, page } = await this.#movie.getPopularMovies({
        curPage,
      });

      if (curPage === 1) this.#skeletonRenderAndClearMovieList();

      this.#setPopularProperty();
      this.#setMovies({ results, total_pages, page });
      this.#renderWholeComponent();
    } catch (error) {
      if (error instanceof Error) {
        this.#apiErrorRender(error.message);
      }
    }
  }

  async renderSearchedMovies(query: string, curPage = 1) {
    try {
      const { results, total_pages, page } = await this.#movie.getFindMovies({
        query,
        curPage,
      });

      if (this.#movieState.query !== query || curPage === 1)
        this.#skeletonRenderAndClearMovieList();

      this.#setSearchProperty(query);
      this.#setMovies({ results, total_pages, page });
      this.#renderWholeComponent();
    } catch (error) {
      if (error instanceof Error) {
        this.#apiErrorRender(error.message);
      }
    }
  }

  async renderMovieDetail(movieId: number, $target: HTMLElement) {
    if ($target.classList.contains('modal-container')) modal.clearModalContainer();

    const currentMovieInfos = parseLocalStorage<Array<IMovieDetailItem>>({
      key: 'movieList',
      data: [],
    });
    const currentItem = this.#movieDetail.isExistCurrentMovieDetail(currentMovieInfos, movieId);
    if (currentItem) {
      this.#movieDetail.render(currentItem, $target);
      return;
    }

    try {
      const movieDetail = await this.#movie.getMovieDetails({ movieId });

      this.#movieDetail.render(movieDetail, $target);
    } catch (error) {}
  }

  #renderWholeComponent() {
    this.#listTitleRender();
    this.#movieListRender();
  }

  #setPopularProperty() {
    this.#movieState.query = '';
    if (this.#movieState.category === 'search') {
      this.#movieState.category = 'popular';
      this.#movieState.nextPage = 1;
    }
  }

  #setSearchProperty(query: string) {
    this.#movieState.query = query;
    if (this.#movieState.category === 'popular') {
      this.#movieState.category = 'search';
      this.#movieState.nextPage = 1;
    }
  }

  #setMovies({ results, total_pages, page }: IMovieHandleProps<IMovieItemProps>) {
    this.#movieState.results = results;
    this.#movieState.nextPage = total_pages === page ? -1 : page + 1;
    this.#movieState.error = '';
  }

  getMovieState() {
    return {
      ...this.#movieState,
    };
  }
}

const stateRender = new StateRender();

export default stateRender;
