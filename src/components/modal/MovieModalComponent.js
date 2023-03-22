import CustomComponent from "../../abstracts/CustomComponent";
import StarFilledImg from "../../../templates/star_filled.png";
import ModalCloseButtonImg from "../../../templates/close.png";

export default class MovieModalComponent extends CustomComponent {
  handleEvent() {
    this.querySelector(".movie-modal-close").addEventListener("click", () => {
      this.style.opacity = 0;
      setTimeout(() => {
        this.remove();
      }, 500);
    });
  }

  template() {
    const title = this.getAttribute("title");
    const moviePoster = this.getAttribute("poster_path");
    const genre = this.getAttribute("genre_ids");
    const averageVote = this.getAttribute("vote_average");
    const description = this.getAttribute("overview");

    return /*html*/ `
        <div class="movie-modal-wrapper">
            <div class="movie-modal-header">
                <h2 class="movie-modal-title">${title}</h2>
                <img class="movie-modal-close" src="${ModalCloseButtonImg}" alt="Modal close button" />
            </div>
            <div class="movie-modal-contents">
                <div class="movie-modal-left">
                    <img class="movie-modal-img" src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="Movie poster" />
                </div>
                <div class="movie-modal-right">
                    <div class="movie-modal-information">
                        <div class="movie-modal-info-head">
                            <p>${genre}</p> 
                            <div class="movie-modal-average-vote"><img src=${StarFilledImg} alt="별점" /> ${averageVote}</div>
                        </div>
                        <div class="movie-modal-description">
                            <p>${description}</p>
                        </div>
                    </div>
                    <div class="movie-modal-vote">
                        <h2>내 별점</h2>
                        <div class="movie-modal-stars">
                            <img src=${StarFilledImg} alt="별점" />
                            <img src=${StarFilledImg} alt="별점" />
                            <img src=${StarFilledImg} alt="별점" />
                            <img src=${StarFilledImg} alt="별점" />
                            <img src=${StarFilledImg} alt="별점" />
                        </div>
                        <h3 id="movie-modal-score">6</h3>
                        <h3 id="movie-modal-score-desc">보통이에요</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define("movie-modal", MovieModalComponent);
