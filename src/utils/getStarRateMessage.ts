import { StarRateMessage } from "../constant";

export const getStarRateMessage = (starRate: number) => {
  switch (starRate) {
    case 2:
      return StarRateMessage["MESSAGE_OF_STAR_RATE_2"];
    case 4:
      return StarRateMessage["MESSAGE_OF_STAR_RATE_4"];
    case 6:
      return StarRateMessage["MESSAGE_OF_STAR_RATE_6"];
    case 8:
      return StarRateMessage["MESSAGE_OF_STAR_RATE_8"];
    case 10:
      return StarRateMessage["MESSAGE_OF_STAR_RATE_10"];
    default:
      return "";
  }
};
