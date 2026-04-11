import { Movie } from "../type";

export function createMovieItemElement(movie: Movie) {
  const liElement = document.createElement("li");
  liElement.classList.add("item");
  liElement.dataset.movieId = movie.id.toString();

  liElement.insertAdjacentHTML('beforeend', `
    <img
      class="thumbnail"
      src="${import.meta.env.VITE_IMAGE_BASE_URL}/w200${movie.poster_path}"
      onerror="this.src='${import.meta.env.BASE_URL}images/default_movie_image.png'"
      alt="${movie.title}"
    />
    <div class="item-desc">
      <p class="rate">
        <img src="${import.meta.env.BASE_URL}images/star_empty.png" alt="empty star" class="star" />
        <span>${movie.vote_average.toFixed(1)}</span>
      </p>
      <p class="movie-title">${movie.title}</p>
    </div>
  `)

  return liElement;
}

export default function renderMovieItemsToList(movieList: Movie[]) {
  const listElement = document.querySelector(".thumbnail-list");
  listElement?.append(...movieList.map((movie) => createMovieItemElement(movie)));
}
