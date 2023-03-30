import "./css/reset.css";
import "./css/common.css";
import Header from "./components/header";
import MovieList from "./components/movieList";
import NoResultsMessage from "./components/NoResultsMessage";
import Skeleton from "./components/Skeleton";
import MovieDetailModal from "./components/movieDetailModal";
import TopButton from "./components/topButton";
import { movieApi } from "./domain/movieApi";

movieApi.showMovies();

customElements.define("movie-header", Header);
customElements.define("movie-list", MovieList);
customElements.define("no-results-message", NoResultsMessage);
customElements.define("movie-skeleton", Skeleton);
customElements.define("movie-detail-modal", MovieDetailModal);
customElements.define("top-button", TopButton);
