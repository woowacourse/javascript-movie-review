import Component from '../../common/Component/Component';
import MovieList from '../MovieList/MovieList';
import { querySelector } from '../../../utils/dom/selector';
import { ELEMENT_SELECTOR } from '../../../constants/Selector';
import './MovieReviewBody.css';

interface MovieReviewBodyProps {
  movieType: string;
}

class MovieReviewBody extends Component<MovieReviewBodyProps> {
  private $movieList: MovieList | undefined;

  protected render() {
    this.$element.innerHTML = this.createComponent();
  }

  protected initializeState(): void {
    this.initializeMovieList();
  }

  protected createComponent() {
    return /* html */ `
      <section id="movie-review-section" class="item-view">
        <h2>
          ${this.props?.movieType === 'popular' ? '지금 인기 있는 영화' : `"${this.props?.movieType}" 검색 결과`}
        </h2>
        <div id="movie-list-container" class="movie-list-container"></div>
        <button id="more-button" class="btn primary full-width">더보기</button>
      </section>
    `;
  }

  private initializeMovieList() {
    const $movieListContainer = querySelector<HTMLElement>('#movie-list-container', this.$element);

    this.$movieList = new MovieList($movieListContainer, {
      movieType: this.props?.movieType ?? 'popular',
      removeMoreButton: this.removeMoreButton.bind(this),
    });
  }

  private removeMoreButton() {
    const $button = querySelector<HTMLButtonElement>(ELEMENT_SELECTOR.moreButton, this.$element);
    $button.remove();
  }

  protected setEvent(): void {
    const $moreButton = querySelector<HTMLButtonElement>(ELEMENT_SELECTOR.moreButton, this.$element);
    $moreButton.addEventListener('click', this.handleMoreButtonClick.bind(this));
  }

  private handleMoreButtonClick() {
    this.$movieList?.updateMovieList();
  }
}

export default MovieReviewBody;
