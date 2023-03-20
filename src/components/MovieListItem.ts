import { Movie } from '../domain/movie.type';

class MovieListItem {
  private element = document.createElement('li');

  thumbnailLoaded: Promise<unknown>;

  constructor(private readonly movie: Movie) {
    this.element.innerHTML = `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w220_and_h330_face${this.movie.posterPath}"
            alt="${this.movie.title}"
          />
          <p class="item-title">${this.movie.title}</p>
          <p class="item-score"><img src="assets/star_filled.png" alt="별점" /> ${this.movie.voteAverage}</p>
        </div>
      </a>`.trim();

    this.thumbnailLoaded = new Promise((resolve) => {
      this.element.querySelector('img.item-thumbnail')!.addEventListener('load', resolve);
    });
  }

  render() {
    return this.element;
  }
}

export default MovieListItem;
