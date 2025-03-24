import type { Result } from "../../types/TMDB";
import type { TMDBResponse } from "../../types/tmdb.types";

export interface StateTypes {
  loadMovies:
    | (() => Promise<{ results: Result[]; isLastPage: boolean }>)
    | null;
  heroMovie: TMDBResponse;
}

const state: StateTypes = {
  loadMovies: null,
  heroMovie: null,
};

export default state;
