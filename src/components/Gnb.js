import SearchBar from './SearchBar';
import createElement from './utils/createElement';


const Gnb = () => {
  const $div = createElement({
    tag: 'div',
    classNames: ['gnb']
  });

  const $logo = createElement({
    tag: 'h1',
    classNames: ['logo'],
  });

  const $logoImg = createElement({
    tag: 'img',
    src: ['./images/logo.png'],
    alt: 'MovieList',
  });

  $div.appendChild($logo);
  $logo.appendChild($logoImg);
  $div.appendChild(SearchBar());

  return $div;
};

export default Gnb;
