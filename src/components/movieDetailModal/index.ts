import { NO_OVERVIEW, RATING_MESSAGES } from "../../constants";
import { MovieDetail } from "../../type";

export default class MovieDetailModal extends HTMLElement {
  constructor() {
    super();
  }

  renderMovieDetail(movie: MovieDetail) {
    this.innerHTML = `
      <dialog id="movie-detail">
        <div class="modal-backdrop"></div>
        <div class="modal">
          <h2>${movie.title}</h2>
          <button class="modal-close-button"><i class="bi bi-x-lg"></i></button>
          <div id="detail-wrap">
            <img
              class="item-thumbnail skeleton"
              src="https://image.tmdb.org/t/p/w500${movie.poster}" 
              onerror="
                this.style.border='1px solid #e2e2e2';
                this.style.background='var(--background-color)';
                this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';"
              loading="lazy" alt="${movie.title}">
            <article id="detail">
              <div id="genre-and-score">
                <h3 class="item-genres">${
                  movie.genres ? movie.genres : "장르 없음"
                }</h3>
                <p class="item-score">
                  <img src="./assets/star_filled.png" alt="별점" />
                  <span>${movie.ratings.toFixed(1)}</span>
                </p>
              </div>
              <p class="overview">${
                movie.overview === "" ? NO_OVERVIEW : movie.overview
              }</p>
              <section id="user-ratings-section">
                <h3>내 별점</h3>
                <div class="ratings">
                  <div class="stars">
                    ${'<img src="./assets/star_empty.png" alt="별점" />'.repeat(
                      5
                    )}
                  </div>
                  <div id="filled-stars" class="stars">
                    ${'<img src="./assets/star_filled.png" alt="별점" />'.repeat(
                      5
                    )}
                  </div>
                  <input
                    id="user-ratings-input"
                    class="${movie.id}-ratings"
                    type="range"
                    value="1"
                    step="2"
                    min="0"
                    max="10"
                  />
                </div>
                <span class="user-ratings">${movie.userRatings}</span>
                <p class="message">${RATING_MESSAGES[movie.userRatings]}</p>
              </section>
            </article>
          </div>
        </div>
      </dialog>
    `;
  }
}
