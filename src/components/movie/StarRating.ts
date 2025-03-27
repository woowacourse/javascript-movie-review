import getRatings from "../../domain/getRating";
import { createElement } from "../../utils/createElement";
import { $, $$ } from "../../utils/dom";

const RATE_DESCRIPTION = {
  ZERO: { score: 0, description: "평점을 등록해주세요." },
  WORST: { score: 2, description: "최악이에요" },
  NOTGOOD: { score: 4, description: "별로예요" },
  COMMON: { score: 6, description: "보통이에요" },
  GOOD: { score: 8, description: "재미있어요" },
  BEST: { score: 10, description: "명작이에요" },
};

const StarRating = () => {
  const score: number = getRatings(
    parseInt(new URL(location.href).searchParams.get("movieID") || "0")
  );

  const startRating = createElement(/*html*/ `
    <div class="star-rating">
      <div class="stars"></div>
      <div class="description-score">
        <p class="description"></p>
        <span>(<span class="check-score">0</span>/10)</span>
      </div>
    </div>  
  `);

  Object.entries(RATE_DESCRIPTION).forEach(([, value]) => {
    if (value.score === score) {
      $(".description", startRating).innerText = value.description;
      $(".check-score", startRating).innerText = value.score.toString();
    }
  });

  Array.from({ length: 5 }).forEach((_, index) => {
    const star = document.createElement("img");
    if (score >= (index + 1) * 2) {
      star.setAttribute("src", "./images/star_filled.png");
    } else {
      star.setAttribute("src", "./images/star_empty.png");
    }

    star.classList.add("star");

    star.setAttribute("id", `star_${index + 1}`);

    star.addEventListener("click", () => {
      const stars = $$(".star-rating .star", startRating);
      const fillStars = stars.filter(
        (star) => parseInt(star.id.split("_")[1]) <= index + 1
      );
      const emptyStars = stars.filter(
        (star) => parseInt(star.id.split("_")[1]) > index + 1
      );

      fillStars.forEach((star) =>
        star.setAttribute("src", "./images/star_filled.png")
      );

      emptyStars.forEach((star) =>
        star.setAttribute("src", "./images/star_empty.png")
      );

      Object.entries(RATE_DESCRIPTION).forEach(([, value]) => {
        if (value.score === (index + 1) * 2) {
          $(".description", startRating).innerText = value.description;
        }
      });

      $(".check-score", startRating).innerText = ((index + 1) * 2).toString();
    });

    $(".stars", startRating).appendChild(star);
  });

  return startRating;
};

export default StarRating;
