import SkeletonBoss from "../../domain/SkeletonBoss";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieListSkeleton extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    SkeletonBoss.subscribe(this);
  }

  template() {
    const temp = ` 
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
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
