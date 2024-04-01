export const DEFAULT_RATING = 0;
export const MAX_RATING = 5;

export const getRatingNumber = (rating: number) => {
  return rating * 2;
};

export const getRatingText = (rating: number) => {
  switch (rating) {
    case 1:
      return "최악이예요";
    case 2:
      return "별로예요";

    case 3:
      return "보통이에요";

    case 4:
      return "재미있어요";

    case 5:
      return "명작이에요";

    default:
      return "별점을 매겨보세요";
  }
};
