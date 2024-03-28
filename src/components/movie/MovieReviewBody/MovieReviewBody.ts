import Component from '../../common/Component/Component';
import MovieList from '../MovieList/MovieList';
import { querySelector } from '../../../utils/dom/selector';
import './MovieReviewBody.css';

interface MovieReviewBodyProps {
  movieType: string;
}

class MovieReviewBody extends Component<MovieReviewBodyProps> {
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
        <div id="movie-list-container" class="item-list-container"></div>
      </section>
    `;
  }

  private initializeMovieList() {
    const $movieListContainer = querySelector<HTMLElement>('#movie-list-container', this.$element);
    new MovieList($movieListContainer, { movieType: this.props?.movieType ?? 'popular' });
  }
}

export default MovieReviewBody;
