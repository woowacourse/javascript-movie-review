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
    this.movieList = new MovieList(this.$itemView);

    this.addMovieListEventHandler();
  }

  initialsSetting() {
    this.updateItemView('');
  }

  render($target: HTMLElement) {
    $target.insertAdjacentElement('beforeend', this.$itemView);
  }

  private addMovieListEventHandler() {
    EventBroker.addEventListener('updateMovieListEvent', async (event) => {
      const { keyword } = event.detail;

      this.updateItemView(keyword);
    });
  }

  private updateItemView(keyword: string) {
    const { query, nextPage } = stateRender.getMovieState();

    if (query !== keyword || nextPage === 2) this.skeletonRenderAndClearMovieList();

    new Promise((resolve) =>
      resolve(
        keyword === ''
          ? stateRender.renderPopularMovies()
          : stateRender.renderSearchedMovies(keyword)
      )
    ).then(this.renderWholeComponent.bind(this));
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
