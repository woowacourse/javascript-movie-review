import createElement from './utils/createElement';

const MoviePreviewInfo = ({ popularMovie, bigFont = true }) => {
  const title = popularMovie?.title;
  const voteAverage = popularMovie?.vote_average;

  const $fragment = document.createDocumentFragment();

  const $rate = createElement({ tag: 'div', classNames: ['rate'] });

  const $starImg = createElement({
    tag: 'img',
    classNames: ['star'],
    src: ['./images/star_empty.png'],
  });

  const $rateValue = createElement({
    tag: 'span',
    classNames: [bigFont ? 'rate-value' : null],

  });

  $rateValue.textContent = voteAverage;

  const $title = createElement({
    tag: 'div',
    classNames: [bigFont ? 'title' : null],
  });

  $fragment.append($rate);
  $rate.append($starImg);
  $rate.append($rateValue);
  $fragment.append($title);

  $title.textContent = title;

  return $fragment;
};

export default MoviePreviewInfo;
