import Header from "./component/common/Header.js";
import MovieLayout from "./component/feature/MovieLayout";
import clickEvent from "./component-event/ClickEvent.js";
import submitEvent from "./component-event/submitEvent.js";
import { fetchPopularMovies } from "./api/fetch.js";
import Banner from "./component/common/Banner.js";
import { getElement } from "./util/utils.js";
import MovieDetail from "./component/common/MovieDetail.js";
import Modal from "./component/common/Modal.js";

addEventListener("load", async() => {
  MovieLayout.skeletonRender();
  const movieData = await fetchPopularMovies(1);
  const movieLayout = new MovieLayout(movieData.results);
  const bannerElement = getElement('#bannerSection');
  if(bannerElement) bannerElement.innerHTML = Banner(movieData.results[0]);
  await submitEvent(movieLayout);
  clickEvent(movieLayout);
  Header();
  Modal("in",MovieDetail({img:"https://image.tmdb.org/t/p/original//pmemGuhr450DK8GiTT44mgwWCP7.jpg",title:"인사이드아웃2", year:"2024", category:"공포", detail:"13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤"}))
  Modal.open("in")
});

