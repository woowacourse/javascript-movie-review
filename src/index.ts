import "./css/reset.css";
import "./css/common.css";
import Header from "./components/Header";
import MovieList from "./components/MovieList";

customElements.define("movie-header", Header);
customElements.define("movie-list", MovieList);
