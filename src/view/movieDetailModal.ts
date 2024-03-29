import XImage from '../assets/images/closeButton.svg';
import starImage from '../assets/images/star_empty.png';

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

function createMovieTitle() {
  const title = document.createElement('div');
  title.innerText = '영화제목';
  return title;
}

function createModalCloseButton() {
  const button = document.createElement('button');
  button.className = 'flex-XY-aligned close-button transition-background';
  const closeImage = document.createElement('img');
  closeImage.src = XImage;
  closeImage.alt = 'close-button';
  closeImage.addEventListener('click', closeModal);
  button.append(closeImage);
  return button;
}

function createMovieDetailHeader() {
  const div = document.createElement('div');
  div.className = 'movie-detail-header flex-XY-aligned';
  div.append(createMovieTitle(), createModalCloseButton());
  return div;
}

function createMovieDetailImage() {
  const img = document.createElement('img');
  img.className = 'movie-detail-image';
  img.alt = 'movie-image';
  return img;
}

function createGenreAndRating() {
  const div = document.createElement('div');
  const genre = document.createElement('span');
  genre.innerText = '스릴러, 로멘스?';
  const rate = document.createElement('span');
  rate.innerText = '6.1';
  div.append(genre, rate);
  return div;
}

function createDescription() {
  const description = document.createElement('div');
  description.innerText = '여기에 설명이 들어간다.';
  return description;
}

// eslint-disable-next-line max-lines-per-function
function createRateStars() {
  const STAR_COUNT = 5;
  return Array.from({ length: STAR_COUNT }, (_, index) => {
    const starBox = document.createElement('span');
    starBox.innerHTML = `<img src=${starImage} alt='star' data-star-id="${index}" class='star-image'></img>`;
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

function createMovieDetailInfo() {
  const description = document.createElement('div');
  description.className = 'movie-detail-info';
  description.append(createGenreAndRating(), createDescription(), createUserRate());
  return description;
}

function createMovieDetailMain() {
  const div = document.createElement('div');
  div.className = 'flex-XY-aligned padding-32 gap-16';
  div.append(createMovieDetailImage(), createMovieDetailInfo());
  return div;
}

function createMovieDetailContainer() {
  const container = document.createElement('div');
  container.classList.add('movie-modal');
  const header = createMovieDetailHeader();
  const main = createMovieDetailMain();
  container.append(header, main);
  return container;
}

const backDropClickHandler = (event: any) => {
  if (event.target.tagName === 'DIALOG') {
    closeModal();
  }
};

function appendNewModal(): HTMLDialogElement {
  const modal = document.createElement('dialog');
  modal.id = 'movie-detail-modal';
  document.body.append(modal);
  modal.addEventListener('click', (e) => backDropClickHandler(e));
  modal.appendChild(createMovieDetailContainer());
  return modal;
}

function renderMovieDetailModal() {
  const modal = (document.getElementById('movie-detail-modal') as HTMLDialogElement) || appendNewModal();
  document.body.classList.add('no-scroll-y');
  modal.showModal();
}

export default renderMovieDetailModal;
