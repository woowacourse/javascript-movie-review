import type { AppElements } from "../../types/dom";
import type { Movie } from "../../types/movie";
import { BASE_URL, IMAGE_URL } from "../constants/constant";
import { createImageUrl } from "../movie-list/movieListMarkup";




export const renderHeroMovie = (movie: Movie, elements: AppElements) => {
  const posterImageUrl = createImageUrl(BASE_URL.HERO_BASE_URL, movie.hero_path ?? "");

  elements.heroBackdrop.style.backgroundImage = posterImageUrl ? `url("${posterImageUrl}")` : "";
  elements.heroRate.hidden = false;
  elements.heroRateValue.textContent = String(movie.rate);
  elements.heroTitle.textContent = movie.title;
};

