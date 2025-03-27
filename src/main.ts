import fetchPopularMovies from "./fetch/fetchPopularMovies";
import Main from "./components/Main";
import movies from "./store/Movies";
import deleteParams from "./utils/deleteParams";
import MovieType from "./types/MovieType";

deleteParams();

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
  const res = await fetchPopularMovies(PAGE);
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
