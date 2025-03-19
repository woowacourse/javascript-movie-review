import fetchPopularMovies from "./fetch/fetchPopularMovies";
import Main from "./components/Main";

const popularMovies = await fetchPopularMovies();

Main({
  popularMovies: popularMovies,
  isReRender: false,
});
