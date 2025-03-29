import Header from "./component/common/Header.js";
import MovieLayout from "./component/feature/MovieLayout";
import submitEvent from "./component-event/submitEvent.js";
import { fetchPopularMovies } from "./api/fetch.js";
import Banner from "./component/common/Banner.js";
import { getElement } from "./util/utils.js";
import { intersectionObserver } from "./component-event/intersectionObserver.js";

addEventListener("load", async() => {
  MovieLayout.skeletonRender();
  const movieData = await fetchPopularMovies(1);
  const movieLayout = new MovieLayout(movieData.results);
  const bannerElement = getElement('#bannerSection');
  if(bannerElement) bannerElement.innerHTML = Banner(movieData.results[0]);
  await submitEvent(movieLayout);
  Header();

  intersectionObserver(movieLayout)
    
});
