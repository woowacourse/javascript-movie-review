import { SEARCH_MOVIE_URL } from '../../constants/movieURLs';
import MovieFetcher from './MovieFetcher';

class SearchMovieFetcher extends MovieFetcher {
  protected base = SEARCH_MOVIE_URL;

  constructor(keyword: string) {
    super({ query: keyword });
  }
}

export default SearchMovieFetcher;
