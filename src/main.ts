import image from "../templates/images/star_filled.png";
import { fetchMovies } from "./features/fetchMovies";
import MovieList from "./features/UI/MovieCard";

addEventListener("load", async () => {
  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
  }

  // fetchAPI를 불러와서 MovieList 생성자를 만들고, 불러오면 끝
  const MovieListInstance = new MovieList();
  const fetchMovie = await fetchMovies(1);

  MovieListInstance.renderMovieList(fetchMovie);
});
