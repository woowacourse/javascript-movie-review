import { html } from "../utils";
import Component from "./core/Component";

const TAB_LIST = ["상영 중", "인기순", "평점순", "상영 예정"];

export default class Container extends Component {
  template() {
    return html`
      <div class="container">
        <ul class="tab">
          ${TAB_LIST.map(
            (tab) => `
              <li>
                <a href="#">
                  <div class="tab-item"><h3>${tab}</h3></div>
                </a>
              </li>
            `
          ).join("")}
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
        <button class="primary show-more">더 보기</button>
      </div>
    `;
  }
}
