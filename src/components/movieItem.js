import starFilled from '../../templates/star_filled.png';

function movieItem({ title, rate, url }) {
  return `
    <li>
        <a href="#">
        <div class="item-card">
            <img
            class="item-thumbnail"
            src="${url}"
            loading="lazy"
            alt="${title}"
            />
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="${starFilled}" alt="별점" /> ${rate}</p>
        </div>
        </a>
    </li>
    `;
}

export default movieItem;
