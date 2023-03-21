import { getCurrentResult } from "./api/keywordSearch";
import { getPopularMovie } from "./api/movieList";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import { generateElement } from "./domain/MovieDataManager";

export const App = async () => {
  const searchBox = SearchBox();

  let popularMovieCurrentPage = 1;
  const currentPagePopularMovieData = await getPopularMovie(
    popularMovieCurrentPage
  );
  if (!currentPagePopularMovieData) return;

  const { results, total_pages } = currentPagePopularMovieData?.data;
  popularMovieCurrentPage = currentPagePopularMovieData.currentPage;

  const movieElement = generateElement(results);
  const movieItemList = MovieItemList(total_pages, "POPULAR");

  movieItemList.addMovies(movieElement, popularMovieCurrentPage);

  const searchInput = document.querySelector(".search-input");
  searchInput?.addEventListener("searchButtonClicked", async (e: Event) => {
    if (!(e instanceof CustomEvent)) return;
    document.querySelector("main")!.innerHTML = "";
    searchBox.updateKeyword(e.detail.query);

    showMovieList();
  });

  const showMovieList = async () => {
    let searchMovieCurrentPage = 1;

    const currentSearchMovieData = await getCurrentResult(
      searchBox.getKeyword(),
      searchMovieCurrentPage
    );
    if (!currentSearchMovieData) return;

    const { results, total_pages } = currentSearchMovieData?.data;
    searchMovieCurrentPage = currentSearchMovieData.currentPage;

    const searchResultElement = generateElement(results);
    const movieItemList = MovieItemList(total_pages, "SEARCH");
    movieItemList.addMovies(searchResultElement, searchMovieCurrentPage);

    document.querySelector(".primary")?.addEventListener("click", async () => {
      const currentSearchMovieData = await getCurrentResult(
        searchBox.getKeyword(),
        searchMovieCurrentPage
      );

      if (!currentSearchMovieData) return;
      const result = currentSearchMovieData?.data.results;
      searchMovieCurrentPage = currentSearchMovieData.currentPage;

      const searchResultElement = generateElement(result);
      movieItemList.addMovies(searchResultElement, searchMovieCurrentPage);
    });
  };

  document.querySelector(".primary")?.addEventListener("click", async () => {
    const currentPagePopularMovieData = await getPopularMovie(
      popularMovieCurrentPage
    );
    if (!currentPagePopularMovieData) return;

    const { results } = currentPagePopularMovieData?.data;
    popularMovieCurrentPage = currentPagePopularMovieData.currentPage;

    const movieElement = generateElement(results);

    movieItemList.addMovies(
      movieElement,
      currentPagePopularMovieData.currentPage
    );
  });

  return;
};
