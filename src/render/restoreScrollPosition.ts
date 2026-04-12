import { getURLSearchParam } from "../url";

export default function restoreScrollPosition() {
  const targetMovieId = getURLSearchParam('viewed-movie-id', undefined);

  if (targetMovieId) {
    setTimeout(() => {
      document.querySelector(`li[data-movie-id="${targetMovieId}"]`)?.scrollIntoView({ block: 'center' });
    }, 0);
  }
}
