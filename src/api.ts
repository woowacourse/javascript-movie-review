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
}

export const fetchPopularMovies = async (): Promise<PreviewData> => {
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);

  if (!response.ok) {
    throw new Error('영화 데이터를 불러오는 데 실패했습니다.');
  }

  const data = (await response.json()) as PreviewData;
  return data;
};

export async function renderFetchMovieItem($target: HTMLElement): Promise<void> {
  try {
    const data = await fetchPopularMovies();
    data.results.forEach((result) => {
      $target.insertAdjacentHTML('beforeend', renderMovieItem(result));
    });
  } catch (error) {}
}

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
