import Header from "./component/common/Header.js";
import {loadPopularMovies} from "./api/fetch.ts";
import MovieLayout from "./component/common/MovieLayout.js";
import clickEvent from "./util/ClickEvent.js";

addEventListener("load", async() => {
  clickEvent();
  Header();
 //await loadPopularMovies(1);
 (await MovieLayout({title: '인기 영화 보기'})).render();

});