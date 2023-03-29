import MovieFetcher from './MovieFetcher';

import { POPULAR_MOVIE_URL } from '../../constants/movieURLs';

class PopularMovieFetcher extends MovieFetcher {
  protected base = POPULAR_MOVIE_URL;

  constructor() {
    super();
  }
}

export default PopularMovieFetcher;
