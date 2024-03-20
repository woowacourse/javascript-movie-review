import fetchWrapper from '../utils/fetchWrapper';
import { POPULAR_MOVIES } from '../constants/url';
import { ResponseMoviePage } from '../types/ResponseMoviePage';

interface PopularMoviesProps {
  page: number;
}

const PopularMovies = {
  async list({ page }: PopularMoviesProps) {
    const params = new URLSearchParams({ language: 'ko-kr', page: `${page}` });
    const popularMovies = await fetchWrapper<ResponseMoviePage>({
      url: `${POPULAR_MOVIES}?${params}`,
      accessToken: process.env.ACCESS_TOKEN,
    });
    return popularMovies;
  },
};
export default PopularMovies;
