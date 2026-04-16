import bindClickMovieEvent from "../event/bindClickMovieEvent";
import { observeVisibleMovieItem } from "../observer/bindVisibleMovieObserver";
import { Movie } from "../type";

export function createMovieItemElement(page: number, movie: Movie) {
  const liElement = document.createElement("li");
  liElement.classList.add("item");
  liElement.dataset.page = page.toString();
  liElement.dataset.movieId = movie.id.toString();

  liElement.insertAdjacentHTML('beforeend', /*html*/`
    <div class="item-desc">
      <p class="rate">
        <img src="${import.meta.env.BASE_URL}images/star_empty.png" alt="empty star" class="star" />
        <span></span>
      </p>
      <p class="movie-title"></p>
    </div>
  `)

  const posterElement = document.createElement("img");
  posterElement.classList.add("thumbnail");
  posterElement.src = `${import.meta.env.VITE_IMAGE_BASE_URL}/w300${movie.poster_path}`;
  posterElement.onerror = () => {
    posterElement.src = `${import.meta.env.BASE_URL}images/default_movie_image.png`;
  };
  posterElement.alt = movie.title;
  liElement.insertAdjacentElement('afterbegin', posterElement);

  const rateSpanElement = liElement.querySelector<HTMLSpanElement>(".rate span");

  if (rateSpanElement) {
    rateSpanElement.textContent = movie.vote_average.toFixed(1);
  }

  const titleElement = liElement.querySelector<HTMLParagraphElement>(".movie-title");

  if (titleElement) {
    titleElement.textContent = movie.title;
  }

  bindClickMovieEvent(liElement);
  observeVisibleMovieItem(liElement);

  return liElement;
}

export default function renderMovieItems(page: number, movieList: Movie[], direction: 'append' | 'prepend' = 'append') {
  const listElement = document.querySelector(".thumbnail-list");
  if (!listElement) return;

  const elements = movieList.map((movie) => createMovieItemElement(page, movie));
  if (direction === 'append') {
    listElement.append(...elements);
  } else {
    listElement.prepend(...elements);
  }
}
