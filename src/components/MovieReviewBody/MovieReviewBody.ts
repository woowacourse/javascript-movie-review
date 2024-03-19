import { createElement } from '../../utils/dom/createElement/createElement';
import Component from '../Component/Component';
import MovieList from '../MovieList/MovieList';

class MovieReviewBody extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $section = createElement({ tagName: 'section', attributeOptions: { class: 'item-view' } });

    const $movieTitle = createElement({ tagName: 'h2', text: '지금 인기 있는 영화' });
    $section.appendChild($movieTitle);

    const $movieListContainer = createElement({ tagName: 'div', attributeOptions: { id: 'movie-list-container' } });
    new MovieList($movieListContainer);
    $section.appendChild($movieListContainer);

    const $button = createElement({
      tagName: 'button',
      text: '더보기',
      attributeOptions: { class: 'btn primary full-width' },
    });
    $section.appendChild($button);

    return $section;
  }
}

export default MovieReviewBody;
