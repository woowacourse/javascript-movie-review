import fetchWrapper from '../utils/fetchWrapper';
import { MATCHED_MOVIES } from '../constants/url';
import { ResponseMoviePage } from '../types/ResponseMoviePage';

interface MatchedMoviesProps {
  page: number;
  query: string;
}

const MatchedMovies = {
  async list({ page, query }: MatchedMoviesProps) {
    const params = new URLSearchParams({ query, language: 'ko-kr', page: `${page}` });
    const matchedMovies = await fetchWrapper<ResponseMoviePage>({
      url: `${MATCHED_MOVIES}?${params}`,
      accessToken: process.env.ACCESS_TOKEN,
    });
    return matchedMovies;
  },
};

export default MatchedMovies;
