import DEFAULT_IMAGE from "../../../../../templates/failed_to_load.png";
import STAR from "../../../../../templates/star_filled.png";
import createElement from "../../../utils/createElement";

export interface Movie {
  id: number;
  korTitle: string;
  posterPath: string;
  voteAverage: number;
}

class MovieItem {
  private $element: HTMLElement;

  constructor({ onClick }: { onClick: (id: number) => void }) {
    this.$element = this.generateMovieItem(onClick);
  }

  getElement() {
    return this.$element;
  }

  reRender({ id, korTitle, posterPath, voteAverage }: Movie) {
    this.$element.setAttribute("id", id.toString());

    const $thumbnail = this.$element.querySelector(".item-thumbnail");
    const $title = this.$element.querySelector(".item-title");
    const $score = this.$element.querySelector(".item-score");

    $thumbnail?.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${posterPath}`
    );
    $thumbnail?.addEventListener("error", (event: Event) => {
      if (!(event.target instanceof HTMLImageElement)) {
        return;
      }
      event.target.src = DEFAULT_IMAGE;
    });
    $thumbnail?.addEventListener("load", (e) => {
      $thumbnail?.classList.remove("skeleton");
      $thumbnail?.setAttribute("alt", korTitle);
    });

    $title?.classList.remove("skeleton");
    $title?.append(korTitle);

    $score?.classList.remove("skeleton");
    $score?.append(
      createElement({
        tagName: "img",
        attribute: {
          src: STAR,
          alt: "별점",
        },
      }),
      voteAverage.toString()
    );
  }

  remove() {
    this.$element.remove();
  }

  private generateMovieItem(onClick: (id: number) => void) {
    const $div = this.generateItemCard();

    const $a = createElement({
      tagName: "a",
      attribute: { href: "#" },
      addEventListener: {
        click: (e: Event) => {
          e.preventDefault();
          onClick(Number(this.$element.id));
        },
      },
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
