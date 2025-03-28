import { images } from "../assets/images";

export const ratingTexts = {
  2: "최악이에요",
  4: "별로에요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

export const getRatingText = (rating: number): string => {
  return rating in ratingTexts
    ? ratingTexts[rating as keyof typeof ratingTexts]
    : "";
};

export const getStarSrc = (
  currentRating: number,
  starValue: number
): string => {
  return currentRating >= starValue ? images.starFilled : images.starEmpty;
};
