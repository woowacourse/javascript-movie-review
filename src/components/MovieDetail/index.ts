import { MovieDetailResponse } from "../../types";
import starImgFilled from "../../assets/star_filled.png";
import starImgEmpty from "../../assets/star_empty.png";
import { $, $$ } from "../../utils/selector";

class MovieDetail {
  static render(movieDetail: MovieDetailResponse) {
    const { id, title, genres, overview, poster_path, vote_average } =
      movieDetail;

    const genreNames = genres.map((genre) => genre.name).join(", ");

    const storedRatingStr = localStorage.getItem(id.toString());
    const storedRating = storedRatingStr
      ? JSON.parse(storedRatingStr)
      : { rating: 0, label: "" };

    const stars = [1, 2, 3, 4, 5]
      .map(
        (index) => /*html*/ `
    <img
      src="${index <= storedRating.rating ? starImgFilled : starImgEmpty}"
      class="movie-stars"
      data-id="${id}"
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
              ${overview ? overview : "등록된 줄거리가 없습니다."}
            </p>
          </div>
          <div class="movie-rate">
            <p class="movie-rate-title">내 별점</p>
            <div class="movie-star-wrap">
            ${stars}
            </div>
            <p class="rating">${storedRating.rating * 2}점</p>
            <p class="rate-comment"> ${storedRating.label}</p>
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
        const movieId = parseInt(star.getAttribute("data-id")!);
        this.fillStars(index, movieId);
      });
    });
  }

  static fillStars(index: number, movieId: number) {
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

    const storedRatingStr = localStorage.getItem(movieId.toString());
    const storedRating = storedRatingStr
      ? JSON.parse(storedRatingStr)
      : { rating: 0, label: "" };
    const currentRating = { rating: index, label: ratingLabel };
    const newRating = { ...storedRating, ...currentRating };

    $(".rating").innerHTML = `${newRating.rating * 2}점`;
    $(".rate-comment").innerHTML = `${newRating.label}`;
    localStorage.setItem(movieId.toString(), JSON.stringify(newRating));
  }
}

export { MovieDetail };
