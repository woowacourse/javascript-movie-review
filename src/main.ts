import Header from "./component/common/Header.js";
import MovieLayout from "./component/feature/MovieLayout";
import clickEvent from "./component-event/ClickEvent.js";
import submitEvent from "./component-event/submitEvent.js";
import { fetchPopularMovies } from "./api/fetch.js";
import Banner from "./component/common/Banner.js";
import { getElement } from "./util/utils.js";

addEventListener("load", async() => {
  MovieLayout.skeletonRender();
  const movieData = await fetchPopularMovies(1);
  const movieLayout = new MovieLayout(movieData.results);
  const bannerElement = getElement('#bannerSection');
  if(bannerElement) bannerElement.innerHTML = Banner(movieData.results[0]);
  await submitEvent(movieLayout);
  clickEvent(movieLayout);
  Header();
});

