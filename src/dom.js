import { $ } from './utils/domUtils';

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
