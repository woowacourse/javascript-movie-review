import MoviePreviewInfo from './MoviePreviewInfo';
import createElement from './utils/createElement';
import imageUrl from '../utils/imageUrl';

const MovieItem = ({ popularMovie }) => {
  const title = popularMovie?.title;
  const posterPath = popularMovie?.poster_path;

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
    src: `${imageUrl(posterPath)}`,
    alt: `${title}`,
  });

  $li.appendChild($div);
  $div.appendChild($img);
  $div.appendChild(MoviePreviewInfo({
    popularMovie,
    bigFont: false,
  }));

  return $li;
};

export default MovieItem;
