import CustomComponent from "../abstracts/CustomComponent";
import MovieComponent from "./MovieComponent";

export default class MovieListComponent extends CustomComponent {
  static get observedAttributes() {
    return ["data-status"];
  }

  attributeChangedCallback() {
    const status = this.getAttribute("data-status");

    switch (status) {
      case "loading":
        this.querySelector(".item-list").innerHTML = `
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
        this.querySelector(".item-list").innerHTML = `
          <movie-item>
          
          </movie-item>
        `;
        break;
      case "fail":
        this.querySelector(".item-list").innerHTML = `
          <div>Page Error</div>
        `;
        break;
    }
  }

  template() {
    return `
            <ul class="item-list">
            </ul>
        `;
  }
}
customElements.define("movie-list", MovieListComponent);
