import createElement from './utils/createElement';
import MovieItem from './MovieItem';
import test from './test';

const MovieList = ({ movies }) => {
  const $ul = createElement({
    tag: 'ul',
    classNames: ['thumbnail-list'],
  });

  const $p = createElement({
    tag: 'p',
    classNames: ['nothing-text']
  });

  const $img = createElement({
    tag: 'img',
    src: './images/으아아.png',
    alt: '으아아',
    classNames: ['nothing-img']
  })
  
  $p.textContent = "검색 결과가 없습니다.";

  const $fragment = document.createDocumentFragment();
  $fragment.appendChild($p);
  $fragment.appendChild($img);

  if(movies.length === 0) {
    return $fragment;
  }

  // movies.forEach((movie) => {
  //   $ul.appendChild(MovieItem({ movie }));
  // });

  movies.forEach((moive) => {
    $ul.appendChild(test());
  });

  return $ul;
};

export default MovieList;
