import getPopularMovies from "./api/getPopularMovies";
import Footer from "./component/Footer";
import Header from "./component/Header";
import MovieList from "./component/MovieList";
import { $ } from "./util/selector";

addEventListener("load", async () => {
  renderHeader();
  renderMovieList();
  renderFooter();
});

const renderHeader = async () => {
  const { results: movies } = await getPopularMovies({ page: 1 });

  const wrap = $("#wrap");
  const header = Header({ movie: movies[0] });
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
