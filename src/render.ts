import { fetchPopularMovies, fetchSearchMovies, PreviewData, ResultData } from './api.ts';

export const renderFetchMovieItem = async (
  $target: HTMLElement | Element,
  page: number,
  query?: string,
): Promise<number | Error> => {
  try {
    // 스켈레톤 먼저 표현
    showSkeleton($target);

    // 데이터 페치받아오기
    const data = query ? await fetchSearchMovies(query, page) : await fetchPopularMovies(page);

    // 페치 결과에 따른 렌더링
    renderResult($target, data, page, query);

    return data.total_pages;
  } catch (error) {
    // error가 뜨면 스켈레톤 제거
    removeSkeleton($target);
    // error가 떴으므로 제거되었던 더보기 버튼 다시 렌더링
    showMoreButton();
    // error를 던져서 main에서 받음으로써 currentPage가 잘못 증가하는 것을 방지
    // 문구 상세화로 사용자 상호작용 유도
    throw new Error('영화 목록을 불러오지 못했습니다! 새로고침을 누르거나 더보기 버튼을 한번 더 눌러주세요!');
  }
};

const showSkeleton = ($target: HTMLElement | Element) => {
  $target.insertAdjacentHTML('beforeend', renderSkellMovieItem());
};

const renderResult = ($target: HTMLElement | Element, data: PreviewData, page: number, query?: string) => {
  // 스켈레톤 다 지우기
  removeSkeleton($target);

  // 검색 결과 없으면 없음 ui 표시
  if (query && data.results.length === 0) {
    renderEmptyState($target, query);
    return;
  }

  // 첫 페이지 인기 영화면 히어로 배너 업데이트
  handleHeroBanner(data, page, query);

  // 페치해온 데이터 렌더링
  renderMovieList($target, data);

  // 더보기 버튼 토글
  toggleButton(data.total_pages, page);
};

const renderEmptyState = ($target: HTMLElement | Element, query: string) => {
  $target.innerHTML = renderEmptyPage(query);
};

const handleHeroBanner = (data: PreviewData, page: number, query?: string) => {
  if (page === 1 && !query && data.results.length > 0) {
    updateHeroBanner(data.results[0]);
  }
};

const renderMovieList = ($target: HTMLElement | Element, data: PreviewData) => {
  const dataHTML = data.results.map(renderMovieItem).join('');
  $target.insertAdjacentHTML('beforeend', dataHTML);
};

const renderEmptyPage = (query: string) => {
  return /* html */ `
      <div class = "empty-result">
        <img src="./images/empty.png" alt="검색 결과가 없습니다." class="empty-image" />
        <p>"${query}" 검색 결과가 없습니다.</p>
      </div>`;
};

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

export function renderMovieItem(data: ResultData): string {
  return /* html */ `
      <li class="movie-item" data-id="${data.id}">
        <div class="item">
          <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}" />
          <div class="item-desc">
            <p class="rate">
              <img src="./images/star_filled.png" class="star" />
              <span>${data.vote_average.toFixed(1)}</span>
            </p>
            <strong>${data.title}</strong>
          </div>
        </div>
      </li>
    `;
}

export function renderSkellMovieItem(): string {
  const skelHTML = /* html */ `
      <li class= "skeleton-container">
        <div class="item">
          <div class="thumbnail skeleton"></div>
        </div>
      </li>
    `;
  return skelHTML.repeat(20);
}

export const removeSkeleton = ($target: Element) => {
  $target.querySelectorAll('.skeleton-container').forEach((node) => {
    node.remove();
  });
};

const updateHeroBanner = (movie: ResultData) => {
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
