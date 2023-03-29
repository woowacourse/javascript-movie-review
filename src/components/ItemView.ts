import EventBroker from '../EventBroker';
import stateRender from '../renderer/StateRender';
import ListTitle from './ListTitle';
import MovieList from './MovieList';
import Skeleton from './Skeleton';

class ItemView {
  private $itemView: HTMLElement;
  private listTitle: ListTitle;
  private movieList: MovieList;
  private skeleton: Skeleton;

  constructor() {
    this.$itemView = document.createElement('section');
    this.$itemView.className = 'item-view';

    this.listTitle = new ListTitle();
    this.skeleton = new Skeleton(this.$itemView);
    this.movieList = new MovieList();

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

      this.updateMovieList({ keyword });
    });
  }

  private updateMovieList({ keyword = '', nextPage = 1 }: { keyword?: string; nextPage?: number }) {
    const { query } = stateRender.getMovieState();
    if (query !== keyword || nextPage === 1) this.skeletonRenderAndClearMovieList();

    new Promise((resolve) =>
      resolve(
        keyword === ''
          ? stateRender.renderPopularMovies({ curPage: nextPage })
          : stateRender.renderSearchedMovies({ query: keyword, curPage: nextPage })
      )
    ).then(this.renderWholeComponent.bind(this));
  }

  private addAppendMovieList() {
    EventBroker.addEventListener('appendMovieListEvent', () => {
      const { nextPage, query } = stateRender.getMovieState();

      if (nextPage === -1) {
        alert('마지막 페이지입니다.');
        return;
      }

      this.updateMovieList({ keyword: query, nextPage });
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
