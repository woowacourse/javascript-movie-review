import FilledStar from '../assets/star_filled.png';

const MovieCard = (movie) => {
  const { id, title, poster_path, vote_average } = movie;

  return /* html */ `
  <li id=${id}>
    <a href="#">
      <div class="item-card">
        <img
        class="item-thumbnail"
        src="${poster_path}"
        loading="lazy"
        alt=${title}
        />
        <p class="item-title">${title}</p>
        <p class="item-score"><img src=${FilledStar} alt="별점" /> ${vote_average}</p>
      </div>
    </a>
  </li>
  `;
};

export default MovieCard;
