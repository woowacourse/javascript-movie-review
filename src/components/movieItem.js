import starFilled from '../../templates/star_filled.png';

const skeletonTemplate = () => `
  <div class="item-thumbnail skeleton"></div>
  <div class="item-title skeleton"></div>
  <div class="item-score skeleton"></div>
`;

const commonTemplate = ({ title, vote_average, poster_path }) => `
  ${
    poster_path
      ? `<img
        class="item-thumbnail skeleton"
        src="https://image.tmdb.org/t/p/w500/${poster_path}"
        loading="lazy"
        alt="${title}"
      />`
      : `<div class="item-thumbnail no-image">
        <span>No Image</span>
      </div>`
  }
  <p class="item-title">${title}</p>
  <p class="item-score"><img src="${starFilled}" alt="별점" /> ${vote_average?.toFixed(1)}</p>
`;

function movieItem(movie) {
  const item = `
  <li>
    <a href="#">
      <div class="item-card">
      ${movie.title === null ? skeletonTemplate() : commonTemplate(movie)}
      </div>
    </a>
  </li>`;

  return item;
}

export default movieItem;
