import { getPopularMovies } from "./api.ts";
import type { Movie } from "./api.ts";

let nextPageNum = 0;

addEventListener("load", async () => {
  const app = document.querySelector("#app");
  if (app) {
    await getPopularMovies({
      pageNum: 1,
      onSuccess: ({ page, results: movies }) => {
        nextPageNum = page + 1;
        const ul = document.querySelector(".thumbnail-list");
        const loadMoreButton = document.querySelector(".load-more-button");
        if (ul) {
          movies.forEach(movie => addMovies(ul, movie));
        }
        loadMoreButton?.addEventListener('click', async () => {
          await getPopularMovies({
            pageNum: nextPageNum,
            onSuccess: ({ page, results: movies }) => {
              nextPageNum = page + 1;
              if (ul) {
                movies.forEach(movie => addMovies(ul, movie));
              }
            },
            onError: function (error: Error): void {
              throw new Error("Function not implemented.");
            },
            onLoading: function (): void {
              throw new Error("Function not implemented.");
            }
          });
        });
      },
      onLoading: () => {
        // 로딩 중일 때 ui 보여주기
      },
      onError: (error) => {
        // 에러 ui 보여주기
        console.error(error);
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


