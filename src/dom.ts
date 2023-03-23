import { Movie } from './domain/movieService';
import { $ } from './utils/domUtils';

export const hide = (selector: string) => $(selector)?.classList.add('hide');

export const show = (selector: string) => $(selector)?.classList.remove('hide');

export const hideSkeleton = () => hide('#skeleton-list');

export const showSkeleton = () => show('#skeleton-list');

export const hideScrollObserver = () => hide('#scroll-observer');

export const showScrollObserver = () => show('#scroll-observer');

export const changeTitle = (title: string) => {
  const $title = $('#movie-list-title');

  if (!$title) return;

  $title.textContent = title;
};

export const resetSearchBox = () => {
  const $searchBox = $('.search-box');

  if (!$searchBox) return;

  if ($searchBox instanceof HTMLFormElement) {
    $searchBox.reset();
  }
};

export const renderList = (movies: Movie[]) => {
  const $itemList = $('.item-list');

  if (!$itemList) return;

  $itemList.insertAdjacentHTML(
    'beforeend',
    /* html */ ` ${movies
      .map(
        ({ title, posterPath, voteAverage }) => /* html */ `
            <movie-list-item 
              title="${title}" 
              poster-path="${posterPath}" 
              vote-average="${voteAverage}"
            ></movie-list-item>
          `
      )
      .join('')}
    `
  );
};

export const clearList = () => {
  const $itemList = $('.item-list');

  if (!$itemList) return;

  $itemList.replaceChildren();
};
