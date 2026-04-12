import bindClickMovieEvent from "../event/bindClickMovieEvent";
import { Movie } from "../type";

export default function renderTopRatedMovie(movie: Movie) {
  const containerEl = document.querySelector<HTMLDivElement>('.top-rated-movie');
  const rateEl = document.querySelector<HTMLDivElement>(".top-rated-movie .rate-value");
  const titleEl = document.querySelector<HTMLDivElement>(".top-rated-movie .title");
  const detailButtonEl = document.querySelector<HTMLButtonElement>(
    ".top-rated-movie .detail",
  );
  const backgroundContainerEl = document.querySelector<HTMLDivElement>(
    ".background-container",
  );

  if (containerEl) {
    containerEl.dataset.movieId = movie.id.toString();
  }

  if (titleEl) {
    titleEl.textContent = movie.title;
  }

  if (rateEl) {
    rateEl.textContent =
      movie.vote_average.toFixed(1);
  }

  if (detailButtonEl) {
    detailButtonEl.disabled = false;
    bindClickMovieEvent(detailButtonEl);
  }

  if (backgroundContainerEl) {
    backgroundContainerEl.style.backgroundImage = `url(${import.meta.env.VITE_IMAGE_BASE_URL}/w1920_and_h800_multi_faces${movie.backdrop_path})`;
  }
}