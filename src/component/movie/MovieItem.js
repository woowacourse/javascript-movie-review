import CustomElement from "@/basic/CustomElement";

class MovieItem extends CustomElement {
  template() {
    const imgAttribute = this.getAttribute("imgAttribute");
    const title = this.getAttribute("title");
    const voteAverage = this.getAttribute("vote_average");

    return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            loading="lazy"
            ${imgAttribute}
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="./star_filled.png" alt="별점" />${voteAverage}</p>
        </div>
      </a>
    </li>
  `;
  }
}

customElements.define("movie-item", MovieItem);

export default MovieItem;
