import { MovieList } from '../interface/MovieList';
import { MovieData } from '../interface/MovieData';
import fetchDataFromUrl from '../util/fetchDataFromUrl';
import Movie from './Movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

class MovieService {
  private currentPageNumber: number = 1;
  private currentSearchPageNumber: number = 1;

  async fetchPopularMovieList(pageNumber: number) {
    // TODO: ! 지우기
    const { total_pages, results } = await fetchDataFromUrl(POPULAR_MOVIES_URL, {
      api_key: process.env.API_KEY!,
      language: 'ko-KR',
      page: pageNumber.toString(),
    });

    // TODO: 타입 바꾸기
    const movieList: Movie[] = results.map(
      (result: { id: number; title: string; poster_path: string; vote_average: number; overview: string }) =>
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

  async fetchSearchResult(searchKeyword: string) {
    const { total_pages, results } = await fetchDataFromUrl(MOVIE_SEARCH_URL, {
      api_key: process.env.API_KEY!,
      language: 'ko-KR',
      query: searchKeyword,
      page: this.currentSearchPageNumber.toString(),
    });

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
      hasNextPage: total_pages > this.currentSearchPageNumber,
      movieList,
    };
  }
}

export default MovieService;
