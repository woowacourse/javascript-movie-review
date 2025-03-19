import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import MovieItem from "./components/movie/MovieItem.ts";
import { $ } from "./utils/dom.ts";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

async function fetchPopularMovieList(): Promise<{ results: Movie[] }> {
  const url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR";
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      accept: "application/json",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

const movieList = document.createElement("ul");
movieList.classList.add("thumbnail-list");

addEventListener("load", async () => {
  const app = $("#app");

  const header = Header({ title: "인사이드 아웃2" });
  if (!header) return;
  const footer = Footer();

  const movies = await fetchPopularMovieList();
  movies.results.forEach((movie: Movie) => {
    const movieElement = MovieItem({
      src: `https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`,
      title: movie.title,
      rate: movie.vote_average,
    });

    movieList.appendChild(movieElement);
  });

  if (app) {
    app.appendChild(header);
    app.appendChild(movieList);
    app.appendChild(footer);
  }
});
