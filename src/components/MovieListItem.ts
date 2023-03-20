import { Movie } from '../domain/movie.type';

class MovieListItem {
  private template = (movie: Movie) =>
    `<li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w220_and_h330_face${movie.posterPath}"
            alt="${movie.title}"
          />
          <p class="item-title">${movie.title}</p>
          <p class="item-score"><img src="assets/star_filled.png" alt="별점" /> ${movie.voteAverage}</p>
        </div>
      </a>
    </li>`.trim();

  render(movie: Movie) {
    return this.template(movie);
  }
}

export default MovieListItem;
