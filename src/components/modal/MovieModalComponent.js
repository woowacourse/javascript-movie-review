import CustomAsyncComponent from "../../abstracts/CustomAsyncComponent";
import SelectVoteScoreComponent from "./SelectVoteScoreComponent";
import StarFilledImg from "../../../templates/star_filled.png";
import ModalCloseButtonImg from "../../../templates/close.png";

export default class MovieModalComponent extends CustomAsyncComponent {
  handleEvent() {
    this.querySelector(".movie-modal-close").addEventListener("click", () => {
      this.style.opacity = 0;
      setTimeout(() => {
        this.remove();
      }, 500);
    });
  }

  async getGenreNames(genreIds) {
    const result = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=6df0efa1372141fac2793e6184ea5add&language=ko-KR",
      { method: "GET" }
    ).then(async (res) => {
      const data = await res.json();
      const genres = data.genres;

      const genreNames = genreIds.split(",").map((genreId) => {
        const genreName = genres.find((genre) => genre.id === Number(genreId));

        if (genreName.name) {
          return genreName.name;
        }
        return "";
      });

      return genreNames;
    });

    return result;
  }

  async template() {
    const id = this.getAttribute("id");
    console.log(id);
    const title = this.getAttribute("title");
    const moviePoster = this.getAttribute("poster_path");
    const genre = this.getAttribute("genre_ids");
    const averageVote = this.getAttribute("vote_average");
    const description = this.getAttribute("overview");

    const genreNameArray = await this.getGenreNames(genre);
    const genreNames = genreNameArray.join(", ");

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
                            <p>${genreNames}</p> 
                            <div class="movie-modal-average-vote"><img src=${StarFilledImg} alt="별점" /> ${averageVote}</div>
                        </div>
                        <div class="movie-modal-description">
                            <p>${description}</p>
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
