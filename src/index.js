import MovieReviewApp from "./component/MovieReviewApp/MovieReviewApp.ts";
import starFilledImg from "./image/star_filled.png";
import "./common.style.css";
import "./component/MovieReviewHeader/movieReviewHeader.style.css";
import "./component/MovieSearchInput/movieSearchInput.style.css";

const movieReviewApp = new MovieReviewApp();

movieReviewApp.render();
