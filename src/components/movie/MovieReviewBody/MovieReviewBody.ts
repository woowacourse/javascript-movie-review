import Component from '../../common/Component/Component';
import MovieList from '../MovieList/MovieList';
import MovieListCardSkeleton from '../MovieListCardSkeleton/MovieListCardSkeleton';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';
import MovieService from '../../../domain/Movie/MovieService';
import { IMovie } from '../../../domain/Movie/Movie.type';
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
  private page: number | undefined;
  private observer: IntersectionObserver | undefined;
  private movieDetailModal: MovieDetailModal | undefined;

  protected render() {
    this.$element.innerHTML = this.createComponent();
    this.movieDetailModal = new MovieDetailModal(this.$element);
  }

  protected initializeState(): void {
    this.page = 0;
    this.initializeIntersectionObserver();
    this.updateMovieList();
  }

  protected createComponent() {
    const title = this.props?.movieType === 'popular' ? '지금 인기 있는 영화' : `"${this.props?.movieType}" 검색 결과`;

    return /* html */ `
      <section id="movie-review-section" class="item-view">
        <h2>${title}</h2>
        <div id="movie-list-container" class="item-list-container"></div>
      </section>
    `;
  }

  private initializeIntersectionObserver() {
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => entry.isIntersecting && this.updateMovieList());
    });
  }

  private removeIntersectionObserver() {
    const $observeItem = this.$element.querySelector('.observe');

    if ($observeItem) {
      this.observer?.unobserve($observeItem);
      $observeItem.classList.remove('observe');
    }
  }

  private updateMovieList() {
    if (this.page === undefined || this.props === undefined) return;

    this.removeIntersectionObserver();
    this.createSkeletonList();

    this.page += MOVIE.PAGE_UNIT;

    MovieService.fetchMovies({
      movieType: this.props.movieType,
      page: this.page,
      onSuccess: this.handleMovieListSuccess.bind(this),
      onError: this.props.openErrorModal.bind(this),
    });
  }

  private handleMovieListSuccess(data: IMovie[]) {
    this.removeSkeletonList();

    if (data.length === 0) {
      this.createNoResultImage();
      return;
    }

    this.createMovieList(data);
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

  private removeSkeletonList() {
    const $skeletonList = querySelector<HTMLElement>('#skeleton-list');
    $skeletonList.remove();
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

  private openMovieDetailModal(key: number) {
    if (!this.props) return;

    MovieService.fetchMovieDetail({
      key: key,
      onSuccess: (data) => this.movieDetailModal?.openModal(data),
      onError: this.props.openErrorModal,
    });
  }
}

export default MovieReviewBody;
