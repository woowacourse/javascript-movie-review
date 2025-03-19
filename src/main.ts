import image from "../templates/images/star_filled.png";
import SearchBar from "./ui/components/SearchBar.js";
import MovieService from "./domain/services/MovieService.js";
import MovieListHandler from "./ui/handlers/MovieListHandler.js";
import SearchHandler from "./ui/handlers/SearchHandler.js";

addEventListener("load", async () => {
  const app = document.querySelector("#app");


  if (app) {
    
    const movieService = new MovieService();
    const movieListHandler = new MovieListHandler(movieService);
    await movieListHandler.initMovieList();

    const searchHandler = new SearchHandler(movieListHandler);
    const searchBar = new SearchBar(searchHandler);
    searchBar.createSearchBar();
  }
});
