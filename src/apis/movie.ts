import { genre } from '../constants/movie';
import { handleError } from '../errors/error';
import { IMovie, IMovieResponse, ISearchResult } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getPopularMovies = async (page: number): Promise<ISearchResult> => {
  const fetchUrl = `/3/movie/popular?language=ko-KR&page=${page}`;
  const response = await fetch(BASE_URL + fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      accept: 'application/json',
    },
  });

  const { results, total_pages } = await response.json();

  handleError(response.status);

  return { movies: results.map(parseMovieResponse), totalPages: total_pages };
};

export const searchMoviesByTitle = async (title: string, page: number): Promise<ISearchResult> => {
  const fetchUrl = `/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`;
  const response = await fetch(BASE_URL + fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      accept: 'application/json',
    },
  });

  const { results, total_pages } = await response.json();

  handleError(response.status);

  return { movies: results.map(parseMovieResponse), totalPages: total_pages };
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
