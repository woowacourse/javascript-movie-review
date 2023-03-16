import { $ } from './utils/domUtils';

export const hide = (selectors) => $(selectors).classList.add('hide');

export const show = (selectors) => $(selectors).classList.remove('hide');

export const changeTitle = (title) => {
  $('#movie-list-title').textContent = title;
};

export const resetSearchBox = () => {
  $('.search-box').reset();
};

export const renderList = (movies) => {
  $('.item-list').insertAdjacentHTML(
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
  $('.item-list').replaceChildren();
};
