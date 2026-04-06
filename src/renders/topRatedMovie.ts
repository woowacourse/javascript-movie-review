import { Movie } from "../services/dto";

export const renderTopRatedMovie = (topRatedMovie: Movie) => {
  const topRatedContainer = document.querySelector(".top-rated-container");
  if (!topRatedContainer) return null;

  const overlay = document.querySelector<HTMLDivElement>(".overlay");
  if (!overlay) return null;

  const BASE_URL = `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces`;
  const FALLBACK = '/images/no_image_large.png';

  const backgroundImage = topRatedMovie.backdrop_path ? BASE_URL + topRatedMovie.backdrop_path: FALLBACK;
  overlay.style.backgroundImage = `url(${backgroundImage}), url(${FALLBACK}) `;

  const rateValue = topRatedContainer.querySelector(".rate-value");
  if (!rateValue) return null;
  rateValue.textContent = topRatedMovie.vote_average.toString();

  const title = topRatedContainer.querySelector(".title");
  if (!title) return null;
  title.textContent = topRatedMovie.title;
};

export const removeTopRatedMovie = () => {
  const topRatedMovie =
    document.querySelector<HTMLDivElement>(".top-rated-movie");
  if (!topRatedMovie) return null;
  topRatedMovie.style.display = "none";

  const background = document.querySelector<HTMLDivElement>(
    ".background-container",
  );
  if (!background) return null;
  background.style.backgroundColor = "transparent";
  background.style.height = "auto";

  const overlay = document.querySelector<HTMLDivElement>(".overlay");
  if (!overlay) return null;
  overlay.style.background = "";
  overlay.style.display = "none";
};
