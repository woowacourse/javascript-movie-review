import createElement from './utils/createElement';

const Header = () => {
  const $header = createElement({
    tag: 'header',
  });

  const $backgroundContainer = createElement({
    tag: 'div',
    classNames: ['background-container'],
  });

  const $overlay = createElement({
    tag: 'div',
    classNames: ['overlay'],
    'aria-hidden': 'true',
  });

  const $topRatedContainer = createElement({
    tag: 'div',
    classNames: ['top-rated-container'],
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

  const $topRatedMovie = createElement({
    tag: 'div',
    classNames: ['top-rated-movie'],
  });

  const $rate = createElement({ tag: 'div', classNames: ['rate'] });

  const $starImg = createElement({
    tag: 'img',
    classNames: ['star'],
    src: ['./images/star_empty.png'],
  });

  const $rateValue = createElement({
    tag: 'span',
    classNames: ['rate-value'],

  });

  $rateValue.textContent = '9.5';

  const $title = createElement({
    tag: 'div',
    classNames: ['title'],
  });

  $title.textContent = '인사이드 아웃2';

  const $button = createElement({
    tag: 'button',
    classNames: ['primary', 'detail'],
  });

  $button.textContent = '자세히 보기';

  $header.append($backgroundContainer);
  $backgroundContainer.append($overlay);
  $backgroundContainer.append($topRatedContainer);
  $topRatedContainer.append($logo);
  $logo.append($logoImg);
  $topRatedContainer.append($topRatedMovie);
  $topRatedMovie.append($rate);
  $rate.append($starImg);
  $rate.append($rateValue);
  $topRatedMovie.append($title);
  $topRatedMovie.append($button);

  return $header;
};

export default Header;
