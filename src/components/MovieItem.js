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

  const domParser = new DOMParser();
  const renderList = domParser.parseFromString(renderData, 'text/html').body
    .firstElementChild;

  element.appendChild(renderList);
  $('img', element.lastElementChild).addEventListener('load', (e) => {
    const currendNode = e.target.parentNode;
    e.target.classList.remove('hidden');
    $('.skeleton', currendNode).remove();
  });
};

export default MovieItem;
