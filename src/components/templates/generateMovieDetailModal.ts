import { generateStarRating } from "./generateStarRating";
import { MovieDetail } from "../../types/movies";
import IMAGES from "../../images";

// TODO: BASE_POSTER_URL이 generateMovieItems에서도 공통으로 사용됨 → 분리
const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

export const generateMovieDetailModal = (
  movieDetail: MovieDetail,
  rating: number
) => {
  const { genres, overview, poster_path, title, vote_average } = movieDetail;

  const genreNames = genres.map((genre) => genre.name).join(", ");

  return `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button id="close-button" class="close-button">X</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${BASE_POSTER_URL}/${poster_path}" alt="${title} thumbnail" />
                </div>
                <div class="modal-info">
                <div>
                    <div class="movie-genre">${genreNames}</div>
                    <div class="movie-rating">
                    <img src="${IMAGES.starFilled}" alt="별점" />
                        ${vote_average}
                    </div>
                    </div>
                    <div class="movie-overview">${overview}</div>
                    ${generateStarRating(rating)}
                </div>
            </div>
        </div>
    `;
};
