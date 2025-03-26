import fetchPopularMovies from "./fetch/fetchPopularMovies";
import Main from "./components/Main";
import movies from "./store/Movies";
import deleteParams from "./utils/deleteParams";

deleteParams();

Main({
  movies: "loading",
});

async function init() {
  const PAGE = 1;
  const popularMovieData = await fetchPopularMovies(PAGE);
  movies.updateMovies(popularMovieData!.results);

  document.querySelector("#wrap")?.remove();

  Main({
    movies: movies.movieList,
  });
}

init();
