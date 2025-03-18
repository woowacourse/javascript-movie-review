import { IPage } from "../types/domain";
import MovieItem from "./components/MovieItem";
import { TMDB_TOKEN } from "./constants/api";

const thumbnailList = document.querySelector("ul.thumbnail-list");

const getMovieData = () => {
  try {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&api_key=${TMDB_TOKEN}`
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

getMovieData();
