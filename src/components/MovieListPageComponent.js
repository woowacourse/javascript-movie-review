import CustomComponent from "../abstracts/CustomComponent";
import MovieComponent from "./MovieComponent";

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
          <li>
            <a href="#">
              <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
              </div>
            </a>
          </li>
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
      case "fail":
        this.innerHTML = `
          <div>Page Error</div>
        `;
        break;
    }
  }

  template() {
    return `
            <movie-item></movie-item>
        `;
  }
}
customElements.define("movie-list-page", MovieListPageComponent);
