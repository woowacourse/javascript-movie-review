
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


    //TODO: searchBar를 searchHandler내부로 이동하도록 refactor
    const searchHandler = new SearchHandler(movieService);
    const searchBar = new SearchBar(searchHandler);
    searchBar.createSearchBar();
  }
});
