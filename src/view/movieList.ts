import { Movie, Movies } from "../services/dto";

const createMovieNode = (movie: Movie): DocumentFragment | null => {
  const movieTemplate =
    document.querySelector<HTMLTemplateElement>(`#movie-template`);
  if (!movieTemplate) return null;

  const movieFragment = movieTemplate.content.cloneNode(
    true,
  ) as DocumentFragment;
  const movieItem = movieFragment.querySelector("li");
  const thumbnail = movieFragment.querySelector<HTMLImageElement>(".thumbnail");
  const rate = movieFragment.querySelector(".item-desc span");
  const title = movieFragment.querySelector(".item-desc strong");

  if (!movieItem || !thumbnail || !rate || !title) return null;

  movieItem.dataset.movieId = String(movie.id);
  thumbnail.src =
    `https://media.themoviedb.org/t/p/w220_and_h330_face` + movie.poster_path;
  thumbnail.alt = movie.title;
  rate.textContent = movie.vote_average.toString();
  title.textContent = movie.title;

  return movieFragment;
};

export const renderMovieList = (movies: Movies): void => {
  const movieList = document.querySelector<HTMLUListElement>("#movie-list");
  if (!movieList) return;
  movieList.hidden = false;

  movies.results.forEach((movie: Movie) => {
    const movieNode = createMovieNode(movie);
    if (movieNode) {
      movieList.appendChild(movieNode);
    }
  });
};

export const renderNoResult = () => {
  const noResult = document.querySelector("#no-result");
  if (!noResult) return;
  const empty = /* html */ `
  <p class="message-box">
    <img src="./public/images/mascot.png" alt="" />
    <span>검색 결과가 없습니다.</span>
  </p>`;
  noResult.innerHTML = empty;
};

export const removeMovieList = () => {
  const noResult = document.querySelector("#no-result");
  if (noResult) {
    noResult.replaceChildren();
  }

  const movieList = document.querySelector<HTMLUListElement>("#movie-list");
  if (movieList) {
    movieList.replaceChildren();
    movieList.hidden = true;
  }
};
