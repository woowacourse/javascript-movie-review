import "./index.css";
import { fetchMovieDetail } from "../../../apis";
import MovieDetail from "../../../domain/MovieDetail";
import StarIcon from "../../../images/star_filled.png";
import NotFoundImageIcon from "../../../images/not_found_image.png";
import { imageUrl } from "../../../constants/urls";

const MovieDetailModal = {
  template(movieDetail) {
    const { title, posterSrc, voteAverage, genres, overview, myVote } =
      movieDetail.getMovieDetailInfo();

    return `
    <div class="movie-detail">
      <div class="detail-header">
        <div class="detail-title">${title}</div>
        <button class="close-button" />
      </div>
      <div class="detail-body">
        <img
        class="detail-image"
        src=${posterSrc ? this.convertToImgUrl(posterSrc) : NotFoundImageIcon}
        alt=${title}
        />
        <div class="detail-contents">
          <p class="detail-genre-score">${genres.map(
            (genre) => genre.name
          )} <img class="detail-star" src=${StarIcon} alt="별점" /> ${voteAverage}</p>
          <p class="detail-overview">${overview || "영화에 대한 줄거리가 존재하지 않습니다."}</p>
          <div class="my-vote-container">
            <span class="my-vote-title">내 별점</span>
            <div class="my-vote-star-container">
              <img class="my-vote-star" src=${StarIcon} alt="별점" />
              <img class="my-vote-star" src=${StarIcon} alt="별점" />
              <img class="my-vote-star" src=${StarIcon} alt="별점" />
              <img class="my-vote-star" src=${StarIcon} alt="별점" />
              <img class="my-vote-star" src=${StarIcon} alt="별점" />
            </div>
            <span class="my-vote-score">10</span>
            <span class="my-vote-desc">명작이에요</span>
          </div>
        </div>
      </div>
    </div>
    `;
  },

  async render(id) {
    const $modalContainer = document.querySelector(".modal-container");
    const movieDetail = await this.getMovieDetail(id);
    $modalContainer.innerHTML = this.template(movieDetail);
    this.setEvent();
  },

  async getMovieDetail(id) {
    const movieDetailData = await fetchMovieDetail(id);
    const myVote = 5;
    const movieDetail = new MovieDetail(movieDetailData, myVote);

    return movieDetail;
  },

  convertToImgUrl(imgSrc) {
    return `${imageUrl}${imgSrc}`;
  },

  setEvent() {
    const $closeButton = document.querySelector(".close-button");

    $closeButton.addEventListener("click", (event) => {
      const $modal = event.target.closest(".modal");
      $modal.classList.remove("modal-open");
    });
  },
};

export default MovieDetailModal;
