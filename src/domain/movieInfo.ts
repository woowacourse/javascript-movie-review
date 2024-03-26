import { IMAGE_BASE_URL } from '../constants/url';
import { Movie, MovieResponseResult } from '../types/movie';

const movieInfo = {
  create({ id, title, poster_path, vote_average, overview }: MovieResponseResult): Movie {
    return {
      id,
      title,
      imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
      score: vote_average,
      description: overview,
    };
  },

  createAll(response: MovieResponseResult[]): Movie[] {
    return response.map(({ id, title, poster_path, vote_average, overview }) => ({
      id,
      title,
      imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
      score: vote_average,
      description: overview,
    }));
  },
};

export default movieInfo;
