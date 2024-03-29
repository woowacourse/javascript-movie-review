import { BASE_URL, ENDPOINT, MOVIE_LIST_TYPE } from '../constant/config';
import fetchAPI from '../api/fetchAPI';
import generateQueryUrl from '../api/generateQueryUrl';
import Movie from './Movie';
import getEnvVariable from '../util/getEnvVariable';
import { MoviePageDataParams } from '../interface/MovieInterface';

type MovieListType = keyof typeof MOVIE_LIST_TYPE;

interface FetchMovieDataParams {
  listType: MovieListType;
  pageNumber: number;
  searchKeyword: string;
}

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

  createMoviePageData({ total_pages, results, pageNumber }: MoviePageDataParams) {
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
