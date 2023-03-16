import CustomElement from "../basic/CustomElement";

class MovieEmpty extends CustomElement {
  template() {
    return `
      <div>검색 결과가 없습니다.</div>
    `;
  }
}

customElements.define("movie-empty", MovieEmpty);

export default MovieEmpty;
