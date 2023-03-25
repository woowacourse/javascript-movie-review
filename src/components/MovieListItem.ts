import { api } from '../api';
import { Movie } from '../domain/movie.type';
import { MovieDetailSubject } from '../states/domain/MovieDetailSubject';
import { MovieSubject } from '../states/domain/MovieSubject';
import { $context } from '../utils/selector';
import { MovieDetailDialog } from './MovieDetailDialog';

export type MovieListItemProps = {
  movie$: MovieSubject;
};

export class MovieListItem {
  private readonly $root = document.createElement('li');

  private readonly $ = $context(this.$root);

  private readonly movie$: MovieSubject;

  constructor({ movie$ }: MovieListItemProps) {
    this.movie$ = movie$;

    this.$root.innerHTML = `
      <a>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <p class="item-title skeleton"></p>
          <p class="item-score skeleton"></p>
        </div>
      </a>`.trim();

    this.movie$.subscribe(({ label, value: movie }) => {
      if (label === 'fulfilled') {
        if (movie === null) {
          this.onFulfilledButNull();
          return;
        }
        this.onFulfilled(movie);
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
    // this.$root.setAttribute('id', movie.id);
    // this.$('a').setAttribute('href', `#${movie.id}`);

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
      <img src="assets/star_filled.png" alt="별점" />
      <span>${movie.voteAverage.toFixed(1)}</span>
    `.trim();

    this.$('a').addEventListener('click', (event) => {
      event.preventDefault();
      const movieDetail$ = new MovieDetailSubject(api);
      movieDetail$.fetchMovieDetail(movie);
      new MovieDetailDialog({ movieDetail$ }).open();
    });
  }
}
