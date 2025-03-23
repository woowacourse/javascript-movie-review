import TmdbApi from "./api/tmdbApi.js";
import MovieService from "./domain/services/MovieService.js";
import SearchBar from "./ui/components/SearchBar.js";
import MovieListHandler from "./ui/handlers/MovieListHandler.js";
import SearchHandler from "./ui/handlers/SearchHandler.js";

const tmdbApi = new TmdbApi(import.meta.env.VITE_API_KEY || "", import.meta.env.VITE_BASE_URL || "");
const movieService = new MovieService(tmdbApi);
const movieListHandler = new MovieListHandler(movieService);
const searchHandler = new SearchHandler(movieListHandler);

window.addEventListener("load", async () => {
  const searchBar = new SearchBar(searchHandler);
  searchBar.createSearchBar();

  
  const logo = document.querySelector(".logo");
  logo?.addEventListener("click", () => {
    movieListHandler.handleLogoClick();
  });

  await movieListHandler.initMovieList();
});
