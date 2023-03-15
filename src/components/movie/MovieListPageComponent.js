import CustomComponent from "../../abstracts/CustomComponent";
import MovieComponent from "./MovieComponent";
import MovieSkeletonComponent from "./MovieSkeletonComponent";

export default class MovieListPageComponent extends CustomComponent {
  static get observedAttributes() {
    return ["data-status"];
  }

  attributeChangedCallback() {
    const status = this.getAttribute("data-status");
    const movieList = JSON.parse(this.getAttribute("data-movie-list"));
    switch (status) {
      case "loading":
        this.innerHTML = `
          ${Array.from(
            { length: 20 },
            (_) => `<movie-item-skeleton></movie-item-skeleton>`
          ).join("")}
        `;
        break;
      case "success":
        const movieItem = movieList
          .map((movieItem) => {
            return `<movie-item
                title="${movieItem.title}"
                vote_average="${movieItem.vote_average}"
                poster_path="${movieItem.poster_path}">
            </movie-item>`;
          })
          .join("");
        this.innerHTML = movieItem;
        break;
    }
  }
}
customElements.define("movie-list-page", MovieListPageComponent);
