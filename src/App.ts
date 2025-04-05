import useGetMovieList from "./apis/movies/useGetMovieList";
import Modal from "./components/@common/Modal";
import Footer from "./components/footer/Footer";
import { initMovie } from "./constants/initData";
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
