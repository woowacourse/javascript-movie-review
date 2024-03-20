import { createElement } from '../../utils/dom/createElement/createElement';
import Component from '../Component/Component';
import MovieList from '../MovieList/MovieList';
import MovieAPI from '../../apis/movie/movie';
import { BaseResponse } from '../../apis/common/apiSchema.type';
import { MovieListCardProps } from '../MovieListCard/MovieListCard.type';
import { querySelector } from '../../utils/dom/selector';
import { on } from '../../utils/dom/eventListener/eventListener';

interface MovieReviewBodyProps {
  movieType: string;
}

class MovieReviewBody extends Component<MovieReviewBodyProps> {
  private state: { page: number } = {
    page: 1,
  };

  protected render() {
    this.$element.append(this.createComponent());
  }

  private handleMoreButtonClick() {
    this.state.page += 1;

    MovieAPI.fetchMovieDetails<BaseResponse<MovieListCardProps[]>>(this.state.page, this.props?.movieType ?? '')
      .then((data) => {
        if (data?.results) {
          const $movieListContainer = querySelector<HTMLDivElement>('#movie-list-container');
          new MovieList($movieListContainer, { movieItemDetails: data?.results ?? [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (this.state.page === 5) {
      const $button = querySelector<HTMLButtonElement>('#more-button', this.$element);
      $button.remove();
    }
  }

  protected setEvent(): void {
    on({
      target: querySelector<HTMLButtonElement>('#more-button', this.$element),
      eventName: 'click',
      eventHandler: this.handleMoreButtonClick.bind(this),
    });
  }

  protected createComponent() {
    const $section = createElement({ tagName: 'section', attributeOptions: { class: 'item-view' } });

    const movieTitleText =
      this.props?.movieType === 'popular' ? '지금 인기 있는 영화' : `${this.props?.movieType} 검색 결과`;
    const $movieTitle = createElement({ tagName: 'h2', text: movieTitleText });
    $section.appendChild($movieTitle);

    const $movieListContainer = createElement({ tagName: 'div', attributeOptions: { id: 'movie-list-container' } });

    MovieAPI.fetchMovieDetails<BaseResponse<MovieListCardProps[]>>(1, this.props?.movieType ?? '')
      .then((data) => {
        // 스켈레톤 지우고
        // ex) ~
        new MovieList($movieListContainer, { movieItemDetails: data?.results ?? [] });
      })
      .catch((error) => {
        console.log(error);
      });

    $section.appendChild($movieListContainer);

    const $button = createElement({
      tagName: 'button',
      text: '더보기',
      attributeOptions: { id: 'more-button', class: 'btn primary full-width' },
    });
    $section.appendChild($button);

    return $section;
  }
}

export default MovieReviewBody;
