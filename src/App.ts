import { getCurrentResult } from "./api/keywordSearch";
import { getMovieDetail } from "./api/movieDetail";
import { getPopularMovie } from "./api/movieList";
import MovieDetailModal from "./components/MovieDetailModal";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import { convertToMovieDetailData, generateElement } from "./domain/MovieDataManager";

export const App = async () => {
  const searchBox = SearchBox();

  const getMoreData = async (
    moreButton: Element,
    movieItemList: any,
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

  const getMorePopularMovieResult = async (moreButton: Element, movieItemList: any) => {
    let currentPage = 1;
    const getCurrentData = (page: number) => getPopularMovie(page);
    await getMoreData(moreButton, movieItemList, currentPage, getCurrentData);
  };

  const getMoreSearchResult = async (moreButton: Element, movieItemList: any, keyword: string) => {
    let currentPage = 1;
    const getCurrentData = (page: number) => getCurrentResult(keyword, page);
    await getMoreData(moreButton, movieItemList, currentPage, getCurrentData);
  };

  const showPopularMovies = async () => {
    let popularMovieCurrentPage = 1;
    const movieItemList = MovieItemList("POPULAR");

    const popularMovieData = await getPopularMovie(popularMovieCurrentPage);
    if (!popularMovieData) return;

    const { results, total_pages } = popularMovieData.data;
    const currentPage = popularMovieData.currentPage;

    popularMovieCurrentPage = currentPage;
    const movieElement = generateElement(results);
    movieItemList.addMovies(movieElement, total_pages, popularMovieCurrentPage);

    const moreButton = document.querySelector(".primary")!;
    getMorePopularMovieResult(moreButton, movieItemList);
  };

  const showSearchResult = async () => {
    const keyword = searchBox.getKeyword();
    const currentSearchMovieData = await getCurrentResult(keyword, 1);
    if (!currentSearchMovieData) return;

    const { results, total_pages } = currentSearchMovieData.data;
    const currentPage = currentSearchMovieData.currentPage;
    const searchResultElement = generateElement(results);
    const movieItemList = MovieItemList("SEARCH", keyword);
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

  await showPopularMovies();

  document
    .querySelector(".search-input")
    ?.addEventListener("searchButtonClicked", onSearchButtonClicked);

  document
    .addEventListener("movieItemClicked", onMovieItemClicked);

  return;
};
