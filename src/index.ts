import "./css/reset.css";
import "./css/common.css";
import "./assets/logo.png";
import "./assets/search_button.png";
import "./assets/star_empty.png";
import "./assets/star_filled.png";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieItem from "./components/MovieItem";

customElements.define("movie-header", Header);
customElements.define("movie-list", MovieList);
customElements.define("movie-item", MovieItem);
