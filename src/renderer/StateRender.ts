import ListTitle from '../components/ListTitle';
import MoreButton from '../components/MoreButton';
import MovieList from '../components/MovieList';
import { Skeleton } from '../components/Skeleton';
import WholeScreenMessageAlert from '../components/WholeScreenMessageAlert';
import Movie, { initialMovieStats } from '../domain/Movie';
import { IMovieHandleProps, IMovieItemProps, IMovieProps, IMovieState } from '../types/movie';

interface StateRenderProps {
  moreButton: MoreButton;
  listTitle: ListTitle;
  skeleton: Skeleton;
  movieList: MovieList;
  targetNode: HTMLElement;
}

class StateRender {
  #moreButton!: MoreButton;
  #listTitle!: ListTitle;
  #skeleton!: Skeleton;
  #movieList!: MovieList;
  #targetNode!: HTMLElement;

  #movie: Movie;
  #movieState: IMovieState;

  constructor() {
    this.#movie = new Movie();
    this.#movieState = initialMovieStats;
  }

  initialize({ moreButton, listTitle, skeleton, movieList, targetNode }: StateRenderProps) {
    this.#moreButton = moreButton;
    this.#listTitle = listTitle;
    this.#skeleton = skeleton;
    this.#movieList = movieList;
    this.#targetNode = targetNode;
  }

  #excuteMoreButtonVisible() {
    const { nextPage } = this.#movieState;
    nextPage === -1 ? this.#moreButton.hide() : this.#moreButton.show();
  }

  #listTitleRender() {
    this.#listTitle.render(this.#targetNode);
  }

  #skeletonRenderAndClearMovieList() {
    this.#skeleton.attachSkeleton();
    this.#movieList.removeCurentCategory();
  }

  #movieListRender() {
    this.#skeleton.removeSkeleton();
    this.#movieList.render(this.#targetNode);
    this.#moreButton.render(this.#targetNode);
  }

  #apiErrorRender(value: any) {
    this.#targetNode.innerHTML = '';
    this.#targetNode.insertAdjacentElement('beforeend', WholeScreenMessageAlert(value));
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
      this.#apiErrorRender(error);
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
      this.#apiErrorRender(error);
    }
  }

  #renderWholeComponent() {
    this.#listTitleRender();
    this.#movieListRender();
    this.#excuteMoreButtonVisible();
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
    console.log(page, this.#movieState.nextPage);
  }

  getMovieState() {
    return {
      ...this.#movieState,
    };
  }
}

const stateRender = new StateRender();

export default stateRender;
