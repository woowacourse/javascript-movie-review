import ListTitle from "./ListTitle.js";
import MovieItem from "./MovieItem.js";
import MoreButton from "../MoreButton.js";

const MovieList = ({ movies, query, searchedMoviesLength }) => {
  const showMoreButton = !query || movies.length < searchedMoviesLength;
  
  return /* html */ `
    <main>
      <section>
        ${ListTitle({ query })}
        <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
          ${movies.map((movie) => MovieItem(movie)).join("")}
        </ul>
        ${showMoreButton ? MoreButton() : ""}
      </section>
    </main>
  `;
};

export default MovieList;
