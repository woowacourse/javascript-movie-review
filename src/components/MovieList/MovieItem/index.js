import "./index.css";
import StarIcon from "../../../images/star_filled.png";
import NotFoundImageIcon from "../../../images/not_found_image.png";
import { imageUrl } from "../../../constants/urls";

class MovieItem {
  $target;
  #movieInfo;

  constructor($target, movie) {
    this.$target = $target;
    this.#movieInfo = movie.getMovieData();

    this.render();
  }

  convertToImgUrl(imgSrc) {
    return `${imageUrl}${imgSrc}`;
  }

  template() {
    const { id, title, posterSrc, voteAverage } = this.#movieInfo;

    return `
    <li data-id=${id}>
      <div class="item-card">
        <img
          class="item-thumbnail"
          src=${posterSrc ? this.convertToImgUrl(posterSrc) : NotFoundImageIcon}
          alt=${title}
        />
        <p class="item-title">${title}</p>
        <p class="item-score"><img src=${StarIcon} alt="별점" /> ${voteAverage}</p>
      </div>
    </li>
  `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }
}

export default MovieItem;
