import "./index.css";
import { fetchMovieDetail } from "../../../apis";
import MovieDetail from "../../../domain/MovieDetail";
import StarIcon from "../../../images/star_filled.png";
import EmeptyStarIcon from "../../../images/star_empty.png";
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
    </div>
    `;
  },

  myVoteTemplate(score) {
    const voteDesc = {
      0: "",
      2: "최악이에요",
      4: "별로에요",
      6: "보통이에요",
      8: "재미있어요",
      10: "명작이에요",
    };

    return `
    <span class="my-vote-title">내 별점</span>
    <div class="my-vote-star-container">
      <img class="my-vote-star" src=${
        score >= 2 ? StarIcon : EmeptyStarIcon
      } alt="별점" data-score=2 />
      <img class="my-vote-star" src=${
        score >= 4 ? StarIcon : EmeptyStarIcon
      } alt="별점" data-score=4 />
      <img class="my-vote-star" src=${
        score >= 6 ? StarIcon : EmeptyStarIcon
      } alt="별점" data-score=6 />
      <img class="my-vote-star" src=${
        score >= 8 ? StarIcon : EmeptyStarIcon
      } alt="별점" data-score=8 />
      <img class="my-vote-star" src=${
        score >= 10 ? StarIcon : EmeptyStarIcon
      } alt="별점" data-score=10 />
    </div>
    <span class="my-vote-score">${score || ""}</span>
    <span class="my-vote-desc">${voteDesc[score]}</span>
    `;
  },

  async render(id) {
    const $modalContainer = document.querySelector(".modal-container");
    const movieDetail = await this.getMovieDetail(id);
    $modalContainer.innerHTML = this.template(movieDetail);
    this.setEvent(id);
  },

  renderMyVote(score) {
    const $myVoteContainer = document.querySelector(".my-vote-container");

    $myVoteContainer.innerHTML = this.myVoteTemplate(score);
  },

  async getMovieDetail(id) {
    const movieDetailData = await fetchMovieDetail(id);
    const myVote = this.getMyVote(id);
    const movieDetail = new MovieDetail(movieDetailData, myVote);

    return movieDetail;
  },

  getMyVote(id) {
    const myVoteList = JSON.parse(localStorage.getItem("myVote")) || {};
    return myVoteList[id] || 0;
  },

  setMyVote(id, score) {
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
    });
  },

  setEventOnclickVoteStar(id) {
    const $myVoteStarContainer = document.querySelector(".my-vote-star-container");

    $myVoteStarContainer.addEventListener("click", (event) => {
      const $star = event.target.closest(".my-vote-star");
      if (!$star) return;
      const score = $star.dataset.score;

      this.renderMyVote(score);
      this.setEventOnclickVoteStar(id);
      this.setMyVote(id, score);
    });
  },
};

export default MovieDetailModal;
