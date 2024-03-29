import "../templates/reset.css";
import "../templates/common.css";

import MovieReviewMain from "./domainComponent/MovieReviewMain";

const mainController = new MovieReviewMain();

const body = document.querySelector("body");
body?.append(...mainController.elements);
