import { Movie } from "../type";

export function createMovieItemTemplate(movie: Movie): string {
  return `
    <li>
      <div class="item">
        <img
          class="thumbnail"
          src="${import.meta.env.VITE_IMAGE_BASE_URL}/w200${movie.poster_path}"
          onerror="this.src='/images/default_movie_image.png'"
          alt="${movie.title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="${import.meta.env.BASE_URL}images/star_empty.png" alt="empty star" class="star" />
            <span>${movie.vote_average.toFixed(1)}</span>
          </p>
          <p class="movie-title">${movie.title}</p>
        </div>
      </div>
    </li>
  `
}

export default function renderMovieItemsToList(movieList: Movie[]) {
  const listElement = document.querySelector(".thumbnail-list");
  listElement?.insertAdjacentHTML('beforeend', movieList.map((movie) => createMovieItemTemplate(movie)).join(""));
}
