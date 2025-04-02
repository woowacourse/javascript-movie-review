import { initMovie } from "./apis/config/config";
import useGetMovieList from "./apis/movies/useGetMovieList";
import Modal from "./components/@common/Modal";
import Footer from "./components/footer/Footer";
import {
  headerRender,
  subTitleRenderer,
  serverSearchError,
  moreMovieServerError,
  movieListRenderer,
} from "./renderer";
import { movies, setMovies } from "./store/store";
import { observeLastMovie } from "./utils/InfiniteScroll";

const App = () => {
  const { fetchMovies } = useGetMovieList();

  if (movies.length === 0) {
    setMovies(
      Array.from({ length: 20 }).map((_) => {
        return initMovie;
      })
    );
    fetchMovies(1).then((results) => {
      if (results) {
        setMovies(results);
        observeLastMovie();
      }
    });
  }

  const mutationObserver = new MutationObserver(() => {
    observeLastMovie();
  });

  setTimeout(() => {
    const movieListElement = document.querySelector(".thumbnail-list");
    if (movieListElement) {
      mutationObserver.observe(movieListElement, { childList: true });
    }
  }, 0);

  return ` 
  ${headerRender()}
    <div class="app-layout">
      <h1 class="sub-title">${subTitleRenderer()}</h1>
      ${serverSearchError()}
      ${movieListRenderer()}
      ${moreMovieServerError()}
    </div>
    ${Modal()}
    ${Footer()}
    `;
};

export default App;
