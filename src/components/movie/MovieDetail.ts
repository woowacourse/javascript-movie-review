import { StarFilled, StartEmpty } from "../../../images";
import { Movie } from "../../types/type";
import { $ } from "../../utils/dom";

class MovieDetail extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "";
  }

  render(movie: Movie, movieScore = "0") {
    this.innerHTML = /* html */ `
      <div class="detail-header">
        <h2>${movie.title}</h2>
      </div>
      <div class="detail-content">
        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" />
        <div class="detail-description">
          <div class="detail-genre-vote">
            <span id="detail-genre">${movie.genres.join(", ")}</span>
            <span>
              <img src="${StarFilled}" class="star" alt="별점" />
              </span>
            <span>
              ${movie.vote_average}
            </span>
          </div>
          <p class="detail-overview">${
            movie.overview !== ""
              ? movie.overview
              : "줄거리가 준비되지 않았습니다."
          }</p>
          <movie-score class="detail-score" movie-id="${
            movie.id
          }" movie-score="${movieScore}"/>
         </div>
      </div>
    `;
  }

  closeModal() {
    const modal = this.querySelector<HTMLDialogElement>(".modal");

    modal?.close();
  }
}

interface MovieDetail {
  "movie-detail": typeof MovieDetail;
}

customElements.define("movie-detail", MovieDetail);

export default MovieDetail;
