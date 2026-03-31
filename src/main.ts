import { getPopularMovies } from "./api.ts";
import type { Movie } from "./api.ts";

addEventListener("load", async () => {
  const app = document.querySelector("#app");
  if (app) {
    const { results: movies } = await getPopularMovies()
    const ul = document.querySelector(".thumbnail-list");
    if (ul) {
      movies.forEach(movie => addMovies(ul, movie));
    }
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
