import { IMAGE_URL } from '../../config';
import { MOVIE_CHILDREN_CLASS } from '../../constants';
import noImg from '../../images/no_image.svg';
import { createElementWithAttribute } from '../../utils';

const POSTER_SIZE = 'w500';
interface MovieImgProps {
  poster_path: string | null;
  title: string;
}
class MovieImg {
  #element: HTMLImageElement;

  constructor(props: MovieImgProps) {
    this.#element = this.#makeMovieImg(props);
  }

  get element() {
    return this.#element;
  }

  #getImgSrc(path: string | null) {
    return path === null ? noImg : IMAGE_URL + POSTER_SIZE + path;
  }

  #makeMovieImg(props: MovieImgProps) {
    const $img = createElementWithAttribute<HTMLImageElement>('img', {
      class: MOVIE_CHILDREN_CLASS.thumbnail,
      src: this.#getImgSrc(props.poster_path),
      loading: 'lazy',
      alt: `${props.title} 포스터`,
    });

    if (props.poster_path === null) {
      $img.classList.add('none-img');
    }
    return $img;
  }
}

export default MovieImg;
