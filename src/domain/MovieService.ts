import { BASE_URL, ENDPOINT } from '../constant/config';
import fetchAPI from '../api/fetchAPI';
import generateQueryUrl from '../api/generateQueryUrl';
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
    const queryUrl = generateQueryUrl({
      baseUrl: BASE_URL,
      endpoint: ENDPOINT.GET.POPULAR_MOVIES,
      query: {
        api_key: getEnvVariable('API_KEY'),
        language: 'ko-KR',
        page: pageNumber,
      },
    });
    const { total_pages, results } = await fetchAPI({ url: queryUrl, method: 'GET' });
    return this.createMoviePageData({ total_pages, results, pageNumber });
  }

  async fetchSearchResult({ searchKeyword, pageNumber }: { searchKeyword: string; pageNumber: number }) {
    const queryUrl = generateQueryUrl({
      baseUrl: BASE_URL,
      endpoint: ENDPOINT.GET.MOVIE_SEARCH,
      query: {
        api_key: getEnvVariable('API_KEY'),
        language: 'ko-KR',
        query: searchKeyword,
        page: pageNumber,
      },
    });
    const { total_pages, results } = await fetchAPI({ url: queryUrl, method: 'GET' });
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
