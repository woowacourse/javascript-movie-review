import { Movie } from "../services/dto";
import { getImageUrl } from "../utils/image";

export const renderTopRatedMovie = (movie: Movie) => {
  const topRatedContainer = document.querySelector<HTMLDivElement>(
    ".background-container",
  );
  if (!topRatedContainer) return;
  topRatedContainer.style.backgroundImage = `url(${getImageUrl(movie.backdrop_path, "w1920_and_h800_multi_faces")})`;

  const rateValue = topRatedContainer.querySelector(".rate-value");
  if (rateValue) {
    rateValue.textContent = movie.vote_average.toString();
  }

  const title = topRatedContainer.querySelector(".title");
  if (title) {
    title.textContent = movie.title;
  }
};

export const removeTopRatedMovie = () => {
  const topRatedMovie =
    document.querySelector<HTMLDivElement>(".top-rated-movie");
  if (topRatedMovie) {
    topRatedMovie.style.display = "none";
  }

  const topRatedContainer = document.querySelector<HTMLDivElement>(
    ".background-container",
  );
  if (topRatedContainer) {
    topRatedContainer.style.backgroundImage = "";
    topRatedContainer.style.height = "auto";
  }

  const overlay = document.querySelector<HTMLDivElement>(".overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
};
