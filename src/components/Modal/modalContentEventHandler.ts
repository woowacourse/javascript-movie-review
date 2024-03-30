import isElement from '../../utils/isElement';
import MATCHED_STAR_RATING, { STAR_RATES } from '../../constants/api/starRating';
import { StarRate } from '../../types/movie';
import MovieStorageService from '../../services/MovieStorageService';
import HttpError from '../../error/HttpError';
import ERROR_MESSAGE from '../../constants/api/messages';
import filledStarImage from '../../../templates/star_filled.png';
import unfilledStarImage from '../../../templates/star_empty.png';

const isHTMLImageElement = (element: Element | null): element is HTMLImageElement =>
  element instanceof HTMLImageElement;

function isStarRate(value: number): value is StarRate {
  return STAR_RATES.includes(value);
}

const reRenderRateText = (currentStarRate: number) => {
  const currentStringRate = MATCHED_STAR_RATING.find((rate) => rate.RATE === currentStarRate)?.TEXT ?? '';
  const rateNumber = document.querySelector('.rate-number');
  const rateString = document.querySelector('.rate-string');
  if (!isElement(rateNumber) || !isElement(rateString)) return;

  rateNumber.textContent = currentStarRate.toString();
  rateString.textContent = currentStringRate;
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

const getStarRate = (currentStarRate: number): StarRate => {
  if (!isStarRate(currentStarRate)) {
    const error = new HttpError(ERROR_MESSAGE.INVALID_STAR_RATE, 400);
    throw error;
  }

  return currentStarRate;
};

export const reRenderStarRateIcons = (starRating: number) => {
  const starIcons = document.querySelectorAll('.star');

  starIcons.forEach((icon) => {
    if (!isHTMLImageElement(icon)) return;
    const rateValue = getStarRate(Number(icon.getAttribute('rate') || '0'));
    icon.src = rateValue <= starRating ? filledStarImage : unfilledStarImage;
  });
};

const updateAndReRenderStarRate = (starRate: StarRate) => {
  if (!isValidStarRate(starRate)) return;
  saveUpdatedStarRateFromLocalStorage(starRate);
};

const scoreStarRate = (event: Event) => {
  const clickedStarPosition = event.target;
  if (!(clickedStarPosition instanceof Element)) return;

  const currentStarRate = clickedStarPosition.getAttribute('rate');
  if (!isStarRate(Number(currentStarRate))) return;

  const starRate = getStarRate(Number(currentStarRate));

  updateAndReRenderStarRate(starRate);
  reRenderStarRateIcons(starRate);
  reRenderRateText(starRate);
};

export const onScoreStarRate = () => {
  const starIconContainer = document.querySelector('.stars-container');
  if (!isElement(starIconContainer)) return;

  starIconContainer.addEventListener('click', scoreStarRate);
};
