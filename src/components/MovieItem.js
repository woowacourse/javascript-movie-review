import { $ } from '../util/querySelector';

export const MovieItem = (element, { poster_path, title, vote_average }) => {
  const renderData = `
  <li class="movie-info">
    <a>
      <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
        <img
          class="item-thumbnail hidden"
          src="https://image.tmdb.org/t/p/w500${poster_path}" 
          alt="${title}"
          
        />
        <p class="item-title">${title}</p>
        <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${vote_average}</p>
      </div>
    </a>
  </li>
  `;

  const tempElement = document.createElement('div');
  tempElement.className = 'temp';

  $('ul.item-list').appendChild(tempElement);
  $('.temp').outerHTML = renderData;
  $('img', element.lastElementChild).addEventListener('load', (e) => {
    e.target.classList.remove('hidden');
    $('.skeleton', e.target.parentNode).remove();
  });
};

export default MovieItem;
