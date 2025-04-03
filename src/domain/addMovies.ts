import getPopularMovies from '../api/getPopularMovies';
import getSearchMovies from '../api/getSearchMovies';

const searchAddMovies = async (page: number, keyword: string) => {
  const params = {
    page: page.toString(),
    language: 'ko-KR',
    include_adult: 'false',
    query: keyword
  };

  const response = await getSearchMovies(params);

  return response;
};

const popularAddMovies = async (page: number) => {
  const params = {
    page: page.toString(),
    language: 'ko-KR'
  };

  const response = await getPopularMovies(params);

  return response;
};

export const addMovies = async (page: number, keyword?: string) => {
  const response = keyword ? await searchAddMovies(page, keyword) : await popularAddMovies(page);

  return response.results;
};
