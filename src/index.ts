import "./css/reset.css";
import "./css/common.css";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import NoResultsMessage from "./components/NoResultsMessage";

customElements.define("movie-header", Header);
customElements.define("movie-list", MovieList);
customElements.define("no-results-message", NoResultsMessage);
