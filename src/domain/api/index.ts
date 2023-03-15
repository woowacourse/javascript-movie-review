const API_KEY = '61777263370291e01254d71031583c64';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`;

const example =
  'https://api.themoviedb.org/3/search/movie?api_key=61777263370291e01254d71031583c64&language=en-US&query=해리포터&page=1&include_adult=false';

export const getApiPopularMovie = async <T>(page: number): Promise<T> => {
  const fetchingData = await fetch(`${url}&page=${page}`);

  return fetchingData.json();
};

export const getApiSearchMovie = async <T>(
  query: string,
  page: number
): Promise<T> => {
  const fetchingData = await fetch(
    `${searchUrl}&query=${query}&page=${page}&include_adult=false`
  );

  return fetchingData.json();
};
