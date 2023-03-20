import { $ } from './utils/domUtils';

export const hide = (selectors) => $(selectors).classList.add('hide');

export const show = (selectors) => $(selectors).classList.remove('hide');

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

export const renderMoviePage = (title) => {
  $('#page').innerHTML = /* html */ `<movie-page title="${title}"></movie-page>`;
};

export const renderErrorPage = () => {
  $('#page').innerHTML = /* html */ `<error-page></error-page>`;
};
