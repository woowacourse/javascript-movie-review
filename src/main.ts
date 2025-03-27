import fetchPopularMovies from "./fetch/fetchPopularMovies";
import fetchSearchMovies from "./fetch/fetchSearchMovies";
import Main from "./components/Main";
import movies from "./store/Movies";
import MovieType from "./types/MovieType";

async function fetchAndRender(fetchFn: () => Promise<MovieType[]>) {
  renderMain("loading");
  document.querySelector("#wrap")?.remove();

  try {
    const data = await fetchFn();
    renderMain("fetched", data);
  } catch (error) {
    console.error("영화 불러오기 실패:", error);
    renderMain("error");
  }
}

fetchAndRender(async () => {
  const PAGE = 1;
  const params = new URLSearchParams(window.location.search);

  const res = params.has("query")
    ? await fetchSearchMovies(params.get("query") || "", PAGE)
    : await fetchPopularMovies(PAGE);

  movies.updateMovies(res.results);
  return movies.movieList;
});

function renderMain(
  status: "loading" | "fetched" | "error",
  movies: MovieType[] = []
) {
  Main({
    status,
    movies,
  });
}
