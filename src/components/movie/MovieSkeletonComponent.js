import CustomComponent from "../../abstracts/CustomComponent";

export default class MovieSkeletonComponent extends CustomComponent {
  template() {
    return `
        <div>
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </div>
        `;
  }
}

customElements.define("movie-item-skeleton", MovieSkeletonComponent);
