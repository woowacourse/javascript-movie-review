import fetchPopularMovies from "./fetch/fetchPopularMovies";
import Main from "./components/Main";
import movies from "./store/Movies";
import deleteParams from "./utils/deleteParams";

deleteParams();

Main({
  status: "loading",
  movies: [],
});

async function init() {
  const PAGE = 1;
  const popularMovieData = await fetchPopularMovies(PAGE);
  movies.updateMovies(popularMovieData.results);

  document.querySelector("#wrap")?.remove();

  Main({
    status: "fetched",
    movies: movies.movieList,
  });
}

init();
