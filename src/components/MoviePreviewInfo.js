import createElement from './utils/createElement';

const MoviePreviewInfo = () => {
  const $fragment = document.createDocumentFragment();

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

  $fragment.append($rate);
  $rate.append($starImg);
  $rate.append($rateValue);
  $fragment.append($title);

  $title.textContent = '인사이드 아웃2';

  return $fragment;
};

export default MoviePreviewInfo;
