import noImg from '../../templates/no_image.svg';
import { IMAGE_URL } from '../config';
import { Movie } from '../type/movie';
import { createElementWithAttribute } from '../utils';

const POSTER_SIZE = 'w500';

class MovieImg {
  #element: HTMLImageElement;

  constructor(movie: Movie) {
    this.#element = this.#makeMovieImg(movie);
  }

  get element() {
    return this.#element;
  }

  #getImgSrc(path: string | null) {
    return path === null ? noImg : IMAGE_URL + POSTER_SIZE + path;
  }

  #makeMovieImg(movie: Movie) {
    return createElementWithAttribute('img', {
      class: 'movie-thumbnail',
      src: this.#getImgSrc(movie.poster_path),
      loading: 'lazy',
      alt: movie.title,
    }) as HTMLImageElement;
  }
}

export default MovieImg;
