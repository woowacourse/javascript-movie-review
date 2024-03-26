import isElement from '../../utils/isElement';
import { createFiveStarRates } from './renderModalContent';
import MATCHED_STAR_RATING, { STAR_RATES } from '../../constants/api/starRating';
import { StarRate } from '../../types/movie';
import MovieStorageService from '../../services/MovieStorageService';

const reRenderRateText = (currentStarRate: number) => {
  const currentStringRate = MATCHED_STAR_RATING.find((rate) => rate.RATE === currentStarRate)?.TEXT ?? '';
  const rateNumber = document.querySelector('.rate-number');
  const rateString = document.querySelector('.rate-string');
  if (!isElement(rateNumber) || !isElement(rateString)) return;

  rateNumber.textContent = currentStarRate.toString();
  rateString.textContent = currentStringRate;
};

const reRenderStarRateIcons = (reScoredRate: DocumentFragment) => {
  const starIconContainer = document.querySelector('.stars-container');
  if (!isElement(starIconContainer)) return;
  starIconContainer.innerHTML = '';
  starIconContainer.appendChild(reScoredRate);
};

function isValidStarRate(value: number): value is StarRate {
  return STAR_RATES.includes(value);
}

const updateStarRateFromTargetMovie = (movieTitle: string, starRate: StarRate) => {
  MovieStorageService.updateStarRate(movieTitle, starRate);
};

const saveUpdatedStarRateFromLocalStorage = (starRate: StarRate) => {
  const movieTitleContainer = document.querySelector('.detail-movie-title');
  if (!isElement(movieTitleContainer)) return;
  const movieTitle = movieTitleContainer.textContent;
  if (!movieTitle) return;
  updateStarRateFromTargetMovie(movieTitle, starRate);
};

const updateAndReRenderStarRate = (starRate: StarRate) => {
  if (!isValidStarRate(starRate)) return;
  saveUpdatedStarRateFromLocalStorage(starRate);
  const reScoredRate = createFiveStarRates(starRate);
  reRenderStarRateIcons(reScoredRate);
  reRenderRateText(starRate);
};

const scoreStarRate = (event: Event) => {
  const clickedStarPosition = event.target;
  if (!(clickedStarPosition instanceof Element)) return;
  const currentStarRate = clickedStarPosition.getAttribute('data-rate');
  if (!currentStarRate) return;
  const numericStarRate = Number(currentStarRate) as StarRate;

  updateAndReRenderStarRate(numericStarRate);
};

export const scoreStarRateHandler = () => {
  const starIconContainer = document.querySelector('.stars-container');
  console.log(starIconContainer);
  if (!isElement(starIconContainer)) return;

  starIconContainer.addEventListener('click', scoreStarRate);
};
