import createElement from './utils/createElement';

const STAR_IMG_SRC = './images/star_empty.png';

const MoviePreviewInfo = ({ movie, bigFont = true }) => {
  const title = movie.title;
  const voteAverage = movie.vote_average;
  

  const $fragment = document.createDocumentFragment();

  const $rate = createElement({ tag: 'div', classNames: ['rate'] });

  const $starImg = createElement({
    tag: 'img',
    classNames: ['star'],
    src: STAR_IMG_SRC,
  });

  const $rateValue = createElement({
    tag: 'span',
  });

  
  const $title = createElement({
    tag: 'div',
  });
  
  if(bigFont) {
    $rateValue.classList.add('rate-value');
    $title.classList.add('title');
  }
  
  $fragment.append($rate);
  $rate.append($starImg);
  $rate.append($rateValue);
  $fragment.append($title);
  
  $rateValue.textContent = voteAverage;
  $title.textContent = title;

  return $fragment;
};

export default MoviePreviewInfo;
