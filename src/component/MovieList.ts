import Movie from "./Movie";

function MovieList() {
  return /*html */ `
    <h2>지금 인기 있는 영화</h2>
        <ul class="thumbnail-list">
        ${Movie()}
        ${Movie()}
        ${Movie()}
        ${Movie()}
        ${Movie()}
        ${Movie()}
    </ul>`;
}

export default MovieList;
