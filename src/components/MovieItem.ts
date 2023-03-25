import { MovieType } from '../types';
import { $ } from '../utils/domSelector';
import { IMAGE_URL } from '../constants';

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
    this.$item = document.createElement('div');
    this.$item.classList.add('item-card');

    this.$item.innerHTML = `
      <img
        class="item-thumbnail"
        src="${IMAGE_URL(posterPath)}"
        alt="${title}"/>
      <p class="item-title">${title}</p>
      <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${voteAverage}</p>`;

    this.$item.setAttribute('data-movie-id', id.toString());
    console.log(this.$item.dataset.movieId);
  }

  private replaceSkeletonWhenLoaded() {
    const $imageElement = $('img', this.$item);

    $imageElement.addEventListener('load', () => {
      try {
        if (this.$skeleton) {
          this.$parentElement.replaceChild(this.$item, this.$skeleton);
        }
      } catch {}
    });
  }

  getItemElement() {
    return this.$item;
  }
}

export default MovieItem;
