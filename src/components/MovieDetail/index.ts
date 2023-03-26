import { MovieDetailResponse } from "../../types";
import starImg from "../../assets/star_filled.png";

class MovieDetail {
  static render(movieDetail: MovieDetailResponse) {
    const { id, title, genres, overview, poster_path, vote_average } =
      movieDetail;

    const genreNames = genres.map((genre) => genre.name).join(", ");

    return /*html */ `<div class="modal-backdrop"></div>
        <div class="modal-container">
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
                    <img src="${starImg}" />${vote_average}
                  </span>
                </div>
                <p class="movie-description">   
                  ${overview}
                </p>
              </div>
              <div class="movie-rate">내 별점</div>
            </div>
          </div>
          <button class="close-button">X</button>
        </div>`;
  }
}

export { MovieDetail };
