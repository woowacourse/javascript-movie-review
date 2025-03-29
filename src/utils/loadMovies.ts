import { Movie, MovieResponse } from "../../types/movie.ts";
import MovieDetailModal from "../components/movie/MovieDetailModal.ts";
import MovieItem from "../components/movie/MovieItem.ts";
import { fetchMovieDetails } from "./api.ts";
import { $ } from "./dom.ts";

export const loadMovies = async (movies: MovieResponse): Promise<void> => {
  movies.results.forEach((movie: Movie) => {
    const posterPath = movie.poster_path;
    const movieElement = MovieItem({
      src: posterPath
        ? `https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`
        : "./images/default_poster.png",
      title: movie.title,
      rate: movie.vote_average,
      clickEvent: () => showMovieDetailInfo(movie),
    });

    $(".thumbnail-list").appendChild(movieElement);
  });

  if (movies.page === movies.total_pages) return;
  // $(".load-more").classList.add("hidden");
};

export const showMovieDetailInfo = async (movie: Movie): Promise<void> => {
  const movieInfo = await fetchMovieDetails(movie.id);
  document.body.classList.add("modal-open");
  $("#app").appendChild(MovieDetailModal(movieInfo));
};
