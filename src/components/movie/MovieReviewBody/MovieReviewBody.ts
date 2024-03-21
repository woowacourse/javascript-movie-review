import Component from '../../common/Component/Component';
import MovieList from '../MovieList/MovieList';
import MovieListCardSkeleton from '../MovieListCardSkeleton/MovieListCardSkeleton';

import Movie from '../../../domain/Movie/Movie';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import { NoResultImage } from '../../../assets';

interface MovieReviewBodyProps {
  movieType: string;
}

class MovieReviewBody extends Component<MovieReviewBodyProps> {
  private movie: Movie | undefined;

  protected initializeState(): void {
    this.movie = new Movie(1, this.props?.movieType ?? '');
  }

  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $section = createElement({
      tagName: 'section',
      attributeOptions: { id: 'movie-review-section', class: 'item-view' },
    });

    $section.appendChild(this.createMovieTitle());
    $section.appendChild(this.createMovieListContainer());
    $section.appendChild(this.createMoreButton());

    return $section;
  }

  private createMovieTitle() {
    const movieTitleText =
      this.props?.movieType === 'popular' ? '지금 인기 있는 영화' : `"${this.props?.movieType}" 검색 결과`;

    return createElement({ tagName: 'h2', text: movieTitleText });
  }

  private createMovieListContainer() {
    const $movieListContainer = createElement({
      tagName: 'div',
      attributeOptions: { id: 'movie-list-container', class: 'movie-list-container' },
    });

    this.updateMovieList($movieListContainer);

    return $movieListContainer;
  }

  private updateMovieList($movieListContainer: HTMLElement) {
    const $ul = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    this.renderSkeletonList($movieListContainer, $ul, 8);

    this.renderMovieList($movieListContainer, $ul);
  }

  private renderSkeletonList($movieListContainer: HTMLElement, $ul: HTMLElement, length: number) {
    Array.from({ length }, () => new MovieListCardSkeleton($ul));

    $movieListContainer.append($ul);
  }

  private renderMovieList($movieListContainer: HTMLElement, $ul: HTMLElement) {
    this.movie?.setPage(1);

    this.movie?.fetchMovieDetails({
      onSuccess: (data) => {
        if (!data) return;

        $ul.remove();

        if (data.results.length === 0) {
          this.renderNoResultImage($movieListContainer);
          return;
        }

        if (data.results.length < 20) this.removeMoreButton();

        new MovieList($movieListContainer, { movieItemDetails: data?.results ?? [] });
      },

      onError: (error) => {
        if (error instanceof Error) {
          console.error(error.message);

          this.openErrorFallbackModal();
        }
      },
    });
  }

  private renderNoResultImage($movieListContainer: HTMLElement) {
    this.removeMoreButton();

    const $fallbackImage = createElement({
      tagName: 'img',
      attributeOptions: { src: NoResultImage, alt: '검색 결과 없음 이미지', class: 'no-result-image' },
    });

    $movieListContainer.appendChild($fallbackImage);
  }

  private removeMoreButton() {
    const $button = querySelector<HTMLButtonElement>(ELEMENT_SELECTOR.moreButton, this.$element);
    $button.remove();
  }

  private openErrorFallbackModal() {
    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.errorFallBackModal);

    $modal.showModal();
  }

  private createMoreButton() {
    return createElement({
      tagName: 'button',
      text: '더보기',
      attributeOptions: { id: 'more-button', class: 'btn primary full-width' },
    });
  }

  protected setEvent(): void {
    on({
      target: querySelector<HTMLButtonElement>(ELEMENT_SELECTOR.moreButton, this.$element),
      eventName: 'click',
      eventHandler: this.handleMoreButtonClick.bind(this),
    });
  }

  private handleMoreButtonClick() {
    const $movieListContainer = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.movieListContainer);
    this.updateMovieList($movieListContainer);

    if (this?.movie && this.movie.isMaxPage()) {
      this.removeMoreButton();
    }
  }
}

export default MovieReviewBody;
