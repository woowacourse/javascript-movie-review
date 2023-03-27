import type { MovieDetail } from "../../../types";

import filledStarImg from "../../../../templates/star_filled.png";

import { getStarSelectContainerTemplate } from "./StarSelect";

export function getDescriptionTemplate(movie: MovieDetail, starRate: number) {
  return /*html*/ `
        <div class="modal-detail-container">
            <div class="modal-movie-detail">
                <p class="modal-movie-genre modal-detail--text">
                    ${
                      movie.genre.length === 0
                        ? `장르 정보 없음`
                        : movie.genre.join(" ")
                    } 
                <span>
                <img 
                    src="${filledStarImg}" 
                    alt="별점 ${movie.vote_average}" 
                />
                    ${movie.vote_average.toFixed(1)}
                </span>
                </p>
                <p class="modal-movie-description modal-detail--text">
                    ${movie.overview ? movie.overview : "상세 정보 없음"}
                </p>
            </div>
            <div class="modal-star-rate modal-detail--text">
                ${getStarSelectContainerTemplate(movie.id, starRate)}
            </div>
        </div>
    `;
}
