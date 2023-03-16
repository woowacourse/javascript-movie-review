import { Movie } from '../movies.type';

class MovieListItem {
  private template = (movie: Movie) => `<li>
    <a href="#">
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}"
          alt="${movie.title}"
        />
        <p class="item-title">${movie.title}</p>
        <p class="item-score"><img src="assets/star_filled.png" alt="별점" /> ${movie.vote_average}</p>
      </div>
    </a>
  </li>`;

  render(movie: Movie) {
    return this.template(movie);
  }
}

export default MovieListItem;
