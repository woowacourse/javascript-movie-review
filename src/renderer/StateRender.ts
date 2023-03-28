import ListTitle from '../components/ListTitle';
import MovieDetail from '../components/MovieDetail';
import MovieList from '../components/MovieList';
import Skeleton from '../components/Skeleton';
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
  // 렌더에서, 렌더링 하는 부분들만 없애보자. 그리고, 렌더링 하는 부분들을 customEvent로 등록해서 처리해보자.
  /**
   * custom event로 등록되어서 렌더링 되는 부분들
   * 1. 새로 검색 및 popular 추가
   * 2. 더보기 버튼 구현
   * 3. 상세보기 구현
   * 4. 각각의 렌더링이 발생했을 때 skeleton이 같이 들어가야 함.
   * 5. skeleton이 발생하는 조건은 StateRender 내부의 상태값에 따라 다름.
   *
   */
  private listTitle!: ListTitle;
  private skeleton!: Skeleton;
  private movieList!: MovieList;
  private movieDetail!: MovieDetail;
  private itemViewSection!: HTMLElement;

  private movie: Movie;
  private movieState: IMovieState;

  constructor() {
    this.movie = new Movie();
    this.movieState = initialMovieStats;
  }

  initialize({ listTitle, skeleton, movieList, movieDetail, itemViewSection }: StateRenderProps) {
    this.listTitle = listTitle;
    this.skeleton = skeleton;
    this.movieList = movieList;
    this.movieDetail = movieDetail;
    this.itemViewSection = itemViewSection;
  }

  // private listTitleRender() {
  //   this.listTitle.render(this.itemViewSection,'');
  // }

  private skeletonRenderAndClearMovieList() {
    this.skeleton.attachSkeleton();
    this.movieList.removeCurentCategory();
  }

  private movieListRender() {
    this.skeleton.removeSkeleton();
    this.movieList.render(this.itemViewSection);
  }

  private apiErrorRender(value: string, $target: HTMLElement) {
    $target.innerHTML = '';
    $target.insertAdjacentElement('beforeend', WholeScreenMessageAlert(value));
  }

  async renderPopularMovies(curPage = 1) {
    try {
      const { results, total_pages, page } = await this.movie.getPopularMovies({
        curPage,
      });

      if (curPage === 1) this.skeletonRenderAndClearMovieList();

      this.setPopularProperty();
      this.setMovies({ results, total_pages, page });
      // this.renderWholeComponent();
    } catch (error) {
      if (error instanceof Error) {
        this.apiErrorRender(error.message, this.itemViewSection);
      }
    }
  }

  async renderSearchedMovies(query: string, curPage = 1) {
    try {
      const { results, total_pages, page } = await this.movie.getFindMovies({
        query,
        curPage,
      });

      // if (this.movieState.query !== query || curPage === 1) this.skeletonRenderAndClearMovieList();

      this.setSearchProperty(query);
      this.setMovies({ results, total_pages, page });
      // this.renderWholeComponent();
    } catch (error) {
      if (error instanceof Error) {
        this.apiErrorRender(error.message, this.itemViewSection);
      }
    }
  }

  async renderMovieDetail(movieId: number, $target: HTMLElement) {
    const currentMovieInfos = parseLocalStorage<Array<IMovieDetailItem>>({
      key: 'movieList',
      data: [],
    });

    const currentItem = this.movieDetail.isExistCurrentMovieDetail(currentMovieInfos, movieId);
    if (currentItem) {
      this.movieDetail.render(currentItem, $target);
      return;
    }

    try {
      const movieDetail = await this.movie.getMovieDetails({ movieId });

      this.movieDetail.render(movieDetail, $target);
    } catch (error) {
      if (error instanceof Error) {
        this.apiErrorRender(error.message, $target);
      }
    }
  }

  renderMoreMovieList() {
    const states = this.getMovieState();
    const { nextPage, category, query } = states;

    if (nextPage === -1) {
      alert('마지막 페이지입니다.');
      return;
    }

    if (category === 'popular') {
      this.renderPopularMovies(nextPage);
      return;
    }

    this.renderSearchedMovies(query, nextPage);
  }

  // private renderWholeComponent() {
  //   this.listTitleRender();
  //   this.movieListRender();
  // }

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

  getMovieState() {
    return {
      ...this.movieState,
    };
  }
}

const stateRender = new StateRender();

export default stateRender;
