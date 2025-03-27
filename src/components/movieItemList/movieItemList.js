import { createElement } from "../../util/dom";
import MovieItem from "../moveItem/movieItem";

export default function MovieItemList() {
  const $ul = createElement("ul", {
    className: "thumbnail-list",
    id: "thumbnail-list",
  });

  function render(movieData) {
    const $fragment = document.createDocumentFragment();

    movieData.forEach((movie) => {
      const { title, poster_path, vote_average, id } = movie;
      const movieItem = MovieItem({
        title,
        src: poster_path,
        rate: vote_average,
        id,
      });
      $fragment.appendChild(movieItem);
    });

    $ul.appendChild($fragment);
  }

  return {
    $el: $ul,
    render,
  };
}
