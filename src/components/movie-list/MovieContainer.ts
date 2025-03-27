import {
  movieState,
  popularMovieList,
  searchedMovieList,
} from "../../store/movieService";
import MovieList from "./MovieList";

type MovieContainerProps = {
  $movieContainer: HTMLElement;
};

const MovieContainer = ({ $movieContainer }: MovieContainerProps) => {
  const resetMovieContainer = () => {
    $movieContainer.innerHTML = "";
  };

  const renderMovieContainer = () => {
    const $popularMovieList = MovieList({ movieItems: popularMovieList.list });
    const $searchedMovieList = MovieList({
      movieItems: searchedMovieList.list,
    });

    resetMovieContainer();

    if (movieState.mode === "popular") {
      // render popularMovieList
      $movieContainer.appendChild($popularMovieList);
      return;
    }
    // render searchedMovieList
    $movieContainer.appendChild($searchedMovieList);
  };

  return { $movieContainer, renderMovieContainer };
};

export default MovieContainer;
