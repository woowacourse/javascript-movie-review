import { $ } from "../../utils/selector";
import UserRating from "./UserRating";

export const restoreRating = (movieId: string) => {
  return localStorage.getItem(movieId);
}

export const saveRatings = (movieId: string, rating: number) => {
  localStorage.setItem(movieId, rating + "");
}

export const onClickStar = () => {
  const userRating = $('user-rating') as UserRating;
  const stars = document.querySelectorAll<HTMLImageElement>(".rating-star");
  stars.forEach(starImg => {
    starImg.addEventListener("click", function starImageClickListener() {
      userRating.setRating(Number(starImg.dataset.rating));
      saveRatings(userRating.getMovieId(), userRating.getRating());
      userRating.render();
    });
  });
}

export const starIcons = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => `
    <img 
      class="rating-star" 
      src="./assets/star_${i < rating ? "filled" : "empty"}.png" 
      alt="별점" 
      data-rating="${i + 1}"
    />`).join('');
}
