import { images } from "../assets/images";
import {
  getMovieRating,
  MovieRate,
  saveMovieRating,
} from "../utils/localStorage";

interface StarRatingHandlers {
  updateRating: (rating: number) => void;
  handleStarClick: (index: number) => void;
  handleStarHover: (index: number) => void;
  handleStarLeave: () => void;
}

const useStarRating = (
  movieId: number,
  container: HTMLElement
): StarRatingHandlers => {
  const updateStarDisplay = (
    stars: NodeListOf<Element>,
    ratingText: Element | null,
    rating: number
  ) => {
    stars.forEach((star, index) => {
      const starValue = (index + 1) * 2;

      if (starValue <= rating) {
        star.setAttribute("src", images.starFilled);
      } else {
        star.setAttribute("src", images.starEmpty);
      }
    });

    const ratingTexts = {
      2: "최악이에요",
      4: "별로에요",
      6: "보통이에요",
      8: "재미있어요",
      10: "명작이에요",
    };

    // rating 값이 2, 4, 6, 8, 10 중 하나인지 확인
    if (ratingText && rating in ratingTexts) {
      ratingText.textContent = ratingTexts[rating as keyof typeof ratingTexts];
      ratingText.classList.add("visible");
    } else if (ratingText) {
      ratingText.classList.remove("visible");
    }
  };

  const getElements = () => {
    const stars = container.querySelectorAll(".star");
    const ratingText = container.querySelector(".rating-text");
    return { stars, ratingText };
  };

  const updateRating = (rating: number) => {
    const { stars, ratingText } = getElements();
    updateStarDisplay(stars, ratingText, rating);
  };

  const handleStarClick = (index: number) => {
    const newRating = ((index + 1) * 2) as MovieRate;
    saveMovieRating(movieId, newRating);
    updateRating(newRating);
  };

  const handleStarHover = (index: number) => {
    const hoverRating = (index + 1) * 2;
    updateRating(hoverRating);
  };

  const handleStarLeave = () => {
    const savedRating = getMovieRating(movieId) || 0;
    updateRating(savedRating);
  };

  return {
    updateRating,
    handleStarClick,
    handleStarHover,
    handleStarLeave,
  };
};

export default useStarRating;
