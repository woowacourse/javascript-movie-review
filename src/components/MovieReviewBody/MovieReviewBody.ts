import { createElement } from '../../utils/dom/createElement/createElement';
import Component from '../Component/Component';
import MovieList from '../MovieList/MovieList';
import MovieAPI from '../../apis/movie/movie';
import { BaseResponse } from '../../apis/common/apiSchema.type';
import { MovieListCardProps } from '../MovieListCard/MovieListCard.type';
import { querySelector } from '../../utils/dom/selector';
import { on } from '../../utils/dom/eventListener/eventListener';
import MovieListCardSkeleton from '../MovieListCardSkeleton/MovieListCardSkeleton';
import { NoResultImage } from '../../assets';

interface MovieReviewBodyProps {
  movieType: string;
}

class MovieReviewBody extends Component<MovieReviewBodyProps> {
  private page = 0;

  protected render() {
    this.page = 1;
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $section = createElement({ tagName: 'section', attributeOptions: { class: 'item-view' } });

    $section.appendChild(this.createMovieTitle());
    $section.appendChild(this.createMovieListContainer());
    $section.appendChild(this.createMoreButton());

    return $section;
  }

  private createMovieTitle() {
    const movieTitleText =
      this.props?.movieType === 'popular' ? '지금 인기 있는 영화' : `${this.props?.movieType} 검색 결과`;

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
    MovieAPI.fetchMovieDetails<BaseResponse<MovieListCardProps[]>>(this.page, this.props?.movieType ?? '')
      .then((data) => {
        $ul.remove();

        if (data && data.results.length > 0) {
          new MovieList($movieListContainer, { movieItemDetails: data?.results ?? [] });
        } else {
          this.renderNoResultImage($movieListContainer);
        }
      })
      .catch((error) => console.error(console.log(error)));
  }

  private renderNoResultImage($movieListContainer: HTMLElement) {
    const $fallbackImage = createElement({
      tagName: 'img',
      attributeOptions: { src: NoResultImage, alt: '검색 결과 없음 이미지', class: 'no-result-image' },
    });

    $movieListContainer.appendChild($fallbackImage);

    this.removeMoreButton();
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
      target: querySelector<HTMLButtonElement>('#more-button', this.$element),
      eventName: 'click',
      eventHandler: this.handleMoreButtonClick.bind(this),
    });
  }

  private handleMoreButtonClick() {
    this.page += 1;

    const $movieListContainer = querySelector<HTMLDivElement>('#movie-list-container');
    this.updateMovieList($movieListContainer);

    if (this.page === 5) {
      this.removeMoreButton();
    }
  }

  private removeMoreButton() {
    const $button = querySelector<HTMLButtonElement>('#more-button', this.$element);
    $button.remove();
  }
}

export default MovieReviewBody;
