import { modalRating } from "../../utils/modalRating";

export default function MyRatingInDetailModal(rating: number) {
  return `
    <div class="my-rating">
        <div class="star-rating">
            ${Array.from({ length: rating / 2 }, (_, idx) => {
              return `
                <button class="star-button" data-key="${idx + 1}">
                <img src="./images/star_filled.png" class="rating-star" />
                </button>`;
            }).join("")}
            ${Array.from({ length: 5 - rating / 2 }, (_, idx) => {
              return `
                <button class="star-button" data-key="${rating / 2 + idx + 1}">
                <img src="./images/star_empty.png" class="rating-star"/>
                </button>`;
            }).join("")}
        </div>
        <div class="rating-out-of-ten">
            ${modalRating[rating]}
            <span>(${rating}/10)</span>
        </div>
    </div>
    `;
}
