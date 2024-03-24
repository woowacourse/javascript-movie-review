import Component from '../../common/Component/Component';
import MovieList from '../MovieList/MovieList';
import MovieTitle from '../MovieTitle/MovieTitle';
import { renderSkeletonList } from '../MovieListCardSkeleton/MovieListCardSkeleton.util';

import Movie from '../../../domain/Movie/Movie';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import './MovieReviewBody.css';

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

    new MovieTitle($section, { movieType: this.props?.movieType ?? '' });

    $section.appendChild(this.createMovieListContainer());
    $section.appendChild(this.createMoreButton());

    return $section;
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

    renderSkeletonList($movieListContainer, $ul, 8);

    this.renderMovieList($movieListContainer, $ul);
  }

  private renderMovieList($movieListContainer: HTMLElement, $ul: HTMLElement) {
    this.movie?.setPage(1);

    this.movie?.fetchMovieDetails({
      onSuccess: (data) => {
        $ul.remove();

        new MovieList($movieListContainer, {
          movieItemDetails: data?.results ?? [],
          removeMoreButton: this.removeMoreButton.bind(this),
        });
      },

      onError: (error) => {
        if (error instanceof Error) {
          console.error(error.message);

          this.openErrorFallbackModal();
        }
      },
    });
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

    if (this.movie && this.movie.isMaxPage()) {
      this.removeMoreButton();
    }
  }
}

export default MovieReviewBody;
