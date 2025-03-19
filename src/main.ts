import fetchPopularMovies from "./fetch/fetchPopularMovies";
import Main from "./components/Main";
import movies from "./store/movies";
import MovieList from "./components/MovieList";

const popularMovies = await fetchPopularMovies(1);
movies.updateMovies(popularMovies);

Main({
  movies: movies.getMovies(),
});
