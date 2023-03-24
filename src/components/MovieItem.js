import { $ } from '../util/querySelector';

export const MovieItem = (element, data) => {
  const poster =
    data.poster_path === null
      ? './assets/no_image.png'
      : `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  const renderData = `
  <li class="movie-info">
    <a href="javascript:void(0)">
      <div class="item-card">
      <div class="item-thumbnails skeleton"></div>
        <img
          class="item-thumbnail hidden"
          src=${poster}
          alt="${data.title}"
        />
        <p class="item-title">${data.title}</p>
        <p class="item-score"><img src="./assets/star_filled.png" alt="별점" /> ${data.vote_average}</p>
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
