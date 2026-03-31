import { getPopularMovies } from "./api.ts";
import type { Movie } from "./api.ts";

let nextPageNum = 0;

addEventListener("load", async () => {
  const app = document.querySelector("#app");
  if (app) {
    const { results: movies, page } = await getPopularMovies();
    nextPageNum = page + 1;
    const ul = document.querySelector(".thumbnail-list");
    const loadMoreButton = document.querySelector(".load-more-button");
    if (ul) {
      movies.forEach(movie => addMovies(ul, movie));
    }
    loadMoreButton?.addEventListener('click', async () => {
      const { results: movies, page } = await getPopularMovies(nextPageNum);
      nextPageNum = page + 1;
      if (ul) {
        movies.forEach(movie => addMovies(ul, movie));
      }
    });
  }
});

function addMovies(parent: Element, movie: Movie) {
  const { title, poster_path, vote_average } = movie
  parent.innerHTML += /*html*/`
  <li>
    <div class="item">
    <img
    class="thumbnail"
    src="https://image.tmdb.org/t/p/original/${poster_path}"
    alt="${title}"
    />
      <div class="item-desc">
        <p class="rate">
          <img src="src/images/star_empty.png" class="star" /><span>${vote_average}</span>
          </p>
          <strong>${title}</strong>
      </div>
    </div>
  </li>
`
}
