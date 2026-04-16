import type { MovieDetail } from '../../types/MovieDetail.ts';

export class MovieSelection {
  #selected: MovieDetail | null = null;
  #rating: number | null = null;

  get selected() { return this.#selected; }
  get isOpen() { return this.#selected !== null; }
  get rating() { return this.#rating; }

  select(detail: MovieDetail, savedRating: number | null) {
    this.#selected = detail;
    this.#rating = savedRating;
  }

  rate(rating: number) { this.#rating = rating; }
  close() { this.#selected = null; this.#rating = null; }
}
