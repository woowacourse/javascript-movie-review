import type { MovieDetail } from '../../types/MovieDetail.ts';

export class MovieSelection {
  #selected: MovieDetail | null = null;

  get selected() { return this.#selected; }
  get isOpen() { return this.#selected !== null; }

  select(detail: MovieDetail) { this.#selected = detail; }
  close() { this.#selected = null; }
}
