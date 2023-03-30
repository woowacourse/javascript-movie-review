import CustomAsyncComponent from "../../abstracts/CustomAsyncComponent";
import SelectVoteScoreComponent from "./SelectVoteScoreComponent";
import StarFilledImg from "../../../templates/star_filled.png";
import ModalCloseButtonImg from "../../../templates/close.png";
import { fetchMovieDetails } from "../../util/Api";
import { ANIMATED_TIME } from "../../constants/constants";

export default class MovieModalComponent extends CustomAsyncComponent {
  #state = {};
  constructor() {
    super();
    this.state = {
      detail: {
        id: -1,
        title: "",
        poster_path: "",
        genres: "",
        vote_average: 0,
        overview: "",
      },
    };
  }

  addSkeleton() {
    this.imgSkeleton = document.createElement("div");
    this.imgSkeleton.className = "modal-item-thumbnail skeleton";
    this.querySelector(".movie-modal-left").prepend(this.imgSkeleton);

    this.movieImg = this.querySelector(".movie-modal-img");
    this.movieImg.classList.add("fadeout");

    this.titleElement = this.querySelector(".movie-modal-title");
    this.titleElement.classList.add("skeleton");

    this.genreElement = this.querySelector(".movie-modal-info-head > p");
    this.genreElement.classList.add("skeleton");

    this.overviewElement = this.querySelector(".movie-modal-description");
    this.overviewElement.classList.add("skeleton");

    this.starElement = this.querySelector("#vote-star");
    this.starElement.classList.add("fadeout");

    this.voteAverageElement = this.querySelector(".movie-modal-average-vote");
    this.voteAverageElement.classList.add("skeleton");

    this.voteSkeleton = document.createElement("div");
    this.voteSkeleton.className = "select-vote-score skeleton";
    this.querySelector(".movie-modal-vote").prepend(this.voteSkeleton);

    this.originVoteElement = this.querySelector("select-vote-score");
    this.originVoteElement.classList.add("fadeout");
  }

  deleteSkelton() {
    this.imgSkeleton.remove();
    this.movieImg.classList.remove("fadeout");
    this.titleElement.classList.remove("skeleton");
    this.genreElement.classList.remove("skeleton");
    this.overviewElement.classList.remove("skeleton");
    this.voteAverageElement.classList.remove("skeleton");
    this.starElement.classList.remove("fadeout");
    this.voteSkeleton.remove();
    this.originVoteElement.classList.remove("fadeout");
  }

  closeModal() {
    this.style.opacity = "0";
    setTimeout(() => {
      this.remove();
    }, ANIMATED_TIME.MODAL);
  }

  handleEvent() {
    this.querySelector(".movie-modal-close").addEventListener("click", () => {
      this.closeModal();
    });

    this.addEventListener("click", (e) => {
      if (e.target === this) {
        this.closeModal();
      }
    });

    this.addSkeleton();
    this.movieImg.addEventListener("load", () => {
      if (this.movieImg.complete) {
        this.deleteSkelton();
      }
    });
  }

  async loadMovieDetail(id) {
    const detailData = await fetchMovieDetails(id);
    Object.entries(detailData).forEach(async ([key, value]) => {
      this.state.detail[key] = String(value);
    });
    this.rerender();
  }

  async rerender() {
    this.titleElement.textContent = this.state.detail.title;
    this.movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${this.state.detail.poster_path}`
    );
    this.voteAverageElement.lastChild.textContent =
      this.state.detail.vote_average;
    this.genreElement.textContent = this.state.detail.genres;
    this.overviewElement.textContent = this.state.detail.overview;
    this.originVoteElement.setAttribute(
      "movie-id",
      String(this.state.detail.id)
    );
  }

  async template() {
    const { id, title, poster_path, genres, vote_average, overview } =
      this.state.detail;

    return /*html*/ `
        <div class="movie-modal-wrapper">
            <div class="movie-modal-header">
                <h2 class="movie-modal-title">${title}</h2>
                <img class="movie-modal-close" src="${ModalCloseButtonImg}" alt="Modal close button" />
            </div>
            <div class="movie-modal-contents">
                <div class="movie-modal-left">
                    <img class="movie-modal-img" src="" alt="Movie poster" />
                </div>
                <div class="movie-modal-right">
                    <div class="movie-modal-information">
                        <div class="movie-modal-info-head">
                            <p>${genres}</p> 
                            <div class="movie-modal-average-vote"><img id="vote-star" src=${StarFilledImg} alt="별점" /> <p>${vote_average}</p></div>
                        </div>
                        <div class="movie-modal-description">
                            <p>${overview}</p>
                        </div>
                    </div>
                    <div class="movie-modal-vote">
                        <select-vote-score movie-id="${id}"></select-vote-score>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define("movie-modal", MovieModalComponent);
