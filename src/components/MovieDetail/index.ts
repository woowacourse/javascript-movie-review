import { MovieDetailResponse } from "../../types";
import starImgFilled from "../../assets/star_filled.png";
import starImgEmpty from "../../assets/star_empty.png";
import { $, $$ } from "../../utils/selector";

class MovieDetail {
  constructor() {}
  static render(movieDetail: MovieDetailResponse, defaultRate: number) {
    const { id, title, genres, overview, poster_path, vote_average } =
      movieDetail;
    const genreNames = genres.map((genre) => genre.name).join(", ");

    return /*html */ `
          <div class="modal-header">
            <p class="movie-title">${title}</p>
          </div>
          <div class="movie-card">
            <div class="movie-thumbnail">
              <img
                src="https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}"
                class="movie-thumbnail skeleton"
                loading="lazy"
               />
            </div>
            <div class="movie-detail">
              <div>
                <div>
                  <span>${genreNames}</span>
                  <span class="movie-score">
                    <img src="${starImgFilled}" /> ${vote_average}
                  </span>
                </div>
                <p class="movie-description">   
                  ${overview}
                </p>
              </div>
              <div class="movie-rate">
                ${MovieDetail.renderStars(id, defaultRate)}
              </div>
            </div>
          </div>
          `;
  }

  static renderStars(movieId: number, movieRate: number) {
    const getStars = Array.from(
      { length: 5 },
      (_, index) =>
        `<img 
          src="${movieRate > index ? starImgFilled : starImgEmpty}" 
          alt="별점" 
          class="star-rate"
          data-id="${movieId}"
          data-rate="${index}"
        />`
    );

    return /*html*/ `
    내 별점
    <div class="movie-stars ${movieId}">
      ${getStars.join("")}
    </div>
    <div class="movie-comment">
      나의 점수는? ${movieRate * 2} 점
    </div>`;
  }
}

export { MovieDetail };
