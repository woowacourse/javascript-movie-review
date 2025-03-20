import { MovieInfo } from "../../types/movieType.ts";
import Movie from "./Movie.ts";
import Skeleton from "./Skeleton.js";

class MovieList {
  movieList: Movie[];
  constructor(movies: MovieInfo[]) {
    this.movieList = movies.map(
      ({ id, poster_path, title, vote_average }) =>
        new Movie({ id, poster_path, title, vote_average })
    );
  }

  renderMovieList() {
    const $listContainer = document.createElement("ul");
    $listContainer.classList.add("thumbnail-list");

    this.movieList.forEach((movieInstance) => {
      const $skeleton = Skeleton();
      $listContainer.appendChild($skeleton);

      setTimeout(() => {
        const $movie = movieInstance.movieRender();
        $listContainer.replaceChild($movie, $skeleton);
      }, 2000);
    });

    return $listContainer;
  }
}

export default MovieList;
