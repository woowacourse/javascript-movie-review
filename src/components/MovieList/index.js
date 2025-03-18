import ListTitle from "./ListTitle";
import MovieItem from "./MovieItem";

const MovieList = () => {
  return /* html */ `
    <main>
      <section>
        ${ListTitle()}
        <ul class="thumbnail-list">
          ${MovieItem()}
          ${MovieItem()}
          ${MovieItem()}
          ${MovieItem()}
          ${MovieItem()}
          ${MovieItem()}
        </ul>
        <button class="primary more">더 보기</button>
      </section>
    </main>
  `;
};

export default MovieList;
