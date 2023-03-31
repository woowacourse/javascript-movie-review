import "./css/reset.css";
import "./css/common.css";
import "./css/modal.css";
import "./css/layout.css";
import MovieList from "./components/movie-list/MovieList";
import NoResultsMessage from "./components/NoResultsMessage";
import Skeleton from "./components/Skeleton";
import { updateMovies } from "./domain/movies";
import MovieItem from "./components/movie-item/MovieItem";
import MovieModal from "./components/movie-modal/MovieModal";
import UserRating from "./components/user-rating/UserRating";
import Header from "./components/movie-header/Header";

updateMovies();

customElements.define("movie-header", Header);
customElements.define("movie-list", MovieList);
customElements.define("movie-item", MovieItem);
customElements.define("movie-modal", MovieModal);
customElements.define('user-rating', UserRating);
customElements.define("no-results-message", NoResultsMessage);
customElements.define("movie-skeleton", Skeleton);
