import { Movie } from "../../../types/movie";
import { fetchDetailMovie } from "../../store/movieService.ts";
import { getStarRateByMovieId } from "../../utils/starRateStorage.ts";
import {
  movieDetailModal,
  setMovieDetailModalContent,
  setMovieDetailModalStarRate,
} from "./movieDetailModalController.ts";

const MovieItem = ({ title, voteAverage, posterPath, id }: Movie) => {
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
  img.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
  img.alt = title;
  img.classList.add("thumbnail");

  img.onerror = () => {
    img.src = "images/nullImage.png";
  };

  img.onload = () => {
    movieItem.innerHTML = `
      <div class="item">
        <img class="thumbnail" src="${img.src}" alt="${title}" />
        <div class="item-desc">
          <p class="rate">
            <img src="images/star_empty.png" class="star" /><span>${voteAverage.toFixed(
              1
            )}</span>
          </p>
          <strong class="movie-title">${title}</strong>
        </div>
      </div>
    `;

    const openModal = async () => {
      const { genres, overview, release_date } = await fetchDetailMovie(id);
      const myStarRate = getStarRateByMovieId(id);
      setMovieDetailModalContent({
        img,
        genres,
        id,
        overview,
        release_date,
        title,
        voteAverage,
        starRate: myStarRate,
      });
      setMovieDetailModalStarRate(myStarRate, id);

      movieDetailModal.show();
    };

    movieItem.querySelector(".thumbnail")?.addEventListener("click", openModal);
    movieItem
      .querySelector(".movie-title")
      ?.addEventListener("click", openModal);
  };

  return movieItem;
};

export default MovieItem;
