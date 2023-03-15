import CustomElement from "../basic/CustomElement";
import "../movie/MovieItem";
import { objectToAttributeString } from "../../util/convertor";
import { $ } from "../../util/dom";

class MovieList extends CustomElement {
  template() {
    return `
    <ul class="item-list"></ul>
    `;
  }

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
}

customElements.define("movie-list", MovieList);

export default MovieList;
