import ListTitle from "./ListTitle.js";
import MovieItem from "./MovieItem.js";
import MoreButton from "../MoreButton/MoreButton.js";
import SkeletonMovieItem from "../Skeleton/SkeletonMovieItem.js";
import { ERROR_MESSAGES, MOVIE_COUNT } from "../../constants/config.js";

const MOVIE_LIST = "movie-list";

const movieListTemplate = ({
  movies,
  query,
  searchedMoviesLength,
  loading,
}) => {
  const showMoreButton =
    (!query && movies.length < 10000) || movies.length < searchedMoviesLength;

  let movieContent = "";
  if (movies.length === 0 && !query) {
    movieContent = new Array(MOVIE_COUNT.UNIT)
      .fill(0)
      .map(() => SkeletonMovieItem())
      .join("");
  } else if (movies.length === 0 && query) {
    movieContent = `<div></div>
                    <div></div>
                    <div class="center">
                      <img src="./images/not_found.png"/>
                      <h2 data-testid='no-result-message'>${ERROR_MESSAGES.NO_RESULT}</h2>
                    </div>`;
  } else {
    movieContent = movies.map((movie) => MovieItem(movie)).join("");
    if (loading) {
      const skeletons = new Array(MOVIE_COUNT.UNIT)
        .fill(0)
        .map(() => SkeletonMovieItem())
        .join("");
      movieContent += skeletons;
    }
  }

  setTimeout(attachThumbnailLoadEvent, 0);

  return /* html */ `
    <main>
      <section>
        ${ListTitle({ query })}
        <ul id="${MOVIE_LIST}" class="thumbnail-list" data-testid="${MOVIE_LIST}">
          ${movieContent}
        </ul>
        ${showMoreButton ? MoreButton() : ""}
      </section>
    </main>
  `;
};

const attachThumbnailLoadEvent = () => {
  const thumbnails = document.querySelectorAll("img.thumbnail");
  thumbnails.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.display = "block";
      if (
        this.previousElementSibling &&
        this.previousElementSibling.classList.contains("skeleton-thumbnail")
      ) {
        this.previousElementSibling.style.display = "none";
      }
    });
  });
};

export default movieListTemplate;
