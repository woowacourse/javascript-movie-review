import { BASE_URL } from '../constants';

const getPopularMovies = async (page: number = 1) => {
  const response = await fetch(`${BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}`);
  const data = await response.json();

  return data;
};

export default getPopularMovies;
