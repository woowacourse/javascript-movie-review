import { getMovies } from "./apis/MovieApi";
import MovieList from "./components/MovieList";
import ShowMore from "./components/ShowMore";

addEventListener("load", async () => {
  const responseData = await getMovies({ page: 1 });

  const $mainSection = document.querySelector("main section");
  $mainSection?.appendChild(MovieList(responseData.results));

  const $container = document.querySelector(".container");
  $container?.appendChild(ShowMore());
});
