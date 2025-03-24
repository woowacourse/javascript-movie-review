import type { StateTypes } from "../state/state";

export default async function fetchAndSetLoadingEvent(state: StateTypes) {
  document.dispatchEvent(new CustomEvent("loading:start"));

  const data = await state.loadMovies();

  document.dispatchEvent(
    new CustomEvent("loading:end", { detail: { isLastPage: data.isLastPage } })
  );
  return data;
}
