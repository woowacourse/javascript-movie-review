import MovieList from "./components/MovieList/MovieList";

addEventListener("load", () => {
  const wrap = document.querySelector("#wrap");

  if (wrap) {
    MovieList.init();
  }
});
