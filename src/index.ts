import "./css/reset.css";
import "./css/common.css";
import "./css/modal.css";
import "./css/layout.css";
import HeaderPc from "./components/headers/HeaderPc";
import MovieList from "./components/MovieList";
import NoResultsMessage from "./components/NoResultsMessage";
import Skeleton from "./components/Skeleton";
import { updateMovies } from "./domain/movies";
import MovieItem from "./components/MovieItem";
import MovieModal from "./components/MovieModal";
import HeaderMobile from "./components/headers/HeaderMobile";

updateMovies();

customElements.define("header-pc", HeaderPc);
customElements.define("header-mobile", HeaderMobile);
customElements.define("movie-list", MovieList);
customElements.define("movie-item", MovieItem);
customElements.define("movie-modal", MovieModal);
customElements.define("no-results-message", NoResultsMessage);
customElements.define("movie-skeleton", Skeleton);
