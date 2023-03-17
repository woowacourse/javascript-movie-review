import CustomElement from "../basic/CustomElement";

class MovieItem extends CustomElement {
  template() {
    const title = this.getAttribute("title");
    const src = this.getAttribute("src");
    const voteAverage = this.getAttribute("vote_average");

    const imgSrc =
      src === "null"
        ? "./image/no_image.jpg"
        : `https://image.tmdb.org/t/p/w220_and_h330_face${src}`;

    return `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            loading="lazy"
            src= ${imgSrc}
            alt=${title}
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="./image/star_filled.png" alt="별점" />${voteAverage}</p>
        </div>
      </a>
  `;
  }
}

customElements.define("movie-item", MovieItem);

export default MovieItem;
