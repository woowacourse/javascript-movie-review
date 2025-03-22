import { html } from "../utils";
import Component from "./core/Component";

export default class Container extends Component {
  template() {
    return html`
      <div class="container">
        <ul class="tab">
          <li>
            <a href="#">
              <div class="tab-item selected"><h3>상영 중</h3></div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="tab-item"><h3>인기순</h3></div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="tab-item"><h3>평점순</h3></div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="tab-item"><h3>상영 예정</h3></div>
            </a>
          </li>
        </ul>
        <main>
          <section>
            <h2 class="thumbnail-title">지금 인기 있는 영화</h2>
            <ul class="thumbnail-list"></ul>
            <div class="error close">
              <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
              <h2></h2>
            </div>
          </section>
        </main>
      </div>
    `;
  }
}
