import { Movie } from '../domain/movie.type';
import { OfPromise, Subject } from '../states/Subject';
import { $context } from '../utils/selector';

class MovieListItem {
  private readonly $root = document.createElement('li');

  private readonly $ = $context(this.$root);

  constructor(private readonly movie: Subject<OfPromise<Movie | null>>) {
    this.$root.innerHTML = `
      <a>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <p class="item-title skeleton"></p>
          <p class="item-score skeleton"></p>
        </div>
      </a>`.trim();

    this.movie.subscribe((_movie) => {
      if (_movie.state === 'fulfilled') {
        const { resolved } = _movie;
        if (resolved === null) {
          this.onFulfilledButNull();
          return;
        }
        this.onFulfilled(resolved);
      }
    });
  }

  getRoot() {
    return this.$root;
  }

  onFulfilledButNull() {
    this.$root.remove();
  }

  onFulfilled(movie: Movie) {
    this.$root.setAttribute('id', movie.id);
    this.$('a').setAttribute('href', `#${movie.id}`);

    this.$('.item-thumbnail').innerHTML = `
      <img
        class="loading"
        src="https://image.tmdb.org/t/p/w220_and_h330_face${movie.posterPath}"
        alt="${movie.title}"
      />
    `.trim();
    this.$<HTMLImageElement>('.item-thumbnail > img').addEventListener('load', (event) => {
      if (event.target instanceof HTMLImageElement) {
        event.target.classList.remove('loading');
      }
    });
    this.$<HTMLParagraphElement>('.item-title').innerText = movie.title;
    this.$<HTMLParagraphElement>('.item-score').innerHTML = `
      <img src="assets/star_filled.png" alt="별점" /> ${movie.voteAverage}
    `.trim();
  }
}

export default MovieListItem;
