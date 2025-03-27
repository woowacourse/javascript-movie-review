import { getLoadMovies } from "../state/movieState";
export default async function fetchAndSetLoadingEvent() {
  document.dispatchEvent(new CustomEvent("loading:start"));

  const loadMovies = getLoadMovies();
  let data = null;

  if (typeof loadMovies === "function") {
    data = await loadMovies();
  }

  document.dispatchEvent(
    new CustomEvent("loading:end", {
      detail: { isLastPage: data?.isLastPage ?? false },
    })
  );

  return data;
}
