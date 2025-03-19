import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { MovieInfo } from "../types/movieType.ts";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

async function getPopularMovies() {
  const response = await fetch(
    `${import.meta.env.VITE_REQUEST_URL}/movie/popular?language=ko-KR&page=1`,
    options
  );

  if (response.status === 200) {
    const data = await response.json();
    // 헤더 렌더링
    renderHeader(data.results[0]);

    // MovieList 렌더링
    const movieList = new MovieList(data.results);
    const $listContainer = movieList.renderMovieList();
    const $section = document.querySelector("section");
    $section?.appendChild($listContainer);
  }
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
