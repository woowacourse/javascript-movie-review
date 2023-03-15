import CustomElement from "../basic/CustomElement";
import { objectToAttributeString } from "../../util/convertor";
import { $ } from "../../util/dom";

class MovieList extends CustomElement {
  rerender(movies) {
    const movieItemsTemplate = movies
      .map((movie) => {
        const { title, poster_path, vote_average } = movie;
        const imgAttribute = objectToAttributeString({
          alt: title,
          src: poster_path,
        });

        return `
      <movie-item imgAttribute=${imgAttribute} title=${title} vote_average=${vote_average} />
      `;
      })
      .join("");

    $(".item-list").insertAdjacentHTML("beforeend", movieItemsTemplate);
  }

  template() {
    return `
    <ul class="item-list"></ul>
    `;
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
