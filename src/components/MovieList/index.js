import "./index.css";
import MovieItem from "./MovieItem";

const MovieList = () => {
  return `
        <section class="item-view">
          <h2>지금 인기 있는 영화</h2>
          <ul class="item-list">
            ${Array.from({ length: 20 }, () => MovieItem()).join("")}
          </ul>
          <button class="btn primary full-width">더 보기</button>
        </section>
      `;
};

export default MovieList;
