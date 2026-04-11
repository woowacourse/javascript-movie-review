import { Movie } from "../services/dto";

export const renderTopRatedMovie = (movie: Movie) => {
  const topRatedContainer = document.querySelector(".top-rated-container");
  if (!topRatedContainer) return;

  const overlay = document.querySelector<HTMLDivElement>(".overlay");
  if (overlay) {
    overlay.style.background = `url(${`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces` + movie.backdrop_path}) center center no-repeat`;
  }

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

  const background = document.querySelector<HTMLDivElement>(
    ".background-container",
  );
  if (background) {
    background.style.backgroundColor = "transparent";
    background.style.height = "auto";
  }

  const overlay = document.querySelector<HTMLDivElement>(".overlay");
  if (overlay) {
    overlay.style.background = "";
    overlay.style.display = "none";
  }
};
