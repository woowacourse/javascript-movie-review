import createElement from './utils/createElement';
import MoviePreviewInfo from './MoviePreviewInfo';

const MovieList = () => {
  const $container = createElement({
    tag: 'div',
    classNames: ['container'],
  });

  const $main = createElement({
    tag: 'main',
  });

  const $section = createElement({
    tag: 'section',
  });

  const $h2 = createElement({
    tag: 'h2',
  });

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

  $h2.textContent = '지금 인기 있는 영화';

  $container.appendChild($main);
  $main.appendChild($section);
  $section.appendChild($h2);
  $section.appendChild($ul);
  $ul.appendChild($li);
  $li.appendChild($div);
  $div.appendChild($img);
  $div.appendChild(MoviePreviewInfo({
    bigFont: false,
  }));

  return $container;
};

export default MovieList;
