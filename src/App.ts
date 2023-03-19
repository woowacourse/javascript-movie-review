import { getSearchResult } from "./api/keywordSearch";
import { getPopularMovie } from "./api/movieList";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import { generateElement } from "./domain/MovieDataManager";

export const App = async () => {
  const searchBox = SearchBox();

  const getPopularMovieInfo = getPopularMovie();
  const getCurrentPagePopularMovie = async () => {
    return await getPopularMovieInfo();
  };

  const currentPagePopularMovieData = await getCurrentPagePopularMovie();
  if (!currentPagePopularMovieData) return;

  const result = currentPagePopularMovieData?.data.results;
  const totalPages = currentPagePopularMovieData?.data.total_pages;

  const movieElement = generateElement(result);
  const movieItemList = MovieItemList(totalPages);

  movieItemList.addMovies(
    movieElement,
    currentPagePopularMovieData.currentPage
  );

  const searchInput = document.querySelector(".search-input");
  searchInput?.addEventListener("searchButtonClicked", async (e: Event) => {
    if (!(e instanceof CustomEvent)) return;
    document.querySelector("main")!.innerHTML = "";
    searchBox.updateKeyword(e.detail.query);

    showMovieList();
  });

  const showMovieList = async () => {
    const getSearchMoiveInfo = getSearchResult();

    const getCurrentSearchMovieInfo = async (keyword: string) => {
      return await getSearchMoiveInfo(keyword);
    };

    const { data, currentPage } = await getCurrentSearchMovieInfo(
      searchBox.getKeyword()
    );
    if (!data || !currentPage) return;

    const result = data.results;
    const searchResultElement = generateElement(result);

    const movieItemList = MovieItemList(data.total_pages);
    movieItemList.addMovies(searchResultElement, currentPage);

    document.querySelector(".primary")?.addEventListener("click", async () => {
      const { data, currentPage } = await getCurrentSearchMovieInfo(
        searchBox.getKeyword()
      );
      const result = data.results;
      const searchResultElement = generateElement(result);

      movieItemList.addMovies(searchResultElement, currentPage);
    });
  };

  document.querySelector(".primary")?.addEventListener("click", async () => {
    const currentPagePopularMovieData = await getCurrentPagePopularMovie();
    const result = await currentPagePopularMovieData?.data.results;
    const movieElement = generateElement(result);
    movieItemList.addMovies(
      movieElement,
      currentPagePopularMovieData!.currentPage
    );
  });

  return;
};
