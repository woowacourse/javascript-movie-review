import STAR from "../../../../../templates/star_filled.png";
import createElement from "../../../utils/createElement";

export interface Movie {
  id: number;
  korTitle: string;
  posterPath: string;
  voteAverage: number;
}

class MovieItem {
  $element;

  constructor() {
    this.$element = this.generateMovieItem();
  }

  reRender({ id, korTitle, posterPath, voteAverage }: Movie) {
    this.$element.setAttribute("id", id.toString());

    const $thumbnail = this.$element.querySelector(".item-thumbnail");
    const $title = this.$element.querySelector(".item-title");
    const $score = this.$element.querySelector(".item-score");

    $thumbnail?.classList.remove("skeleton");
    $thumbnail?.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${posterPath}`
    );
    $thumbnail?.setAttribute("alt", korTitle);

    $title?.classList.remove("skeleton");
    $title?.append(korTitle);

    $score?.classList.remove("skeleton");

    const $img = createElement({
      tagName: "img",
      attribute: {
        src: STAR,
        alt: "별점",
      },
    });

    $score?.append($img, voteAverage.toString());
  }

  private generateMovieItem() {
    const $div = this.generateItemCard();

    const $a = createElement({
      tagName: "a",
      attribute: { href: "#" },
      children: [$div],
    });

    const $li = createElement({
      tagName: "li",
      attribute: {},
      children: [$a],
    });

    return $li;
  }

  private generateItemCard() {
    const $img = this.generatePoster();

    const $title = this.generateTitle();

    const $voteAverage = this.generateVoteAverage();

    const $div = createElement({
      tagName: "div",
      attribute: {
        class: "item-card",
      },
      children: [$img, $title, $voteAverage],
    });

    return $div;
  }

  private generatePoster() {
    return createElement({
      tagName: "img",
      attribute: {
        class: "item-thumbnail skeleton",
        loading: "lazy",
        alt: "",
      },
    });
  }

  private generateTitle() {
    return createElement({
      tagName: "p",
      attribute: {
        class: "item-title skeleton",
      },
      children: [],
    });
  }

  private generateVoteAverage() {
    const $p = createElement({
      tagName: "p",
      attribute: {
        class: "item-score skeleton",
      },
      children: [],
    });

    return $p;
  }
}

export default MovieItem;
