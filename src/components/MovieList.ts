import MovieItem from "./MovieItem";
import { Movie } from "../../types/movie";

type MovieListProps = {
  movieItems?: Movie[];
};

const MovieList = ({ movieItems = [] }: MovieListProps) => {
  const movieContainer = document.createElement("section");
  movieContainer.classList.add("movie-container");

  const ul = document.createElement("ul");
  ul.classList.add("thumbnail-list");

  movieItems.forEach((movie) => {
    const movieItemElement = MovieItem({
      title: movie.title,
      voteAverage: movie.voteAverage,
      posterPath: movie.posterPath,
    });

    ul.appendChild(movieItemElement);
  });

  movieContainer.appendChild(ul);

  return movieContainer;
};

export default MovieList;
