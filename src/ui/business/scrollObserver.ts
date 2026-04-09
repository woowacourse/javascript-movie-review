import {
  observeHeaderScroll,
  observeLoadMoreScroll,
} from "../domain/observer";

export const setupHeaderScrollObserver = () => observeHeaderScroll();

let currentScrollDisconnect: (() => void) | undefined;

export const replaceLoadMoreScrollObserver = (
  callback: () => Promise<void>,
) => {
  currentScrollDisconnect?.();
  currentScrollDisconnect = observeLoadMoreScroll(callback) ?? undefined;
};
