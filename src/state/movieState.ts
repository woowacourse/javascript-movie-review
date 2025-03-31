import type { Result } from "../../types/tmdb.types";
import type { InfiniteScrollInstance } from "../service/scrollService.ts";

// 과연 이것들이 전역 상태로 관리되어야 할까요?
// 관리되지 않는다면 어느정도의 코드 줄수가 코드에 추가될까요?

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
