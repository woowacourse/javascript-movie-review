import { $ } from './utils/domUtils';

export const hide = (selectors) => $(selectors).classList.add('hide');

export const show = (selectors) => $(selectors).classList.remove('hide');

export const setTitle = (title) => {
  $('#movie-list-title').textContent = title;
};

export const resetSearchBox = () => {
  $('.search-box').reset();
};

export const renderMovieListItem = (movies) => {
  $('.item-list').insertAdjacentHTML(
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

export const clearList = () => {
  $('.item-list').replaceChildren();
};

export const renderMoviePage = () => {
  $('#page').innerHTML = /* html */ `<movie-page></movie-page>`;
};

export const renderErrorPage = () => {
  $('#page').innerHTML = /* html */ `<error-page></error-page>`;
};
