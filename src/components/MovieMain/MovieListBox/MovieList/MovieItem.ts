import { IMAGE_BASE_URL } from "../../../../constants/api";
import IMAGE_PLACEHOLDER from "../../../../../templates/image-Placeholder.png";
import STAR from "../../../../../templates/star_filled.png";
import createElement from "../../../utils/createElement";

export interface Movie {
  id: number;
  korTitle: string;
  posterPath: string;
  voteAverage: number;
}

const SKELETON: Movie = { id: 0, korTitle: "", posterPath: "", voteAverage: 0 };

class MovieItem {
  $element;

  constructor({ id, korTitle, posterPath, voteAverage }: Movie = SKELETON) {
    this.$element = this.generateMovieItem({
      id,
      korTitle,
      posterPath,
      voteAverage,
    });
  }

  private generateMovieItem(movie: Movie) {
    const $div = this.generateItemCard(movie);

    const $a = createElement({
      tagName: "div",
      children: [$div],
    });

    const $li = createElement({
      tagName: "li",
      attribute: { id: String(movie.id), class: "movie-item" },
      children: [$a],
    });

    return $li;
  }

  private generateItemCard(movie: Movie) {
    const $img = this.generatePoster(movie.id, movie.posterPath);

    const $title = this.generateTitle(movie.korTitle);

    const $voteAverage = this.generateVoteAverage(movie.voteAverage);

    const $div = createElement({
      tagName: "div",
      attribute: {
        class: "item-card",
      },
      children: [$img, $title, $voteAverage],
    });

    return $div;
  }

  private generatePoster(id: number, posterPath: string) {
    const $poster = createElement({
      tagName: "img",
      attribute: {
        class: `item-thumbnail ${id ? "" : "skeleton"}`,
        loading: "lazy",
        alt: "",
      },
    });

    if (id) {
      $poster.setAttribute(
        "src",
        posterPath ? `${IMAGE_BASE_URL}${posterPath}` : IMAGE_PLACEHOLDER
      );
    }

    return $poster;
  }

  private generateTitle(title: string) {
    return createElement({
      tagName: "p",
      children: [title],
      attribute: {
        class: `item-title ${title ? "" : "skeleton"}`,
      },
    });
  }

  private generateVoteAverage(voteAverage: number) {
    const $star = createElement({
      tagName: "img",
      attribute: {
        src: STAR,
        alt: "별점",
      },
    });

    const $voteValue = createElement({
      tagName: "span",
      children: [String(voteAverage)],
    });

    const $vote = createElement({
      tagName: "p",
      children: voteAverage ? [$star, $voteValue] : [],
      attribute: {
        class: `item-score ${voteAverage ? "" : "skeleton"}`,
      },
    });

    return $vote;
  }
}

export default MovieItem;
