import starFilledImg from '../../image/star_filled.png';
import posterEmptyImg from '../../image/poster_empty.png';
import { IMAGE_BASE_URL } from '../../constant/setting';
import { formatNumberToOneDecimalPlace } from '../../utility/converter';

class MovieItem {
  #movieItemInfo;

  constructor(movieItemInfo: IMovieItemData) {
    this.#movieItemInfo = movieItemInfo;
  }

  setMovieItemData(liElement: HTMLLIElement) {
    liElement.id = this.#movieItemInfo.id.toString();

    const thumbnailElement = liElement.querySelector(
      '.item-thumbnail',
    ) as HTMLImageElement;

    if (thumbnailElement) {
      thumbnailElement.src = this.#movieItemInfo.poster_path
        ? `${IMAGE_BASE_URL}${this.#movieItemInfo.poster_path}`
        : posterEmptyImg;
      thumbnailElement.alt = this.#movieItemInfo.title;
    }

    const titleElement = liElement.querySelector('p');
    if (titleElement) {
      titleElement.textContent = this.#movieItemInfo.title;
    }

    const scoreElement = liElement.querySelector('span');
    if (scoreElement) {
      scoreElement.textContent = String(
        formatNumberToOneDecimalPlace(this.#movieItemInfo.vote_average),
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
