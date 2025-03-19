import { IPage } from "../types/domain";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import SkeletonUl from "./components/SkeletonUl";
import TextButton from "./components/TextButton";
import { TMDB_KEY } from "./constants/api";
import { toggleSkeletonList } from "./utils/Render";

const thumbnailList = document.querySelector("ul.thumbnail-list");
const mainSection = document.querySelector("main section");

const getMovieData = () => {
  const itemCount = document.querySelectorAll("ul.thumbnail-list li").length;
  const pageNumber = itemCount / 20 + 1;
  toggleSkeletonList("show");
  try {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&region=KR&page=${pageNumber}&api_key=${TMDB_KEY}`
    )
      .then((response) => response.json())
      .then((data: IPage) => {
        data.results.forEach(({ title, poster_path, vote_average }) => {
          const movieItem = new MovieItem({ title, vote_average, poster_path });
          const movieItemElement = movieItem.create();
          thumbnailList?.appendChild(movieItemElement);

          toggleSkeletonList("hidden");
        });
      });
  } catch (error) {
    alert("잘못됨");
  }
};

const skeletonUl = new SkeletonUl();
mainSection?.appendChild(skeletonUl.create());

const seeMoreButton = new TextButton({
  id: "seeMore",
  title: "더보기",
  onClick: getMovieData,
  type: "primary",
});
mainSection?.appendChild(seeMoreButton.create());

getMovieData();

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
