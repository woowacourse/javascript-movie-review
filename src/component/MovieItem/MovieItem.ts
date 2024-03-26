import starFilledImg from '../../image/star_filled.png';
import posterEmptyImg from '../../image/poster_empty.png';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';

class MovieItem {
  #movieItemInfo;

  constructor(movieItemInfo: IMovieItemData) {
    this.#movieItemInfo = movieItemInfo;
  }

  setMovieItemData(liElement: HTMLLIElement) {
    const thumbnailElement = liElement.querySelector(
      '.item-thumbnail',
    ) as HTMLImageElement;

    if (thumbnailElement) {
      if (this.#movieItemInfo.poster_path === null) {
        thumbnailElement.src = posterEmptyImg;
      } else {
        thumbnailElement.src = `${IMAGE_BASE_URL}${
          this.#movieItemInfo.poster_path
        }`;
      }
      thumbnailElement.alt = this.#movieItemInfo.title;
    }

    const titleElement = liElement.querySelector('p');
    if (titleElement) {
      titleElement.textContent = this.#movieItemInfo.title;
    }

    const scoreElement = liElement.querySelector('span');
    if (scoreElement) {
      scoreElement.textContent = String(
        this.#movieItemInfo.vote_average.toFixed(1),
      );
    }

    const starImgElement = liElement.querySelector(
      '.item-filled-star',
    ) as HTMLImageElement;
    if (starImgElement) {
      starImgElement.src = starFilledImg;
    }
  }
}

export default MovieItem;
