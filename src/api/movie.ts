import { API_URL } from '../consts/Api';
import { PopularAPIParamsType, MovieAPIReturnType, SearchAPIParamsType } from './movieAPI.type';
import Fetcher from './Fetcher';

const movieAPI = {
  async fetchPopularMovies({ pageNumber = 1 }: PopularAPIParamsType): Promise<MovieAPIReturnType> {
    console.log('POPULAR_MOVIES', API_URL.POPULAR_MOVIES);

    const fetcher = new Fetcher({
      url: API_URL.POPULAR_MOVIES,
      params: {
        page: pageNumber,
      },
    });

    const data = await fetcher.get();
    return data;
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
};

export default movieAPI;
