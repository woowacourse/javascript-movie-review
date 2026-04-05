import image from "../templates/images/star_filled.png";
import { fetchPopularMovies } from "./api/fetchMovies";
import { extractThumbnailInfo } from "./thumnailManager";
import LogoView from "./View/LogoView";
import {
  renderMoviesList,
  renderTopRatedMovie,
  renderSkeleton,
  removeSkeleton,
} from "./render";
import SearchView from "./View/SearchView";
import PageStore from "./store";
import MoreMovieView from "./View/MoreMovieView";

const views = {
  moreMovie: new MoreMovieView(),
  search: new SearchView(),
  logo: new LogoView(),
};
// 이벤트 바인딩
views.moreMovie.bindEvent();
views.search.bindEvent();
views.logo.bindEvent();

// 초기화면 렌더링
try {
  renderSkeleton();
  const { movies: popularMovies, totalPages: popularTotalPages } =
    await fetchPopularMovies(PageStore.popularMoviePage);
  removeSkeleton();

  if (PageStore.popularMoviePage === popularTotalPages) {
    moreButton.hide();
  }

  renderMoviesList(extractThumbnailInfo(popularMovies));
  renderTopRatedMovie(extractThumbnailInfo(popularMovies)[0]);
} catch (error) {
  alert(error);
}

addEventListener("load", () => {
  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
  }
});
