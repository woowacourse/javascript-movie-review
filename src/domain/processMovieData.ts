import { MovieFetchedJson, Movie } from '../app';

const MOVIE_IMAGE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face/';

const processMovieData = ({ page, results, total_pages: totalPages }: MovieFetchedJson) => {
  const movies: Movie[] = results.map(result => ({
    title: result.title,
    backdropPath: `${MOVIE_IMAGE_URL}${result.backdrop_path}`,
    voteAverage: result.vote_average,
  }));

  return { page, movies, totalPages };
};

export default processMovieData;
