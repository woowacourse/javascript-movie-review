import { apiStatus } from "../../constant/movieConstants";
import MovieManager from "../../domain/MovieManager";
import CustomElement from "../basic/CustomElement";

class MovieListSkeleton extends CustomElement {
  connectedCallback() {
    MovieManager.subscribe(this.rerender.bind(this));
  }

  template() {
    return `
    <ul class="item-list skeleton-list">
      ${this.makeSkeletonItem()}
    </ul>
    `;
  }

  makeSkeletonItem() {
    return `
    <li>
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>
  `.repeat(20);
  }

  rerender({ status }) {
    if (status === apiStatus.LOADING) {
      this.render();
      return;
    }

    this.replaceChildren();
  }
}

customElements.define("movie-list-skeleton", MovieListSkeleton);

export default MovieListSkeleton;
