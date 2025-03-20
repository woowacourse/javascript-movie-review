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
          ${
            !query || searchedMoviesLength !== 0
              ? movies.map((movie) => MovieItem(movie)).join("")
              : `<div></div>
            <div></div>
            <div class="center">
              <img src="./images/not_found.png"/>
              <h2 data-testid='no-result-message'>검색 결과가 없습니다.</h2>
            </div>`
          }
        </ul>
        ${showMoreButton ? MoreButton() : ""}
      </section>
    </main>
  `;
};

export default MovieList;
