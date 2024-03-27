import { PopularAPIParamsType, MovieAPIReturnType, SearchAPIParamsType } from './movieAPI.type';
import Fetcher from './Fetcher';
import { API_URL, DETAIL_OF_MOVIE } from '../consts/URL';

const movieAPI = {
  async fetchPopularMovies({ pageNumber = 1 }: PopularAPIParamsType): Promise<MovieAPIReturnType> {
    const fetcher = new Fetcher({
      url: API_URL.POPULAR_MOVIES,
      params: {
        page: pageNumber,
      },
    });

    return fetcher.get();
  },

  async fetchSearchMovies({ query, pageNumber = 1 }: SearchAPIParamsType): Promise<MovieAPIReturnType> {
    const fetcher = new Fetcher({
      url: API_URL.SEARCH_MOVIES,
      params: {
        page: pageNumber,
        query,
      },
    });

    return fetcher.get();
  },

  async fetchDetailOfMovie({ movieId }: { movieId: number }): Promise<MovieAPIReturnType> {
    const fetcher = new Fetcher({
      url: DETAIL_OF_MOVIE(movieId),
      params: {
        movie_id: movieId,
      },
    });

    return fetcher.get();
  },
};

export default movieAPI;
