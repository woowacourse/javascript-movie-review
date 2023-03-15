import "./index.css";
import StarIcon from "../../../images/star_filled.png";

const MovieItem = (movie) => {
  const { title, posterSrc, voteAverage } = movie.getMovieData();

  return `
  <li>
    <a href="#">
      <div class="item-card">
        <img
          class="item-thumbnail"
          src=${posterSrc}
          loading="lazy"
          alt=${title}
        />
        <p class="item-title">${title}</p>
        <p class="item-score"><img src=${StarIcon} alt="별점" /> ${voteAverage}</p>
      </div>
    </a>
  </li>
  `;
};

export default MovieItem;
