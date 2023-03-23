import { StarFilled, StartEmpty } from "../../images";
import { Movie } from "../types/type";
import { $ } from "../utils/dom";

class MovieDetail extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "";
  }

  render(movie: Movie) {
    this.innerHTML = /* html */ `
      <div class="detail-header">
        <h2>${movie.title}</h2>
        <button id="close-button">X</button>
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
          <p class="detail-overview">${movie.overview}</p>
          <movie-score class="detail-score"/>
         </div>
      </div>
    `;
  }

  // closeModal() {
  //   $(".modal").close();
  // }

  // handleRestaurantDelete() {
  //   dispatchCustomEvent($(".restaurant-list-container"), {
  //     eventType: "deleteRestaurant",
  //     data: this.restaurant.restaurantID,
  //   });
  //   this.closeModal();
  // }
}

interface MovieDetail {
  "movie-detail": typeof MovieDetail;
}

customElements.define("movie-detail", MovieDetail);

export default MovieDetail;
