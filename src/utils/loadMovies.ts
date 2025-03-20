import { Movie, MovieResponse } from "../../types/movie.ts";
import MovieItem from "../components/movie/MovieItem.ts";
import { $ } from "./dom.ts";

export const loadMovies = async (movies: MovieResponse): Promise<void> => {
  movies.results.forEach((movie: Movie) => {
    const posterPath = movie.poster_path;
    const movieElement = MovieItem({
      src: posterPath
        ? `https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`
        : "./images/default-poster.png",
      title: movie.title,
      rate: movie.vote_average,
    });

    $(".thumbnail-list").appendChild(movieElement);
  });

  if (movies.page === movies.total_pages)
    $(".load-more").classList.add("hidden");
};
