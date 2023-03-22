import CustomElement from "../basic/CustomElement";

class MovieItem extends CustomElement {
  template() {
    const title = this.getAttribute("title");
    const src = this.getAttribute("src");
    const voteAverage = this.getAttribute("vote_average");

    return `
        <div class="item-card">
          <img
            class="item-thumbnail"
            loading="lazy"
            src= ${src}
            alt=${title}
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="./image/star_filled.png" alt="별점" />${voteAverage}</p>
        </div>
  `;
  }
}

customElements.define("movie-item", MovieItem);

export default MovieItem;
