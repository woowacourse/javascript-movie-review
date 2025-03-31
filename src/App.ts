import useGetMoreMovieList from "./apis/movies/useGetMoreMovieList";
import useGetMovieList from "./apis/movies/useGetMovieList";
import Modal from "./components/@common/Modal";
import Footer from "./components/footer/Footer";
import {
  headerRender,
  subTitleRenderer,
  moreButtonRenderer,
  serverSearchError,
  moreMovieServerError,
  movieListRenderer,
} from "./renderer";
import { movies, setMovies } from "./store/store";
import { useEvents } from "./utils/Core";
import { timeoutDebounce } from "./utils/debounce";
import { observeLastMovie } from "./utils/InfiniteScroll";

const App = () => {
  const { fetchMovies } = useGetMovieList();
  const { fetchMoreMovies } = useGetMoreMovieList();

  const [addEvent] = useEvents(".app-layout");

  addEvent(
    "click",
    ".more-button",
    timeoutDebounce(() => {
      fetchMoreMovies(fetchMovies);
    }, 500)
  );

  if (movies.length === 0) {
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
    ${moreButtonRenderer()}
    </div>
    ${Modal()}
    ${Footer()}
    `;
};

export default App;
