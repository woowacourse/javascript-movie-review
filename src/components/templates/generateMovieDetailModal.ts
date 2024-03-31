import { generateStarRating } from "./generateStarRating";
import { BASE_POSTER_URL } from "../../constants/urls";
import { MovieDetail } from "../../types/movies";
import IMAGES from "../../images";

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
                    <div id="star-rating-container" class="star-rating-container">
                        ${generateStarRating(rating)}
                    </div>
                </div>
            </div>
        </div>
    `;
};
