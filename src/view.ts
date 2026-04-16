import { ResultData } from './api.ts';

// 스켈레톤 렌더링
export const renderSkeleton = ($target: Element) => {
  $target.insertAdjacentHTML('beforeend', createSkeletonHTML());
};

export const removeSkeleton = ($target: Element) => {
  $target.querySelectorAll('.skeleton-item').forEach((node) => {
    node.remove();
  });
};

const createSkeletonHTML = (): string => {
  const skelHTML = /* html */ `
    <li class="skeleton-item">
      <div class="item">
        <div class="thumbnail skeleton skeleton-thumbnail"></div>
        <div class="item-desc">
          <div class="skeleton skeleton-text" style="width: 40%;"></div>
          <div class="skeleton skeleton-text"></div>
        </div>
      </div>
    </li>`;
  return skelHTML.repeat(20);
};

// 영화 목록 렌더링
export const renderMovieList = ($target: HTMLElement | Element, movies: ResultData[]) => {
  const dataHTML = movies.map(renderMovieItem).join('');
  $target.insertAdjacentHTML('beforeend', dataHTML);
};

const renderMovieItem = (data: ResultData): string => {
  const posterUrl = data.poster_path 
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}` 
    : './images/woowacourse_logo.png';

  return /* html */ `
      <li class="movie-item" data-id="${data.id}">
        <div class="item">
          <img class="thumbnail" src="${posterUrl}" alt="${data.title}" />
          <div class="item-desc">
            <p class="rate">
              <img src="./images/star_filled.png" class="star" alt="별점" />
              <span>${data.vote_average.toFixed(1)}</span>
            </p>
            <strong>${data.title}</strong>
          </div>
        </div>
      </li>
    `;
};

// 빈 검색 결과 렌더링
export const renderEmptyState = ($target: HTMLElement | Element, query: string) => {
  $target.innerHTML = renderEmptyPage(query);
};

const renderEmptyPage = (query: string) => {
  return /* html */ `
      <div class = "empty-result">
        <img src="./images/empty.png" alt="검색 결과가 없습니다." class="empty-image" />
        <p>"${query}" 검색 결과가 없습니다.</p>
      </div>`;
};

// 히어로 배너 렌더링
export const updateHeroBanner = (movie: ResultData) => {
  const $bg = document.querySelector<HTMLElement>('.background-container');
  if ($bg && movie.backdrop_path) {
    $bg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
  }

  const $title = document.querySelector('.top-rated-movie .title');
  if ($title) $title.textContent = movie.title;

  const $rate = document.querySelector('.top-rated-movie .rate-value');
  if ($rate) $rate.textContent = movie.vote_average.toFixed(1);

  const $detailBtn = document.querySelector('.top-rated-movie .detail') as HTMLButtonElement | null;
  if ($detailBtn) {
    $detailBtn.dataset.id = String(movie.id);
  }
};

// 더보기 버튼 렌더링
export const toggleButton = (totalPage: number, currentPage: number) => {
  if (currentPage < totalPage) {
    showMoreButton();
  } else {
    hideMoreButton();
  }
};

export const showMoreButton = () => {
  document.querySelector('#more-page-button')?.classList.remove('hidden');
};

export const hideMoreButton = () => {
  document.querySelector('#more-page-button')?.classList.add('hidden');
};
