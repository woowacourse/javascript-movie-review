import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import type { Movie } from '../../types/movie';

const MovieCard = {
  template() {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <p class="item-title skeleton"></p>
            <p class="item-score skeleton"></p>
          </div>
        </a>
      </li>
    `;
  },
  imageTemplate(path: string | null, title: string) {
    return `
      <img
        class="item-thumbnail skeleton"
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

    const itemThumbnail = target.querySelector<HTMLDivElement>('.item-thumbnail');
    const itemTitle = target.querySelector<HTMLParagraphElement>('.item-title');
    const itemScore = target.querySelector<HTMLParagraphElement>('.item-score');

    itemThumbnail?.insertAdjacentHTML('beforeend', MovieCard.imageTemplate(path, title));
    itemTitle?.insertAdjacentText('beforeend', title);
    itemScore?.insertAdjacentHTML('beforeend', MovieCard.scoreTemplate(score));

    itemThumbnail?.classList.remove('skeleton');
    itemTitle?.classList.remove('skeleton');
    itemScore?.classList.remove('skeleton');
  },
  handlePosterImage(path: string | null) {
    return path === null ? posterNotFoundImage : IMAGE_URL + path;
  },
};

export default MovieCard;
