import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieListSkeleton extends CustomElement {
  connectedCallback() {
    MovieManager.subscribeSkeleton(this);
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

  remove() {
    $(".skeleton-list").remove();
  }

  show() {
    this.render();
  }
}

customElements.define("movie-list-skeleton", MovieListSkeleton);

export default MovieListSkeleton;
