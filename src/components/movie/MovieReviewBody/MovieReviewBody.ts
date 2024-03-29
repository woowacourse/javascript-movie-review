import Component from '../../common/Component/Component';
import MovieList from '../MovieList/MovieList';
import MovieListCardSkeleton from '../MovieListCardSkeleton/MovieListCardSkeleton';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';
import Movie from '../../../domain/Movie/Movie';
import MovieAPI from '../../../apis/movie/movie';
import { IMovie } from '../../../domain/Movie/Movie.type';
import { BaseResponse } from '../../../apis/common/apiSchema.type';
import { querySelector } from '../../../utils/dom/selector';
import { createElement } from '../../../utils/dom/createElement/createElement';
import { MOVIE, MOVIE_ITEM_SKELETON } from '../../../constants/Condition';
import { NoResultImage } from '../../../assets';
import './MovieReviewBody.css';

interface MovieReviewBodyProps {
  movieType: string;
  openErrorModal: (error: unknown) => void;
}

class MovieReviewBody extends Component<MovieReviewBodyProps> {
  private movie: Movie | undefined;
  private observer: IntersectionObserver | undefined;
  private $movieDetailModal: MovieDetailModal | undefined;

  protected render() {
    this.$element.innerHTML = this.createComponent();
    this.$movieDetailModal = new MovieDetailModal(this.$element);
  }

  protected initializeState(): void {
    this.movie = new Movie();
    this.initializeIntersectionObserver();

    this.updateMovieList();
  }

  private initializeIntersectionObserver() {
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => entry.isIntersecting && this.updateMovieList());
    });
  }

  protected createComponent() {
    return /* html */ `
      <section id="movie-review-section" class="item-view">
        <h2>
          ${this.props?.movieType === 'popular' ? '지금 인기 있는 영화' : `"${this.props?.movieType}" 검색 결과`}
        </h2>
        <div id="movie-list-container" class="item-list-container"></div>
      </section>
    `;
  }

  private updateMovieList() {
    if (!this.props || !this.movie) return;

    this.removeIntersectionObserver();
    this.createSkeletonList();

    this.movie.setPage(MOVIE.PAGE_UNIT);

    this.movie.fetchMovies({
      movieType: this.props.movieType,
      onSuccess: this.handleMovieListSuccess.bind(this),
      onError: this.props.openErrorModal.bind(this),
    });
  }

  private handleMovieListSuccess(data: BaseResponse<IMovie[]>) {
    this.removeSkeletonList();

    if (data.results.length === 0) {
      this.createNoResultImage();
    }

    this.createMovieList([...data.results]);
  }

  private openMovieDetailModal(key: number) {
    MovieAPI.fetchMovieDetail(key).then((data) => {
      this.$movieDetailModal?.openModal(data);
    });
  }

  private createSkeletonList() {
    const $movieListContainer = querySelector<HTMLElement>('#movie-list-container', this.$element);

    const $skeletonList = createElement({
      tagName: 'ul',
      attributeOptions: { id: 'skeleton-list', class: 'item-list' },
    });

    Array.from({ length: MOVIE_ITEM_SKELETON.LENGTH }, () => new MovieListCardSkeleton($skeletonList));

    $movieListContainer.appendChild($skeletonList);
  }

  private createMovieList(movieItems: IMovie[]) {
    if (!this.observer) return;

    const $movieListContainer = querySelector<HTMLElement>('#movie-list-container', this.$element);
    new MovieList($movieListContainer, {
      movieItems: movieItems,
      observer: this.observer,
      openMovieDetailModal: this.openMovieDetailModal.bind(this),
    });
  }

  private createNoResultImage() {
    const $movieListContainer = querySelector<HTMLElement>('#movie-list-container', this.$element);

    $movieListContainer.innerHTML = `
      <img src=${NoResultImage} alt="검색 결과 없음 이미지" class="no-result-image"></img>
    `;
  }

  private removeIntersectionObserver() {
    const $observeItem = this.$element.querySelector('.observe');

    if (!$observeItem) return;

    this.observer?.unobserve($observeItem);
    $observeItem.classList.remove('observe');
  }

  private removeSkeletonList() {
    const $skeletonList = querySelector<HTMLElement>('#skeleton-list');
    $skeletonList.remove();
  }
}

export default MovieReviewBody;
