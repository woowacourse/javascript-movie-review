import getMovieById from '../../api/getMovieById';
import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import { CLASS } from '../../constants/selector';
import type { Movie } from '../../types/movie';
import MovieDetailModal from '../MovieDatailModal';
import StarRate from '../MovieDatailModal/StarRate';

const MovieCard = {
  template() {
    return `
      <li>
        <div class="item-card">
          <div class="${CLASS.ITEM_THUMBNAIL} ${CLASS.SKELETON}"></div>
          <p class="${CLASS.ITEM_TITLE} ${CLASS.SKELETON}"></p>
          <p class="${CLASS.ITEM_SCORE} ${CLASS.SKELETON}"></p>
        </div>
      </li>
    `;
  },
  imageTemplate(path: string | null, title: string) {
    return `
      <img
        class="${CLASS.ITEM_THUMBNAIL} ${CLASS.SKELETON}"
        src="${MovieCard.handlePosterImage(path)}"
        onerror="this.src='${posterNotFoundImage}'"
        loading="lazy"
        alt="${title}"
      />
    `;
  },
  scoreTemplate(score: number) {
    return `<img src=${starFilledImage} alt="별점" /> ${score.toFixed(1)}`;
  },
  paint(target: HTMLLIElement, item: Movie) {
    const { id, title, poster_path: path, vote_average: score } = item;
    target.dataset.id = String(id);
    const itemThumbnail = target.querySelector<HTMLDivElement>(`.${CLASS.ITEM_THUMBNAIL}`);
    const itemTitle = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_TITLE}`);
    const itemScore = target.querySelector<HTMLParagraphElement>(`.${CLASS.ITEM_SCORE}`);

    itemThumbnail?.insertAdjacentHTML('beforeend', MovieCard.imageTemplate(path, title));
    itemTitle?.insertAdjacentText('beforeend', title);
    itemScore?.insertAdjacentHTML('beforeend', MovieCard.scoreTemplate(score));

    itemThumbnail?.classList.remove(CLASS.SKELETON);
    itemTitle?.classList.remove(CLASS.SKELETON);
    itemScore?.classList.remove(CLASS.SKELETON);

    const card = document.querySelector<HTMLLIElement>(`[data-id='${String(id)}']`);
    card?.addEventListener('click', async () => {
      const data = await getMovieById(String(id));
      MovieDetailModal.open(data);
      StarRate.paint(String(id));
    });
  },
  handlePosterImage(path: string | null) {
    return path === null ? posterNotFoundImage : IMAGE_URL + path;
  },
};

export default MovieCard;
