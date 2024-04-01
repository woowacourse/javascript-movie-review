import { IMovieDetailResponse, genre } from '../../api/fetchMovieDetail';

import XImage from '../../assets/images/closeButton.svg';
import starEmptyImage from '../../assets/images/star_empty.png';
import starFillImage from '../../assets/images/star_filled.png';

import { MOVIE_IMAGE_BASE_URL } from '../../constants/tmdbConstants';
import { getLocalStorageScore, setLocalStorageScore } from '../../store/localStorage';
import { closeModal } from '../modal';

export const RATING_MESSAGES = {
  0: '별점 미등록',
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재밌어요',
  10: '명작이에요',
} as const;

function createMovieTitle(title: string) {
  const titleDiv = document.createElement('div');
  titleDiv.className = 'one-line-ellipsis max-width-60';
  titleDiv.innerText = title;
  return titleDiv;
}

export function createModalCloseButton() {
  const button = document.createElement('button');
  button.className = 'flex-XY-aligned close-button transition-background';
  const closeImage = document.createElement('img');
  closeImage.src = XImage;
  closeImage.alt = 'close-button';
  button.addEventListener('click', closeModal);
  button.append(closeImage);
  return button;
}

function createMovieDetailHeader(title: string) {
  const div = document.createElement('div');
  div.className = 'movie-detail-header flex-XY-aligned';
  div.append(createMovieTitle(title), createModalCloseButton());
  return div;
}

function createMovieDetailImage(posterPath: string) {
  const box = document.createElement('div');
  const img = document.createElement('img');
  img.className = 'h-433 w-292 mobile-display-none';
  img.src = MOVIE_IMAGE_BASE_URL + posterPath;
  img.loading = 'lazy';
  img.alt = 'movie-image';
  box.append(img);
  return box;
}

function createTMDBRatingBox(movieRating: number) {
  const rateBox = document.createElement('div');
  rateBox.className = 'flex-Y-center';
  const star = document.createElement('img');
  star.src = starFillImage;
  const rateNumber = document.createElement('span');
  rateNumber.innerText = String(movieRating.toFixed(1));
  rateBox.append(star, rateNumber);
  return rateBox;
}

function createGenreAndRating(movieGenres: genre[], movieRating: number) {
  const div = document.createElement('div');
  div.className = 'flex-Y-center gap-16';
  const genreSpan = document.createElement('span');
  genreSpan.innerText = movieGenres.map((value) => value.name).join(', ');
  const rate = createTMDBRatingBox(movieRating);
  div.append(genreSpan, rate);
  return div;
}

function createDescription(overview: string) {
  const description = document.createElement('div');
  const NO_OVERVIEW = '줄거리가 없습니다.';
  description.innerText = overview || NO_OVERVIEW;
  return description;
}

function changeStarImage(starId: number, parent: HTMLElement) {
  const STAR_COUNT = 5;
  Array(STAR_COUNT)
    .fill(null)
    .forEach((_, index) => {
      const img = parent.querySelector(`[data-star-id="${index}"] > img`) as HTMLImageElement;
      if (index <= starId) img.src = starFillImage;
      if (index > starId) img.src = starEmptyImage;
    });
}

function changeStarResult(starId: number, parent: HTMLElement) {
  const rateResultNumber = parent.parentNode!.querySelector('.result-number') as HTMLSpanElement;
  const rateResultString = parent.parentNode!.querySelector('.result-string') as HTMLSpanElement;
  const score = ((starId + 1) * 2) as keyof typeof RATING_MESSAGES;
  rateResultNumber.innerText = String(score);
  rateResultString.innerText = RATING_MESSAGES[score];
}

function executeInterface(star: HTMLElement) {
  const starId = Number(star.getAttribute('data-star-id'));
  const parent = star.parentNode as HTMLElement;
  changeStarImage(starId, parent);
  changeStarResult(starId, parent);
}

function executeLocaleStorage(star: HTMLElement, id: number) {
  const starScore = (Number(star.getAttribute('data-star-id')) + 1) * 2;
  setLocalStorageScore(id, starScore);
}

const clickStarHandler = (e: any, id: number) => {
  e.preventDefault();
  const star = e.target.parentNode;
  executeInterface(star);
  executeLocaleStorage(star, id);
};

function createStarBox(index: number, id: number) {
  const starBox = document.createElement('button');
  starBox.setAttribute('data-star-id', String(index));
  starBox.innerHTML = `<img src=${starEmptyImage} alt='star' class='star-image'></img>`;
  starBox.addEventListener('click', (e) => clickStarHandler(e, id));
  return starBox;
}

function createRateStars(id: number) {
  const STAR_COUNT = 5;
  return Array.from({ length: STAR_COUNT }, (_, index) => {
    const starBox = createStarBox(index, id);
    return starBox;
  });
}

function createRate(id: number) {
  const rateNumber = document.createElement('span');
  rateNumber.innerText = String(getLocalStorageScore(id) ?? 0);
  rateNumber.className = 'w-16 result-number';
  return rateNumber;
}

function createResult(id: number) {
  const rateString = document.createElement('span');
  rateString.innerText = RATING_MESSAGES[getLocalStorageScore(id) ?? 0];
  rateString.className = 'mobile-display-none w-96';
  return rateString;
}

function checkInitScore(userRateBox: HTMLElement, id: number) {
  const score = getLocalStorageScore(id);
  if (score) {
    changeStarImage(score / 2 - 1, userRateBox);
  }
  return userRateBox;
}

function createUserRateStarBox(id: number) {
  const userRateBox = document.createElement('div');
  userRateBox.className = 'flex-Y-center';
  userRateBox.append(...createRateStars(id));

  return checkInitScore(userRateBox, id);
}

function createUserRate(id: number) {
  const rateBox = document.createElement('div');
  rateBox.className = 'flex-Y-center user-rate-box';
  const leftSpan = document.createElement('span');
  leftSpan.innerHTML = '내 별점';
  rateBox.append(leftSpan, createUserRateStarBox(id), createRate(id), createResult(id));
  return rateBox;
}

function createMovieDetailInfo(movieDetail: IMovieDetailResponse) {
  const description = document.createElement('div');
  description.className = 'movie-detail-info h-433';
  description.append(
    createGenreAndRating(movieDetail.genres, movieDetail.vote_average),
    createDescription(movieDetail.overview),
    createUserRate(movieDetail.id),
  );
  return description;
}

function createMovieDetailMain(movieDetail: IMovieDetailResponse) {
  const div = document.createElement('div');
  div.className = 'flex-XY-aligned padding-32 gap-16';
  div.append(createMovieDetailImage(movieDetail.poster_path), createMovieDetailInfo(movieDetail));
  return div;
}

export function createMovieDetailContainer(movieDetail: IMovieDetailResponse) {
  const container = document.createElement('div');
  container.classList.add('movie-modal');
  const header = createMovieDetailHeader(movieDetail.title);
  const main = createMovieDetailMain(movieDetail);
  container.append(header, main);
  return container;
}
