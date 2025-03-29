import { StarCount } from '../../types/star';
import { RATE_MESSAGE } from '../constants/systemMessage';

export function getStarSelectionArray(selectedStars: number) {
  const STAR_TOTAL = 5;
  const starArray = Array.from({ length: STAR_TOTAL }, (_, star) => star < selectedStars);
  return starArray;
}

export function calculateRate(selectedStars: number) {
  const MULTIPLIER = 2;
  return selectedStars * MULTIPLIER;
}

function isStarCount(value: number): value is StarCount {
  return Object.keys(RATE_MESSAGE).map(Number).includes(value);
}

export function getRatingMessage(selectedStars: number) {
  if (isStarCount(selectedStars)) return RATE_MESSAGE[selectedStars];
}
