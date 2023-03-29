import SkeletonProcess from "../../domain/SkeletonProcess";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieListSkeleton extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    SkeletonProcess.subscribe(this);
  }

  template() {
    const temp = ` 
      <li>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </li>`;

    return `
    <ul class="item-list skeleton-list">
      ${temp.repeat(20)}
    </ul>
    `;
  }

  removeSkeleton() {
    $(".skeleton-list").remove();
  }
}

customElements.define("movie-list-skeleton", MovieListSkeleton);

export default MovieListSkeleton;
