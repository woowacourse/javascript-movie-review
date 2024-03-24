import { PopularAPIParamsType, MovieAPIReturnType, SearchAPIParamsType } from './movieAPI.type';
import Fetcher from './Fetcher';
import { API_URL } from '../consts/URL';

const movieAPI = {
  async fetchPopularMovies({ pageNumber = 1 }: PopularAPIParamsType): Promise<MovieAPIReturnType> {
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
