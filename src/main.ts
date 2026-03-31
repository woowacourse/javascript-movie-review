import {
  getMoviePopular,
  getTopRatedMovie,
  getSearchMovie,
} from "./service/api";
import { Movie, Movies } from "./service/dto";

const createMovieNode = (movie: Movie): DocumentFragment | null => {
  const movieTemplate =
    document.querySelector<HTMLTemplateElement>(`#movie-template`);

  if (!movieTemplate) return null;

  const movieFragment = movieTemplate.content.cloneNode(
    true,
  ) as DocumentFragment;

  const movieItem = movieFragment.querySelector("li");

  if (!movieItem) return null;
  movieItem.dataset.movieId = String(movie.id);

  const thumbnail = movieFragment.querySelector<HTMLImageElement>(".thumbnail");
  if (!thumbnail) return null;
  thumbnail.src =
    `https://media.themoviedb.org/t/p/w220_and_h330_face` + movie.poster_path;
  thumbnail.alt = movie.title;

  const itemDesc = movieFragment.querySelector(".item-desc");

  const rate = itemDesc?.querySelector("span");
  if (!rate) return null;
  rate.textContent = movie.vote_average.toString();

  const title = itemDesc?.querySelector("strong");
  if (!title) return null;
  title.textContent = movie.title;

  return movieFragment;
};

const hideMoreButton = () => {
  const moreButton = document.querySelector<HTMLDivElement>("#more-button");
  if (!moreButton) return null;
  moreButton.style.display = "none";
};

const showMoreButton = () => {
  const moreButton = document.querySelector<HTMLDivElement>("#more-button");
  if (!moreButton) return null;
  moreButton.style.display = "block";
};

const removeThumbnailList = () => {
  const humbnailList =
    document.querySelector<HTMLDivElement>(".thumbnail-list");
  if (!humbnailList) return;

  humbnailList.innerHTML = "";
};

const renderMovies = (movies: Movies): void => {
  console.log(movies);
  const thumbnailList = document.querySelector(".thumbnail-list");

  movies.results.forEach((movie: Movie) => {
    const movieNode = createMovieNode(movie);
    if (movieNode) {
      thumbnailList?.appendChild(movieNode);
    }
  });

  if (movies.page === movies.total_pages) {
    hideMoreButton();
  } else {
    showMoreButton();
  }
};

const renderTopRatedMovie = (movies: Movies) => {
  const topRatedMovie = movies.results[0];
  const topRatedContainer = document.querySelector(".top-rated-container");
  if (!topRatedContainer) return null;

  const backgroundContainer = document.querySelector<HTMLDivElement>(
    ".background-container",
  );
  if (!backgroundContainer) return null;
  backgroundContainer.style.background = `url(${`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces` + topRatedMovie.backdrop_path}) center center no-repeat`;

  const rateValue = topRatedContainer.querySelector(".rate-value");
  if (!rateValue) return null;
  rateValue.textContent = topRatedMovie.vote_average.toString();

  const title = topRatedContainer.querySelector(".title");
  if (!title) return null;
  title.textContent = topRatedMovie.title;
};

const condition = {
  page: 1,
};

addEventListener("load", async () => {
  (async () => {
    const topRatedMovies = await getTopRatedMovie();
    renderTopRatedMovie(topRatedMovies);
  })();

  (async () => {
    const movies = await getMoviePopular({ page: condition.page });
    renderMovies(movies);
  })();

  const moreButton = document.querySelector("#more-button");
  moreButton?.addEventListener("click", () => {
    condition.page += 1;
    (async () => {
      const movies = await getMoviePopular({ page: condition.page });
      renderMovies(movies);
    })();
  });

  const searchMovies = () => {
    const searchInput =
      document.querySelector<HTMLInputElement>("#search-input");
    if (!searchInput) return;

    const search = searchInput.value || "";

    (async () => {
      const movies = await getSearchMovie({
        page: condition.page,
        query: search,
      });

      const movieListTitle = document.querySelector("#movie-list-title");
      if (!movieListTitle) return null;
      movieListTitle.textContent = `"${search}" 검색 결과`;

      removeThumbnailList();
      renderMovies(movies);
    })();
  };

  const searchButton = document.querySelector("#search-button");
  searchButton?.addEventListener("click", () => {
    searchMovies();
  });

  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  if (!searchInput) return;
  searchInput?.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  });
});
