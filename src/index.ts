import "./css/reset.css";
import "./css/common.css";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import NoResultsMessage from "./components/NoResultsMessage";
import Skeleton from "./components/Skeleton";
import { updateMovies } from "./domain/movies";
import MovieItem from "./components/MovieItem";

updateMovies();

customElements.define("movie-header", Header);
customElements.define("movie-list", MovieList);
customElements.define("movie-item", MovieItem);
customElements.define("no-results-message", NoResultsMessage);
customElements.define("movie-skeleton", Skeleton);
