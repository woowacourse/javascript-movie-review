import MovieList from "./MovieList";
import movies from "../store/Movies";
import page from "../store/page";
import MovieType from "../types/MovieType";
import createElement from "./utils/createElement";
import removeElement from "./utils/removeElement";
import hideLoadMoreButton from "./utils/hideLoadMoreButton";

function appendMovieList(section: HTMLElement, status: "loading" | "fetched") {
  const list = MovieList({
    movies: status === "loading" ? [] : movies.movieList,
    status,
  });
  section.appendChild(list);
  return list;
}

function renderErrorMessage(section: HTMLElement, message: string) {
  const $error = createElement({ tag: "p" });
  $error.textContent = message;
  section.appendChild($error);
}

async function renderMovieList(
  fetchFn: () => Promise<{ results: MovieType[]; totalPages: number }>
) {
  const section = document.querySelector("section");
  if (!section) return;

  removeElement(".thumbnail-list");

  const loadingList = appendMovieList(section, "loading");

  try {
    const { results, totalPages } = await fetchFn();
    movies.addMovies(results);

    if (loadingList instanceof HTMLElement) {
      loadingList.remove();
    }
    appendMovieList(section, "fetched");

    if (totalPages === page.getCurrentPage()) {
      hideLoadMoreButton();
    }
  } catch (error) {
    if (loadingList instanceof HTMLElement) {
      loadingList.remove();
    }
    console.error("영화 불러오기 실패:", error);
    hideLoadMoreButton();
    renderErrorMessage(section, "영화 데이터를 불러오는 데 실패했습니다.");
  }
}

export default renderMovieList;
