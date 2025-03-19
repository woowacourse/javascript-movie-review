import ListTitle from "./ListTitle";
import MovieItem from "./MovieItem";

const MovieList = (movies) => {
  return /* html */ `
    <main>
      <section>
        ${ListTitle()}
        <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
          ${movies.map((movie) => MovieItem(movie)).join("")}
        </ul>
        <button id="more-button" class="primary more" data-testid='more-button'>더 보기</button>
      </section>
    </main>
  `;
};

export default MovieList;
