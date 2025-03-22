import { html } from "../utils";
import Container from "./Container";
import Component from "./core/Component";
import Footer from "./Footer";
import Header from "./Header";

export default class Inner extends Component {
  override template() {
    return html`
      <div id="movie-review-wrap">
        <slot name="header"></slot>
        <slot name="container"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  onRender() {
    this.fillSlot(new Header().render(), "header");
    this.fillSlot(new Container().render(), "container");
    this.fillSlot(new Footer().render(), "footer");
  }
}
