import { Movie } from '../app';

class MovieItem {
  private _node!: HTMLElement;
  private movieData: Movie;

  constructor(movieDate: Movie) {
    this.movieData = movieDate;
    this.createTemplate();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(): this {
    this._node = document.createElement('li');

    this._node.innerHTML = `<a>
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w220_and_h330_face/${this.movieData.backdropPath}"
            loading="lazy"
            alt=${this.movieData.title}
          />
          <p class="item-title">${this.movieData.title}</p>
          <div class="item-score">
            <img src="./star_filled.png" alt="별점" />
            <p>${this.movieData.voteAverage}</p>
          </div>
        </div>
      </a>
      `;

    return this;
  }

  updateMovie(props: Movie) {
    this.movieData = props;
  }
}

export default MovieItem;
