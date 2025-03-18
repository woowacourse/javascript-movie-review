import Header from "./component/common/Header.js";
import {loadPopularMovies} from "./api/fetch.ts";

addEventListener("load", async() => {
  Header();
 await loadPopularMovies();
});