import { IPage } from "../types/domain";
import api from "./api/api";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import TextButton from "./components/TextButton";
import { BACKDROP_IMG_PREFIX } from "./constants/movie";
import { toggleSkeletonList } from "./utils/Render";

const getMovieData = async () => {
  const itemCount = document.querySelectorAll("ul.thumbnail-list li").length;
  const pageNumber = itemCount / 20 + 1;

  return (await api.getMovieData(pageNumber)) as IPage;
};

const renderTitleMovie = async () => {
  const topMovieData = (await getMovieData()).results[0];
  const movieTitle = topMovieData.title;
  const movieRate = topMovieData.vote_average;
  const movieBackdropUrl = BACKDROP_IMG_PREFIX + topMovieData.backdrop_path;

  const topMovieTitle = document.querySelector(
    ".top-rated-movie .title"
  ) as HTMLDivElement;
  const topMovieRateValue = document.querySelector(
    ".top-rated-movie .rate-value"
  ) as HTMLSpanElement;
  const backgroundOverlay = document.querySelector(
    ".background-container .overlay"
  ) as HTMLDivElement;

  topMovieTitle.textContent = movieTitle;
  topMovieRateValue.textContent = String(movieRate);
  backgroundOverlay.style.backgroundImage = `url("${movieBackdropUrl}")`;
};

const renderMovieData = async () => {
  toggleSkeletonList("show");

  const movieData = (await getMovieData()).results;

  movieData.forEach(({ title, poster_path, vote_average }) => {
    const movieItem = new MovieItem({ title, vote_average, poster_path });
    const movieItemElement = movieItem.create();
    thumbnailList?.appendChild(movieItemElement);
  });

  toggleSkeletonList("hidden");
};

const thumbnailList = document.querySelector("ul.thumbnail-list");
const mainSection = document.querySelector("main section");
const skeletonUl = new SkeletonUl();

const seeMoreButton = new TextButton({
  id: "seeMore",
  title: "더보기",
  onClick: renderMovieData,
  type: "primary",
});

const searchBar = new SearchBar();
const logo = document.querySelector(".logo");
const logoImage = document.querySelector(".logo img");

renderTitleMovie();
logoImage?.addEventListener("click", () => {
  window.location.reload();
});
logo?.appendChild(searchBar.create());
mainSection?.appendChild(skeletonUl.create());
mainSection?.appendChild(seeMoreButton.create());
renderMovieData();
