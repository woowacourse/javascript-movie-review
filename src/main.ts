import Button from "./components/common/Button.ts";
import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import MovieItem from "./components/movie/MovieItem.ts";
import { $ } from "./utils/dom.ts";

type MovieResponse = {
  page: number;
  total_pages: number;
  results: Movie[];
};

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

const fetchPopularMovieList = async (
  currentPage: number
): Promise<MovieResponse> => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${currentPage}`;
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
};

let currentPage = 1;
const movieList = document.createElement("ul");
movieList.classList.add("thumbnail-list");

const wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrap");
const loadMoreButton = Button({ text: "더보기", className: ["load-more"] });

export const loadMovies = async (
  movies: MovieResponse
  // currentPage: number
): Promise<void> => {
  movies.results.forEach((movie: Movie) => {
    const movieElement = MovieItem({
      src: `https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`,
      title: movie.title,
      rate: movie.vote_average,
    });

    movieList.appendChild(movieElement);
  });

  if (movies.page === movies.total_pages)
    loadMoreButton.classList.add("hidden");
};

// const movies: MovieResponse = await fetchPopularMovieList(currentPage);

loadMoreButton.addEventListener("click", async () => {
  currentPage++;
  const movies: MovieResponse = await fetchPopularMovieList(currentPage);
  loadMovies(movies);
});

addEventListener("load", async () => {
  const app = $("#app");

  const header = Header({ title: "인사이드 아웃2" });
  if (!header) return;
  const footer = Footer();

  const movies: MovieResponse = await fetchPopularMovieList(currentPage);
  loadMovies(movies);

  if (app) {
    app.appendChild(wrapper);
    wrapper.appendChild(header);
    wrapper.appendChild(movieList);

    wrapper.appendChild(loadMoreButton);
    wrapper.appendChild(footer);
  }
});
