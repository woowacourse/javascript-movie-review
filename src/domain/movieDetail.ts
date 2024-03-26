import { IMAGE_BASE_URL } from '../constants/url';
import { MovieDetail, MovieDetailResponse } from '../types/movie';

const movieDetail = {
  create({ id, title, poster_path, vote_average, genres, overview }: MovieDetailResponse): MovieDetail {
    return {
      id,
      title,
      imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
      score: vote_average,
      genre: genres.map(genres => genres.name),
      description: overview,
    };
  },
};

export default movieDetail;
