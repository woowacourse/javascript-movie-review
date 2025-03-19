import image from "../templates/images/star_filled.png";
import SearchBar from "./ui/components/SearchBar.js";
import MovieService from "./domain/services/MovieService.js";
addEventListener("load", () => {
  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
    SearchBar.createSearchBar();
    const movieService = new MovieService();
    movieService.getPopularResults().then(({movies, page, totalPages}) => {
      console.log(movies);
      console.log(page);
      console.log(totalPages);
    });
  }
});