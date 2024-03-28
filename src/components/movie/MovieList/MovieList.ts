import Component from '../../common/Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';
import MovieListCardSkeleton from '../MovieListCardSkeleton/MovieListCardSkeleton';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';
import MovieAPI from '../../../apis/movie/movie';
import Movie from '../../../domain/Movie/Movie';
import { IMovie } from '../../../domain/Movie/Movie.type';
import { BaseResponse } from '../../../apis/common/apiSchema.type';
import { querySelector } from '../../../utils/dom/selector';
import { createElement } from '../../../utils/dom/createElement/createElement';
import { MOVIE, MOVIE_ITEM_SKELETON } from '../../../constants/Condition';
import { NoResultImage } from '../../../assets';
import './MovieList.css';

interface MovieListProps {
  movieType: string;
}

class MovieList extends Component<MovieListProps> {
  private movie: Movie | undefined;
  private movieItems: IMovie[] | undefined;
  private observer: IntersectionObserver | undefined;

  protected initializeState(): void {
    this.movie = new Movie();
    this.updateMovieList();
    this.initializeObserver();
  }

  protected render() {
    this.$element.append(this.createComponent());
  }

  private reRender() {
    this.$element.innerHTML = '';
    this.render();
  }

  updateMovieList() {
    if (!this.movie) return;

    this.movie.setPage(MOVIE.PAGE_UNIT);

    this.movie.fetchMovies({
      movieType: this.props?.movieType ?? 'popular',
      onSuccess: this.handleMovieListSuccess.bind(this),
      onError: this.openErrorModal.bind(this),
    });
  }

  private handleMovieListSuccess(data: BaseResponse<IMovie[]>) {
    this.movieItems = [...(this.movieItems ?? []), ...data.results];
    this.reRender();
  }

  private openErrorModal(error: unknown) {
    if (error instanceof Error) {
      const $modal = querySelector<HTMLDialogElement>('#error-fallback-modal');
      $modal.showModal();
    }
  }

  private openMovieDetailModal(key: number) {
    MovieAPI.fetchMovieDetail(key).then((data) => {
      new MovieDetailModal(this.$element, { movieDetail: data });

      const $modal = querySelector<HTMLDialogElement>('#movie-detail-modal');
      $modal.showModal();
    });
  }

  private initializeObserver() {
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => entry.isIntersecting && this.updateMovieList());
    });
  }

  private setInfiniteScrollObserver(index: number, $movieItem: HTMLElement) {
    if (!this.movieItems || !this.movie) return;
    if (this.movie.isMaxPage() || this.movieItems.length % 20 !== 0) return;

    if (index === this.movieItems.length - 1) {
      this.observer?.observe($movieItem);
    }
  }

  private createNoResultImage($movieItemList: HTMLElement) {
    $movieItemList.innerHTML = `<img src=${NoResultImage} alt="검색 결과 없음 이미지" class="no-result-image"></img>`;
  }

  protected createComponent() {
    const $movieItemList = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    if (!this.movieItems) {
      Array.from({ length: MOVIE_ITEM_SKELETON.LENGTH }, () => new MovieListCardSkeleton($movieItemList));
      return $movieItemList;
    }

    if (this.movieItems.length === 0) {
      this.createNoResultImage($movieItemList);
      return $movieItemList;
    }

    this.movieItems.forEach((movieItem, index) => {
      const $li = createElement({ tagName: 'li' });
      new MovieListCard($li, { movieItem, openMovieDetailModal: this.openMovieDetailModal.bind(this) });
      $movieItemList.appendChild($li);

      this.setInfiniteScrollObserver(index, $li);
    });

    return $movieItemList;
  }
}

export default MovieList;
