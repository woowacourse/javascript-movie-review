import { MovieDetailResponse } from "../../types";
import starImgFilled from "../../assets/star_filled.png";
import starImgEmpty from "../../assets/star_empty.png";

class MovieDetail {
  static render(movieDetail: MovieDetailResponse) {
    const { id, title, genres, overview, poster_path, vote_average } =
      movieDetail;

    const genreNames = genres.map((genre) => genre.name).join(", ");

    return /*html */ `
          <div class="modal-header">
            <p class="movie-title">${title}</p>
          </div>
          <div class="movie-card">
            <img
              src="https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}"
              class="movie-thumbnail skeleton"
              loading="lazy"
            />
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
              <div class="movie-rate">내 별점
                <div class="movie-stars">
                  <img src="${starImgEmpty}" />
                  <img src="${starImgEmpty}" />
                  <img src="${starImgEmpty}" />
                  <img src="${starImgEmpty}" />
                  <img src="${starImgEmpty}" />
                </div>
                <div class="movie-comment">
                    6 / 보통이에요
                </div>
              </div>
            </div>
          </div>
          `;
  }
}

export { MovieDetail };
