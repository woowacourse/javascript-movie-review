import { genre } from '../constants/movie';
import { IMAGE_BASE_URL } from '../constants/url';
import { Movie, MovieResponseResult } from '../types/movie';

const movieInfo = {
  create({ id, title, poster_path, vote_average, genre_ids, overview }: MovieResponseResult): Movie {
    return {
      id,
      title,
      imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
      score: vote_average,
      genre: genre_ids.map(genre_id => genre[genre_id]),
      description: overview,
    };
  },

  createAll(response: MovieResponseResult[]): Movie[] {
    return response.map(({ id, title, poster_path, vote_average, genre_ids, overview }) => ({
      id,
      title,
      imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
      score: vote_average,
      genre: genre_ids.map(genre_id => genre[genre_id]),
      description: overview,
    }));
  },
};

export default movieInfo;
