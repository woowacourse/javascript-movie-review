import { MovieList } from '../interface/MovieList';
import { MovieData } from '../interface/MovieData';
import Movie from './Movie';
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

class MovieService {
  private currentPageNumber: number = 1;
  private options: object = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  async fetchPopularMovieList(pageNumber: number) {
    // TODO: ! 지우기
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: process.env.API_KEY!,
        language: 'ko-KR',
        page: pageNumber.toString(),
      });

    const response = await fetch(popularMovieUrl);
    const { total_pages, results } = await response.json();

    // TODO: 타입 바꾸기
    const movieList: Movie[] = results.map(
      (result: { id: number; title: string; poster_path: string; vote_average: number }) =>
        new Movie({
          id: result.id,
          title: result.title,
          posterPath: result.poster_path,
          voteAverage: result.vote_average,
        }),
    );

    return {
      hasNextPage: total_pages > pageNumber,
      movieList,
    };
  }
}

export default MovieService;
