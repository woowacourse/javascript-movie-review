import { RATING_COMMENTS } from '../../constant';
import { saveMovieRateToStorage } from '../../domain/localStorageRate';
import { RatingScore } from '../../type';
import { $ } from '../../util/selector';

export const changeStarState = (e: Event) => {
  let target = extractRateInputElement(e);
  if (!target) return;

  const currentRate = Number((target as HTMLInputElement).value) || 0;
  const movieId = extractMovieId();
  if (isNaN(movieId) || isNaN(currentRate)) return;
  saveMovieRateToStorage(movieId, currentRate);
  updateRateStarsUI(currentRate);
  updateRateText(currentRate);
};

export const enterChangeStarState = (e: KeyboardEvent) => {
  if (e.code === 'Enter') {
    changeStarState(e);
  }
};

const extractRateInputElement = (e: Event): HTMLElement => {
  let target = e.target as HTMLElement;
  if (!(target instanceof HTMLInputElement)) {
    target =
      target.querySelector('input[type="radio"]') ??
      target.closest('label')?.querySelector('input[type="radio"]') ??
      target;
  }
  return target;
};

const extractMovieId = (): number => {
  const idInput = $('#movieId') as HTMLInputElement;
  return Number(idInput?.value ?? NaN);
};

const updateRateStarsUI = (currentRate: number) => {
  const rateStars = $('#rateForm')?.querySelectorAll<HTMLInputElement>('input[name="rateInput"]');
  rateStars?.forEach((star) => {
    const starSvg = star.previousElementSibling;
    if (!starSvg) return;
    starSvg.classList.toggle('fill-star', parseInt(star.value, 10) <= currentRate);
  });
};

const updateRateText = (rate: number) => {
  const comment = RATING_COMMENTS[rate as RatingScore];
  $('#rateScoreText')!.textContent = comment;
  $('#rateScore')!.textContent = `(${rate}/10)`;
};
