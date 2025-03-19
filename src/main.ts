/// <reference types="vite/client" />

// 항상 skeleton을 숨기도록 보장:
// 만약 loadSearchMovies 호출 중 에러가 발생할 경우에도 skeleton이 남아있지 않도록, try...finally 구문을 사용해 요청 성공/실패와 상관없이 skeleton을 숨기도록 개선.

// abortController vs 로딩 중 버튼 비활성화 고려:
// 사용자가 로딩 중에 여러 번 클릭하는 것을 방지하기 위해, #loadMore 버튼을 일시적으로 비활성화하는 것도 좋습니다.

import type { TMDBResponse, Result } from "../types/TMDB";
import createMovieLoader from "./service/createMovieLoader";
import { URLS, defaultOptions, defaultQueryObject } from "./setting/settings";
import { showSkeleton, hideSkeleton } from "./view/skeleton";

// const movieList = document.createElement("ul");

// function createMovieElement(results: Result[]) {
//   movieList.classList.add("item-list");

//   results.forEach(({ title, vote_average }) => {
//     const movieElement = document.createElement("li");
//     movieElement.textContent = `${title}  ${vote_average}점`;
//     movieList.appendChild(movieElement);
//   });
// }

// document.querySelector("#app")?.append(movieList);

// let loadMovies = createMovieLoader(
//   URLS.popularMovieUrl,
//   defaultQueryObject,
//   defaultOptions
// );
// const { results } = await loadMovies(); // 첫 페이지 로드
// hideSkeleton();
// createMovieElement(results);

// document
//   .querySelector("#search-movie")
//   ?.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const searchTerm = (e.target as HTMLFormElement).elements["search-input"]
//       .value;
//     loadMovies = createMovieLoader(
//       URLS.searchMovieUrl,
//       defaultQueryObject,
//       defaultOptions,
//       searchTerm
//     );
//     const { results } = await loadMovies();

//     createMovieElement(results);
//   });

// document.querySelector("#loadMore")?.addEventListener("click", async () => {
//   showSkeleton();
//   const { results, isLastPage } = await loadMovies();
//   hideSkeleton();

//   if (isLastPage) {
//     document.querySelector("#loadMore").style.display = "none";
//   }
//   createMovieElement(results);
// });
