import EventBroker from '../EventBroker';
import movieState, { TMDBAPIParams } from '../domain/MovieStates';
import ErrorContainer from './ErrorContainer';
import ListTitle from './ListTitle';
import MovieList from './MovieList';
import Skeleton from './Skeleton';

class ItemView {
  private $itemView: HTMLElement;
  private listTitle: ListTitle;
  private movieList: MovieList;
  private skeleton: Skeleton;
  private errorContainer: ErrorContainer;

  constructor() {
    this.$itemView = document.createElement('section');
    this.$itemView.className = 'item-view';

    this.listTitle = new ListTitle();
    this.skeleton = new Skeleton(this.$itemView);
    this.movieList = new MovieList();
    this.errorContainer = new ErrorContainer();

    this.addUpdateMovieListEventHandler();
    this.addAppendMovieList();
  }

  initialsSetting() {
    this.updateMovieList({});
  }

  render($target: HTMLElement) {
    $target.insertAdjacentElement('beforeend', this.$itemView);
  }

  private addUpdateMovieListEventHandler() {
    EventBroker.addEventListener('updateMovieListEvent', async (event) => {
      const { keyword } = event.detail;

      this.updateMovieList({ query: keyword });
    });
  }

  private async updateMovieList({ query = '', curPage = 1 }: TMDBAPIParams) {
    const { query: movieQuery } = movieState.getMovieState();
    if (movieQuery !== query || curPage === 1) this.skeletonRenderAndClearMovieList();

    try {
      if (query === '') {
        await movieState.getPopularMovies({ curPage });
      } else {
        await movieState.getSearchedMovies({ query, curPage });
      }

      this.renderWholeComponent.bind(this)();
    } catch (error) {
      if (error instanceof Error) {
        this.skeleton.removeSkeleton();
        this.errorContainer.render(this.$itemView, error.message);
      }
    }
  }

  private addAppendMovieList() {
    EventBroker.addEventListener('appendMovieListEvent', () => {
      const { nextPage, query } = movieState.getMovieState();

      if (nextPage === -1) {
        alert('마지막 페이지입니다.');
        return;
      }

      this.updateMovieList({ query, curPage: nextPage });
    });
  }

  private skeletonRenderAndClearMovieList() {
    this.skeleton.attachSkeleton();
    this.movieList.removeCurentCategory();
  }

  private renderWholeComponent() {
    this.listTitle.render(this.$itemView);
    this.movieListRender();
  }
  private movieListRender() {
    this.skeleton.removeSkeleton();
    this.movieList.render(this.$itemView);
  }
}

export default ItemView;
