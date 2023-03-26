import { getCurrentResult } from "./api/keywordSearch";
import { getPopularMovie } from "./api/movieList";
import MovieDetailModal from "./components/MovieDetailModal";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import { generateElement } from "./domain/MovieDataManager";

export const App = async () => {
  const searchBox = SearchBox();

  let popularMovieCurrentPage = 1;
  const movieItemList = MovieItemList("POPULAR");

  const showPopularMovies = async () => {
    const popularMovieData = await getPopularMovie(popularMovieCurrentPage);
    if (!popularMovieData) return;

    const { results, total_pages } = popularMovieData.data;
    const currentPage = popularMovieData.currentPage;

    popularMovieCurrentPage = currentPage;
    const movieElement = generateElement(results);
    movieItemList.addMovies(movieElement, total_pages, popularMovieCurrentPage);

    const moreButton = document.querySelector(".primary");
    moreButton?.addEventListener("click", showPopularMovies);
  };

  await showPopularMovies();

  const showSearchResult = async () => {
    let searchMovieCurrentPage = 1;

    const currentSearchMovieData = await getCurrentResult(
      searchBox.getKeyword(),
      searchMovieCurrentPage
    );
    if (!currentSearchMovieData) return;

    const { results, total_pages } = currentSearchMovieData.data;
    searchMovieCurrentPage = currentSearchMovieData.currentPage;

    const searchResultElement = generateElement(results);
    const movieItemList = MovieItemList("SEARCH", searchBox.getKeyword());
    movieItemList.addMovies(
      searchResultElement,
      total_pages,
      searchMovieCurrentPage
    );

    const moreButton = document.querySelector(".primary");
    moreButton?.addEventListener("click", async () => {
      const currentSearchMovieData = await getCurrentResult(
        searchBox.getKeyword(),
        searchMovieCurrentPage
      );
      if (!currentSearchMovieData) return;

      const { results } = currentSearchMovieData.data;
      const page = currentSearchMovieData.currentPage;
      searchMovieCurrentPage = page;

      const searchResultElement = generateElement(results);
      movieItemList.addMovies(
        searchResultElement,
        total_pages,
        searchMovieCurrentPage
      );
    });
  };

  const onSearchButtonClicked = async (e: Event) => {
    if (!(e instanceof CustomEvent)) return;

    const mainElement = document.querySelector("main");
    if (!mainElement) return;
    mainElement.innerHTML = "";

    searchBox.updateKeyword(e.detail.query);
    await showSearchResult();
  };

  document
    .querySelector(".search-input")
    ?.addEventListener("searchButtonClicked", onSearchButtonClicked);

  const onMovieItemClicked = async (e: Event) => {
    if (!(e instanceof CustomEvent)) return;

    const movieId = e.detail.movieId;
    MovieDetailModal();
    console.log(e.detail.movieId);
  }

  document
    .addEventListener("movieItemClicked", onMovieItemClicked);

  return;
};
