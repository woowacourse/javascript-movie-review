import fetchPopularMovies from "./fetch/fetchPopularMovies";
import Main from "./components/Main";
import movies from "./store/Movies";
import deleteParams from "./utils/deleteParams";

deleteParams();

const PAGE = 1;
const popularMovieData = await fetchPopularMovies(PAGE);
movies.updateMovies(popularMovieData.results);

Main({
  movies: movies.movieList,
});
