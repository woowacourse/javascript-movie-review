import SearchBar from './SearchBar';
import createElement from './utils/createElement';

const Gnb = () => {
  const $fragment = document.createDocumentFragment();

  const $logo = createElement({
    tag: 'h1',
    classNames: ['logo'],
  });

  const $logoImg = createElement({
    tag: 'img',
    src: ['./images/logo.png'],
    alt: 'MovieList',
  });

  $fragment.appendChild($logo);
  $logo.appendChild($logoImg);
  $fragment.appendChild(SearchBar());

  return $fragment;
};

export default Gnb;
