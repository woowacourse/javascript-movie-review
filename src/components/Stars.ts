import FilledStarSrc from "../../images/star_filled.png";
import EmptyStarSrc from "../../images/star_empty.png";

export default function Stars(rate: number): string {
  return Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    const imgSrc = rate >= starValue ? FilledStarSrc : EmptyStarSrc;
    return `<img src="${imgSrc}" class="star" data-star-value="${starValue}" />`;
  }).join("");
}
