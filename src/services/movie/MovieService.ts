import { MovieDetail } from "../../api/types";
import { fetchMovieDetail } from "../../api/movies";
import { AsyncService, AsyncState } from "../AsyncService";

export type MovieDetailState = AsyncState<MovieDetail | null>;

export class MovieService extends AsyncService<MovieDetail | null> {
  async load(id: number): Promise<void> {
    if (this.isPending) return;

    this.error = false;
    this.setIsPending(true, null);

    try {
      const detail = await fetchMovieDetail(id);
      this.isPending = false;
      this.notify(detail);
    } catch {
      this.isPending = false;
      this.error = true;
      this.notify(null);
    }
  }
}
