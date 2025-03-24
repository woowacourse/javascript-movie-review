import MovieItem from "./MovieItem";
import { Movie } from "../../types/movie";

type MovieListProps = {
  movieItems?: Movie[];
};

const MovieList = ({ movieItems = [] }: MovieListProps) => {
  const movieContainer = document.createElement("section");
  movieContainer.classList.add("movie-container");

  if (movieItems === null) {
    return;
  }

  if (movieItems.length !== 0) {
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
  }

  if (movieItems.length === 0) {
    movieContainer.innerHTML = `
       <div class="empty-container">
        <img src="images/empty_logo.png" alt="우아한테크코스 로고" />
        <h2 class="empty-content">검색 결과가 없습니다.</h2>
      </div>
  `;
  }

  return movieContainer;
};

export default MovieList;
