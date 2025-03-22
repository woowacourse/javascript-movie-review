import { MovieResult, MoviesResponse } from "@/types";
import { html } from "@/utils";
import Component from "./core/Component";
import ThumbnailList from "./ThumbnailList";

const TAB_LIST = ["상영 중", "인기순", "평점순", "상영 예정"];

interface MoviesProps {
  movies: MovieResult[];
  page: number;
}

export default class Movies extends Component<MoviesProps> {
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
            <slot name="thumbnail-list"></slot>

            <slot name="error"></slot>

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

  async onRender() {
    this.fillSlot(
      new ThumbnailList({
        movies: this.props.movies,
      }).render(),
      "thumbnail-list"
    );
  }
}
