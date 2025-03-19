import Header from "./component/common/Header.js";
import MovieLayout from "./component/common/MovieLayout.js";
import clickEvent from "./util/clickEvent.js";
import submitEvent from "./util/submitEvent.js";

addEventListener("load", async() => {
  await submitEvent();
  clickEvent();
  Header();
 (await MovieLayout({title: '인기 영화 보기', eventName:'readMoreMovieList'})).initialRender();

});