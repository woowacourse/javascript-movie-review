import { BASE_URL, ENDPOINT, MOVIE_LIST_TYPE } from '../constant/config';
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

interface FetchMovieDataParams {
  listType: MovieListType;
  pageNumber: number;
  searchKeyword: string;
}

type MovieListType = keyof typeof MOVIE_LIST_TYPE;

class MovieService {
  async fetchMovieData({ listType, pageNumber, searchKeyword = '' }: FetchMovieDataParams) {
    const endpoint = listType === MOVIE_LIST_TYPE.search.type ? ENDPOINT.GET.MOVIE_SEARCH : ENDPOINT.GET.POPULAR_MOVIES;

    const queryUrl = generateQueryUrl({
      baseUrl: BASE_URL,
      endpoint,
      query: {
        api_key: getEnvVariable('API_KEY'),
        language: 'ko-KR',
        page: pageNumber,
        query: searchKeyword,
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
