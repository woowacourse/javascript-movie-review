const API_URL: Record<'popularity' | 'search' | 'genre', CallableFunction> = {
  popularity: (pageNo: number) =>
    `https://wzrabbit-movie-review.netlify.app/.netlify/functions/popularMovies?language=ko-KR&page=${pageNo}`,
  search: (pageNo: number, keyword: string) =>
    `https://wzrabbit-movie-review.netlify.app/.netlify/functions/searchMovies?language=ko-KR&page=${pageNo}&query=${keyword}`,
  genre: () =>
    `https://wzrabbit-movie-review.netlify.app/.netlify/functions/movieGenres?language=ko-KR`,
};

const IMAGE_URL = (posterPath: string | null) =>
  posterPath ? `${IMAGE_BASE_URL}${posterPath}` : NO_IMAGE_URL;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const NO_IMAGE_URL = '../../assets/no_image.png';

const ERROR_MESSAGE: Record<number, string> = {
  400: '잘못된 요청입니다. 새로고침 후 다시 시도해 주세요. (400)',
  403: '권한이 없어 영화 정보를 불러오지 못 했습니다. 문제가 지속되면 관리자에게 문의해 주세요. (403)',
  422: '너무 많은 영화를 불러온 것 같습니다. 새로고침 후 다시 시도해 주세요. (422)',
  500: '서버에 문제가 있어 영화 정보를 불러오지 못 했습니다. 잠시 후 다시 시도해 주시고, 그래도 문제가 지속되면 관리자에게 문의해 주세요. (500)',
  503: '죄송합니다. 현재 일시적으로 서버에서 영화 정보를 불러올 수 없습니다. 잠시 후 다시 시도해 주시고, 그래도 문제가 지속된다면 관리자에게 문의해 주세요. (503)',
};

const UNKNOWN_ERROR_MESSAGE = '죄송합니다. 문제가 발생하여 영화 정보를 가져오지 못 했습니다.';

const ERROR_IMAGE_PATH = {
  noSearchResults: './assets/no_results.png',
  error: './assets/error_results.png',
  loading: './assets/footer_loading_circle.png',
  errorOnShowMore: './assets/footer_error_results.png',
};

export { API_URL, ERROR_MESSAGE, IMAGE_URL, UNKNOWN_ERROR_MESSAGE, ERROR_IMAGE_PATH };
