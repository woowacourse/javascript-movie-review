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
        ({ title, poster_path, vote_average }) => /* html */ `
            <movie-list-item 
              title="${title}" 
              poster-path="${poster_path}" 
              vote-average="${vote_average}"
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
