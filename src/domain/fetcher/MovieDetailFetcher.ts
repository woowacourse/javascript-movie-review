import MovieDetail from '../../types/MovieDetail';
import fetchJson from '../fetchJson';

import { NO_API_KEY } from '../../constants/messages';
import { MOVIE_IMAGE_URL } from '../../constants/movieURLs';
import { FetchedMovieItemJson } from '../../types/fetchedMovie';

const MovieDetailFetcher = {
  base: `https://api.themoviedb.org/3/movie`,
  params: {
    api_key: process.env.API_KEY as string,
    language: 'ko-KR',
  },

  fetchMovie(id: number): Promise<MovieDetail> {
    if (!this.params.api_key) throw new Error(NO_API_KEY);
    return fetchJson(this.createURL(id, this.params), this.processMovieData.bind(this));
  },

  createURL(id: number, params: { [param: string]: string }): string {
    const url = new URL(`${MovieDetailFetcher.base}/${id}`);
    Object.entries(params).forEach(([param, value]) => {
      url.searchParams.append(param, value);
    });

    return url.toString();
  },

  processMovieData({ id, title, overview, poster_path, vote_average, genres }: FetchedMovieItemJson): MovieDetail {
    return {
      id,
      title,
      overview,
      genres: genres.map(genre => genre.name),
      posterPath: `${MOVIE_IMAGE_URL}/${poster_path}`,
      voteAverage: vote_average,
    };
  },
};

export default MovieDetailFetcher;
