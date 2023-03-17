import { MOVIES_PER_PAGE, STATUS } from "../../constants/constants";
import CustomComponent from "../../abstracts/CustomComponent";
import MovieComponent from "./MovieComponent";
import MovieSkeletonComponent from "./MovieSkeletonComponent";

export default class MovieListPageComponent extends CustomComponent {
  static get observedAttributes() {
    return ["data-status"];
  }

  attributeChangedCallback() {
    const status = this.getAttribute("data-status");
    const movieList = JSON.parse(this.getAttribute("data-movie-list"));

    switch (status) {
      case STATUS.LOADING:
        this.innerHTML = `
          ${Array.from(
            { length: MOVIES_PER_PAGE },
            (_) => `<movie-item-skeleton></movie-item-skeleton>`
          ).join("")}
        `;
        break;
      case STATUS.SUCCESS:
        this.innerHTML = `
            ${movieList
              .map((movieItem) => {
                return `
                  <movie-item
                    title="${movieItem.title}"
                    vote_average="${movieItem.vote_average}"
                    poster_path="${movieItem.poster_path}">
                  </movie-item>`;
              })
              .join("")}
        `;
        break;
      case STATUS.NO_RESULT:
        this.innerHTML = `
          <div class="no-result-box">
            <h1 class="no-result-title">검색 결과를 찾지 못하였습니다.</h1>
            <ul class="no-result-recommends">
              <li>단어의 철자가 정확한지 확인해 보세요.</li>
              <li>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</li>
              <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
            </ul>
          </div>
        `;
        break;
    }
  }
}

customElements.define("movie-list-page", MovieListPageComponent);
