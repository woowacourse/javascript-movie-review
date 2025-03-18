import { getMovies } from "./apis/MovieApi";
import MovieList from "./components/MovieList";

addEventListener("load", async () => {
  const responseData = await getMovies({ page: 1 });

  const mainSection = document.querySelector("main section");
  mainSection?.appendChild(MovieList(responseData.results));
});
