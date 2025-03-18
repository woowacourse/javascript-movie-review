import createElement from './utils/createElement';
import MoviePreviewInfo from './MoviePreviewInfo';

const MovieList = () => {
  const $ul = createElement({
    tag: 'ul',
    classNames: ['thumbnail-list'],
  });

  const $li = createElement({
    tag: 'li',
  });

  const $div = createElement({
    tag: 'div',
    classNames: ['item'],
  });

  const $img = createElement({
    tag: 'img',
    classNames: ['thumbnail'],
    src: 'https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg',
    alt: '인사이드 아웃 2',
  });

  $ul.appendChild($li);
  $li.appendChild($div);
  $div.appendChild($img);
  $div.appendChild(MoviePreviewInfo({
    bigFont: false,
  }));

  return $ul;
};

export default MovieList;
