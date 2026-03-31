import { getMoviePopular } from "./service/api";
import { Movie, Movies } from "./service/dto";

const createMovieNode = (movie: Movie): DocumentFragment | null => {
  const movieTemplate =
    document.querySelector<HTMLTemplateElement>(`#movie-template`);

  if (!movieTemplate) return null;

  const movieFragment = movieTemplate.content.cloneNode(
    true,
  ) as DocumentFragment;

  const movieItem = movieFragment.querySelector<HTMLLIElement>("li");

  if (!movieItem) return null;
  movieItem.dataset.movieId = String(movie.id);

  const thumbnail = movieFragment.querySelector<HTMLImageElement>(".thumbnail");
  if (!thumbnail) return null;
  thumbnail.src =
    `https://media.themoviedb.org/t/p/w220_and_h330_face` + movie.poster_path;
  thumbnail.alt = movie.title;

  const itemDesc = movieFragment.querySelector(".item-desc");

  const rate = itemDesc?.querySelector<HTMLSpanElement>("span");
  if (!rate) return null;
  rate.textContent = movie.vote_average.toString();

  const title = itemDesc?.querySelector<HTMLElement>("strong");
  if (!title) return null;
  title.textContent = movie.title;

  return movieFragment;
};

const renderMovies = (movies: Movies): void => {
  const thumbnailList = document.querySelector(".thumbnail-list");

  movies.results.forEach((movie: Movie) => {
    const movieNode = createMovieNode(movie);
    if (movieNode) {
      thumbnailList?.appendChild(movieNode);
    }
  });
};

addEventListener("load", async () => {
  const movies = await getMoviePopular({ page: 1 });

  renderMovies(movies);
});
