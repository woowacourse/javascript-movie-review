import { createElement } from '../../utility/dom';
import logoImg from '../../image/logo.png';

const MovieReviewHeader = {
  createHeader() {
    const headerElement = createElement('h1', {
      class: '.home-link',
    });
    const linkElement = createElement('a', {
      href: '/javascript-movie-review/dist/',
    });
    const logoElement = createElement('img', {
      src: `${logoImg}`,
      alt: 'MovieList 홈으로 이동',
    });

    headerElement.appendChild(linkElement);
    linkElement.appendChild(logoElement);

    return headerElement;
  },
};

export default MovieReviewHeader;
