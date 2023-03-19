import { StarFilled, AddSkeleton } from "../../images";

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

    this.innerHTML = /* html */ `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${
              posterPath !== "null"
                ? `https://image.tmdb.org/t/p/original/${posterPath}`
                : `${AddSkeleton}`
            }"
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
