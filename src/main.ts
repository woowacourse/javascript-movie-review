import image from "../templates/images/star_filled.png";
import SearchBar from "./ui/components/SearchBar.js";
import MovieService from "./domain/services/MovieService.js";
import MovieList from "./ui/components/MovieList.js";
addEventListener("load", async () => {
  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
    SearchBar.createSearchBar();
    const movieService = new MovieService();
    const moviesData = await movieService.getPopularResults();

    const movieList = new MovieList(
      "ul",
      moviesData.movies,
      moviesData.page,
      moviesData.totalPages
    );
    movieList.loadInitMovie();
  }
});
