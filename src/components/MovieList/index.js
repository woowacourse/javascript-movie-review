import ListTitle from "./ListTitle.js";
import MovieItem from "./MovieItem.js";
import MoreButton from "../MoreButton/MoreButton.js";
import SkeletonMovieItem from "../Skeleton/SkeletonMovieItem.js";

const MovieList = ({ movies, query, searchedMoviesLength }) => {
  const showMoreButton = !query || movies.length < searchedMoviesLength;

  let movieContent = "";
  if (movies.length === 0 && !query) {
    movieContent = new Array(20)
      .fill(0)
      .map(() => SkeletonMovieItem())
      .join("");
  } else if (movies.length === 0 && query) {
    movieContent = `<div></div>
                    <div></div>
                    <div class="center">
                      <img src="./images/not_found.png"/>
                      <h2 data-testid='no-result-message'>검색 결과가 없습니다.</h2>
                    </div>`;
  } else {
    movieContent = movies.map((movie) => MovieItem(movie)).join("");
  }

  return /* html */ `
    <main>
      <section>
        ${ListTitle({ query })}
        <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
          ${movieContent}
        </ul>
        ${showMoreButton ? MoreButton() : ""}
      </section>
    </main>
  `;
};

export default MovieList;
