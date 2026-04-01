const API_KEY = import.meta.env.VITE_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export interface resultData {
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface PreviewData {
  page: number;
  results: resultData[];
  total_pages: number;
}

export const fetchPopularMovies = async (page: number = 1): Promise<PreviewData> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);

  if (!response.ok) {
    throw new Error('영화 데이터를 불러오는 데 실패했습니다.');
  }

  const data = (await response.json()) as PreviewData;
  return data;
};

export async function renderFetchMovieItem($target: HTMLElement | Element, page: number): Promise<number> {
  try {
    // 스켈레톤 나오고
    $target.insertAdjacentHTML('beforeend', renderSkellMovieItem());
    const data = await fetchPopularMovies(page);
    // 다 지우기
    removeSkeleton($target);
    data.results.forEach((result) => {
      $target.insertAdjacentHTML('beforeend', renderMovieItem(result));
    });
    toggleButton(data.total_pages, page); // 임시
    return data.total_pages;
  } catch (error) {
    alert('영화 목록을 불러오지 못했습니다!');
    return 0; // 임시
  }
}

export const toggleButton = (totalPage: number, currentPage: number) => {
  const $button = document.querySelector('#more-page-button');
  if (currentPage < totalPage) {
    $button?.classList.remove('hidden');
  }
};

function renderMovieItem(data: resultData): string {
  return /* html */ `
      <li>
        <div class="item">
          <img class="thumbnail" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}" />
          <div class="item-desc">
            <p class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span>${data.vote_average}</span>
            </p>
            <strong>${data.title}</strong>
          </div>
        </div>
      </li>
    `;
}

function renderSkellMovieItem(): string {
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
