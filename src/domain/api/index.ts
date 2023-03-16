const API_KEY = process.env.API_KEY;

const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;

const alertAPIError = (status: number) => {
  if (status >= 500) {
    window.alert('서버에서 영화 정보를 가져올 수 없습니다.');
    return true;
  } else if (status >= 400) {
    window.alert('페이지 정보를 가져올 수 없습니다.');
    return true;
  }

  return false;
};

export const getApiPopularMovie = async <T>(
  page: number
): Promise<T | undefined> => {
  const fetchingData = await fetch(`${url}&page=${page}`);

  if (alertAPIError(fetchingData.status)) return;

  return fetchingData.json();
};

export const getApiSearchMovie = async <T>(
  query: string,
  page: number
): Promise<T | undefined> => {
  const fetchingData = await fetch(
    `${searchUrl}&query=${query}&page=${page}&include_adult=false`
  );

  if (alertAPIError(fetchingData.status)) return;

  return fetchingData.json();
};
