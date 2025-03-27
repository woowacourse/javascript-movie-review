import getPopularMovies from '../api/getPopularMovies';

export const initMovies = async () => {
  const params = {
    page: '1',
    language: 'ko-KR'
  };

  const movies = await getPopularMovies(params);

  return movies;
};
