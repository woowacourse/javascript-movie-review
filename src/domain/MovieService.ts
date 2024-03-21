import { MOVIE_SEARCH_URL, POPULAR_MOVIES_URL } from '../constant/config';
import fetchDataFromUrl from '../util/fetchDataFromUrl';
import Movie from './Movie';
import getEnvVariable from '../util/getEnvVariable';

interface MovieListData {
  total_pages: number;
  results: { id: number; title: string; poster_path: string; vote_average: number; overview: string }[];
}

interface MoviePageData extends MovieListData {
  pageNumber: number;
}

class MovieService {
  async fetchPopularMovieList(pageNumber: number) {
    const { total_pages, results } = await fetchDataFromUrl(POPULAR_MOVIES_URL, {
      api_key: getEnvVariable('API_KEY'),
      language: 'ko-KR',
      page: pageNumber,
    });

    return this.createMoviePageData({ total_pages, results, pageNumber });
  }

  async fetchSearchResult({ query, pageNumber }: { query: string; pageNumber: number }) {
    const { total_pages, results } = await fetchDataFromUrl(MOVIE_SEARCH_URL, {
      api_key: getEnvVariable('API_KEY'),
      language: 'ko-KR',
      query,
      page: pageNumber,
    });

    return this.createMoviePageData({ total_pages, results, pageNumber });
  }

  createMoviePageData({ total_pages, results, pageNumber }: MoviePageData) {
    const movieList: Movie[] = results.map(
      (result) =>
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
