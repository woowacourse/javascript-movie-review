import { StarFilled, AddSkeleton } from "../../images";
import { Url } from "../utils/constants";

class MovieItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const posterPath = this.getAttribute("poster-path");
    const title = this.getAttribute("title");
    const voteAverage = this.getAttribute("vote_average");
    const imageUrl =
      posterPath === "null"
        ? `${AddSkeleton}`
        : `${Url.IMAGE_URL}${posterPath}`;

    this.innerHTML = /* html */ `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${imageUrl}"
            loading="lazy"
            alt="${title}"
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="${StarFilled}" class="star" alt="별점" />${voteAverage}</p>
        </div>
      </a>
`;
  }
}

customElements.define("movie-item", MovieItem);
