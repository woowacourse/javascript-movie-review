import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { $ } from "./util/selector";

addEventListener("load", () => {
  renderHeader();
  renderMovieList();
});

const renderHeader = () => {
  const wrap = $("#wrap");
  const header = Header();
  wrap?.insertAdjacentHTML("afterbegin", header);
};

const renderMovieList = () => {
  const container = $(".container");
  const movieList = MovieList();
  container?.insertAdjacentHTML("afterbegin", movieList);
};
