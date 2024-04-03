import fetchWrapper from '../utils/fetchWrapper';
import { ResponseMovieDetail } from '../types/ResponseMovieDetail';
import { MOVIE_DETAIL } from '../constants/url';

interface MovieDetailProps {
  id: number;
}

const MovieDetailRequest = {
  async list({ id }: MovieDetailProps) {
    const params = new URLSearchParams({ language: 'ko-kr' });
    const movieDetail = await fetchWrapper<ResponseMovieDetail>({
      url: `${MOVIE_DETAIL}/${id}?${params}`,
      accessToken: process.env.ACCESS_TOKEN,
    });
    return movieDetail;
  },
};

export default MovieDetailRequest;
