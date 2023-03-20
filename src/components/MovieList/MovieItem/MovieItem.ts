import "./style.css";
import StarIcon from "../../../images/star_filled.png";
import NotFoundImageIcon from "../../../images/not_found_image.png";
import { imageUrl } from "../../../constants/urls";
import Movie, { IMovie } from "../../../domain/Movie";

class MovieItem {
  $target: HTMLUListElement;
  #movieInfo: IMovie;

  constructor($target: HTMLUListElement, movie: Movie) {
    this.$target = $target;
    this.#movieInfo = movie.getMovieData();

    this.render();
  }

  convertToImgUrl(imgSrc: string) {
    return `${imageUrl}${imgSrc}`;
  }

  template() {
    const { title, posterSrc, voteAverage } = this.#movieInfo;

    return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src=${posterSrc ? this.convertToImgUrl(posterSrc) : NotFoundImageIcon}
            loading="lazy"
            alt=${title}
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src=${StarIcon} alt="별점" /> ${voteAverage}</p>
        </div>
      </a>
    </li>
  `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }
}

export default MovieItem;
