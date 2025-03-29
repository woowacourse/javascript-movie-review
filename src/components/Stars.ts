const FILLED_STAR_SRC = "./images/star_filled.png";
const EMPTY_STAR_SRC = "./images/star_empty.png";

export default function Stars(rate: number): string {
  return Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    const imgSrc = rate >= starValue ? FILLED_STAR_SRC : EMPTY_STAR_SRC;
    return `<img src="${imgSrc}" class="star" data-star-value="${starValue}" />`;
  }).join("");
}
