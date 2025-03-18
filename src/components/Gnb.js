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

  const $searchBar = createElement({
    tag: 'input',
    classNames: ['search-bar'],
  });

  $fragment.appendChild($logo);
  $logo.appendChild($logoImg);
  $fragment.appendChild($searchBar);

  return $fragment;
};

export default Gnb;
