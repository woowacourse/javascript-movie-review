import SearchBar from "./ui/components/SearchBar.js";
import MovieService from "./domain/services/MovieService.js";
import MovieList from "./ui/components/MovieList.js";

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  if (app) {
    SearchBar.createSearchBar();

    const movieService = new MovieService();
    const moviesData = await movieService.getPopularResults();

    const movieList = new MovieList(
      ".thumbnail-list",
      moviesData.movies,
      moviesData.page,
      moviesData.totalPages
    );
    movieList.init();
  }
});
