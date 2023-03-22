import { POPULAR_MOVIE_URL } from '../../constants/movieURLs';
import MovieFetcher from './MovieFetcher';

class PopularMovieFetcher extends MovieFetcher {
  protected base = POPULAR_MOVIE_URL;

  constructor() {
    super();
  }
}

export default PopularMovieFetcher;
