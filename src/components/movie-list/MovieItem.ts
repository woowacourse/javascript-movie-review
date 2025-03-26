import { Movie } from "../../../types/movie";

const MovieItem = ({ title, voteAverage, posterPath }: Movie) => {
  const movieItem = document.createElement("li");
  movieItem.classList.add("movie-item");

  movieItem.innerHTML = `
    <div class="item">
      <div class="thumbnail skeleton skeleton-img"></div>
      <div class="item-desc">
        <div class="skeleton skeleton-text" style="width: 40%;"></div>
        <div class="skeleton skeleton-text" style="width: 60%;"></div>
      </div>
    </div>
  `;

  const img = new Image();
  img.src = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "images/nullImage.png";
  img.alt = title;
  img.classList.add("thumbnail");
  img.onload = () => {
    movieItem.innerHTML = `
      <div class="item">
        <img class="thumbnail" src="${img.src}" alt="${title}" />
        <div class="item-desc">
          <p class="rate">
            <img src="images/star_empty.png" class="star" /><span>${voteAverage}</span>
          </p>
          <strong>${title}</strong>
        </div>
      </div>
    `;
  };

  return movieItem;
};

export default MovieItem;
