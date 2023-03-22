import CustomComponent from "../../abstracts/CustomComponent";
import StarEmptyImg from "../../../templates/star_empty.png";
import StarFilledImg from "../../../templates/star_filled.png";

export default class MovieComponent extends CustomComponent {
  constructor() {
    super();
    this.state = {
      movie: {
        title: "",
        poster_path: "",
        genre_ids: "",
        vote_average: "",
        overview: "",
      },
    };
  }

  handleEvent() {
    this.addEventListener("click", (e) => {
      e.preventDefault();

      const modal = document.createElement("movie-modal");
      Object.keys(this.state.movie).forEach((key) => {
        modal.setAttribute(key, this.state.movie[key]);
      });
      document.querySelector("#app").append(modal);
      setTimeout(() => {
        modal.style.opacity = 1;
      });
    });
  }

  template() {
    const movie = {
      title: this.getAttribute("title"),
      poster_path: this.getAttribute("poster_path"),
      genre_ids: this.getAttribute("genre_ids"),
      vote_average: this.getAttribute("vote_average"),
      overview: this.getAttribute("overview"),
    };

    this.state.movie = movie;

    const title = this.state.movie.title;
    const voteAverage = this.state.movie.vote_average;
    const posterPath = this.state.movie.poster_path;

    return /*html*/ `
            <a href="#">
              <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}"
                    loading="lazy"
                    alt=${title}
                  />
                  <p class="item-title">${title}</p>
                  <p class="item-score"><img src=${StarFilledImg} alt="별점" /> ${voteAverage}</p>
              </div>
            </a>
        `;
  }
}

customElements.define("movie-item", MovieComponent);
