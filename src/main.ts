import { IPage } from "../types/domain";
import api from "./api/api";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import TextButton from "./components/TextButton";
import { toggleSkeletonList } from "./utils/Render";

const thumbnailList = document.querySelector("ul.thumbnail-list");
const mainSection = document.querySelector("main section");

const getMovieData = async () => {
  const itemCount = document.querySelectorAll("ul.thumbnail-list li").length;
  const pageNumber = itemCount / 20 + 1;

  return (await api.getMovieData(pageNumber)) as IPage;
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

const skeletonUl = new SkeletonUl();
mainSection?.appendChild(skeletonUl.create());

const seeMoreButton = new TextButton({
  id: "seeMore",
  title: "더보기",
  onClick: renderMovieData,
  type: "primary",
});
mainSection?.appendChild(seeMoreButton.create());

await renderMovieData();

const searchBar = new SearchBar();
const logo = document.querySelector(".logo");
logo?.appendChild(searchBar.create());

const searchBarElement = document.querySelector(
  ".search-bar"
) as HTMLInputElement;

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    searchBar.onSearchClick();
  }
};

searchBarElement.onfocus = () => {
  window.addEventListener("keydown", handleKeyDown);
};

searchBarElement.onblur = () => {
  window.removeEventListener("keydown", handleKeyDown);
};

const logoImage = document.querySelector(".logo img");
logoImage?.addEventListener("click", () => {
  window.location.reload();
});
