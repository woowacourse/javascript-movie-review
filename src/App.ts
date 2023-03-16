import { MovieInfoType } from "./@types/movieType";
import { getSearchResult } from "./api/keywordSearch";
import { getPopularMovie } from "./api/movieList";
import { moreButton } from "./components/moreButton";
import { MovieItem } from "./components/MovieItem";
import MovieItemList from "./components/MovieItemList";
import SearchBox from "./components/SearchBox";
import MovieData from "./domain/MovieData";

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
      // const { data, currentPage } = await getData(keyword)
      return await getData(keyword);
    };

    const movieData = new MovieData(); // 도메인 객체 생성
    // const response = await getCurrentTabResult(searchBox.getKeyword());
    const { data, currentPage } = await getCurrentTabResult(
      searchBox.getKeyword()
    );
    const result = data.results;
    const movieElement = await movieData.generateElement(
      await result,
      data.total_pages,
      currentPage
    ); // 받아온 정보 변환

    const movieItemList = new MovieItemList();
    movieItemList.addMovies(movieElement);

    document.querySelector(".primary")?.addEventListener("click", async () => {
      // const response = await getCurrentTabResult(searchBox.getKeyword());
      const { data, currentPage } = await getCurrentTabResult(
        searchBox.getKeyword()
      );

      const result = data.results;

      const movieElement = await movieData.generateElement(
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

  const movieData = new MovieData(); // 도메인 객체 생성
  // const response = await getCurrentTabResult();
  const a = await getCurrentTabResult();

  const result = await a?.data.results;
  console.log(result, "fffffff");
  const movieElement = await movieData.generateElement(
    await result,
    a?.data.total_pages,
    a?.currentPage as number
  ); // 받아온 정보 변환

  const movieItemList = new MovieItemList();
  movieItemList.addMovies(movieElement);

  document.querySelector(".primary")?.addEventListener("click", async () => {
    // const response = await getCurrentTabResult();
    const a = await getCurrentTabResult();

    const result = a?.data.results;

    const movieElement = await movieData.generateElement(
      await result,
      a?.data.total_pages,
      a?.currentPage as number
    );
    movieItemList.addMovies(movieElement);
  });

  return `
    <div></div>
    `;
};
