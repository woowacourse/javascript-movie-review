import { getMovieDetailApi } from '../../api';
import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import { isCustomErrorMessage } from '../../constants/message';
import { CLASS } from '../../constants/selector';

import type { AppMovie } from '../../types/movie';

export interface MovieDetail {
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
            <div class="${CLASS.ITEM_THUMBNAIL} ${CLASS.SKELETON}"></div>
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

  paint(target: HTMLLIElement, item: AppMovie) {
    const { id, title, posterPath, rating } = item;

    target.dataset.id = id.toString();

    const itemThumbnail = target.querySelector<HTMLDivElement>(`.${CLASS.ITEM_THUMBNAIL}`);
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

  async getMovieDetail(movieId: string): Promise<MovieDetail | undefined> {
    try {
      const { title, genres: rawGenres, poster_path: posterPath, overview, vote_average: voteAverage } = await getMovieDetailApi(movieId);
      const genres = rawGenres.map((genre) => genre.name);

      return { title, genres, posterPath, overview, rating: voteAverage };
    } catch (error) {
      if (isCustomErrorMessage(error)) {
        alert(error.error);
        return;
      }

      if (error instanceof Error) {
        alert(error.message);
      }
    }
  },
};

export default MovieCard;
