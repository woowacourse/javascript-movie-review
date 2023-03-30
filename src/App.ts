import { MovieItemListType } from "./@types/movieType";
import { getCurrentResult } from "./api/keywordSearch";
import { getMovieDetail } from "./api/movieDetail";
import { getPopularMovie } from "./api/movieList";
import MovieDetailModal from "./components/MovieDetailModal";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import { convertToMovieDetailData, generateElement } from "./domain/MovieDataManager";
import { CURRENT_TAB, MOVIE_DATA } from "./constant/constant";

export const App = () => {
  const searchBox = SearchBox();

  const getMoreData = async (
    moreButton: Element,
    movieItemList: MovieItemListType,
    currentPage: number,
    getCurrentData: (page: number) => Promise<any>
  ) => {
    const io = new IntersectionObserver(async (entries) => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          try {
            currentPage++;
            const currentData = await getCurrentData(currentPage);
            if (!currentData) return;

            const { results, total_pages } = currentData.data;
            const searchResultElement = generateElement(results);
            movieItemList.addMovies(searchResultElement, total_pages, currentPage);
          } catch (error) {
            window.alert(error);
          }
        }
      })
    }, {});
    io.observe(moreButton);
  };

  const getMorePopularMovieResult = async (moreButton: Element, movieItemList: MovieItemListType) => {
    const getCurrentData = (page: number) => getPopularMovie(page);
    await getMoreData(moreButton, movieItemList, MOVIE_DATA.INITIAL_PAGE, getCurrentData);
  };

  const getMoreSearchResult = async (moreButton: Element, movieItemList: MovieItemListType, keyword: string) => {
    const getCurrentData = (page: number) => getCurrentResult(keyword, page);
    await getMoreData(moreButton, movieItemList, MOVIE_DATA.INITIAL_PAGE, getCurrentData);
  };

  const showPopularMovies = async () => {
    const movieItemList = MovieItemList(CURRENT_TAB.POPULAR);

    const popularMovieData = await getPopularMovie(MOVIE_DATA.INITIAL_PAGE);
    if (!popularMovieData) return;

    const { results, total_pages } = popularMovieData.data;
    const currentPage = popularMovieData.currentPage;

    const popularMovieCurrentPage = currentPage;
    const movieElement = generateElement(results);
    movieItemList.addMovies(movieElement, total_pages, popularMovieCurrentPage);

    const moreButton = document.querySelector(".primary");
    if (!moreButton) return;

    getMorePopularMovieResult(moreButton, movieItemList);
  };

  const showSearchResult = async () => {
    const keyword = searchBox.getKeyword();
    const currentSearchMovieData = await getCurrentResult(keyword, MOVIE_DATA.INITIAL_PAGE);
    if (!currentSearchMovieData) return;

    const { results, total_pages } = currentSearchMovieData.data;
    const currentPage = currentSearchMovieData.currentPage;
    const searchResultElement = generateElement(results);
    const movieItemList = MovieItemList(CURRENT_TAB.SEARCH, keyword);
    movieItemList.addMovies(searchResultElement, total_pages, currentPage);

    const moreButton = document.querySelector(".primary")!;
    getMoreSearchResult(moreButton, movieItemList, keyword);
  };

  const onSearchButtonClicked = async (e: Event) => {
    if (!(e instanceof CustomEvent)) return;

    const mainElement = document.querySelector("main");
    if (!mainElement) return;
    mainElement.innerHTML = "";

    searchBox.updateKeyword(e.detail.query);
    await showSearchResult();
  };

  const onMovieItemClicked = async (e: Event) => {
    if (!(e instanceof CustomEvent)) return;

    const movieId = e.detail.movieId;
    const movieDetailData = convertToMovieDetailData(await getMovieDetail(movieId));
    MovieDetailModal(movieDetailData);
  }

  showPopularMovies();

  document.querySelector(".logo")?.addEventListener("click", () =>
    window.location.reload());

  document
    .querySelector(".search-input")
    ?.addEventListener("searchButtonClicked", onSearchButtonClicked);

  document
    .addEventListener("movieItemClicked", onMovieItemClicked);

  return;
};
