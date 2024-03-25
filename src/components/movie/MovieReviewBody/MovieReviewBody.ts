import Component from '../../common/Component/Component';
import MovieList from '../MovieList/MovieList';
import MovieTitle from '../MovieTitle/MovieTitle';
import { renderSkeletonList } from '../MovieListCardSkeleton/MovieListCardSkeleton.util';

import Movie from '../../../domain/Movie/Movie';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { off, on } from '../../../utils/dom/eventListener/eventListener';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import './MovieReviewBody.css';

interface MovieReviewBodyProps {
  movieType: string;
}

class MovieReviewBody extends Component<MovieReviewBodyProps> {
  private movie: Movie | undefined;
  private handleStartScroll: typeof this.handleScroll | undefined;

  protected initializeState(): void {
    this.movie = new Movie(1, this.props?.movieType ?? '');

    this.handleStartScroll = this.handleScroll.bind(this);
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
          movieItemDetails: data.results,
          removeEvent: this.removeEvent.bind(this),
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

  private openErrorFallbackModal() {
    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.errorFallBackModal);

    $modal.showModal();
  }

  protected setEvent(): void {
    if (!this.handleStartScroll) return;

    on({
      target: window,
      eventName: 'scroll',
      eventHandler: this.handleStartScroll,
    });
  }

  private handleUpdateMovieList() {
    const $movieListContainer = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.movieListContainer);
    this.updateMovieList($movieListContainer);
  }

  private handleScroll() {
    const isReachedBottom = Math.floor(window.innerHeight + window.scrollY) + 1 >= document.body.offsetHeight;

    if (isReachedBottom) {
      this.handleUpdateMovieList();
    }
  }

  public removeEvent() {
    if (!this.handleStartScroll) return;

    off({
      target: window,
      eventName: 'scroll',
      eventHandler: this.handleStartScroll,
    });
  }
}

export default MovieReviewBody;
