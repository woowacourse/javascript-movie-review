import { MovieType } from '../types';
import { $ } from '../utils/domSelector';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const NO_IMAGE_URL = '../../assets/no_image.png';

type MovieItemConstructorType = {
  parentElement: HTMLElement;
  skeleton: Element;
  movieInfo: MovieType;
};

class MovieItem {
  private $parentElement;
  private $skeleton;
  private $item!: HTMLElement;

  constructor({ parentElement, skeleton, movieInfo }: MovieItemConstructorType) {
    this.$parentElement = parentElement;
    this.$skeleton = skeleton;
    this.createElement(movieInfo);
    this.replaceSkeletonWhenLoaded();
  }

  private createElement({ title, posterPath, id, voteAverage }: MovieType) {
    const imageUrl = posterPath ? `${IMAGE_BASE_URL}${posterPath}` : NO_IMAGE_URL;

    this.$item = document.createElement('a');
    this.$item.innerHTML = `
      <div class="item-card" movie-id="${id}">
        <img
          class="item-thumbnail"
          src="${imageUrl}"
          alt="${title}"/>
        <p class="item-title">${title}</p>
        <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${voteAverage}</p>
      </div>`;
  }

  private replaceSkeletonWhenLoaded() {
    const $imageElement = $('img', this.$item);

    $imageElement.addEventListener('load', () => {
      this.$parentElement.replaceChild(this.$item, this.$skeleton);
    });
  }

  getItemElement() {
    return this.$item;
  }
}

export default MovieItem;
