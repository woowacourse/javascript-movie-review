import { Movie } from "../main";
import { IMAGE_BASE_URL } from "./MovieList";

export const TopRatedMovieSkeleton = () => {
  return `
  <div class="background-container">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-movie">
        <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">0</span>
        </div>
        <div class="title">로딩중...</div>
        <button class="primary detail">자세히 보기</button>
    </div>
</div>
    `;
};

const TopRatedMovie = (movie: Movie) => {
  return /*html*/ `
    <div class="background-container" style="background-image: url(${IMAGE_BASE_URL}${movie.poster_path})">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-movie">
        <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">${movie.vote_average}</span>
        </div>
        <div class="title">${movie.title}</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
    `;
};

export default TopRatedMovie;
