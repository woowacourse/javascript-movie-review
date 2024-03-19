import IMAGES from "../images";
import BaseComponent from "./abstract/BaseComponent";

type ImageUrl = string;

interface Movie {
  id: number;
  title: string;
  posterPath: ImageUrl;
  voteAverage: number;
}

interface MovieItemProps {
  targetId: string;
  movie: Movie;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

export default class MovieItem extends BaseComponent {
  private movie: Movie;

  constructor({ targetId, movie }: MovieItemProps) {
    super({ targetId });
    this.movie = movie;
  }

  getTemplate(): string {
    const { title, posterPath, voteAverage } = this.movie;

    return `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${BASE_IMAGE_URL}${posterPath}"
            loading="lazy"
            alt="${title}"
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="${IMAGES.starFilled}" alt="별점" /> ${voteAverage}</p>
        </div>
      </a>
    `;
  }
}
