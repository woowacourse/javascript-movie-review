import ListTitle from "./ListTitle";
import MovieItem from "./MovieItem";

const MovieList = (movies) => {
  return /* html */ `
    <main>
      <section>
        ${ListTitle()}
        <ul class="thumbnail-list" data-testid="movie-list">
          ${movies.map((movie) => MovieItem(movie)).join("")}
        </ul>
        <button class="primary more">더 보기</button>
      </section>
    </main>
  `;
};

export default MovieList;
