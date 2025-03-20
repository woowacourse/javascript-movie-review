import type { Result } from "../../types/TMDB";

interface StateTypes {
  loadMovies:
    | (() => Promise<{ results: Result[]; isLastPage: boolean }>)
    | null;
}

const state: StateTypes = {
  loadMovies: null,
};

export default state;
