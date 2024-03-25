import MovieReviewApp from "./component/MovieReviewApp/MovieReviewApp.ts";

import "./common.style.css";
import "./reset.style.css";

import "./component/MovieReviewHeader/movieReviewHeader.style.css";
import "./component/MovieSearchInput/movieSearchInput.style.css";
import "./component/MovieList/movieList.style.css";
import "./component/MovieItem/movieItem.style.css";
import "./component/MoreMoviesButton/moreMoviesButton.style.css";

const movieReviewApp = new MovieReviewApp();

movieReviewApp.render();
