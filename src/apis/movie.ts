import { genre } from '../constants/movie';
import { IMovie, IMovieResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getPopularMovies = async (page: number): Promise<IMovie[]> => {
  const response = await fetch(BASE_URL + `/3/movie/popular?language=ko-KR&page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      accept: 'application/json',
    },
  });
  const { results } = await response.json();

  return results.map(parseMovieResponse);
};

export const searchMoviesByTitle = async (title: string, page: number) => {
  const response = await fetch(
    BASE_URL + `/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        accept: 'application/json',
      },
    },
  );

  const { results } = await response.json();

  return results.map(parseMovieResponse);
};

const parseMovieResponse = (movieResponse: IMovieResponse): IMovie => {
  const { id, title, poster_path, vote_average, genre_ids, overview } = movieResponse;
  const movie: IMovie = {
    id,
    title,
    imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
    score: vote_average,
    genre: genre_ids.map(genre_id => genre[genre_id]),
    description: overview,
  };
  return movie;
};
