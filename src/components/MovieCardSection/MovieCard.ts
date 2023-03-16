import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import { CLASS } from '../../constants/selector';
import type { Movie } from '../../types/movie';

const MovieCard = {
  template() {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="${CLASS.ITEM_THUMBNAIL} ${CLASS.SKELETON}"></div>
            <p class="${CLASS.ITEM_TITLE} ${CLASS.SKELETON}"></p>
            <p class="${CLASS.ITEM_SCORE} ${CLASS.SKELETON}"></p>
          </div>
        </a>
      </li>
    `;
  },
  imageTemplate(path: string | null, title: string) {
    return `
      <img
        class="${CLASS.ITEM_THUMBNAIL} ${CLASS.SKELETON}"
        src="${MovieCard.handlePosterImage(path)}"
        loading="lazy"
        alt="${title}"
      />
    `;
  },
  scoreTemplate(score: number) {
    return `<img src=${starFilledImage} alt="별점" /> ${score.toFixed(1)}`;
  },
  paint(target: HTMLLIElement, item: Movie) {
    const { title, poster_path: path, vote_average: score } = item;

    const itemThumbnail = target.querySelector<HTMLDivElement>(`.${CLASS.ITEM_THUMBNAIL}`);
    const itemTitle = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_TITLE}`);
    const itemScore = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_SCORE}`);

    itemThumbnail?.insertAdjacentHTML('beforeend', MovieCard.imageTemplate(path, title));
    itemTitle?.insertAdjacentText('beforeend', title);
    itemScore?.insertAdjacentHTML('beforeend', MovieCard.scoreTemplate(score));

    itemThumbnail?.classList.remove(CLASS.SKELETON);
    itemTitle?.classList.remove(CLASS.SKELETON);
    itemScore?.classList.remove(CLASS.SKELETON);
  },
  handlePosterImage(path: string | null) {
    return path === null ? posterNotFoundImage : IMAGE_URL + path;
  },
};

export default MovieCard;
