import { Movie } from "../../apis/dtos";
import starEmptyImg from "../../images/star_empty.png";

const MovieCardComponent = {
  movie(movieData: Pick<Movie, "posterPath" | "title" | "voteAverage" | "id">) {
    const { posterPath, title, voteAverage } = movieData;
    return `
    <li class="movie-item" data-movie-id="${movieData.id}">
      <div class="item">
      <img
      class="thumbnail"
      src="${posterPath}"
      alt="${title}"
      />
        <div class="item-desc">
          <p class="rate">
            <img src="${starEmptyImg}" class="star" /><span>${voteAverage.toFixed(1)}</span>
            </p>
            <strong>${title}</strong>
        </div>
      </div>
    </li>
  `;
  },

  movieSkeleton() {
    return `
    <li class="skeleton">
      <div class="item">
        <div class="thumbnail skeleton-box"></div>
        <div class="item-desc">
          <p class="rate">
            <span class="skeleton-box skeleton-rate"></span>
          </p>
          <span class="skeleton-box skeleton-title"></span>
        </div>
      </div>
    </li>
  `;
  },
};

export default MovieCardComponent;
