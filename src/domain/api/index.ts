const API_KEY = '61777263370291e01254d71031583c64';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;

export const getApiPopularMovie = async <T>(page: number): Promise<T> => {
  const fetchingData = await fetch(`${url}&page=${page}`);

  return fetchingData.json();
};
