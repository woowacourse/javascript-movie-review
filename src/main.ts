import Header from "./component/common/Header.js";
import MovieLayout from "./component/common/MovieLayout.js";
import clickEvent from "./util/clickEvent.js";
import submitEvent from "./util/submitEvent.js";
import { fetchPopularMovies } from "./api/fetch.js";
import Banner from "./component/common/Banner.js";

addEventListener("load", async() => {
  const movieData = await fetchPopularMovies(1);
  const movieLayout = new MovieLayout(movieData.results);
  document.getElementById('bannerSection').innerHTML = Banner(movieData.results[0]);
  await submitEvent(movieLayout);
  clickEvent(movieLayout);
  Header();

});

