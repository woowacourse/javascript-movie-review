import { Movie } from '../domain/movie.type';
import { OfPromise, Subject } from '../states/Subject';

class MovieListItem {
  private readonly $root = document.createElement('li');

  constructor(private readonly movie: Subject<OfPromise<Movie | null>>) {
    this.$root.innerHTML = `
      <a href="#">
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
    this.$root.querySelector('.item-thumbnail')!.innerHTML = `
      <img
        class="loading"
        src="https://image.tmdb.org/t/p/w220_and_h330_face${movie.posterPath}"
        alt="${movie.title}"
      />
    `.trim();
    this.$root
      .querySelector<HTMLImageElement>('.item-thumbnail > img')!
      .addEventListener('load', (event) => {
        if (event.target instanceof HTMLImageElement) {
          event.target.classList.remove('loading');
        }
      });

    this.$root.querySelector<HTMLParagraphElement>('.item-title')!.innerText = movie.title;

    this.$root.querySelector<HTMLParagraphElement>('.item-score')!.innerHTML = `
      <img src="assets/star_filled.png" alt="별점" /> ${movie.voteAverage}
    `.trim();
  }
}

export default MovieListItem;
