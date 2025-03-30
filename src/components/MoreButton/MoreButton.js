import { fetchMoreMovies } from "../MovieList/fetchMoreMovies";

export function MoreButtonRender() {
  return /* html */ `
    <button id="more-button" class="primary more" data-testid="more-button">더 보기</button>
  `;
}

export function MoreButtonMount() {
  const $button = document.querySelector("#more-button");
  if ($button) {
    $button.addEventListener("click", async () => {
      await fetchMoreMovies();
    });
  }
}
