import { getMovieDetailApi } from '../../api';
import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import { isCustomErrorMessage } from '../../constants/message';
import { CLASS } from '../../constants/selector';

import type { AppMovie } from '../../types/movie';

export interface MovieDetail {
  id: number;
  title: string;
  genres: string[];
  posterPath: string | null;
  overview: string;
  rating: number;
}

const MovieCard = {
  template() {
    return `
      <li>
        <button type="button" class="item-card-button">
          <div class="item-card">
            <div class="item-thumbnail-container ${CLASS.SKELETON}"></div>
            <p class="${CLASS.ITEM_TITLE} ${CLASS.SKELETON}"></p>
            <p class="${CLASS.ITEM_SCORE} ${CLASS.SKELETON}"></p>
          </div>
        </button>
      </li>
    `;
  },

  imageTemplate(path: string | null, title: string) {
    return `
      <img
        class="${CLASS.ITEM_THUMBNAIL}"
        src="${MovieCard.handlePosterImage(path)}"
        loading="lazy"
        alt="${title}"
      />
    `;
  },

  scoreTemplate(score: number) {
    return `<img src=${starFilledImage} alt="별점" /> ${score.toFixed(1)}`;
  },

  paint(target: HTMLLIElement, item: AppMovie) {
    const { id, title, posterPath, rating } = item;

    target.dataset.id = id.toString();

    const itemThumbnail = target.querySelector<HTMLDivElement>('.item-thumbnail-container');
    const itemTitle = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_TITLE}`);
    const itemScore = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_SCORE}`);

    itemThumbnail?.insertAdjacentHTML('beforeend', MovieCard.imageTemplate(posterPath, title));
    itemTitle?.insertAdjacentText('beforeend', title);
    itemScore?.insertAdjacentHTML('beforeend', MovieCard.scoreTemplate(rating));

    itemThumbnail?.classList.remove(CLASS.SKELETON);
    itemTitle?.classList.remove(CLASS.SKELETON);
    itemScore?.classList.remove(CLASS.SKELETON);
  },

  handlePosterImage(path: string | null) {
    return path === null ? posterNotFoundImage : IMAGE_URL + path;
  },
};

export default MovieCard;
