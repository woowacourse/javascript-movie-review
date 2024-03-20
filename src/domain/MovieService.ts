import { MovieList } from '../interface/MovieList';
import { MovieData } from '../interface/MovieData';
import fetchDataFromUrl from '../util/fetchDataFromUrl';
import Movie from './Movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

interface MovieListData {
  total_pages: number;
  results: { id: number; title: string; poster_path: string; vote_average: number; overview: string }[];
}

interface MoviePageData extends MovieListData {
  pageNumber: number;
}

class MovieService {
  async fetchPopularMovieList(pageNumber: number) {
    // TODO: ! 지우기
    const { total_pages, results }: MovieListData = await fetchDataFromUrl(POPULAR_MOVIES_URL, {
      api_key: process.env.API_KEY!,
      language: 'ko-KR',
      page: pageNumber.toString(),
    });

    return this.createMoviePageData({ total_pages, results, pageNumber });
  }

  async fetchSearchResult({ query, pageNumber }: { query: string; pageNumber: number }) {
    const { total_pages, results } = await fetchDataFromUrl(MOVIE_SEARCH_URL, {
      api_key: process.env.API_KEY!,
      language: 'ko-KR',
      query,
      page: pageNumber,
    });

    return this.createMoviePageData({ total_pages, results, pageNumber });
  }

  createMoviePageData({ total_pages, results, pageNumber }: MoviePageData) {
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
}

export default MovieService;
