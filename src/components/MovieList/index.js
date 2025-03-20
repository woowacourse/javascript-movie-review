// components/MovieList/index.js
import ListTitle from "./ListTitle.js";
import MovieItem from "./MovieItem.js";
import MoreButton from "../MoreButton.js";

const MovieList = ({ movies, query, searchedMoviesLength }) => {
  // 검색 결과인 경우, 현재 렌더링된 영화 수가 총 검색 결과 수보다 작아야 MoreButton을 표시
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
