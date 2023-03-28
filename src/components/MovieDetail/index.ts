import { MovieDetailResponse } from "../../types";
import starImgFilled from "../../assets/star_filled.png";
import starImgEmpty from "../../assets/star_empty.png";
import { $, $$ } from "../../utils/selector";

class MovieDetail {
  constructor() {}

  static render(movieDetail: MovieDetailResponse) {
    const { id, title, genres, overview, poster_path, vote_average } =
      movieDetail;
    const genreNames = genres.map((genre) => genre.name).join(", ");

    const stars = [1, 2, 3, 4, 5]
      .map(
        (index) => /*html*/ `
      <img
        src="${starImgEmpty}"
        class="movie-stars"
        data-index="${index}"
      />
    `
      )
      .join("");

    return /*html*/ `
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
          <div data-id="${id}" class="movie-rate">
            <p class="movie-rate-title">내 별점</p>
            <div class="movie-star-wrap">
            ${stars}
            </div>
            <p class="rate-comment">나의 점수는?</p>
          </div>
        </div>
      </div>
    `;
  }

  static onClickStars() {
    const starElements = $$(".movie-stars");

    starElements.forEach((star) => {
      star.addEventListener("click", () => {
        const index = parseInt(star.getAttribute("data-index")!);
        this.fillStars(index);
      });
    });
  }

  static fillStars(index: number) {
    const starElements = $$(".movie-stars");

    starElements.forEach((star, i) => {
      if (i < index) {
        star.setAttribute("src", starImgFilled);
      } else {
        star.setAttribute("src", starImgEmpty);
      }
    });

    const ratingLabels = [
      "최악이에요",
      "별로에요",
      "보통이에요",
      "볼만해요",
      "최고에요!",
    ];

    const ratingLabel = ratingLabels[index - 1];

    $(".rate-comment").innerHTML = `${index * 2}점 ${ratingLabel}`;
  }
}

export { MovieDetail };
