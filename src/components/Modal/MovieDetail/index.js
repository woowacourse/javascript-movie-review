import "./index.css";
import { fetchMovieDetail } from "../../../apis";
import MovieDetail from "../../../domain/MovieDetail";
import StarIcon from "../../../images/star_filled.png";
import EmeptyStarIcon from "../../../images/star_empty.png";
import NotFoundImageIcon from "../../../images/not_found_image.png";
import { imageUrl } from "../../../constants/urls";
import getErrorMessage from "../../../apis/getErrorMessage";

const MovieDetailModal = {
  skeletonTeplate() {
    return `
    <div class="detail-header"></div>
    <div class="detail-body">
      <div class="detail-image detail-skeleton"></div>
      <div class="detail-contents">
        <div class="detail-info">
          <div class="detail-genre-score detail-skeleton"></div>
          <div class="detail-overview detail-skeleton"></div>
        </div>
        <div class="my-vote-container detail-skeleton"></div>
      </div>
    </div>
    `;
  },

  template(movieDetail) {
    const { title, posterSrc, voteAverage, genres, overview, myVote } =
      movieDetail.getMovieDetailInfo();

    return `
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
        <div class="detail-info">
          <p class="detail-genre-score">${genres.map(
            (genre) => genre.name
          )} <img class="detail-star" src=${StarIcon} alt="별점" /> ${voteAverage}</p>
          <p class="detail-overview">${overview || "영화에 대한 줄거리가 존재하지 않습니다."}</p>
        </div>
        <div class="my-vote-container">
            ${this.myVoteTemplate(myVote)}
        </div>
      </div>
    </div>
    `;
  },

  myVoteTemplate(myScore) {
    const voteComments = {
      2: "최악이에요",
      4: "별로에요",
      6: "보통이에요",
      8: "재미있어요",
      10: "명작이에요",
    };

    return `
    <span class="my-vote-title">내 별점</span>
    <div class="my-vote-star-container">
      ${Object.keys(voteComments)
        .map(
          (voteScore) =>
            `<img class="my-vote-star" src=${
              myScore >= Number(voteScore) ? StarIcon : EmeptyStarIcon
            } alt="별점" data-score=${voteScore} />`
        )
        .join("")}
    </div>
    <span class="my-vote-score">${myScore || ""}</span>
    <span class="my-vote-comment">${voteComments[myScore] || ""}</span>
    `;
  },

  async render(id) {
    const $modalContainer = document.querySelector(".modal-container");

    $modalContainer.innerHTML = this.skeletonTeplate();
    const movieDetail = await this.getMovieDetail(id);
    if (!movieDetail) return;

    $modalContainer.innerHTML = this.template(movieDetail);
    this.setEvent(id);
  },

  renderMyVote(score) {
    const $myVoteContainer = document.querySelector(".my-vote-container");

    $myVoteContainer.innerHTML = this.myVoteTemplate(score);
  },

  renderErrorMessage(message) {
    const $modalContainer = document.querySelector(".modal-container");

    const messageTemplate = `
    <div class="detail-error-container">
      <h3 class="detail-error-title">영화 목록을 불러오는데 문제가 발생했습니다 :(</h2>
      <p class="detail-error-message">[실패 사유]</p>
      <p class="detail-error-message">${message}</p>
    </div>
    `;

    $modalContainer.innerHTML = messageTemplate;
  },

  async getMovieDetail(id) {
    try {
      const movieDetailData = await fetchMovieDetail(id);
      const myVote = this.getMyVoteFromLocalStorage(id);
      const movieDetail = new MovieDetail(movieDetailData, myVote);

      return movieDetail;
    } catch (error) {
      const message = getErrorMessage(error);
      this.renderErrorMessage(message);
      return false;
    }
  },

  getMyVoteFromLocalStorage(id) {
    const myVoteList = JSON.parse(localStorage.getItem("myVote")) || {};
    return myVoteList[id] || 0;
  },

  setMyVoteToLocalStorage(id, score) {
    const myVoteList = JSON.parse(localStorage.getItem("myVote")) || {};
    myVoteList[id] = score;
    localStorage.setItem("myVote", JSON.stringify(myVoteList));
  },

  convertToImgUrl(imgSrc) {
    return `${imageUrl}${imgSrc}`;
  },

  setEvent(id) {
    this.setEventOnclickCloseButton();
    this.setEventOnclickVoteStar(id);
  },

  setEventOnclickCloseButton() {
    const $closeButton = document.querySelector(".close-button");

    $closeButton.addEventListener("click", (event) => {
      const $modal = event.target.closest(".modal");
      $modal.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    });
  },

  setEventOnclickVoteStar(id) {
    const $myVoteStarContainer = document.querySelector(".my-vote-container");

    $myVoteStarContainer.addEventListener("click", (event) => {
      const $star = event.target.closest(".my-vote-star");
      if (!$star) return;
      const score = $star.dataset.score;

      this.renderMyVote(score);
      this.setMyVoteToLocalStorage(id, score);
    });
  },
};

export default MovieDetailModal;
