import type { Movie } from './types/domain';
import { $ } from './utils/domUtils';

export const hide = (selectors: string) => $(selectors)?.classList.add('hide');

export const show = (selectors: string) => $(selectors)?.classList.remove('hide');

export const renderMovieListItem = (movies: Movie[]) => {
  $('.item-list')?.insertAdjacentHTML(
    'beforeend',
    /* html */ `${movies
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

export const renderMoviePage = (title: string) => {
  const $page = $('#page');
  if ($page) $page.innerHTML = /* html */ `<movie-page title='${title}'></movie-page>`;
};

export const renderErrorPage = () => {
  const $page = $('#page');
  if ($page) $page.innerHTML = /* html */ `<error-page></error-page>`;
};

export const resetSearchBox = () => {
  const searchBox = $('.search-box');
  if (searchBox instanceof HTMLFormElement) searchBox.reset();
};
