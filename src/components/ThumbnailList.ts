import { DEFAULT_BACK_DROP_URL } from "@/lib/constants";

import { AppState } from "@/App";
import { html } from "@/lib/utils";
import Component from "./core/Component";

interface ThumbnailListProps {
  movies: AppState["movies"];
}

export default class ThumbnailList extends Component<ThumbnailListProps> {
  template() {
    console.log(this.props.movies);
    if (!this.props.movies)
      return html`
        <ul class="thumbnail-list">
          ${new Array(20)
            .fill(null)
            .map(
              (_) => `<li>
          <div class="item">
            <div class="skeleton" style="width:200px; height:300px"></div>
            <div class="item-desc">
              <div class="skeleton" style="width:60px; height:16px"></div>
              <div class="skeleton" style="width:150px; height:16px"></div>
            </div>
          </div>
        </li>`
            )
            .join("")}
        </ul>
      `;
    if (this.props.movies.length === 0)
      return html`
        <div class="error">
          <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
          <h2>검색 결과가 없습니다.</h2>
        </div>
      `;
    return html`
      <ul class="thumbnail-list">
        ${this.props.movies
          .map((movie) => {
            const backgroundImage = movie.backdrop_path
              ? `${DEFAULT_BACK_DROP_URL}${movie.backdrop_path}`
              : "./images/default_thumbnail.jpeg";
            return `
              <li>
                <div class="item">
                  <img
                    class="thumbnail"
                    src="${backgroundImage}"
                    alt="${movie.title}"
                  />
                  <div class="item-desc">
                    <p class="rate">
                      <img src="./images/star_empty.png" class="star" />
                      <span>${movie.vote_average}</span>
                    </p>
                    <strong>${movie.title}</strong>
                  </div>
                </div>
              </li>
          `;
          })
          .join("")}
      </section>
    `;
  }
}
