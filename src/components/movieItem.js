import starFilled from '../../templates/star_filled.png';

function movieItem({ title, vote_average, poster_path }) {
  return `
    <li>
        <a href="#">
        <div class="item-card">
            <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w500/${poster_path}"
            loading="lazy"
            alt="${title}"
            />
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="${starFilled}" alt="별점" /> ${vote_average.toFixed(
    1
  )}</p>
        </div>
        </a>
    </li>
    `;
}

export default movieItem;
