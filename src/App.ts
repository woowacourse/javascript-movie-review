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
  console.log(document.querySelector(".search-input"));
  document
    .querySelector(".search-input")!
    .addEventListener("searchButtonClicked", (e: unknown) => {
      if (!(e instanceof CustomEvent)) return;
      console.log(e.detail.query);
    });

  const getData = getPopularMovie(); // 최초 데이타

  // const movieItems = await getData();

  // const movieData = new MovieData(movieItems);
  // const movieElement = movieData
  //   .convertMovieData()
  //   .map((item: any) => {
  //     return MovieItem(item);
  //   })
  //   .join();

  // const movieItemList = new MovieItemList(movieElement, getData, currentTab);

  const movieData = new MovieData(); // 도메인 객체 생성
  const movieElement = await movieData.generateElement(getData); // 받아온 정보 변환

  const movieItemList = new MovieItemList();
  movieItemList.addMovies(movieElement);

  document.querySelector(".primary")?.addEventListener("click", async () => {
    const movieElement = await movieData.generateElement(getData);
    movieItemList.addMovies(movieElement);
  });

  return `
    <div></div>
    `;
};
