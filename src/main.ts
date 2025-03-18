import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { $ } from "./util/selector";

addEventListener("load", () => {
  renderHeader();
  renderMovieList();
  renderFooter();
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

const renderFooter = () => {
  const wrap = $("#wrap");
  const footer = Footer();
  wrap?.insertAdjacentHTML("afterend", footer);
};
