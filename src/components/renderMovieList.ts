import MovieList from "./MovieList";
import movies from "../store/Movies";
import page from "../store/page";
import MovieType from "../types/MovieType";
import createElement from "./utils/createElement";

async function renderMovieList(
  fetchFn: () => Promise<{ results: MovieType[]; totalPages: number }>,
  $button: HTMLElement
) {
  const section = document.querySelector("section");
  if (!section) return;

  document.querySelector(".thumbnail-list")?.remove();

  const loadingList = MovieList({ movies: [], status: "loading" });
  section.appendChild(loadingList);

  try {
    const { results, totalPages } = await fetchFn();
    movies.addMovies(results);

    if (loadingList instanceof HTMLElement) {
      loadingList.remove();
    }

    section.appendChild(
      MovieList({
        movies: movies.movieList,
        status: "fetched",
      })
    );

    if (totalPages === page.getCurrentPage()) {
      $button.classList.add("disappear");
    }
  } catch (error) {
    console.error("영화 불러오기 실패:", error);

    const $error = createElement({ tag: "p" });
    $error.textContent = "영화 데이터를 불러오는 데 실패했습니다.";
    section.appendChild($error);
  }
}

export default renderMovieList;
