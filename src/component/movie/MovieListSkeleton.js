import SkeletonStore from "../../domain/SkeletonStore";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieListSkeleton extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    SkeletonStore.subscribe(this);
  }

  template() {
    return `
    <ul class="item-list skeleton-list">
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
          </ul>
    `;
  }

  removeSkeleton() {
    $(".skeleton-list").remove();
  }
}

customElements.define("movie-list-skeleton", MovieListSkeleton);

export default MovieListSkeleton;
