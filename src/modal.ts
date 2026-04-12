import { fetchMovieDetail, MovieDetailData } from "./api.ts";

const $modalBackground = document.querySelector('#modalBackground') as HTMLElement | null;
const $modalContainer = document.querySelector('#modalContainer') as HTMLElement | null;
const $closeModalButton = document.querySelector('#closeModal') as HTMLButtonElement | null;

export const openModal = async (movieId: number) => {
  if(!$modalBackground || !$modalContainer) return;

  // 모달 창 보이게하고 스크롤 방지
  $modalBackground.classList.add('active');
  document.body.classList.add('modal-open');

  // 스켈레톤 필요
  $modalContainer.innerHTML = `<div class="modal-description"><h2>정보를 불러오는 중입니다...</h2></div>`;

  try {
    const data = await fetchMovieDetail(movieId);
    renderModalContent(data);
  } catch (error) {
    if (error instanceof Error) {
      $modalContainer.innerHTML = `<div class="modal-description"><h2>${error.message}</h2></div>`;
    }
  }
};

const renderModalContent = (data: MovieDetailData) => {
  if (!$modalContainer) return;

  // 연도 추출
  const year = data.release_date ? data.release_date.split('-')[0] : '연도가 없습니다!';
  // 장르 배열 문자열 변환
  const genres = data.genres ? data.genres.map((genre) => genre.name).join(', ') : '장르가 없습니다!';
  // 포스터 이미지
  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
    : './images/woowacourse_logo.png'; // 이미지 없는 경우 임시처리

  $modalContainer.innerHTML = /* html */ `
    <div class="modal-image">
      <img src="${posterUrl}" alt="${data.title}" />
    </div>
    <div class="modal-description">
      <h2>${data.title}</h2>
      <p class="category">${year} · ${genres}</p>
      <p class="rate">
        <img src="./images/star_filled.png" class="star" />
        <span>${data.vote_average}</span>
      </p>
      <hr />
      <p class="detail">${data.overview || '줄거리 정보가 없습니다!'}</p>
    </div>
  `;
}

const closeModal = () => {
  if (!$modalBackground) return;
  $modalBackground.classList.remove('active');
  document.body.classList.remove('modal-open');
};


// 모달 창 닫기 이벤트 추가
// 닫기 버튼 클릭할 때
if ($closeModalButton) {
  $closeModalButton.addEventListener('click', closeModal);
}

// 모달 창 바깥 배경 클릭하면
if ($modalBackground) {
  $modalBackground.addEventListener('click', (event) => {
    if (event.target === $modalBackground) {
      closeModal();
    }
  });
}

// ESC 키 눌렀을 때
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && $modalBackground?.classList.contains('active')) {
    closeModal();
  }
});

