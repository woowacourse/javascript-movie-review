import fetchWrapper from '../utils/fetchWrapper';

import { MOVIE_DETAILS } from '../constants/url';

import { ResponseMovieDetail } from '../types/ResponseMovieDetail';

interface MovieDetailsProps {
  movie_id: number;
}

const MovieDetails = {
  async fetch({ movie_id }: MovieDetailsProps) {
    const params = new URLSearchParams({ language: 'ko-kr' });
    const movieDetails = await fetchWrapper<ResponseMovieDetail>({
      url: `${MOVIE_DETAILS}/${movie_id}?${params}`,
      accessToken: process.env.ACCESS_TOKEN,
    });
    return movieDetails;
  },
};

export default MovieDetails;
