import fetchMovieDetail, { IMovieDetailResponse, genre } from '../api/fetchMovieDetail';
import XImage from '../assets/images/closeButton.svg';
import starEmptyImage from '../assets/images/star_empty.png';
import starFillImage from '../assets/images/star_filled.png';
import { MOVIE_IMAGE_BASE_URL } from '../constants/tmdbConstants';

// eslint-disable-next-line no-unused-vars
const RATING_MESSAGES: Record<string, string> = {
  0: '별점 미등록',
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재밌어요',
  10: '명작이에요',
};

function closeModal() {
  const modal = document.getElementById('movie-detail-modal') as HTMLDialogElement;
  document.body.classList.remove('no-scroll-y');
  modal.close();
}

function createMovieTitle(title: string) {
  const titleDiv = document.createElement('div');
  titleDiv.className = 'one-line-ellipsis max-width-60';
  titleDiv.innerText = title;
  return titleDiv;
}

function createModalCloseButton() {
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
  const img = document.createElement('img');
  img.className = 'movie-detail-image';
  img.src = MOVIE_IMAGE_BASE_URL + posterPath;
  img.loading = 'lazy';
  img.alt = 'movie-image';
  return img;
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

// eslint-disable-next-line max-lines-per-function
function createRateStars() {
  const STAR_COUNT = 5;
  return Array.from({ length: STAR_COUNT }, (_, index) => {
    const starBox = document.createElement('span');
    starBox.innerHTML = `<img src=${starEmptyImage} alt='star' data-star-id="${index}" class='star-image'></img>`;
    starBox.addEventListener('click', () => {
      // TODO: 별 눌렀을 때의 이벤트 만들기
    });
    return starBox;
  });
}

function createRate() {
  const rateNumber = document.createElement('span');
  rateNumber.innerText = '6';

  return rateNumber;
}

function createResult() {
  const rateString = document.createElement('span');
  rateString.innerText = '별점 미등록';
  rateString.classList.add('result-string');
  rateString.style.minWidth = '100px';
  return rateString;
}

function createUserRateStarBox() {
  const userRateBox = document.createElement('div');
  userRateBox.className = 'flex-Y-center';
  userRateBox.append(...createRateStars());
  return userRateBox;
}

function createUserRate() {
  const rateBox = document.createElement('div');
  rateBox.className = 'flex-Y-center user-rate-box';
  const leftSpan = document.createElement('span');
  leftSpan.innerHTML = '내 별점';
  rateBox.append(leftSpan, createUserRateStarBox(), createRate(), createResult());
  return rateBox;
}

function createMovieDetailInfo(movieDetail: IMovieDetailResponse) {
  const description = document.createElement('div');
  description.className = 'movie-detail-info';
  description.append(
    createGenreAndRating(movieDetail.genres, movieDetail.vote_average),
    createDescription(movieDetail.overview),
    createUserRate(),
  );
  return description;
}

function createMovieDetailMain(movieDetail: IMovieDetailResponse) {
  const div = document.createElement('div');
  div.className = 'flex-XY-aligned padding-32 gap-16';
  div.append(createMovieDetailImage(movieDetail.poster_path), createMovieDetailInfo(movieDetail));
  return div;
}

function createMovieDetailContainer(movieDetail: IMovieDetailResponse) {
  const container = document.createElement('div');
  container.classList.add('movie-modal');
  const header = createMovieDetailHeader(movieDetail.title);
  const main = createMovieDetailMain(movieDetail);
  container.append(header, main);
  return container;
}

const backDropClickHandler = (event: any) => {
  if (event.target.tagName === 'DIALOG') {
    closeModal();
  }
};

function getClearModal() {
  const originalModal = document.getElementById('movie-detail-modal') as HTMLDialogElement;
  if (!originalModal) {
    const newModal = document.createElement('dialog');
    newModal.id = 'movie-detail-modal';
    newModal.addEventListener('click', (e) => backDropClickHandler(e));
    document.body.append(newModal);
    return newModal;
  }
  originalModal.innerHTML = '';
  return originalModal;
}

async function renderMovieDetailModal(id: number) {
  const modal = getClearModal();
  // TODO: 스켈레톤 UI 렌더링
  const movieResponse: IMovieDetailResponse = await fetchMovieDetail(id);
  // TODO: fetching 이후 스켈레톤 UI replace해주기.
  modal.append(createMovieDetailContainer(movieResponse));
  document.body.classList.add('no-scroll-y');
  modal.showModal();
}

export default renderMovieDetailModal;
