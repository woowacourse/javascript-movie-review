import defaultA from '../../statics/images/no-poster-found-1.png';
import defaultB from '../../statics/images/no-poster-found-2.png';
import { PosterProps } from '../../types/moviePoster';

const DEFAULT_THUMBNAILS = [defaultA, defaultB];

const createPoster = ({
  type,
  title,
  poster_path,
  width = 500,
}: PosterProps) => {
  const $poster = document.createElement('img');
  $poster.classList.add(type);
  $poster.loading = 'lazy';
  $poster.alt = title;

  $poster.onerror = () => {
    const randIdx = Math.floor(Math.random() * DEFAULT_THUMBNAILS.length);
    $poster.src = DEFAULT_THUMBNAILS[randIdx];
  };
  $poster.src = `https://image.tmdb.org/t/p/w${width}${poster_path}`;

  return $poster;
};

const MoviePoster = (props: PosterProps) => {
  const $poster = createPoster(props);

  const render = () => $poster;
  return {
    render,
  };
};

export default MoviePoster;
