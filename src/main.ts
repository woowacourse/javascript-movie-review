import Footer from "./components/Footer";
import Header from "./components/Header";
import { MovieInfo } from "../types/movieType.ts";
import ContentsContainer from "./components/ContentsContainer.ts";
import MovieService from "./services/MovieService.ts";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

async function getPopularMovies() {
  const movieService = new MovieService();
  const data = await movieService.getPopularMovies();
  // 헤더 렌더링
  renderHeader(data.results[0]);

  // 컨텐츠 컨테이너
  ContentsContainer(data.results);
}

function renderHeader({ title, poster_path, vote_average }: MovieInfo) {
  const $container = document.querySelector("#wrap");
  const $header = Header({ title, poster_path, vote_average });

  $container?.prepend($header);
}

function renderFooter() {
  const $container = document.querySelector("#wrap");
  const $footer = Footer();
  $container?.appendChild($footer);
}

getPopularMovies();

renderFooter();
