import { CONFIG } from '../constant/config';

export default function formatScoreNumber(scoreNumber: number) {
  return scoreNumber.toFixed(CONFIG.scoreDecimalPlaces);
}
