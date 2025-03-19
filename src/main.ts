import { IPage } from "../types/domain";
import MovieItem from "./components/MovieItem";
import SearchBar from "./components/SearchBar";
import TextButton from "./components/TextButton";
import { TMDB_TOKEN } from "./constants/api";

const thumbnailList = document.querySelector("ul.thumbnail-list");
const mainSection = document.querySelector("main section");

const getMovieData = () => {
  const itemCount = document.querySelectorAll("ul.thumbnail-list li").length;
  const pageNumber = itemCount / 20 + 1;

  try {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageNumber}&api_key=${TMDB_TOKEN}`
    )
      .then((response) => response.json())
      .then((data: IPage) => {
        data.results.forEach(({ title, poster_path, vote_average }) => {
          const movieItem = new MovieItem({ title, vote_average, poster_path });
          const movieItemElement = movieItem.create();
          thumbnailList?.appendChild(movieItemElement);
        });
      });
  } catch (error) {
    alert("잘못됨");
  }
};

const seeMoreButton = new TextButton({
  title: "더보기",
  onClick: getMovieData,
  type: "primary",
});
mainSection?.appendChild(seeMoreButton.create());

getMovieData();

const searchBar = new SearchBar();
const logo = document.querySelector(".logo");
logo?.appendChild(searchBar.create());
