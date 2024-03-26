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
  removeMoreButton: () => void;
}

class MovieList extends Component<MovieListProps> {
  private movie: Movie | undefined;
  private movieItems: IMovie[] | undefined;

  protected initializeState(): void {
    this.movie = new Movie();
    this.updateMovieList();
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

    if (this.movie && this.movie.isMaxPage()) {
      this.props?.removeMoreButton();
    }
  }

  private openErrorModal(error: unknown) {
    if (error instanceof Error) {
      const $modal = querySelector<HTMLDialogElement>('#error-fallBack-modal');
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

  private createNoResultImage($movieItemList: HTMLElement) {
    $movieItemList.innerHTML = `<img src=${NoResultImage} alt="검색 결과 없음 이미지" class="no-result-image"></img>`;
    this.props?.removeMoreButton();
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

    this.movieItems.forEach((movieItem) => {
      const $li = createElement({ tagName: 'li' });
      new MovieListCard($li, { movieItem, createMovieDetailModal: this.openMovieDetailModal.bind(this) });
      $movieItemList.appendChild($li);
    });

    return $movieItemList;
  }
}

export default MovieList;
