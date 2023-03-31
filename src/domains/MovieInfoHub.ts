import { MovieDetail } from '../types';
import handleError from '../handleError';
import movieDetailFetcher from './movieDetailFetcher';

const MovieInfoHub = {
  async getMovieInfo(id: number = 315162): Promise<MovieDetail | undefined> {
    const { statusCode, statusMessage, movieDetail } = await movieDetailFetcher.fetchMovieDetail(
      id,
    );
    handleError(statusCode, statusMessage);

    return movieDetail;
  },
};

export default MovieInfoHub;
