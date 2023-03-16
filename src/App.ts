import { getSearchResult } from "./api/keywordSearch";
import { getPopularMovie } from "./api/movieList";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import MovieDataManager from "./domain/MovieDataManager";

export const App = async () => {
  let currentTab = "ALL";

  const searchBox = new SearchBox();
  document
    .querySelector(".search-input")!
    .addEventListener("searchButtonClicked", async (e: unknown) => {
      if (!(e instanceof CustomEvent)) return;
      document.querySelector("main")!.innerHTML = "";
      currentTab = "SEARCH";
      searchBox.updateKeyword(e.detail.query);

      showMovieList();
    });

  const showMovieList = async () => {
    const getData = getSearchResult();

    const getCurrentTabResult = async (keyword: string) => {
      return await getData(keyword);
    };

    const movieDataManager = new MovieDataManager();
    const { data, currentPage } = await getCurrentTabResult(
      searchBox.getKeyword()
    );
    const result = data.results;
    const movieElement = await movieDataManager.generateElement(
      await result,
      data.total_pages,
      currentPage
    );

    const movieItemList = new MovieItemList();
    movieItemList.addMovies(movieElement);

    document.querySelector(".primary")?.addEventListener("click", async () => {
      const { data, currentPage } = await getCurrentTabResult(
        searchBox.getKeyword()
      );

      const result = data.results;

      const movieElement = await movieDataManager.generateElement(
        await result,
        data.total_pages,
        currentPage
      );
      movieItemList.addMovies(movieElement);
    });
  };

  const getData = getPopularMovie(); // 최초 데이타

  const getCurrentTabResult = async () => {
    return await getData();
  };

  const movieDataManager = new MovieDataManager(); // 도메인 객체 생성
  const popularMovieData = await getCurrentTabResult();

  const result = await popularMovieData?.data.results;
  const movieElement = await movieDataManager.generateElement(
    await result,
    popularMovieData?.data.total_pages,
    popularMovieData?.currentPage as number
  );

  const movieItemList = new MovieItemList();
  movieItemList.addMovies(movieElement);

  document.querySelector(".primary")?.addEventListener("click", async () => {
    const popularMovieData = await getCurrentTabResult();
    const result = popularMovieData?.data.results;
    const movieElement = await movieDataManager.generateElement(
      await result,
      popularMovieData?.data.total_pages,
      popularMovieData?.currentPage as number
    );
    movieItemList.addMovies(movieElement);
  });

  return;
};
