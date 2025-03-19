import { getSearchMovieResult } from "./api/getSearchMovieResult";
import MovieListController from "./controller/MovieListController";

const ulElement = document.querySelector(".thumbnail-list") as HTMLUListElement;
const movieListController = new MovieListController(ulElement);
await movieListController.getPopularMovieList();

getSearchMovieResult("하하", 1);
