import type { Result } from "../../types/tmdb.types";
import type { InfiniteScrollInstance } from "../service/scrollService.ts";

let showingItem = "";

let loadMovies:
  | (() => Promise<{ results: Result[]; isLastPage: boolean }>)
  | null = null;

let scrollInstance: InfiniteScrollInstance = null;

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

export function setScrollInstance(instance: InfiniteScrollInstance): void {
  scrollInstance = instance;
}

export function getScrollInstance(): InfiniteScrollInstance {
  return scrollInstance;
}
