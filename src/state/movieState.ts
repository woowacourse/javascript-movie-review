import type { Result } from "../../types/tmdb.types";

let showingItem = "";

let loadMovies:
  | (() => Promise<{ results: Result[]; isLastPage: boolean }>)
  | null = null;

export function setShowingItem(value: string) {
  showingItem = value;
}

export function getShowingItem(): string {
  return showingItem;
}

export function setLoadMovies(
  fn: () => Promise<{ results: Result[]; isLastPage: boolean }>
) {
  loadMovies = fn;
}
export function getLoadMovies() {
  return loadMovies;
}
