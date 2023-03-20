import "./css/reset.css";
import "./css/common.css";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import NoResultsMessage from "./components/NoResultsMessage";
import { movies } from "./domain/movies";
import Skeleton from "./components/Skeleton";

movies.showPopularMovies();

customElements.define("movie-header", Header);
customElements.define("movie-list", MovieList);
customElements.define("no-results-message", NoResultsMessage);
customElements.define("movie-skeleton", Skeleton);
