import { Movie, MovieResponse } from "../../../types/movie";
import { $ } from "../../utils/dom";
import MovieItem from "./MovieItem";
import NoSearchResults from "./NoSearchResults";

const MovieList = (movies: MovieResponse) => {
  if (movies?.results.length === 0) {
    $(".thumbnail-list").before(NoSearchResults("검색 결과가 없습니다."));
    return;
  }

  const fragment = document.createDocumentFragment();
  movies?.results.forEach((movie: Movie) => {
    const posterPath = movie.poster_path;
    const movieElement = MovieItem({
      src: posterPath
        ? `https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`
        : "./images/default_poster.png",
      title: movie.title,
      rate: movie.vote_average,
    });

    fragment.appendChild(movieElement);
  });
  $(".thumbnail-list").appendChild(fragment);

  if (movies.page === movies.total_pages)
    $(".load-more").classList.add("hidden");

  return fragment;
};
export default MovieList;
