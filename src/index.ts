import "../templates/reset.css";
import "../templates/common.css";

import HeaderModal from "./components/HeaderModal/HeaderModal";
import Modal from "./components/Modal/Modal";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import MovieDetailWithRating from "./components/MovieDetailWithRating/MovieDetailWithRating";
import MovieReviewMain from "./domainComponent/MovieReviewMain";
import StarRating from "./components/StarRating/StarRating";
import createStarIcon from "./components/StarRating/StarRatingIcon";

const mainController = new MovieReviewMain();

const body = document.querySelector("body");
body?.append(...mainController.elements);
