import { SKELETON_TEMPLATE } from './domain/constants';
import { $ } from './utils/domUtils';

import { Movie } from './domain/remotes/movies';

export const hide = (selector: string) => $(selector)?.classList.add('hide');

export const show = (selector: string) => $(selector)?.classList.remove('hide');

export const hideSkeleton = () => {
  const $skeletonItems = document.querySelectorAll('.skeleton-item');

  $skeletonItems.forEach(($skeleton) => $skeleton.remove());
};

export const showSkeleton = () => {
  $('.item-list')?.insertAdjacentHTML('beforeend', SKELETON_TEMPLATE);
};

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
        ({ id, title, posterPath, voteAverage }) => /* html */ `
            <movie-list-item
              data-id="${id}" 
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
