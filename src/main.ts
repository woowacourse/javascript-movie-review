import fetchPopularMovies from "./fetch/fetchPopularMovies";
import Main from "./components/Main";
import movies from "./store/movies";

const PAGE = 1;
const popularMovies = await fetchPopularMovies(PAGE);
movies.updateMovies(popularMovies);

Main({
  movies: movies.movieList,
});
