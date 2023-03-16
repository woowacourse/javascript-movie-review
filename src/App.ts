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
      const getData = getSearchResult();

      const getCurrentTabResult = async (keyword: string) => {
        if (currentTab === "SEARCH") {
          console.log(getData(keyword));
          return await getData(keyword);
        }
      };

      const movieData = new MovieData(); // 도메인 객체 생성
      const result =
        currentTab === "ALL"
          ? getCurrentTabResult("")
          : getCurrentTabResult(searchBox.getKeyword());
      const movieElement = await movieData.generateElement(await result); // 받아온 정보 변환

      const movieItemList = new MovieItemList();
      movieItemList.addMovies(movieElement);

      document
        .querySelector(".primary")
        ?.addEventListener("click", async () => {
          const result =
            currentTab === "ALL"
              ? getCurrentTabResult("")
              : getCurrentTabResult(searchBox.getKeyword());

          const movieElement = await movieData.generateElement(await result);
          movieItemList.addMovies(movieElement);
        });
    });

  const getData = getPopularMovie(); // 최초 데이타

  const getCurrentTabResult = () => {
    if (currentTab === "ALL") {
      return getData();
    }
  };

  const movieData = new MovieData(); // 도메인 객체 생성
  const result = getCurrentTabResult();
  const movieElement = await movieData.generateElement(await result); // 받아온 정보 변환

  const movieItemList = new MovieItemList();
  movieItemList.addMovies(movieElement);

  document.querySelector(".primary")?.addEventListener("click", async () => {
    const result = getCurrentTabResult();

    console.log(result, "app");
    const movieElement = await movieData.generateElement(await result);
    movieItemList.addMovies(movieElement);
  });

  return `
    <div></div>
    `;
};
