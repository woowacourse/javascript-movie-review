import { ProcessedMovieDetail } from "../../../types/movie";
import { createElement } from "../../utils/createElement";

const MovieDetailContent = ({
  title,
  genres,
  vote_average,
  poster_path,
  overview,
  release_date,
}: ProcessedMovieDetail) => {
  const posterPath = poster_path
    ? `https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`
    : "./images/default_poster.png";

  const releaseYear = release_date.split("-")[0];
  const genre = genres?.map((genre) => genre.name);

  const content = createElement(/*html*/ `
    <div class="modal-container">
      <div class="modal-image">
        <img
          src=${posterPath}
        />
      </div>
      <div class="modal-description">
        <h2>${title}</h2>
        <p class="category">
          ${releaseYear} · ${genre.join(", ")}
        </p>
        <p class="rate">
          <img src="./images/star_filled.png" class="star" /><span
            >${vote_average}</span
          >
        </p>
        <hr />
        <p class="detail">
          ${overview}
        </p>
      </div>
    </div>
  `);

  return content;
};

export default MovieDetailContent;
