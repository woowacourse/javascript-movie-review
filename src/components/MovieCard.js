import FilledStar from '../assets/star_filled.png';

const MovieCard = (movie) => {
  const { id, title, posterPath, voteAverage } = movie;

  return /* html */ `
  <li id=${id}>
    <a href="#">
      <div class="item-card">
        <img
        class="item-thumbnail"
        src="https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}"
        loading="lazy"
        alt=${title}
        />
        <p class="item-title">${title}</p>
        <p class="item-score"><img src=${FilledStar} alt="별점" /> ${voteAverage}</p>
      </div>
    </a>
  </li>
  `;
};

export default MovieCard;
