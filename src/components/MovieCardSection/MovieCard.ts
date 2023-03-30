import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import { CLASS } from '../../constants/selector';

import type { AppMovie } from '../../types/domain';

export interface MovieDetail {
  id: number;
  title: string;
  genres: string[];
  posterPath: string | null;
  overview: string | null;
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
            <div class="${CLASS.ITEM_SCORE} ${CLASS.SKELETON}"></div>
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
    return `
      <img src=${starFilledImage} alt="별점" />
      <p>${score.toFixed(1)}</p>
    `;
  },

  paint(target: HTMLLIElement, item: AppMovie) {
    const { id, title, posterPath, rating } = item;

    const itemThumbnail = target.querySelector<HTMLDivElement>('.item-thumbnail-container');

    target.dataset.id = id.toString();
    itemThumbnail?.insertAdjacentHTML('beforeend', MovieCard.imageTemplate(posterPath, title));

    MovieCard.setEvent(target, title, rating);
  },

  handlePosterImage(path: string | null) {
    return path === null ? posterNotFoundImage : IMAGE_URL + path;
  },

  setEvent(target: HTMLLIElement, title: string, rating: number) {
    const posterImage = target.querySelector<HTMLImageElement>(`.${CLASS.ITEM_THUMBNAIL}`);

    posterImage?.addEventListener('load', () => {
      MovieCard.removeSkeleton(target);
      MovieCard.paintMovieInfo(target, title, rating);
    });
  },

  removeSkeleton(target: HTMLLIElement) {
    const itemThumbnail = target.querySelector<HTMLDivElement>('.item-thumbnail-container');
    const itemTitle = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_TITLE}`);
    const itemScore = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_SCORE}`);

    itemThumbnail?.classList.remove(CLASS.SKELETON);
    itemTitle?.classList.remove(CLASS.SKELETON);
    itemScore?.classList.remove(CLASS.SKELETON);
  },

  paintMovieInfo(target: HTMLLIElement, title: string, rating: number) {
    const itemTitle = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_TITLE}`);
    const itemScore = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_SCORE}`);

    itemTitle?.insertAdjacentText('beforeend', title);
    itemScore?.insertAdjacentHTML('beforeend', MovieCard.scoreTemplate(rating));
  },
};

export default MovieCard;
