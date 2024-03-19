const BASE_URL = 'https://api.themoviedb.org/3';
export const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
export const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

export const fetchData = async (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });
};
