import {
  getUserRating,
  setUserRating,
} from "../../../../domain/handleUserRating";

import { $ } from "../../../utils/querySelectors";
import CommonHtmlElement from "../../../utils/CommonHtmlElement";
import MovieRating from "./MovieRating";
import STAR_IMAGE from "../../../../../templates/star_filled.png";
import createElement from "../../../utils/createElement";
import generateModal from "../../../common/generateModal";
import getMovieDetails from "../../../../domain/getMovieDetails";

interface MovieDetails {
  id: number;
  korTitle: string;
  genres: string[];
  voteAverage: number;
  descriptions: string;
  posterPath: string;
}

const SKELETON = "skeleton";
class MovieDetailModal {
  $element;
  private movieId;

  constructor(movieId: number) {
    this.movieId = movieId;
    const children = this.generateDetailModalTemplate();
    this.$element = generateModal({
      children: [...children],
      closeModal: this.toggle.bind(this),
    });
    this.movieDetails();
  }

  toggle() {
    this.$element.classList.toggle("modal--open");
    $("body")?.classList.toggle("window-fixed");
  }

  reRender({
    id,
    korTitle,
    genres,
    voteAverage,
    descriptions,
    posterPath,
  }: MovieDetails) {
    this.titleReRender(korTitle);
    this.genreReRender(genres);
    this.voteReRender(voteAverage);
    this.descriptionReRender(descriptions);
    this.posterReRender(posterPath);

    const rating = getUserRating(id);
    this.renderUserRating(rating);
  }

  private titleReRender(korTitle: string) {
    const title = new CommonHtmlElement($(".modal-detail-header>.modal-title"));

    title.injectTextContent(korTitle);
    title.removeClassName(SKELETON);
  }

  private genreReRender(genres: string[]) {
    const genre = new CommonHtmlElement($("span.genre"));

    genre.injectTextContent(genres.join(", "));
    genre.removeClassName(SKELETON);
  }

  private voteReRender(voteAverage: number) {
    const vote = new CommonHtmlElement($("span.vote-value"));

    vote.injectTextContent(String(voteAverage));
    vote.removeClassName(SKELETON);
  }

  private descriptionReRender(descriptions: string) {
    const description = new CommonHtmlElement($(".movie-description"));

    description.injectTextContent(descriptions);
    description.removeClassName(SKELETON);
  }

  private posterReRender(posterPath: string) {
    const poster = new CommonHtmlElement(
      $(".modal-detail-body>img.item-thumbnail")
    );

    poster.setAttribute("src", posterPath);
    poster.removeClassName(SKELETON);
  }

  private async movieDetails() {
    const res = await getMovieDetails(this.movieId);
    this.reRender(res);
  }

  private renderUserRating(rating: number = 0) {
    const $rating = new MovieRating(rating, this.saveUserRating.bind(this))
      .$element;
    $(".movie-rating")?.replaceWith($rating);
  }

  private saveUserRating(rating: number) {
    setUserRating({ id: this.movieId, userRating: rating });
  }

  private generateDetailModalTemplate() {
    const $detailHeader = this.generateDetailHeader();
    const $detailBody = this.generateDetailBody();
    return [$detailHeader, $detailBody];
  }

  private generateDetailHeader() {
    const $empty = createElement({
      tagName: "div",
      attribute: { class: "empty" },
    });
    const $title = createElement({
      tagName: "h2",
      attribute: { class: `modal-title ${SKELETON}` },
    });
    const $exitButton = createElement({
      tagName: "button",
      attribute: { class: "modal-close-button" },
      children: ["닫기"],
    });
    const $buttonDiv = createElement({
      tagName: "div",
      attribute: { class: "modal-close-button-box" },
      children: [$exitButton],
      eventListener: { click: this.toggle.bind(this) },
    });

    const $detailHeader = createElement({
      tagName: "div",
      children: [$empty, $title, $buttonDiv],
      attribute: { class: "modal-detail-header" },
    });

    return $detailHeader;
  }

  private generateDetailBody() {
    const $poster = createElement({
      tagName: "img",
      attribute: {
        class: `item-thumbnail ${SKELETON}`,
      },
    });

    const $detailInfoWithRating = this.generateDetailInfoWithRating();

    const $detailBody = createElement({
      tagName: "div",
      children: [$poster, $detailInfoWithRating],
      attribute: { class: "modal-detail-body" },
    });

    return $detailBody;
  }

  private generateDetailInfoWithRating() {
    const $genreWithVote = this.generateGenreWithVote();
    const $description = createElement({
      tagName: "div",
      attribute: { class: `movie-description text-body ${SKELETON}` },
    });

    const $detailInfo = createElement({
      tagName: "div",
      children: [$genreWithVote, $description],
      attribute: { class: "modal-detail-info" },
    });

    const $rating = new MovieRating().$element;

    const $detailInfoWithRating = createElement({
      tagName: "div",
      children: [$detailInfo, $rating],
      attribute: { class: "modal-detail-info-with-rating" },
    });

    return $detailInfoWithRating;
  }

  private generateGenreWithVote() {
    const $genre = createElement({
      tagName: "span",
      attribute: { class: `genre ${SKELETON}` },
    });

    const $starImg = createElement({
      tagName: "img",
      attribute: {
        src: STAR_IMAGE,
        alt: "별점",
      },
    });

    const $voteValue = createElement({
      tagName: "span",
      attribute: { class: `vote-value ${SKELETON}` },
    });

    const $vote = createElement({
      tagName: "span",
      children: [$starImg, $voteValue],
      attribute: { class: "vote" },
    });

    const $genreWithVote = createElement({
      tagName: "div",
      children: [$genre, $vote],
      attribute: { class: "modal-detail-genre-with-vote text-body" },
    });

    return $genreWithVote;
  }
}

export default MovieDetailModal;
