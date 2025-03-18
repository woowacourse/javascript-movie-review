import Header from "./UI/Header/Header";
import Movie from "./UI/Movie/MovieItem";
import Thumbnail from "./UI/Thumbnail/Thumbnail";
import MovieListSection from "./UI/MovieListSection/MovieListSection.js";
import Button from "./UI/Button/Button.js";
import Footer from "./UI/Footer/Footer.js";
import { ApiResponse } from "./types/movie.js";
import { getFetchData } from "./utils/getfetchData.js";
import { getPopularityMovie } from "./Domain/getPopularityMovie.js";

const movieData = await getPopularityMovie(1);

let result = [];
if (movieData) {
  result = movieData.results.map((movie) => ({
    ...movie,
    poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
  }));
}

const body = document.querySelector("body");
console.log(body);

const $header = new Header().render();
// const $thumbnail = new Thumbnail().render();
// const $movie = new Movie().render();
// console.log($movie);

const $movieListSection = new MovieListSection("인기순", result).render();

const $moreButton = new Button().render();

const $footer = new Footer().render();

console.log($movieListSection);
if (body) {
  body.innerHTML = "";
  body.append($header, $movieListSection, $moreButton, $footer);
}

// https://api.themoviedb.org/3/search/movie?query=%EC%A7%B1%EA%B5%AC&include_adult=false&language=en-US&page=1
